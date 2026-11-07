// Contenido del Plan de Trabajo Final, condensado desde docs/anteproyecto/.
// Marcado en línea: **negrita**, *cursiva*.
module.exports = {
  "titulo": "Sistema de Reconocimiento Automático de Eventos Deportivos en Video mediante Visión por Computadora — Caso de Estudio: Análisis de Partidos de Rugby",
  "subtitulo": "Detección automática de line-outs y generación de clips en video amateur mediante visión por computadora",
  "director": "Ing. Mariano Ferrero",
  "autor": "Juan Ignacio Abarca",
  "fecha": "Noviembre de 2026",
  "secciones": [
    {
      "h1": "Introducción"
    },
    {
      "p": "El análisis de video se ha consolidado como una herramienta central en la preparación táctica de los cuerpos técnicos. En el rugby, deporte de alta complejidad espacio-temporal y con formaciones colectivas como el *scrum*, el *line-out*, el *ruck* y el *maul*, la revisión sistemática de las grabaciones es una fuente primaria de información para planificar los partidos y evaluar el rendimiento individual y colectivo."
    },
    {
      "h2": "Descripción del problema"
    },
    {
      "p": "En el ámbito amateur, convertir la grabación de un partido en información útil para el cuerpo técnico sigue siendo un procedimiento **manual, repetitivo y poco reproducible**: el analista recorre el video completo, identifica cada evento de interés, lo marca y lo recorta en clips. En el Círculo Rafaelino de Rugby (CRAR), club caso testigo de este trabajo, el análisis manual de un partido de 80 minutos demanda entre **2 y 3 horas**, que se repiten en cada fecha de la temporada. Ese tiempo se resta del análisis interpretativo, que es la actividad que efectivamente aporta valor."
    },
    {
      "p": "Las soluciones que automatizan parte de esta tarea siguen dos caminos. En el **alto rendimiento** se apoyan en la instrumentación del entorno de juego, como dispositivos GPS e inerciales en los jugadores o sistemas de cámaras para el seguimiento óptico (Chambers et al., 2019). En el ámbito amateur surgieron **cámaras autónomas con inteligencia artificial** que detectan algunos eventos, pero sólo sobre el video que ellas mismas graban (Veo, s.f.). En ambos casos el análisis queda atado a hardware y servicios propietarios, en general pagados en moneda extranjera, y no alcanza al **archivo histórico** que los clubes ya registran con sus propios medios."
    },
    {
      "p": "En síntesis, *no existe en el ámbito amateur regional una solución de software accesible que, operando sólo sobre grabaciones de video estándar y sin instrumentar el entorno de juego, detecte y catalogue automáticamente los eventos tácticos de un partido de rugby con la precisión necesaria para asistir al cuerpo técnico.*"
    },
    {
      "h2": "Propuesta"
    },
    {
      "p": "Se propone desarrollar y validar un **sistema exclusivamente de software** que procese grabaciones de partidos de rugby y produzca, de forma automática, un catálogo de eventos con sus clips. El **line-out** es el evento inicial y único de validación obligatoria; el *scrum* y el *ruck* quedan especificados como extensión. El sistema se organiza en tres capas desacopladas:"
    },
    {
      "bullets": [
        "**Percepción:** detecta a los jugadores y el balón en cada cuadro y sigue sus trayectorias.",
        "**Semántica:** reconoce el instante en que ocurre cada line-out a partir de la disposición de los jugadores.",
        "**Eventos:** genera los clips, los registra en un catálogo indexado y los pone a disposición del cuerpo técnico."
      ]
    },
    {
      "p": "El proyecto se encuadra en el Art. 2, inciso b, del Reglamento de Trabajo Final: el desarrollo de un sistema que integra ingeniería de software, sistemas inteligentes y procesamiento de señales."
    },
    {
      "h1": "Contexto y Marco Teórico"
    },
    {
      "h2": "El line-out"
    },
    {
      "p": "El line-out es la formación con la que se reanuda el juego cuando el balón sale por la línea lateral. Lo regula la Ley 18 de World Rugby (s.f.), que impone rasgos **observables en video**: dos filas paralelas de jugadores, una por equipo, perpendiculares a la línea lateral (18.11); ubicadas entre las líneas de 5 y 15 m (18.10) y separadas ≈1 m (18.10); un lanzador que arroja el balón derecho a lo largo de esa línea (18.23); saltadores elevados por sus compañeros (18.29); y el resto de los jugadores a 10 m (18.35), lo que aísla la formación del juego."
    },
    {
      "p": "Dos consecuencias orientan el diseño. Primero, el line-out es una configuración colectiva muy característica y casi estática antes del lanzamiento, por lo que puede describirse por la **disposición de los jugadores**, sin modelar gestos individuales. Segundo, tiene un **instante canónico**: el momento en que el balón sale de las manos del lanzador, que el propio reglamento usa como frontera, ya que nadie puede saltar ni ser levantado antes (18.20). Ese instante se adopta como referencia para etiquetar y evaluar."
    },
    {
      "h2": "Capa de percepción"
    },
    {
      "p": "Con un conjunto de datos del orden de cientos de line-outs, la viabilidad depende del **aprendizaje por transferencia**: se parte de un modelo preentrenado en un conjunto genérico y se lo ajusta con datos propios (Pan & Yang, 2010). La detección usa la familia **YOLO**, que predice en una sola pasada las cajas y las clases sobre la imagen (Redmon et al., 2016), en su implementación de Ultralytics (Jocher et al., 2023), partiendo de pesos entrenados en COCO, que ya incluye las clases *persona* y *pelota* (Lin et al., 2014). Se evalúa con el **AP@0.5** de la clase *jugador*: el área bajo la curva precisión-exhaustividad, considerando correcta una detección que se superpone al menos un 50 % con la caja real (Everingham et al., 2010)."
    },
    {
      "p": "El **seguimiento** asocia las detecciones de cuadros sucesivos en trayectorias. El paradigma dominante, *tracking-by-detection*, combina un detector por cuadro, un **filtro de Kalman** que predice la posición de cada trayectoria (Kalman, 1960) y una asociación resuelta con el **algoritmo húngaro** sobre una matriz de costos de superposición o de apariencia (Kuhn, 1955). En el line-out la oclusión es estructural: filas compactas, saltadores elevados y levantadores superpuestos. La tabla resume las alternativas evaluadas."
    },
    {
      "table": {
        "widths": [
          2000,
          3500,
          3526
        ],
        "header": [
          "Algoritmo",
          "Asociación",
          "Limitación en el line-out"
        ],
        "rows": [
          [
            "DeepSORT (Wojke et al., 2017)",
            "Kalman + superposición + descriptor de apariencia",
            "Los jugadores de un mismo equipo visten igual: la apariencia discrimina poco"
          ],
          [
            "ByteTrack (Zhang et al., 2022)",
            "Kalman + superposición en dos rondas, que recupera las detecciones de **baja confianza**",
            "Supone una cámara quieta"
          ],
          [
            "**BoT-SORT** (Aharon et al., 2022)",
            "ByteTrack + **compensación del movimiento de cámara**; apariencia opcional",
            "Con apariencia hereda la limitación de DeepSORT"
          ]
        ]
      }
    },
    {
      "p": "Como la cámara del club se orienta y hace *zoom* para seguir el juego, se adopta **BoT-SORT sin reidentificación por apariencia**: conserva las dos rondas de ByteTrack, que no descartan al jugador parcialmente tapado, y estima la transformación global entre cuadros sobre el fondo para descontarla antes de asociar. No se requiere identidad persistente durante todo el partido, sino **trayectorias coherentes en ventanas de algunos segundos**. Por eso el seguimiento se usa pero no se evalúa formalmente: el objetivo 4 se mide con el AP@0.5 de la detección."
    },
    {
      "h2": "Capa semántica"
    },
    {
      "p": "La literatura distingue tres tareas de comprensión temporal de video: la clasificación de clips ya recortados, la localización de segmentos con inicio y fin, y el *action spotting*, que marca **un instante por evento** en videos largos sin recortar (Giancola et al., 2018; Xu et al., 2025). Este trabajo formula el problema como **spotting del lanzamiento**: el clip se obtiene como una ventana de referencia de ±10 s alrededor del instante, y anotar un instante es más barato y menos ambiguo que decidir dónde empieza y termina un line-out."
    },
    {
      "p": "A partir de las trayectorias se calcula por cuadro un vector de **características geométricas** en el espacio de la imagen. Como con una sola cámara en perspectiva las distancias en metros no se obtienen directamente, las medidas se **normalizan por la altura de los jugadores** (≈1,8 m), lo que además las vuelve robustas al *zoom*: alineación del grupo en dos filas paralelas, separación entre filas, orientación respecto de la línea lateral, elongación y densidad del grupo, y velocidad media una vez descontado el movimiento de cámara. Un **modelo temporal liviano** (LSTM/GRU o convolución 1D; Hochreiter & Schmidhuber, 1997) emite la confianza por instante. Es entrenable con pocos datos e interpretable, porque cada característica corresponde a un criterio del catálogo. Como **línea base**, se evalúan reglas fijas sobre las mismas características. Un modelo de video de extremo a extremo, como E2E-Spot (Hong et al., 2022), queda como extensión opcional."
    },
    {
      "p": "**Desbalance de clases.** Con ≈25 line-outs por partido (Cullen, 2026) y un partido de 80 minutos procesado a 2–5 cuadros por segundo en la capa semántica, hay un cuadro positivo cada 500 a 1.000. El entrenamiento lo compensa con **dilatación de las etiquetas** alrededor del instante y **muestreo balanceado** de ventanas negativas. En inferencia se aplica una **supresión de no-máximos temporal** sobre la serie de confianza, para que cada line-out produzca un solo instante."
    },
    {
      "h2": "Criterio de evaluación del evento"
    },
    {
      "p": "Para que la meta del objetivo 5 sea verificable se fija un criterio de acierto. Cada evento real se representa por su instante anotado *t* (el lanzamiento) y cada predicción por su instante *t̂* y su confianza. Una predicción es un **verdadero positivo** si |*t̂* − *t*| ≤ **δ** para algún evento real todavía no asignado; las predicciones se recorren de mayor a menor confianza y cada evento real absorbe como máximo una. Las predicciones sobrantes son falsos positivos y los eventos sin asignar, falsos negativos. Con esas cantidades se calculan la **precisión** = TP / (TP + FP), la **exhaustividad** = TP / (TP + FN) y el **F1**, su media armónica (Sokolova & Lapalme, 2009)."
    },
    {
      "p": "Se adopta **δ = 3 s**. La disputa del line-out es breve: pocos segundos después del lanzamiento el balón sale de la formación, por un pase al medio scrum o porque se arma un *maul*; con una tolerancia mayor, una predicción tardía podría contarse como acierto cuando el balón ya dejó el line-out. Con 3 s, además, el clip de ±10 s conserva al menos 7 s de contexto a cada lado. El criterio surge de la práctica de análisis del club y está dentro del rango estricto de SoccerNet, de 1 a 5 s (Deliège et al., 2021). Como datos complementarios se informan el F1 con δ = 2 s, la curva de F1 para δ ∈ {1, 2, 3, 5} s y el *average-mAP* de SoccerNet."
    },
    {
      "h2": "Capa de eventos e ingeniería del sistema"
    },
    {
      "p": "El sistema adopta un **estilo arquitectónico en capas**, en el que cada capa ofrece servicios sólo a la superior y oculta su implementación detrás de una interfaz, lo que favorece la modificabilidad y la prueba independiente de cada módulo (Bass et al., 2021), tal como exige el objetivo 3. Como el análisis es posterior al partido, se implementa como un **pipeline** *offline*: cada capa persiste un artefacto intermedio que materializa su interfaz con la siguiente. La capa de eventos recorta los clips con FFmpeg y registra el catálogo en SQLite; el sistema se opera por línea de comandos."
    },
    {
      "h1": "Antecedentes y Estado del Arte"
    },
    {
      "p": "El relevamiento se ordenó de lo más cercano a lo más lejano al caso de estudio, y considera sólo trabajos afines a alguno de sus rasgos: el rugby, el reconocimiento de formaciones colectivas en video, el video amateur de una sola cámara y la ausencia de instrumentación física."
    },
    {
      "p": "**Local y regional.** No se identificaron antecedentes de análisis automático de video deportivo. En el CRAR los partidos se graban con una videocámara en trípode que un operador orienta y acerca para seguir el juego, y se analizan manualmente con LongoMatch y una herramienta propia del analista; el club dispone de más de 60 partidos grabados del plantel superior."
    },
    {
      "p": "**Nacional.** La Unión de Rugby de Buenos Aires [URBA] (s.f.) impulsa una plataforma de análisis de video basada en un protocolo común de **codificación manual**. En la industria, Beelup instala cámaras fijas que generan *highlights* con inteligencia artificial en canchas de fútbol amateur de 17 países (Forbes Argentina, 2024): valida el modelo de cámara fija con clips automáticos, pero orientado al uso recreativo y con hardware propio. En lo académico, Francois et al. (2025) detectan objetos en tenis con equipamiento accesible."
    },
    {
      "p": "**Latinoamérica.** Santana Domínguez (2024) detecta choques entre rugbistas en video de una cámara Veo, motivado por que esa cámara no identificaba los eventos que necesitaba el cuerpo técnico; es el antecedente regional más cercano, aunque no aborda formaciones. Laboriano Galindo (2024) clasifica eventos de fútbol con redes convolucionales."
    },
    {
      "p": "**Internacional: herramientas.** Las herramientas de referencia, como Hudl Sportscode (Hudl, s.f.) y Nacsport (s.f.), asisten el **etiquetado manual**: el analista define una botonera de eventos y marca cada uno mientras recorre el video. Las que automatizan dependen de sensores (Chambers et al., 2019) o de cámaras propietarias: Veo (s.f.) detecta line-outs, scrums y tries y genera clips, pero sólo sobre el video de su propia cámara y con un método cerrado, por lo que no alcanza al archivo histórico de un club."
    },
    {
      "p": "**Internacional: investigación.** SoccerNet formalizó el *action spotting* sobre 500 partidos de fútbol, como la localización de eventos dispersos dentro de videos largos sin recortar (Giancola et al., 2018), y E2E-Spot lo resolvió con alta precisión temporal y un modelo entrenable en una única GPU (Hong et al., 2022). Es la formulación más próxima a este trabajo, porque el line-out es un evento disperso dentro de un partido de 80 minutos. El reconocimiento de **formaciones colectivas** tiene antecedentes directamente análogos: Atmosukarto et al. (2013) reconocieron la formación ofensiva en jugadas de fútbol americano a partir de la disposición de los jugadores, una tarea que los entrenadores hacían a mano, e Ibrahim et al. (2016) combinaron la dinámica individual y la grupal para reconocer actividades de equipo en vóley. Ambos respaldan la hipótesis de diseño: reconocer el evento por la **disposición espacial de los jugadores detectados y seguidos**. Finalmente, Kodathala et al. (2026) —un *preprint* de autores vinculados a una empresa del sector— advierten que los resultados sobre video profesional no se trasladan directamente al video amateur de una sola cámara."
    },
    {
      "p": "**Rugby.** La producción académica específica es escasa y se orienta mayormente a otros problemas:"
    },
    {
      "table": {
        "widths": [
          2100,
          2700,
          1900,
          2326
        ],
        "header": [
          "Trabajo",
          "Problema",
          "Insumo",
          "Relación con este trabajo"
        ],
        "rows": [
          [
            "Jayasuriya (2022)",
            "Detección y localización temporal de eventos, incluido el line-out",
            "Transmisión de TV",
            "Tarea más próxima; distinto insumo"
          ],
          [
            "Nonaka et al. (2024)",
            "Clasificación de escenas (scrum, maul, ruck, line-out) con un modelo visión-lenguaje",
            "Cuadros de transmisión de TV",
            "Reconoce el line-out por imagen, sin localización temporal ni clips"
          ],
          [
            "Santana Domínguez (2024)",
            "Detección de choques entre jugadores",
            "Cámara Veo (amateur)",
            "Único antecedente con video amateur de rugby; no aborda formaciones"
          ],
          [
            "Chambers et al. (2019)",
            "Detección de scrums",
            "Sensores inerciales",
            "Mismo objetivo con instrumentación física"
          ]
        ]
      }
    },
    {
      "p": "**El line-out como objeto de análisis.** Migdalski y Stone (2019) analizaron más de 2.200 line-outs de una temporada de la Premiership inglesa: los mejores equipos no se distinguen por ganar más los propios, sino por robar más los del rival y por convertir más *tries* a partir de esta formación. Cullen (2026) codificó **a mano** 660 line-outs de 26 partidos de rugby no profesional, lo que aporta dos datos: en el nivel amateur se registran ≈25 line-outs por partido, y aun en un estudio académico los datos dependen del etiquetado manual, que es el costo que este trabajo busca reducir."
    },
    {
      "p": "La tabla sintetiza la comparación entre las soluciones relevadas y este trabajo."
    },
    {
      "table": {
        "widths": [
          2300,
          2100,
          2300,
          2326
        ],
        "header": [
          "Solución",
          "Insumo",
          "Eventos",
          "Archivo histórico"
        ],
        "rows": [
          [
            "Hudl, Nacsport, plataforma URBA",
            "Video de cualquier fuente",
            "Cualquiera, etiquetado manual",
            "Sí, con el mismo costo manual"
          ],
          [
            "Veo",
            "Video de su propia cámara",
            "Line-out, scrum, try (automático)",
            "No"
          ],
          [
            "Sensores (GPS / inerciales)",
            "Instrumentación por jugador",
            "Scrum, contactos (automático)",
            "No"
          ],
          [
            "Investigación de rugby",
            "Transmisiones de TV",
            "Line-out y otros",
            "No validado en amateur"
          ],
          [
            "**Este trabajo**",
            "**Video estándar de una cámara**",
            "**Line-out y clips (automático)**",
            "**Sí**"
          ]
        ]
      }
    },
    {
      "p": "**Brecha y contribución.** Ningún trabajo relevado combina la localización temporal del line-out sobre video amateur de una sola cámara con la generación automática de clips. La contribución de este trabajo es: un sistema de software que lo hace sin sensores ni hardware propietario, diseñado para aplicarse al archivo histórico de los clubes; un protocolo de etiquetado reproducible construido con un club del contexto regional; y una evaluación cuantitativa del reconocimiento del line-out en condiciones reales de captura amateur."
    },
    {
      "h1": "Justificación"
    },
    {
      "bullets": [
        "**Relevancia práctica.** Automatizar la localización y el recorte de los line-outs libera parte de las 2 a 3 horas que hoy insume cada partido y redirige ese tiempo al análisis interpretativo. La solución opera sobre el video que los clubes ya producen, sin inversión en hardware ni cambios en la captura.",
        "**Relevancia social.** Las herramientas que automatizan el análisis dependen de hardware propietario y no alcanzan al video que los clubes ya registran. Un sistema abierto, que opera sobre grabaciones estándar —incluido el archivo histórico—, busca democratizar el acceso al análisis táctico en el rugby amateur regional.",
        "**Relevancia académica y tecnológica.** El proyecto integra ingeniería de software, sistemas inteligentes y procesamiento de señales sobre un problema real, recorriendo el ciclo completo de formulación, diseño, implementación y validación empírica.",
        "**Viabilidad.** Se apoya en técnicas de visión por computadora maduras, no requiere infraestructura especial, acota la validación a un evento y cuenta con un entorno real de prueba: el autor es analista de video del club caso testigo y dispone de su archivo de partidos."
      ]
    },
    {
      "h1": "Objetivos"
    },
    {
      "h2": "Objetivo general"
    },
    {
      "p": "Desarrollar y validar un sistema de software para el reconocimiento automático de eventos en video de partidos de rugby, que opere exclusivamente sobre grabaciones en formato estándar —sin instrumentar el entorno de juego— y produzca una catalogación estructurada de los eventos con sus clips, a fin de asistir al cuerpo técnico de instituciones del ámbito amateur regional en la preparación táctica de los partidos."
    },
    {
      "h2": "Objetivos específicos"
    },
    {
      "p": "Se formulan bajo el criterio SMART. Los plazos se expresan en semanas relativas al inicio del desarrollo (S1), sobre un total de 26 semanas. Las metas cuantitativas se miden una única vez sobre el conjunto de prueba, en la evaluación final."
    },
    {
      "numbered": [
        "**Delimitar el catálogo de eventos.** Documentar, hacia la **S3**, los criterios observables del line-out (evento inicial) y especificar el *scrum* y el *ruck* como extensión, validados con un referente del cuerpo técnico. *Medible: documento de catálogo.*",
        "**Construir el conjunto de datos etiquetado.** Conformar, entre la **S3 y la S14**, un conjunto de **al menos 200 line-outs etiquetados temporalmente** sobre partidos completos, en distintas condiciones de captura, particionado en entrenamiento, validación y prueba (70/15/15), con un protocolo de etiquetado documentado. *Medible: ≥200 line-outs etiquetados y partición verificable.*",
        "**Diseñar la arquitectura del sistema.** Presentar al Director, hacia la **S5**, un documento de diseño con las tres capas —percepción, semántica y eventos— y sus interfaces. *Medible: documento de diseño presentado.*",
        "**Implementar el módulo de percepción.** Desarrollar, hacia la **S16**, la detección y el seguimiento de jugadores y balón sobre partidos completos, verificado sobre validación. Meta: **AP@0.5 ≥ 0,70** para la clase *jugador*. *Medible: módulo implementado y AP@0.5 sobre validación.*",
        "**Implementar el reconocimiento del line-out.** Desarrollar, hacia la **S22**, el módulo que localiza temporalmente los line-outs, los registra en un catálogo y genera los clips, verificado sobre validación. Meta: **F1 ≥ 0,70** con δ = 3 s. *Medible: sistema integrado generando clips y F1 sobre validación.*",
        "**Evaluar el sistema.** Medir, hacia la **S26** y una única vez sobre el conjunto de prueba, el AP@0.5 de la detección y la precisión, exhaustividad y F1 del line-out frente a la línea base, junto con el **tiempo de procesamiento por partido**, y documentarlo en un informe. *Medible: informe de evaluación.*"
      ]
    },
    {
      "h1": "Alcance"
    },
    {
      "p": "**Incluido:**"
    },
    {
      "bullets": [
        "Un sistema exclusivamente de software que opera sobre grabaciones de rugby en formato de video estándar.",
        "El reconocimiento del line-out y su localización temporal, como evento inicial y único de validación obligatoria.",
        "La detección y el seguimiento de jugadores y balón, como paso intermedio para identificar el evento.",
        "El registro indexado de los eventos y la generación automática de clips, con una ventana de referencia de ≈10 s antes y después del lanzamiento, configurable.",
        "La validación con métricas objetivas sobre grabaciones reales del ámbito amateur regional.",
        "Una arquitectura modular, con el *scrum* y el *ruck* especificados como extensión opcional."
      ]
    },
    {
      "p": "**Excluido:**"
    },
    {
      "bullets": [
        "La instrumentación física del entorno de juego (sensores, GPS, cámaras especiales).",
        "El procesamiento en tiempo real: el análisis es posterior al partido.",
        "El reconocimiento de otros eventos (tries, infracciones, marcador), más allá de su mención en el catálogo de extensión.",
        "El análisis táctico interpretativo, las recomendaciones estratégicas y las estadísticas de rendimiento individual.",
        "Una interfaz de nivel comercial, el despliegue en producción, la comercialización y el soporte.",
        "La validación del sistema en otros deportes: la modularidad es sólo una orientación de diseño."
      ]
    },
    {
      "p": "**Supuestos y restricciones:** grabaciones con calidad y encuadre suficientes para identificar visualmente los eventos; colaboración de al menos un referente del cuerpo técnico para validar los criterios de etiquetado; un volumen de datos que depende del material efectivamente disponible; y recursos de cómputo propios del autor, sin infraestructura especializada."
    },
    {
      "h1": "Metodología"
    },
    {
      "h2": "Modelo de proceso"
    },
    {
      "p": "El trabajo combina tres enfoques. La **gestión del proyecto** sigue los dominios de planificación, medición e incertidumbre del PMBOK (Project Management Institute, 2021): hitos, seguimiento del avance y gestión de riesgos. El **ciclo de aprendizaje automático** sigue CRISP-ML(Q) (Studer et al., 2021), que agrega controles de calidad en cada fase, desde la comprensión de los datos hasta la evaluación. El **software** se desarrolla en forma iterativa e incremental, en iteraciones de dos semanas, con control de versiones en Git e integración continua. El seguimiento con el Director se realiza en reuniones periódicas, con un registro de cada reunión a cargo del autor."
    },
    {
      "h2": "Componentes que se entrenan"
    },
    {
      "p": "Sólo dos componentes se entrenan: el **detector YOLO**, por ajuste fino desde COCO, con cajas de *jugador* y *balón*; y el **modelo temporal**, desde cero, con los instantes de lanzamiento. El seguimiento, las características geométricas y la línea base son algoritmos o reglas que se configuran, y la generación de clips (FFmpeg) y el catálogo (SQLite) se verifican funcionalmente."
    },
    {
      "h2": "Construcción del conjunto de datos"
    },
    {
      "bullets": [
        "**Fuente:** partidos del plantel superior del CRAR, todos de jugadores mayores de edad, de local y de visitante; estos últimos aportan distintas canchas, fondos, iluminaciones y condiciones de captura. De los más de 60 partidos disponibles se etiquetan partidos hasta reunir **≈300 line-outs**, por encima de la meta de 200; a razón de ≈25 por partido (Cullen, 2026), unos 12 partidos. El resto queda como **reserva** para el punto de decisión.",
        "**Instantes de lanzamiento:** para cada partido se registra en una planilla el instante en que el balón sale de las manos del lanzador (Ley 18.20), junto con el lado de la cancha. Una **guía de etiquetado** escrita resuelve los casos dudosos, como line-outs parcialmente fuera de cuadro o lanzamientos repetidos, y se valida con el referente técnico del club.",
        "**Cajas delimitadoras:** entre 300 y 500 cuadros muestreados de situaciones variadas (line-outs, juego abierto, distintos planos) se pre-etiquetan con el detector de COCO y se corrigen a mano en CVAT, que exporta directamente al formato de YOLO.",
        "**Calidad:** como el trabajo es individual, se mide el acuerdo intra-anotador, reetiquetando un partido al menos tres semanas después, y el inter-anotador, con un partido etiquetado en forma independiente por el referente del club. Se informan el error absoluto medio entre instantes, el porcentaje de marcas que coinciden dentro de δ y, para las cajas, la superposición media.",
        "**Partición:** cada partido se asigna completo a un solo conjunto, porque sus line-outs comparten cancha, iluminación y equipos, y repartirlos produciría una **fuga de datos** que inflaría las métricas. Como la cantidad de line-outs varía entre partidos, el 70/15/15 se mide sobre el **total de line-outs** y se informa la proporción alcanzada. Validación y prueba incluyen partidos de local y de visitante.",
        "**Documentación:** el conjunto se describe con una ficha según *Datasheets for Datasets* (Gebru et al., 2021) —origen, criterios de selección, guía de etiquetado, acuerdo y partición— y un manifiesto con el *hash* de cada video y su asignación garantiza que la partición sea reproducible.",
        "**Datos personales:** las imágenes de los jugadores, propios y rivales, son datos personales (Ley N.º 25.326, 2000): se almacenan en forma local con respaldo cifrado, el conjunto de datos no se publica y las figuras del informe no permiten identificar a ningún jugador."
      ]
    },
    {
      "h2": "Entrenamiento y evaluación"
    },
    {
      "table": {
        "widths": [
          2000,
          7026
        ],
        "header": [
          "Conjunto",
          "Uso"
        ],
        "rows": [
          [
            "Entrenamiento",
            "Ajustar los pesos de los modelos"
          ],
          [
            "Validación",
            "Elegir hiperparámetros, detener el entrenamiento a tiempo, fijar el umbral de confianza y comparar el modelo con la línea base"
          ],
          [
            "Prueba",
            "Medir las métricas que se reportan. Se usa **una sola vez**, al final"
          ]
        ]
      }
    },
    {
      "p": "**Detección.** YOLO se ajusta desde los pesos de COCO; la variante y la resolución de entrada se eligen por el AP en validación. La meta es un **AP@0.5 ≥ 0,70** para *jugador*; para el balón, que ocupa pocas decenas de píxeles en un plano general, se informa el resultado sin umbral exigido. **Line-out.** El modelo temporal se entrena sobre la serie de características de los partidos de entrenamiento, con dilatación de etiquetas y muestreo balanceado; la línea base heurística se calibra con los mismos datos. La meta es un **F1 ≥ 0,70 con δ = 3 s**."
    },
    {
      "p": "**Incertidumbre.** Como la prueba reúne ≈45 line-outs de pocos partidos, un F1 puntual tiene un margen del orden de ±0,1. Por eso las métricas se informan con **intervalos de confianza del 95 %** por *bootstrap*, remuestreando partidos completos, y si el tiempo lo permite se suma una validación cruzada dejando un partido afuera por vez. Se mide además el **tiempo de procesamiento por partido**, en GPU y sólo en CPU, para dimensionar lo que necesitaría un club para usarlo. **Análisis de errores.** Los falsos positivos y negativos se clasifican según su causa probable: line-out en el lado lejano de la cancha, oclusión, movimiento de cámara, formación parcialmente fuera de cuadro o falla de la detección."
    },
    {
      "p": "**Registro de experimentos.** Cada entrenamiento registra su configuración, la semilla aleatoria, las métricas y los artefactos con MLflow en modo local (Zaharia et al., 2018), de modo que cualquier resultado del informe pueda rastrearse hasta el experimento que lo generó."
    },
    {
      "h2": "Punto de decisión y riesgos"
    },
    {
      "p": "En la **S16** se verifica el detector sobre validación (**Go/No-Go**); para ese momento la capa semántica ya está en desarrollo. Si el detector no alcanza la meta, se aplican en orden: más cuadros etiquetados de los partidos de reserva, mayor resolución o un modelo más grande, e inferencia por mosaicos, con la reserva de horas del cronograma. Si aun así no la alcanza, se continúa con el mejor detector obtenido y se documenta el desvío y su impacto sobre el objetivo 5: la meta es de desempeño, no una condición para avanzar."
    },
    {
      "table": {
        "widths": [
          3300,
          1700,
          4026
        ],
        "header": [
          "Riesgo",
          "Impacto",
          "Mitigación"
        ],
        "rows": [
          [
            "El detector no alcanza el umbral",
            "Objetivo 4",
            "Punto de decisión de la S16"
          ],
          [
            "El F1 del evento no alcanza el umbral",
            "Objetivo 5",
            "Revisar las características, sumar partidos de la reserva y analizar errores sobre validación"
          ],
          [
            "Grabaciones con encuadre o calidad insuficiente",
            "Objetivos 2, 4 y 5",
            "Criterios de selección de partidos y reserva de partidos sin etiquetar"
          ],
          [
            "Paneo y *zoom* de la cámara",
            "Objetivos 4 y 5",
            "Compensación del movimiento de cámara y características normalizadas"
          ],
          [
            "Incompatibilidades de software y hardware",
            "Objetivos 4 y 5",
            "Verificar y fijar las versiones del entorno antes de entrenar"
          ],
          [
            "Menor disponibilidad horaria del autor",
            "Todos",
            "Reserva de horas y prioridad del núcleo sobre las extensiones"
          ],
          [
            "Pérdida de datos o etiquetas",
            "Objetivo 2",
            "Respaldos periódicos y versionado de las etiquetas"
          ]
        ]
      }
    },
    {
      "h2": "Arquitectura e implementación"
    },
    {
      "table": {
        "widths": [
          1700,
          2600,
          4726
        ],
        "header": [
          "Capa",
          "Entrada",
          "Artefacto de salida"
        ],
        "rows": [
          [
            "Percepción",
            "Video",
            "Detecciones y trayectorias por cuadro (formato tabular tipo MOTChallenge)"
          ],
          [
            "Semántica",
            "Trayectorias",
            "Serie temporal de confianza y lista de eventos (instante, confianza)"
          ],
          [
            "Eventos",
            "Lista de eventos y video",
            "Clips y catálogo indexado"
          ]
        ]
      }
    },
    {
      "p": "Los artefactos permiten volver a ejecutar una etapa sin recalcular las anteriores —por ejemplo, probar otro modelo semántico sobre las mismas trayectorias— y hacen reproducibles los experimentos. Los clips se recortan con FFmpeg **recodificando** el video: la copia directa del flujo sólo corta en cuadros clave y desfasaría la ventana hasta algunos segundos, mientras que con unos 25 clips de 20 s por partido el costo de recodificar es despreciable. El catálogo guarda en SQLite el partido, el instante, la confianza, la ruta del clip y un estado de revisión. El diseño detallado de las capas es el entregable del objetivo 3."
    },
    {
      "h2": "Entorno"
    },
    {
      "p": "Python y PyTorch, Ultralytics (detección y seguimiento), OpenCV y FFmpeg (video), CVAT y una planilla de instantes (etiquetado), MLflow (experimentos), SQLite (catálogo) y Git con GitHub (versionado, *issues* e integración continua). El desarrollo se realiza sobre el equipo del autor, con una GPU de 16 GB de VRAM y 64 GB de RAM, suficiente para ajustar variantes medianas y grandes de YOLO; el entorno se fija con versiones exactas y semillas controladas. Las herramientas son de referencia y pueden reemplazarse por equivalentes sin modificar el método."
    },
    {
      "h1": "Cronograma"
    },
    {
      "p": "El plan se expresa en semanas relativas (S1 = inicio del desarrollo, una vez aprobado el plan) sobre 26 semanas, con una dedicación de referencia de ≈10 horas semanales (≈260 horas). Las actividades suman **222 horas**; las ≈38 restantes (≈15 %) son una **reserva para contingencias** que cubre el plan B del punto de decisión. Cuando las barras se solapan, la actividad comienza con los resultados parciales de su predecesora."
    },
    {
      "table": {
        "widths": [
          700,
          5426,
          1700,
          1200
        ],
        "header": [
          "ID",
          "Actividad",
          "Semanas",
          "Horas"
        ],
        "rows": [
          [
            "A0",
            "Preparación del entorno",
            "S1–S2",
            "6"
          ],
          [
            "A1",
            "Catálogo de eventos",
            "S1–S3",
            "9"
          ],
          [
            "A2",
            "Guía de etiquetado",
            "S2–S3",
            "4"
          ],
          [
            "A3",
            "Diseño de la arquitectura (presentación al Director)",
            "S3–S5",
            "12"
          ],
          [
            "A4",
            "Selección de partidos",
            "S3–S4",
            "4"
          ],
          [
            "A5",
            "Etiquetado de instantes",
            "S4–S8",
            "15"
          ],
          [
            "A6",
            "Etiquetado de cajas",
            "S5–S12",
            "24"
          ],
          [
            "A7",
            "Control de calidad del etiquetado",
            "S9–S12",
            "8"
          ],
          [
            "A8",
            "Partición y ficha del conjunto de datos",
            "S13–S14",
            "6"
          ],
          [
            "A9",
            "Ajuste fino del detector",
            "S8–S15",
            "24"
          ],
          [
            "A10",
            "Integración del seguimiento",
            "S12–S15",
            "8"
          ],
          [
            "A11",
            "Verificación del detector (Go/No-Go)",
            "S16",
            "3"
          ],
          [
            "A12",
            "Características y línea base",
            "S15–S17",
            "12"
          ],
          [
            "A13",
            "Modelo temporal de spotting",
            "S17–S21",
            "25"
          ],
          [
            "A14",
            "Capa de eventos (clips, catálogo, interfaz)",
            "S19–S22",
            "12"
          ],
          [
            "A15",
            "Evaluación final",
            "S22–S24",
            "15"
          ],
          [
            "A16",
            "Redacción incremental del informe",
            "S1–S22",
            "12"
          ],
          [
            "A17",
            "Seguimiento con el Director",
            "S1–S26",
            "5"
          ],
          [
            "A18",
            "Integración y revisión del informe final",
            "S23–S26",
            "18"
          ],
          [
            "",
            "**Total**",
            "",
            "**222**"
          ]
        ]
      }
    },
    {
      "image": "gantt_rgb.png",
      "caption": "Diagrama de Gantt. En rojo, el camino crítico; los rombos marcan los hitos."
    },
    {
      "p": "**Hitos:** catálogo (S3), diseño presentado al Director (S5), conjunto de datos completo (S14), Go/No-Go del detector (S16), line-out integrado (S22) e informe final (S26). El camino crítico pasa por el etiquetado de cajas, el ajuste del detector, el modelo temporal y la evaluación final; para mitigarlo, el detector se empieza a ajustar en la S8 con las cajas ya etiquetadas."
    }
  ],
  "bibliografia": [
    "Aharon, N., Orfaig, R., & Bobrovsky, B.-Z. (2022). *BoT-SORT: Robust associations multi-pedestrian tracking* (arXiv:2206.14651). arXiv. https://doi.org/10.48550/arXiv.2206.14651",
    "Atmosukarto, I., Ghanem, B., Ahuja, S., Muthuswamy, K., & Ahuja, N. (2013). Automatic recognition of offensive team formation in American football plays. En *Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition Workshops*. https://openaccess.thecvf.com/content_cvpr_workshops_2013/W19/html/Atmosukarto_Automatic_Recognition_of_2013_CVPR_paper.html",
    "Bass, L., Clements, P., & Kazman, R. (2021). *Software architecture in practice* (4.ª ed.). Addison-Wesley.",
    "Chambers, R. M., Gabbett, T. J., & Cole, M. H. (2019). Validity of a microsensor-based algorithm for detecting scrum events in rugby union. *International Journal of Sports Physiology and Performance, 14*(2), 176–182. https://doi.org/10.1123/ijspp.2018-0222",
    "Cullen, W. (2026). *A technical and tactical assessment of lineouts in National 2 SE Rugby Union: Can successful lineout performances be predicted?* [Tesis de Master of Research, University of Kent]. https://kar.kent.ac.uk/112954/",
    "Deliège, A., Cioppa, A., Giancola, S., Seikavandi, M. J., Dueholm, J. V., Nasrollahi, K., Ghanem, B., Moeslund, T. B., & Van Droogenbroeck, M. (2021). SoccerNet-v2: A dataset and benchmarks for holistic understanding of broadcast soccer videos. En *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition Workshops* (pp. 4508–4519). https://doi.org/10.1109/CVPRW53098.2021.00508",
    "Everingham, M., Van Gool, L., Williams, C. K. I., Winn, J., & Zisserman, A. (2010). The PASCAL Visual Object Classes (VOC) challenge. *International Journal of Computer Vision, 88*(2), 303–338. https://doi.org/10.1007/s11263-009-0275-4",
    "Forbes Argentina. (2024). *Beelup, la empresa argentina que revoluciona el deporte amateur, se expandió a 17 países y factura US$ 1 millón*. https://www.forbesargentina.com/negocios/beelup-empresa-argentina-revoluciona-deporte-amateur-expandio-17-paises-factura-us-1-millon-n59312",
    "Francois, G., Ippolito, M., & Fuster, M. (2025). Detección de objetos a alta velocidad en videos de tenis. En *54 Jornadas Argentinas de Informática (JAIIO) — Simposio Argentino de Imágenes y Visión (SAIV)*. SADIO. https://revistas.unlp.edu.ar/JAIIO/article/view/19557",
    "Gebru, T., Morgenstern, J., Vecchione, B., Vaughan, J. W., Wallach, H., Daumé III, H., & Crawford, K. (2021). Datasheets for datasets. *Communications of the ACM, 64*(12), 86–92. https://doi.org/10.1145/3458723",
    "Giancola, S., Amine, M., Dghaily, T., & Ghanem, B. (2018). SoccerNet: A scalable dataset for action spotting in soccer videos. En *Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition Workshops* (pp. 1711–1721). https://doi.org/10.1109/CVPRW.2018.00223",
    "Hochreiter, S., & Schmidhuber, J. (1997). Long short-term memory. *Neural Computation, 9*(8), 1735–1780. https://doi.org/10.1162/neco.1997.9.8.1735",
    "Hong, J., Zhang, H., Gharbi, M., Fisher, M., & Fatahalian, K. (2022). Spotting temporally precise, fine-grained events in video. En *Computer Vision – ECCV 2022*. Springer. https://doi.org/10.1007/978-3-031-19833-5_3",
    "Hudl. (s.f.). *Code window* [Manual de Hudl Sportscode]. Recuperado el 15 de octubre de 2026 de https://www.hudl.com/support/manuals/sportscode/code/code-window",
    "Ibrahim, M. S., Muralidharan, S., Deng, Z., Vahdat, A., & Mori, G. (2016). A hierarchical deep temporal model for group activity recognition. En *Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition* (pp. 1971–1980). https://doi.org/10.1109/CVPR.2016.217",
    "Jayasuriya, D. P. (2022). *Rugby event detection in broadcast videos based on visual features using deep learning* [Tesis de maestría, University of Moratuwa]. https://dl.lib.uom.lk/items/71e71f1a-4210-4f16-b389-43b403aa8d72",
    "Jocher, G., Chaurasia, A., & Qiu, J. (2023). *Ultralytics YOLO* (Versión 8.0.0) [Software]. https://github.com/ultralytics/ultralytics",
    "Kalman, R. E. (1960). A new approach to linear filtering and prediction problems. *Journal of Basic Engineering, 82*(1), 35–45. https://doi.org/10.1115/1.3662552",
    "Kodathala, S. V., Pollishetty, P., & Cargill, J. (2026). *Prompt, probe, train, or annotate? Single-camera sports video understanding in amateur settings* (arXiv:2609.28049). arXiv. https://doi.org/10.48550/arXiv.2609.28049",
    "Kuhn, H. W. (1955). The Hungarian method for the assignment problem. *Naval Research Logistics Quarterly, 2*(1–2), 83–97. https://doi.org/10.1002/nav.3800020109",
    "Laboriano Galindo, A. (2024). *Clasificación automática de eventos en videos de fútbol utilizando redes convolucionales profundas* [Tesis de maestría, Pontificia Universidad Católica del Perú]. https://repositorio.pucp.edu.pe/index/handle/123456789/200116",
    "Ley N.º 25.326. (2000). *Protección de los datos personales*. Boletín Oficial de la República Argentina. https://www.argentina.gob.ar/normativa/nacional/64790/texto",
    "Lin, T.-Y., Maire, M., Belongie, S., Hays, J., Perona, P., Ramanan, D., Dollár, P., & Zitnick, C. L. (2014). Microsoft COCO: Common objects in context. En *Computer Vision – ECCV 2014* (pp. 740–755). Springer. https://doi.org/10.1007/978-3-319-10602-1_48",
    "Migdalski, A., & Stone, J. (2019). Investigating lineout performance between the top and bottom four English Premiership rugby union teams in the 2016/17 season. *International Journal of Performance Analysis in Sport, 19*(1), 131–141. https://doi.org/10.1080/24748668.2019.1570459",
    "Nacsport. (s.f.). *Videoanálisis en constante evolución* [Página de inicio]. Recuperado el 4 de noviembre de 2026 de https://www.nacsport.com/index.php?lc=es-es",
    "Nonaka, N., Fujihira, R., Koshiba, T., Maeda, A., & Seita, J. (2024). Rugby scene classification enhanced by vision language model. En *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition Workshops* (pp. 3256–3266). https://doi.org/10.1109/CVPRW63382.2024.00331",
    "Pan, S. J., & Yang, Q. (2010). A survey on transfer learning. *IEEE Transactions on Knowledge and Data Engineering, 22*(10), 1345–1359. https://doi.org/10.1109/TKDE.2009.191",
    "Project Management Institute. (2021). *The standard for project management and a guide to the project management body of knowledge (PMBOK guide)* (7.ª ed.). Project Management Institute.",
    "Redmon, J., Divvala, S., Girshick, R., & Farhadi, A. (2016). You only look once: Unified, real-time object detection. En *Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition* (pp. 779–788). https://doi.org/10.1109/CVPR.2016.91",
    "Santana Domínguez, C. B. A. (2024). *Monitoreo de rugbistas mediante visión por computador para identificación de choques* [Memoria de título de Ingeniero Civil Telemático, Universidad Técnica Federico Santa María]. https://repositorio.usm.cl/handle/123456789/75202",
    "Sokolova, M., & Lapalme, G. (2009). A systematic analysis of performance measures for classification tasks. *Information Processing & Management, 45*(4), 427–437. https://doi.org/10.1016/j.ipm.2009.03.002",
    "Studer, S., Bui, T. B., Drescher, C., Hanuschkin, A., Winkler, L., Peters, S., & Müller, K.-R. (2021). Towards CRISP-ML(Q): A machine learning process model with quality assurance methodology. *Machine Learning and Knowledge Extraction, 3*(2), 392–413. https://doi.org/10.3390/make3020020",
    "Unión de Rugby de Buenos Aires. (s.f.). *Nueva plataforma de análisis de video y estadísticas de la URBA*. Recuperado el 15 de octubre de 2026 de https://urba.org.ar/noticias/nueva-plataforma-de-analisis-de-video-y-estadisticas-de-la-urba",
    "Veo. (s.f.). *Veo capabilities by sport: Features and differences explained*. Recuperado el 15 de octubre de 2026 de https://support.veo.com/hc/en-us/articles/30159089390865-Veo-capabilities-by-sport-features-and-differences-explained",
    "Wojke, N., Bewley, A., & Paulus, D. (2017). Simple online and realtime tracking with a deep association metric. En *2017 IEEE International Conference on Image Processing (ICIP)* (pp. 3645–3649). https://doi.org/10.1109/ICIP.2017.8296962",
    "World Rugby. (s.f.). *Laws of the game: Law 18 – Touch, quick throw and lineout*. Recuperado el 4 de noviembre de 2026 de https://passport.world.rugby/laws-of-the-game/laws-by-number/18-touch-quick-throw-and-lineout/",
    "Xu, H., Agrahari Baniya, A., Wells, S., Bouadjenek, M. R., Dazeley, R., & Aryal, S. (2025). *Deep learning for sports video event detection: Tasks, datasets, methods, and challenges* (arXiv:2505.03991). arXiv. https://doi.org/10.48550/arXiv.2505.03991",
    "Zaharia, M., Chen, A., Davidson, A., Ghodsi, A., Hong, S. A., Konwinski, A., Murching, S., Nykodym, T., Ogilvie, P., Parkhe, M., Xie, F., & Zumar, C. (2018). Accelerating the machine learning lifecycle with MLflow. *IEEE Data Engineering Bulletin, 41*(4), 39–45.",
    "Zhang, Y., Sun, P., Jiang, Y., Yu, D., Weng, F., Yuan, Z., Luo, P., Liu, W., & Wang, X. (2022). ByteTrack: Multi-object tracking by associating every detection box. En *Computer Vision – ECCV 2022* (pp. 1–21). Springer. https://doi.org/10.1007/978-3-031-20047-2_1"
  ]
};

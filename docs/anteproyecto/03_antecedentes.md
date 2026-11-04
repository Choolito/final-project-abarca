# 03 — Antecedentes

> **Reglamento de TF — UCSE DAR, Art. 6b, inciso 3.**
> Trabajo Final de Carrera — Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

---

## 1. Antecedentes

Este apartado describe el estado actual del conocimiento y de la práctica en el reconocimiento automático de eventos en video deportivo, con el fin de delimitar con claridad la contribución del presente Trabajo Final.

El relevamiento se ordena **por proximidad al caso de estudio**, de lo más cercano a lo más lejano: ámbito **local** (Rafaela), **regional** (provincia de Santa Fe y Litoral), **nacional**, **latinoamericano** e **internacional**. En cada nivel se consideraron tres tipos de antecedentes: producción académica, soluciones comerciales o institucionales y prácticas de los clubes. Sólo se incluyen los trabajos afines a alguno de los rasgos que definen la propuesta; cuando un nivel no presenta antecedentes pertinentes, se deja constancia y se pasa al siguiente. Los rasgos considerados son:

- el **rugby** como dominio;
- el reconocimiento de **eventos o formaciones colectivas** en video;
- la operación sobre **video amateur o de bajo costo**, idealmente de una sola cámara;
- la **ausencia de instrumentación física**.

> Las referencias completas, en orden alfabético y según APA 7.ª ed., se encuentran en [`09_bibliografia.md`](09_bibliografia.md). Las afirmaciones sobre productos comerciales se basan en la documentación pública de cada fabricante o en prensa especializada y describen capacidades declaradas, no evaluadas de forma independiente.

### 1.1. Ámbitos local y regional

En Rafaela (UCSE DAR, UTN Facultad Regional Rafaela, Universidad Nacional de Rafaela) y en la región de Santa Fe y el Litoral (UNL, UNR, UTN, Unión Santafesina de Rugby) no se identificaron, en las fuentes públicas consultadas, antecedentes de análisis automático de video deportivo, por lo que el relevamiento continúa en el ámbito nacional.

> **Pendiente de relevamiento (issue #19).** La práctica actual del club caso testigo, el Círculo Rafaelino de Rugby (CRAR), constituye el antecedente local directo del problema. Se completará con datos primarios: dispositivo de grabación, herramienta de análisis utilizada, horas-analista por partido y volumen de archivo histórico disponible. El dato de horas por partido permitirá cuantificar el costo del proceso manual descrito en el *Problema*.

### 1.2. Ámbito nacional — Argentina

**Instituciones del rugby.** La Unión de Rugby de Buenos Aires (URBA) puso en marcha una plataforma de análisis de video y estadísticas para sus clubes, con un **protocolo único de codificación** de los partidos de sus divisiones superiores (URBA, s.f.). La iniciativa confirma el valor que la principal unión del país asigna al análisis de video. También confirma que su producción descansa en la **codificación manual** de cada encuentro.

**Industria.** **Beelup** instala kits de cámaras fijas conectadas en canchas de fútbol amateur y otros deportes. Bajo un modelo de abono mensual, utiliza inteligencia artificial para identificar automáticamente las jugadas destacadas y generar los clips. Se informaron 5.000 cámaras en 2.500 canchas de 17 países (Forbes Argentina, 2024; InfoNegocios, s.f.). Es la **validación nacional más clara del modelo "cámara fija + IA + clips automáticos" en el deporte amateur**. Su objetivo, no obstante, es el *highlight* recreativo, no la catalogación táctica, y no abarca el rugby.

**Producción académica.** En lo académico, el trabajo nacional más afín es el trabajo de Francois, Ippolito y Fuster (2025), del Instituto Tecnológico de Buenos Aires, presentado en el Simposio Argentino de Imágenes y Visión de las 54 JAIIO. Forma parte de una solución para obtener métricas de partidos de tenis —detección de jugadores, pelota y límites de la cancha— **con equipamiento accesible**, y aporta un método de detección de objetos a alta velocidad de menor costo computacional.

Comparte con este trabajo la motivación de democratizar el análisis con hardware no especializado, pero se orienta a un deporte individual y a la percepción de objetos, no al reconocimiento de eventos colectivos.

Una búsqueda exploratoria en repositorios universitarios argentinos (SEDICI-UNLP, Biblioteca Digital FCEN-UBA, repositorios institucionales) no identificó trabajos sobre reconocimiento automático de eventos de rugby. Queda pendiente una consulta sistemática en el Sistema Nacional de Repositorios Digitales (SNRD).

### 1.3. Ámbito latinoamericano

- **Chile.** Santana Domínguez (2024), en una memoria de título de la Universidad Técnica Federico Santa María, desarrolló un sistema que detecta y clasifica choques entre rugbistas (caídas, tackles, colisiones) a partir de video. Es el **antecedente regional más cercano en dominio**. Su motivación refuerza el planteo de este trabajo: la cámara Veo que utilizaba el club no identificaba los eventos que el cuerpo técnico necesitaba. El trabajo se orienta, no obstante, a la seguridad del jugador y no a las formaciones fijas.
- **Perú.** Laboriano Galindo (2024), en una tesis de maestría de la Pontificia Universidad Católica del Perú, clasificó cinco tipos de eventos de fútbol (saques de arco, córners, faltas, tiros libres indirectos y remates al arco) sobre 1.959 clips derivados de SoccerNet, con una exactitud del 91 % usando EfficientNet-B0. Ilustra el enfoque de clasificación de clips recortados, aunque sobre video profesional.

En Brasil y Uruguay se encontraron trabajos de detección de eventos en fútbol, pero ninguno sobre rugby ni sobre video amateur.

### 1.4. Ámbito internacional

#### 1.4.1. Soluciones comerciales

El mercado internacional ofrece tres familias de soluciones, que se distinguen por el **insumo** del que parten y por el **grado de automatización** del reconocimiento de eventos.

**a) Software de etiquetado manual sobre video.** Es la práctica dominante en el análisis táctico: el analista recorre la grabación y marca cada evento mediante una botonera configurable, y el software indexa las marcas, genera los clips y produce estadísticas.

- **Hudl Sportscode** es la herramienta de referencia en el alto rendimiento. Se basa en *code windows*, matrices de botones que el analista define y asocia a los eventos de cada deporte (Hudl, s.f.-a). Hudl ofrece además **Hudl Assist**, un servicio de etiquetado tercerizado en el que analistas humanos, asistidos por IA en algunos deportes, codifican el partido enviado por el equipo (Hudl, s.f.-b).
- **Nacsport**, de origen español, sigue el mismo paradigma con licencias escalonadas que habilitan más botones de codificación, enlaces automáticos entre etiquetas y captura multicámara (Nacsport, s.f.).
- **LongoMatch** nació en 2008 como proyecto de fin de máster y se distribuyó como software libre (GPL); luego incorporó ediciones comerciales (LongoMatch, s.f.).
- **Framesports** (Londres, 2024), específico de rugby, recibe el video desde Veo, Hudl u otras plataformas. Declara expresamente que **no** usa IA para etiquetar: los eventos —incluidos line-outs y scrums— los codifican analistas humanos, y la IA se aplica después, sobre esos datos, para generar informes y resúmenes (Framesports, s.f.).

En todas estas herramientas la **detección del evento es manual**. El software acelera el marcado y la edición, pero no identifica por sí mismo que ocurrió un line-out, y el costo en horas-analista persiste.

**b) Soluciones basadas en sensores o en captura instrumentada.**

- **Catapult** comercializa dispositivos vestibles con GPS y sensores inerciales. Su *Rugby Suite* detecta automáticamente scrums, patadas y contactos (Catapult, s.f.). Los algoritmos fueron validados académicamente:
  - un clasificador *random forest* sobre datos de microsensores alcanzó ≈91 % de sensibilidad y de especificidad en la detección de scrums (Chambers, Gabbett y Cole, 2019);
  - un enfoque análogo detectó tackles y rucks, contrastados contra el etiquetado en video (Chambers, Gabbett, Gupta et al., 2019).
- **Stats Perform (Opta)** provee datos de eventos de rugby a federaciones, equipos profesionales y medios. Combina analistas humanos, *tracking* óptico y modelos de IA (Stats Perform, s.f.).

Estas soluciones exigen **equipar a cada jugador** o contratar un servicio profesional de datos. Solo producen información de los partidos instrumentados desde su adopción, por lo que **no son aplicables al archivo histórico**.

**c) Cámaras autónomas con inteligencia artificial.** Es la categoría más cercana a la propuesta.

- **Veo** comercializa una cámara panorámica autónoma que graba el partido sin camarógrafo. Su plataforma **detecta automáticamente eventos de rugby** —inicio y fin de período, *try*, conversión, **scrum y line-out**— y genera los clips (Veo, s.f.-a, s.f.-c). La generación de clips por IA no está disponible en el plan de entrada (*Starter*), sino en los planes superiores de suscripción (Veo, s.f.-b).
- **Hudl Focus** y **Pixellot** ofrecen cámaras que siguen la acción y suben la grabación de forma automática; el etiquetado se resuelve en sus plataformas o mediante servicios (Hudl, s.f.-c; Pixellot, s.f.). En la documentación consultada de Pixellot, el rugby no figura entre los deportes soportados.

Veo demuestra que la detección automática del line-out es **técnicamente factible y comercialmente valorada**. Su modelo presenta, sin embargo, tres restricciones relevantes para el ámbito amateur regional:

1. exige la **compra de hardware propietario** y una **suscripción recurrente** en moneda extranjera;
2. el reconocimiento opera sobre el video capturado **por su propia cámara**, por lo que no se aplica a grabaciones previas ni a material registrado con otros dispositivos;
3. es un sistema cerrado: su método, sus datos de entrenamiento y su desempeño no están documentados públicamente, lo que impide auditarlo o adaptarlo.

#### 1.4.2. Investigación en deportes en general

La comunidad de visión por computadora consolidó el análisis de video deportivo como un área propia, con el *workshop* **CVsports** del CVPR como foro de referencia. Los trabajos relevantes se agrupan en cuatro líneas.

**a) Definición de la tarea: *action spotting*.**

- *SoccerNet* (Giancola et al., 2018) formalizó el *action spotting*: localizar, dentro de videos largos sin recortar, el instante en que ocurren eventos **dispersos**. El dataset reúne 500 partidos de fútbol (764 h) con 6.637 anotaciones —un evento cada 6,9 minutos en promedio— y evalúa con *Average-mAP* sobre tolerancias temporales de 5 a 60 s.
- *SoccerNet-v2* (Deliège et al., 2021) extendió el problema a 17 clases y ≈300.000 anotaciones.
- *E2E-Spot* (Hong et al., 2022) abordó la localización a nivel de fotograma con un modelo compacto, entrenable en una única GPU.
- *OSL-ActionSpotting* (Benzakour et al., 2024) unificó estos métodos en una biblioteca abierta.

Esta formulación es la más próxima al problema del presente trabajo: el line-out es un evento disperso dentro de un partido de 80 minutos.

**b) Reconocimiento de formaciones y actividades grupales.** El line-out no es una acción individual, sino una **formación colectiva** con una disposición espacial característica. Dos antecedentes son directamente análogos:

- Atmosukarto et al. (2013) reconocieron automáticamente la **formación ofensiva** en jugadas de fútbol americano, una tarea que los entrenadores realizaban manualmente con alto costo en horas. Su sistema detecta el fotograma de formación, la línea de *scrimmage* y el tipo de formación a partir de la disposición de los jugadores, sobre más de 800 jugadas, con 95 % de exactitud en la detección del fotograma de formación y hasta 67 % en la clasificación de la formación.
- Ibrahim et al. (2016) propusieron un modelo jerárquico que combina la dinámica de cada jugador con la de todo el grupo para reconocer **actividades grupales**, y publicaron el *Volleyball Dataset*.

Ambos respaldan la hipótesis de diseño de este trabajo: reconocer el evento a partir de la **disposición espacial de los jugadores detectados y seguidos**.

**c) Seguimiento de jugadores.** *SportsMOT* (Cui et al., 2023) estableció un *benchmark* de seguimiento multi-objeto en básquet, vóley y fútbol. Identificó como principal dificultad la asociación entre jugadores de apariencia similar que se mueven rápido, una condición agravada en las formaciones compactas del rugby.

**d) Video amateur de una sola cámara.** Kodathala et al. (2026) estudiaron la comprensión de video deportivo en **condiciones amateur con una sola cámara fija**, sobre 66 partidos de vóley con 46.648 contactos anotados. Reportan dos hallazgos:

- un modelo entrenado de apenas dos millones de parámetros supera a los modelos de visión-lenguaje basados en *prompts* en la localización de eventos, con una fracción del costo;
- los *benchmarks* construidos sobre video profesional pueden **sobrestimar** el desempeño esperable en video amateur.

Es el antecedente más próximo en **condiciones de captura**, y su conclusión justifica construir y evaluar sobre un dataset propio de video amateur.

**Relevamientos.** Dos *surveys* recientes sistematizan el campo:

- Wu et al. (2022) cubren el reconocimiento de acciones en más de diez deportes y señalan que la anotación fina exige conocimiento experto del dominio.
- Xu et al. (2025) ordenan la detección de eventos en video deportivo en tres tareas: clasificación, localización temporal y *action spotting*.

#### 1.4.3. Investigación específica sobre rugby

La producción académica sobre rugby es **comparativamente escasa** y se orienta mayormente a problemas distintos del reconocimiento de formaciones fijas sobre video amateur.

| Trabajo | Problema abordado | Insumo | Relación con este TF |
|---|---|---|---|
| Nonaka et al. (2024) | Clasificación de escenas de contacto (scrum, maul, ruck, tackle, line-out) sobre ≈18.000 imágenes, mejorada con un modelo visión-lenguaje | Fotogramas de transmisión TV | Reconoce el line-out a nivel de imagen, sin localización temporal ni clips |
| Jayasuriya (2022) | Detección y localización temporal de eventos; publica el *Rugby Events Dataset* | Video de transmisión TV | Antecedente más próximo en la tarea; distinto insumo |
| Maglo et al. (2022) | Seguimiento de jugadores con pocas anotaciones; dataset de rugby 7s | Video de transmisión (World Rugby) | Técnica de percepción reutilizable |
| Nonaka et al. (2022) | Detección de tackles de alto riesgo (ResNet (2+1)D, RetinaNet, CenterTrack); 50 % detectados sin intervención humana | Video de transmisión TV | Seguridad del jugador, no catalogación táctica |
| Martin et al. (2021) | Riesgo de lesión en tackles (YOLO + Kalman + OpenPose); 62,5 % de exactitud | Video | Seguridad del jugador |
| Fernando (2020) | Seguimiento de jugadores por *tracking-by-detection* (YOLO + *embeddings* + Kalman) | Video | Valida el stack de percepción en rugby |
| Santana Domínguez (2024) | Detección y clasificación de choques | Video de cámara Veo (amateur) | Único antecedente con video amateur de rugby; no aborda formaciones |
| Chambers, Gabbett y Cole (2019); Chambers, Gabbett, Gupta et al. (2019) | Detección de scrums, tackles y rucks | Sensores inerciales | Contraste: mismo objetivo con instrumentación física |

Se observan tres regularidades:

1. Los trabajos que detectan eventos tácticos —incluido el line-out— (Jayasuriya, 2022; Nonaka et al., 2024) operan sobre **transmisiones televisivas profesionales**, con encuadres de calidad, repeticiones y gráficos. Ninguno se valida sobre **grabaciones amateur de una sola cámara**.
2. Ningún trabajo relevado combina la **localización temporal del line-out** con la **generación automática de clips** para el cuerpo técnico.
3. Una parte significativa de la investigación sobre rugby se orienta a la **seguridad del jugador** (tackles de riesgo, colisiones), no a la preparación táctica.

#### 1.4.4. El line-out como objeto de análisis

Las ciencias del deporte confirman la **relevancia táctica** del line-out y, de paso, dimensionan el problema:

- Migdalski y Stone (2019) analizaron una temporada completa de la Premiership inglesa (más de 2.200 line-outs). Hallaron que los mejores equipos no se distinguen por ganar más sus propios line-outs (87 % frente a 85 %), sino por **robar** más los del rival (17 % frente a 9 %) y por convertir más *tries* a partir de esta formación.
- Cullen (2026) estudió el line-out en **rugby de nivel no profesional** (National 2 South East, Inglaterra). Codificó **manualmente**, con Dartfish, 660 line-outs de 26 partidos de un mismo equipo, con un panel de etiquetado definido junto a cinco entrenadores.

Este último trabajo aporta dos datos útiles para la planificación:

- en el nivel amateur se registran **≈25 line-outs por partido**, lo que permite estimar que la meta de ≥200 clips del objetivo específico 2 requiere del orden de **8 a 10 partidos** completos;
- aun en un estudio académico, la obtención de los datos depende del **etiquetado manual**, que es precisamente el costo que este trabajo busca reducir.

### 1.5. Síntesis comparativa

| Solución / trabajo | Ámbito | Insumo | Costo / acceso | Eventos que cubre | ¿Aplica al archivo histórico? |
|---|---|---|---|---|---|
| Hudl Sportscode / Nacsport / LongoMatch | Internacional | Video de cualquier fuente | Licencia (LongoMatch: libre) | Cualquiera, **marcado manual** | Sí, con el mismo costo manual |
| Hudl Assist / Framesports | Internacional | Video subido a la plataforma | Servicio pago | Según deporte, **etiquetado por analistas** | Limitado |
| Plataforma URBA | Nacional | Video de los partidos de la unión | Institucional | Protocolo común, **codificación manual** | Sí, con el mismo costo manual |
| Catapult | Internacional | Sensores GPS/IMU por jugador | Hardware por jugador + licencia | Scrum, contactos, patadas (automático) | **No** |
| Stats Perform / Opta | Internacional | Captura profesional + analistas | Contrato de datos | Catálogo estandarizado | Solo competencias cubiertas |
| Veo | Internacional | Video de **su propia cámara** | Hardware propietario + suscripción | Try, conversión, scrum, **line-out** (automático) | **No** |
| Beelup | Nacional | Video de **sus cámaras fijas** | Kit + abono mensual | *Highlights* recreativos (fútbol) | **No** |
| Investigación académica en rugby | Internacional / Latinoamérica | Transmisión TV, sensores o video amateur | Prototipos de investigación | Tackles, choques, escenas de contacto, eventos generales | No validado para line-out sobre video amateur |
| **Este Trabajo Final** | **Local / regional** | Video **estándar de una cámara** | Software, sin hardware adicional | **Line-out** (automático) + clips | **Sí** |

---

## 2. Brecha identificada y contribución

El relevamiento muestra que el reconocimiento automático de eventos en video deportivo está **resuelto en lo metodológico**: el *action spotting*, la detección y el seguimiento de jugadores y el reconocimiento de formaciones son técnicas maduras. Su aplicación al rugby amateur, en cambio, presenta una brecha concreta en cada nivel de proximidad:

1. **En lo local y regional** no se identificaron antecedentes de análisis automático de video deportivo.
2. **En lo nacional**, la principal unión de rugby impulsa el análisis de video, pero sobre **codificación manual**. Las soluciones locales con IA (Beelup) generan *highlights* recreativos de fútbol con hardware propio, no catalogación táctica de rugby.
3. **En Latinoamérica**, el único antecedente de rugby sobre video amateur (Santana Domínguez, 2024) aborda la seguridad del jugador y confirma que las cámaras comerciales no cubren todas las necesidades de los cuerpos técnicos.
4. **En lo internacional**:
   - las herramientas accesibles no automatizan la detección;
   - las que la automatizan (Catapult, Veo) requieren instrumentación o hardware propietario y no son retroactivas;
   - la investigación que reconoce el line-out opera sobre transmisiones televisivas y no genera clips;
   - la evidencia reciente indica que los resultados sobre video profesional no se trasladan directamente al video amateur.

En consecuencia, la **contribución** del presente Trabajo Final consiste en:

- Un **sistema de software documentado** que reconoce y localiza temporalmente el **line-out** sobre **grabaciones amateur de una sola cámara**, **sin sensores ni hardware propietario**, y genera automáticamente los clips correspondientes.
- Su **aplicabilidad al archivo histórico** de video que los clubes ya poseen, con independencia del dispositivo de grabación.
- Un **dataset anotado y un protocolo de etiquetado reproducible** de line-outs en video amateur —inexistentes en la literatura relevada—, construidos y validados con un club del **contexto regional argentino**.
- Una **evaluación cuantitativa** (mAP, precisión, exhaustividad y F1) en condiciones reales de captura amateur, que la literatura de rugby, basada en transmisiones profesionales, no reporta.

---

*Los apartados subsiguientes del anteproyecto se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

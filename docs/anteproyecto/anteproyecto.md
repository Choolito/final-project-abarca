# Anteproyecto — Trabajo Final de Carrera

> **Universidad Católica de Santiago del Estero — Departamento Académico Rafaela.**
> Carrera de Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

Este documento desarrolla los diez puntos requeridos por la consigna de Trabajo Final de la UCSE DAR. Cada punto resume el apartado correspondiente y enlaza a su desarrollo completo.

---

## 1. Título del Proyecto

**Sistema de Reconocimiento Automático de Eventos Deportivos en Video mediante Visión por Computadora — Caso de Estudio: Análisis de Partidos de Rugby.**

*Subtítulo técnico:* Detección automática de line-outs y generación de clips en video amateur mediante visión por computadora.

> El desarrollo completo de este apartado se encuentra en [`01_titulo_y_problema.md`](01_titulo_y_problema.md).

---

## 2. Descripción del Problema

El análisis de video se ha consolidado como una pieza central de la preparación táctica en el deporte contemporáneo. La grabación de un partido es, en sí misma, una fuente densa de información sobre el comportamiento individual y colectivo de los jugadores. Sin embargo, la conversión de esa grabación en bruto en información accionable para el cuerpo técnico continúa dependiendo, en buena parte del ecosistema deportivo, de un procedimiento esencialmente manual: un analista recorre la totalidad del video, identifica visualmente los eventos de interés, los marca temporalmente y los recorta en clips para su estudio posterior. Esta tarea consume un volumen de horas desproporcionado respecto de la duración efectiva del encuentro, depende fuertemente de la pericia del recurso humano disponible y desplaza el tiempo del analista desde el análisis interpretativo —que es la actividad que efectivamente aporta valor— hacia tareas mecánicas de localización y segmentación.

Las soluciones que automatizan parcialmente esta tarea dependen de hardware: en el alto rendimiento, de la instrumentación del entorno de juego (dispositivos GPS e inerciales en los jugadores, sistemas de cámaras para el seguimiento óptico); en el ámbito amateur, de cámaras autónomas con inteligencia artificial que sólo procesan el video que ellas mismas graban. Su costo, en general en moneda extranjera, y la logística que exigen las vuelven difíciles de sostener para el deporte amateur. A esa barrera se añade una restricción de fondo: al estar atadas a un dispositivo y a un método cerrado, no pueden aplicarse sobre el archivo histórico de video de los clubes, que constituye precisamente el activo de mayor valor analítico de las instituciones con trayectoria deportiva.

El resultado es una brecha de acceso entre quienes pueden adquirir hardware y servicios propietarios y el resto del ecosistema deportivo, que dispone del video pero carece de herramientas de software accesibles para explotarlo. Esta asimetría se manifiesta de forma particularmente nítida en disciplinas de alta complejidad táctica como el rugby —caso testigo del presente trabajo—, donde la densidad de formaciones colectivas y transiciones rápidas vuelve al análisis de eventos en video un insumo crítico de la preparación del encuentro, y donde el ámbito amateur regional carece hoy de una herramienta de adopción masiva que opere exclusivamente sobre grabaciones de video estándar.

---

## 3. Objetivos Generales y Específicos

### Objetivo General

Desarrollar y validar un sistema de software para el reconocimiento automático de eventos deportivos en video de partidos de rugby, que opere exclusivamente sobre grabaciones en formato estándar —sin requerir instrumentación física del entorno de juego— y produzca una catalogación estructurada de los eventos tácticos relevantes del encuentro, junto con los clips segmentados correspondientes, a fin de asistir al cuerpo técnico de instituciones del ámbito amateur regional en la preparación táctica de los partidos. El rugby constituye el objeto concreto sobre el cual el sistema se diseña, implementa y valida; la organización modular del sistema se asume como una orientación de diseño y no como un objetivo a validar en el presente Trabajo Final.

### Objetivos Específicos

Formulados bajo criterio **SMART** y de forma incremental, tomando el **line-out** como evento inicial (scrum y ruck como extensión; detalle en *Alcance*). Los umbrales se fijan como metas definitivas en *Metodología* y se miden una única vez sobre el conjunto de prueba (objetivo 6); los plazos se expresan en **semanas** sobre una duración total de **6 meses (≈26 semanas)**; el etiquetado del dataset es la actividad de mayor extensión:

1. Delimitar y documentar el catálogo de eventos —line-out como evento inicial y scrum/ruck especificados como extensión— con sus criterios observables, hacia la semana 3, validado con el cuerpo técnico del club.
2. Construir un dataset de ≥200 line-outs etiquetados temporalmente sobre partidos completos, en distintas condiciones de captura, particionados 70/15/15, con protocolo reproducible (semanas 3–14, la tarea más larga).
3. Diseñar y presentar al Director el documento de arquitectura modular en tres capas (percepción, semántica y eventos) con interfaces definidas, hacia la semana 5.
4. Implementar el módulo de percepción (detección y seguimiento de jugadores y balón), verificado sobre validación hacia la semana 16; meta: AP@0.5 ≥ 0,70 para la clase jugador.
5. Implementar el módulo de reconocimiento y catalogación del line-out (localización temporal + clips automáticos), verificado sobre validación hacia la semana 22; meta: F1-score ≥ 0,70 con δ = 3 s.
6. Evaluar el sistema completo una única vez sobre el conjunto de prueba —AP@0.5, precisión, exhaustividad y F1-score del line-out, comparación con la línea base y tiempo de procesamiento por partido—, documentando un informe, hacia la semana 26.

> El desarrollo completo de este apartado se encuentra en [`02_objetivos_generales_y_especificos.md`](02_objetivos_generales_y_especificos.md).

---

## 4. Antecedentes

El relevamiento se ordena de lo más cercano a lo más lejano: local, regional, nacional, latinoamericano e internacional. Muestra que el reconocimiento automático de eventos en video deportivo está maduro en lo metodológico, pero que su aplicación al rugby amateur presenta una brecha concreta.

- **Local y regional.** No se identificaron antecedentes de análisis automático de video deportivo. En el club caso testigo (CRAR), el análisis es manual: insume entre 2 y 3 horas por partido.
- **Nacional.** La URBA impulsa una plataforma de análisis de video basada en **codificación manual** (Unión de Rugby de Buenos Aires [URBA], s.f.). En la industria, Beelup valida el modelo "cámara fija + IA + clips" en el deporte amateur, pero orientado a *highlights* recreativos de fútbol y con hardware propio (Forbes Argentina, 2024). En lo académico, el antecedente más próximo detecta objetos en tenis con equipamiento accesible (Francois et al., 2025).
- **Latinoamérica.** El único antecedente de rugby sobre video amateur detecta choques entre jugadores. Su motivación fue que la cámara comercial del club no identificaba esos eventos (Santana Domínguez, 2024).
- **Internacional.** Las herramientas accesibles (Hudl Sportscode, Nacsport, LongoMatch, Framesports) sólo asisten el **etiquetado manual**. Las que automatizan dependen de **sensores** (Catapult) o de **hardware propietario con suscripción** (Veo, que detecta line-outs, pero sólo sobre video de su propia cámara). La investigación formalizó el *action spotting* (Giancola et al., 2018) y el reconocimiento de formaciones colectivas (Atmosukarto et al., 2013). Los trabajos de rugby que reconocen el line-out operan, en cambio, sobre **transmisiones televisivas**, no sobre video amateur (Jayasuriya, 2022; Nonaka et al., 2024). La evidencia reciente advierte que los resultados sobre video profesional no se trasladan directamente al video amateur de una sola cámara (Kodathala et al., 2026).

**Contribución.** El trabajo propone un sistema de software que reconoce y localiza temporalmente el **line-out** sobre **video amateur de una sola cámara**, **sin sensores ni hardware propietario**, y genera los clips correspondientes. Está diseñado para aplicarse al archivo histórico de los clubes. Se acompaña de un protocolo de etiquetado reproducible y de una evaluación cuantitativa construidos en el **contexto regional argentino**. Según estudios de nivel amateur, se registran ≈25 line-outs por partido (Cullen, 2026), por lo que la meta de ≥200 line-outs equivale a unos 8–10 partidos.

> El desarrollo completo de este apartado, con la tabla comparativa de soluciones, se encuentra en [`03_antecedentes.md`](03_antecedentes.md).

---

## 5. Justificación

El Trabajo Final se justifica por la convergencia de una necesidad concreta y desatendida, una oportunidad tecnológica madura y una pertinencia académica directa con las competencias de la carrera.

- **Relevancia práctica.** El análisis de video es un insumo central de la preparación táctica, pero en el ámbito amateur depende de un proceso manual costoso en horas. Automatizar la detección y segmentación de eventos a partir de grabaciones estándar libera ese tiempo y lo redirige hacia el análisis interpretativo, que es donde se aporta valor. La solución es exclusivamente de software, operable sobre el video que los clubes ya producen.
- **Relevancia social.** Las herramientas que automatizan el análisis dependen de hardware propietario —instrumentación del entorno en el alto rendimiento o cámaras con suscripción en el ámbito amateur— y no alcanzan al video que los clubes ya registran. Al operar sobre grabaciones estándar —incluido el archivo histórico— y con un método abierto, el sistema busca democratizar el acceso al análisis táctico, con el rugby amateur regional como caso testigo.
- **Relevancia académica y tecnológica.** Integra ingeniería de software, sistemas inteligentes y procesamiento de señales sobre un problema real, recorriendo el ciclo completo de formulación, diseño, implementación y validación, y dejando una base reutilizable.
- **Viabilidad.** Se apoya en tecnologías de visión por computadora maduras, no requiere infraestructura física especial y acota su validación a un evento inicial (el *line-out*), manteniendo el alcance controlado. La disponibilidad de un entorno real de prueba refuerza la factibilidad.

> El desarrollo completo de este apartado se encuentra en [`04_justificacion.md`](04_justificacion.md).

---

## 6. Marco Teórico

El marco desarrolla sólo los conceptos que nombran los *Objetivos* y el *Alcance*, organizados según las tres capas del sistema.

- **Dominio.** El line-out (Ley 18 de World Rugby) es una configuración colectiva muy característica: dos filas paralelas junto a la banda, un lanzador y saltadores elevados. Tiene un instante canónico —el lanzamiento— que se adopta como referencia para anotar y evaluar.
- **Percepción.** Detección con **YOLO** preentrenado en COCO y ajustado por transferencia, evaluada con el **AP@0.5** de la clase *jugador* (objetivo 4). Seguimiento por *tracking-by-detection* con **BoT-SORT** sin reidentificación: recupera jugadores parcialmente ocluidos y compensa el movimiento de una cámara que se orienta y acerca para seguir el juego.
- **Semántica.** La tarea se formula como ***action spotting***: un instante por evento, del cual se deriva el clip de ±10 s. El núcleo usa características geométricas de la formación, normalizadas en el espacio de la imagen, con un modelo temporal liviano, contrastado con una línea base heurística. Un modelo de extremo a extremo (E2E-Spot), la estimación de pose y un servicio web quedan como extensiones opcionales.
- **Evaluación del evento.** Una predicción es acierto si cae a **δ = 3 s** o menos del lanzamiento de un line-out real, con asignación uno a uno. Sobre esa base se calculan precisión, exhaustividad y **F1** (objetivo 5).
- **Ingeniería.** Pipeline *offline* en capas, con artefactos intermedios que materializan las interfaces, recorte de clips con FFmpeg y catálogo en SQLite.

> El desarrollo completo de este apartado, con la síntesis del stack tecnológico, se encuentra en [`05_marco_teorico.md`](05_marco_teorico.md).

---

## 7. Metodología

- **Proceso.** Gestión según el PMBOK (7.ª ed.), ciclo de ML según **CRISP-ML(Q)** y desarrollo de software iterativo e incremental, en iteraciones cortas. Seguimiento con el Director (Ing. Mariano Ferrero) en reuniones periódicas.
- **Qué se entrena.** Sólo dos componentes: el detector YOLO, por ajuste fino desde COCO, y el modelo temporal que reconoce el lanzamiento, desde cero. El seguimiento, las características geométricas y la línea base heurística no se entrenan.
- **Dataset.** Se anotan partidos del plantel superior del CRAR, de local y de visitante, de un total de más de 60, hasta reunir **≈300 line-outs** (unos 12 partidos). Se marcan los instantes de lanzamiento y se anotan cajas en 300–500 cuadros con CVAT. La calidad se mide con acuerdo intra e inter-anotador. La partición asigna cada partido completo a un solo conjunto, para evitar fugas de datos, y busca el 70/15/15 sobre el **total de line-outs**. Validación y prueba incluyen partidos de local y de visitante.
- **Evaluación.** Metas definitivas: **AP@0.5 ≥ 0,70** para *jugador* y **F1 ≥ 0,70 con δ = 3 s** para el line-out, medidas una sola vez sobre el conjunto de prueba, con intervalos de confianza por *bootstrap*. Los modelos se eligen sobre validación. Se mide además el tiempo de procesamiento por partido en GPU y en CPU.
- **Riesgos.** Punto de decisión **Go/No-Go** en la semana 16 sobre el detector, con una secuencia de medidas si no alcanza el umbral y una salida definida si aun así no lo alcanza; partidos de reserva para ampliar los datos; compensación del paneo y el *zoom* de la cámara.
- **Entorno.** Python y PyTorch sobre el equipo del autor (GPU de 16 GB); experimentos registrados con MLflow.

> El desarrollo completo de este apartado se encuentra en [`06_metodologia.md`](06_metodologia.md).

---

## 8. Alcance

Este apartado delimita **qué se va a hacer y qué no se va a hacer** en el Trabajo Final, manteniendo el esfuerzo acotado a un objetivo demostrable.

**Qué se va a hacer:**

- Sistema **exclusivamente de software** sobre grabaciones de rugby en formato de video estándar.
- Reconocimiento del *line-out* (evento inicial y único de validación obligatoria) y su localización temporal: objetivo central del sistema.
- Detección y seguimiento de jugadores y balón como **paso intermedio necesario** para identificar el evento (no es un fin en sí mismo).
- Registro indexado de eventos y **generación automática de clips segmentados**, con una ventana de referencia de **≈10 s antes y 10 s después** del evento.
- Validación sobre grabaciones reales del ámbito amateur regional con métricas objetivas (mAP; precisión, exhaustividad y F1-score).
- Arquitectura **modular**, con *scrum* y *ruck* especificados como extensión opcional, no exigible.

**Qué no se va a hacer:**

- Instrumentación física del entorno (sensores, GPS, cámaras especiales).
- Procesamiento en **tiempo real**; el análisis es *offline*.
- Reconocimiento de otros eventos del rugby fuera del line-out (tries, conversiones, infracciones, marcador).
- Análisis táctico interpretativo automático, recomendaciones ni estadísticas avanzadas.
- Interfaz de nivel comercial, despliegue en producción, comercialización, soporte o mantenimiento.
- Validación de la extensión a otros deportes o dominios.

**Supuestos:** grabaciones con calidad/encuadre suficientes, colaboración de un referente técnico para validar el etiquetado y recursos de cómputo estándar. El volumen del dataset depende del material disponible; los umbrales se fijan en *Metodología*.

> El desarrollo completo de este apartado se encuentra en [`07_alcance.md`](07_alcance.md).

---

## 9. Plan de Trabajo y Cronograma

El plan se expresa en **semanas relativas** (S1 = inicio del desarrollo tras la aprobación del anteproyecto) sobre **26 semanas**, con una dedicación de referencia de ≈10 horas semanales e iteraciones de dos semanas.

- **18 actividades** con descripción, duración, horas, predecesoras y entregable. Suman ≈245 horas sobre ≈260 disponibles.
- **Hitos:** catálogo (S3), diseño presentado al Director (S5), dataset completo (S14), Go/No-Go del detector (S16), line-out integrado (S22) e informe final (S26).
- **Camino crítico:** construcción del dataset, ajuste del detector, modelo temporal y evaluación final. Para mitigarlo, el detector se empieza a ajustar en la S8 con las cajas ya anotadas.
- Las extensiones opcionales no se planifican: sólo se abordan si queda holgura una vez cumplido el objetivo 5.

> El desarrollo completo de este apartado, con la tabla de actividades y el diagrama de Gantt, se encuentra en [`08_cronograma.md`](08_cronograma.md).

---

## 10. Bibliografía Tentativa

Redactada en estilo APA 7.ª ed., en orden alfabético, con únicamente las obras citadas en el texto del anteproyecto (Art. 9c).

> El listado vigente se encuentra en [`09_bibliografia.md`](09_bibliografia.md).

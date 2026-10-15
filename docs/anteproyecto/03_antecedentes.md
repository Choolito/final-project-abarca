# 03 — Antecedentes

> **Reglamento de TF — UCSE DAR, Art. 6b, inciso 3.**
> Trabajo Final de Carrera — Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

---

## 1. Antecedentes

Este apartado describe el estado actual del conocimiento y de la práctica en el reconocimiento automático de eventos en video deportivo, con el objetivo de delimitar con claridad la contribución del presente Trabajo Final. El relevamiento se organiza en cuatro frentes: las soluciones comerciales disponibles, la investigación académica en deportes en general, la investigación específica sobre rugby y el contexto local. Cierra con la identificación de la brecha que el trabajo propone cubrir.

> Las referencias completas, en orden alfabético y según APA 7.ª ed., se encuentran en [`09_bibliografia.md`](09_bibliografia.md). Las afirmaciones sobre productos comerciales se basan en la documentación pública de cada fabricante y describen capacidades declaradas, no evaluadas de forma independiente.

### 1.1. Soluciones comerciales

El mercado de análisis de rendimiento deportivo ofrece tres familias de soluciones, que se distinguen por el **insumo** del que parten y por el **grado de automatización** del reconocimiento de eventos.

**a) Software de etiquetado manual sobre video.** Es la práctica dominante en el análisis táctico. El analista recorre la grabación y marca cada evento mediante una botonera configurable; el software indexa las marcas, genera los clips y produce estadísticas.

- **Hudl Sportscode** es la herramienta de referencia en el alto rendimiento. Se basa en *code windows*, matrices de botones definidas por el analista y asociadas a los eventos de cada deporte (Hudl, s.f.-a). Hudl ofrece además **Hudl Assist**, un servicio de etiquetado tercerizado en el que analistas humanos —asistidos por IA en algunos deportes— codifican el partido enviado por el equipo (Hudl, s.f.-b).
- **Nacsport**, desarrollado por una empresa española fundada en 2008 en Las Palmas de Gran Canaria, sigue el mismo paradigma con licencias escalonadas (Basic, Basic Plus, Pro, Pro Plus, Elite) que habilitan más botones de codificación, enlaces automáticos entre etiquetas y captura multicámara (Nacsport, s.f.).
- **LongoMatch** nació en 2008 como proyecto de fin de máster de Andoni Morales y se distribuyó como software libre (GPL); posteriormente incorporó ediciones comerciales (LongoMatch, s.f.).

En las tres herramientas la **detección del evento es manual**: el software acelera el marcado y la edición, pero no identifica por sí mismo que ocurrió un line-out. El costo en horas-analista que motiva el presente trabajo (ver *Descripción del Problema*) persiste.

**b) Soluciones basadas en sensores o en captura instrumentada.**

- **Catapult** comercializa dispositivos vestibles con GPS y sensores inerciales (IMU). Su *Rugby Suite* detecta automáticamente scrums, patadas y contactos a partir de las señales de los dispositivos Vector S7 y OptimEye S5 (Catapult, s.f.). Los algoritmos subyacentes fueron validados académicamente: un clasificador *random forest* sobre datos de microsensores alcanzó ≈91 % de sensibilidad y especificidad en la detección de scrums (Chambers, Gabbett y Cole, 2019), y un enfoque análogo detectó tackles y rucks contrastados contra el etiquetado en video (Chambers, Gabbett, Gupta et al., 2019).
- **Stats Perform (Opta)** provee datos de eventos de rugby a federaciones, equipos profesionales y medios. Su recolección combina analistas humanos, *tracking* óptico y modelos de IA, con definiciones de eventos estandarizadas (Stats Perform, s.f.).

Estas soluciones logran alta precisión, pero exigen **equipar a cada jugador** o contratar un servicio profesional de datos, y sólo producen información sobre los partidos instrumentados a partir de su adopción: **no son aplicables al archivo histórico** de video de un club.

**c) Cámaras con inteligencia artificial integrada.** Es la categoría más cercana a la propuesta de este trabajo.

- **Veo** comercializa una cámara panorámica autónoma que graba el partido sin camarógrafo y, en la plataforma asociada, **detecta automáticamente eventos de rugby**: inicio y fin de período, *try*, conversión, **scrum y line-out**, con generación de clips (Veo, s.f.-a, s.f.-c). La generación automática de clips por IA no está disponible en el plan de entrada (*Starter*), sino en los planes superiores de suscripción (Veo, s.f.-b).
- **Hudl Focus** ofrece cámaras inteligentes que siguen la acción y suben la grabación a la plataforma de forma automática (Hudl, s.f.-c); el etiquetado de eventos se canaliza por los servicios descritos en el punto (a).

Veo demuestra que la detección automática del line-out es **técnicamente factible y comercialmente valorada**. Sin embargo, su modelo presenta tres restricciones relevantes para el ámbito amateur regional: (1) exige la **compra de hardware propietario** y una **suscripción recurrente** en moneda extranjera; (2) el reconocimiento opera sobre el video capturado **por su propia cámara**, por lo que no puede aplicarse a grabaciones previas ni a material registrado con otros dispositivos; y (3) es un sistema cerrado cuyo método, datos de entrenamiento y desempeño no están documentados públicamente, lo que impide auditarlo o adaptarlo. Un trabajo final de la Universidad Técnica Federico Santa María (Chile) reporta, además, que la cámara Veo utilizada por un club de rugby no identificaba eventos de interés para el cuerpo técnico —en ese caso, choques entre jugadores—, lo que motivó el desarrollo de una solución propia por visión por computadora (Santana Domínguez, 2024).

### 1.2. Investigación académica en deportes

La comunidad de visión por computadora consolidó el análisis de video deportivo como un área propia, con el *workshop* **CVsports** del CVPR como foro de referencia.

- **Definición de la tarea.** *SoccerNet* (Giancola et al., 2018) formalizó el ***action spotting***: localizar, dentro de videos largos sin recortar, el instante en que ocurren eventos **dispersos**. El dataset original reúne 500 partidos de fútbol (764 h) con 6.637 anotaciones de goles, tarjetas y cambios —en promedio, un evento cada 6,9 minutos— y una métrica de *Average-mAP* con tolerancias temporales de 5 a 60 s. *SoccerNet-v2* (Deliège et al., 2021) extendió el problema a 17 clases y ≈300.000 anotaciones. Esta formulación es la más próxima al problema del presente trabajo: el line-out es un evento disperso dentro de un partido de 80 minutos.
- **Precisión temporal fina.** *E2E-Spot* (Hong et al., 2022) abordó el *precise spotting* —identificar el fotograma exacto de eventos de corta duración en tenis, patinaje o clavados— con un modelo compacto entrenable en una única GPU.
- **Estado del arte consolidado.** Dos relevamientos recientes sistematizan tareas, datasets y métodos: Wu et al. (2022) cubren el reconocimiento de acciones en más de diez deportes y señalan que los datasets genéricos (Kinetics, ActivityNet) tienen etiquetas deportivas demasiado gruesas y que la anotación fina exige conocimiento experto del dominio; Xu et al. (2025) ordenan el campo de la detección de eventos en video deportivo en clasificación, localización temporal de acciones y *action spotting*.

La conclusión de este frente es que las **técnicas están maduras**, pero los datasets y modelos se concentran en deportes de alta difusión televisiva —principalmente fútbol— y sobre **transmisiones profesionales** multicámara.

### 1.3. Investigación específica sobre rugby

La producción académica sobre rugby es **comparativamente escasa** y se orienta mayormente a problemas distintos del reconocimiento de formaciones fijas sobre video amateur.

| Trabajo | Problema abordado | Insumo | Relación con este TF |
|---|---|---|---|
| Maglo et al. (2022) | Seguimiento de jugadores con pocas anotaciones; publica un dataset de rugby 7s | Video de transmisión (World Rugby) | Técnica de percepción reutilizable; modalidad *sevens* |
| Martin et al. (2021) | Evaluación del riesgo de lesión en tackles (YOLO + Kalman + OpenPose); 62,5 % de exactitud | Video | Riesgo de lesión, no catalogación táctica |
| Nonaka et al. (2024) | Clasificación de escenas de contacto (scrum, maul, ruck, tackle, line-out) sobre ≈18.000 imágenes, mejorada con un modelo visión-lenguaje | Fotogramas de transmisión | Reconoce el line-out a nivel de imagen, sin localización temporal ni generación de clips |
| Jayasuriya (2022) | Detección y localización temporal de eventos; publica el *Rugby Events Dataset* | Video de transmisión | Antecedente más próximo en la tarea; distinto insumo (TV) |
| Fernando (2020) | Seguimiento de jugadores por *tracking-by-detection* (YOLO + embeddings + Kalman) | Video | Valida la viabilidad del stack de percepción en rugby |
| Santana Domínguez (2024) | Detección y clasificación de choques (caídas, tackles, colisiones) | Video de cámara Veo | Contexto amateur latinoamericano; no aborda formaciones fijas |
| Chambers, Gabbett y Cole (2019); Chambers, Gabbett, Gupta et al. (2019) | Detección de scrums, tackles y rucks | Sensores inerciales | Contraste: mismo objetivo con instrumentación física |

Se observan tres regularidades. Primero, los trabajos que detectan eventos tácticos (Jayasuriya, 2022; Nonaka et al., 2024) operan sobre **transmisiones televisivas profesionales**, con encuadres de calidad, repeticiones y gráficos; ninguno se valida sobre **grabaciones amateur de una sola cámara**. Segundo, ningún trabajo relevado combina la **localización temporal del line-out** con la **generación automática de clips** para el cuerpo técnico. Tercero, una parte significativa de la investigación aplicada al rugby se orienta a la **seguridad del jugador** (tackles de riesgo, colisiones), no a la preparación táctica.

### 1.4. Contexto local

Según la información pública relevada, el análisis de video en el rugby amateur argentino se apoya en el etiquetado manual. A nivel institucional, la Unión de Rugby de Buenos Aires (URBA) anunció una plataforma de análisis de video y estadísticas con un **protocolo único de codificación** para sus divisiones superiores (URBA, s.f.), lo que confirma la valoración del análisis de video en el ámbito de clubes, y también que su producción depende de la codificación manual de cada partido. Para las uniones del interior del país no se relevaron iniciativas equivalentes documentadas públicamente.

Una búsqueda exploratoria de tesis y trabajos finales en visión por computadora aplicada al deporte no identificó antecedentes argentinos sobre reconocimiento automático de eventos de rugby; los trabajos hispanohablantes hallados se concentran en el fútbol y se apoyan en SoccerNet. Queda pendiente una consulta sistemática en el Sistema Nacional de Repositorios Digitales (SNRD) y en los repositorios de UTN, UNL y UNR.

> **Pendiente de relevamiento (issue #19).** Se completará con datos primarios del Círculo Rafaelino de Rugby (CRR): herramienta utilizada para el análisis de video, cantidad de horas-analista por partido y volumen de archivo histórico disponible. El dato de horas por partido permitirá cuantificar el costo del proceso manual descrito en el *Problema*.

### 1.5. Síntesis comparativa

| Solución | Insumo | Costo / acceso | Eventos que cubre | ¿Aplica al archivo histórico? |
|---|---|---|---|---|
| Hudl Sportscode | Video (cualquier fuente) | Licencia comercial, orientada a alto rendimiento | Cualquiera, **marcado manual** | Sí, pero con el mismo costo manual |
| Hudl Assist | Video según protocolo de grabación de Hudl | Servicio pago por partido/temporada | Según deporte, **etiquetado por analistas** | Limitado al protocolo de grabación |
| Nacsport | Video (cualquier fuente) | Licencia anual escalonada | Cualquiera, **marcado manual** | Sí, pero con el mismo costo manual |
| LongoMatch | Video (cualquier fuente) | Libre (GPL) / ediciones comerciales | Cualquiera, **marcado manual** | Sí, pero con el mismo costo manual |
| Catapult | Sensores GPS/IMU por jugador | Hardware por jugador + licencia; nivel profesional | Scrum, contactos, patadas (automático) | **No** |
| Stats Perform / Opta | Captura profesional + analistas | Contrato de datos; federaciones y medios | Catálogo estandarizado completo | Sólo competencias cubiertas |
| Veo | Video de **su propia cámara** | Hardware propietario + suscripción | Try, conversión, scrum, **line-out** (automático) | **No** |
| Investigación académica en rugby | Video de **transmisión TV** o sensores | Prototipos de investigación | Tackles, contactos, eventos generales | No validado sobre video amateur |
| **Este Trabajo Final** | Video **estándar de una cámara** | Software, sin hardware adicional | **Line-out** (automático) + clips | **Sí** |

---

## 2. Brecha identificada y contribución

Del relevamiento surge que el reconocimiento automático de eventos en video deportivo es un problema **técnicamente resuelto en lo metodológico** —el *action spotting* y la detección de objetos están maduros—, pero cuya aplicación al rugby amateur presenta una brecha concreta:

1. **Las herramientas accesibles no automatizan la detección.** Sportscode, Nacsport y LongoMatch sólo aceleran el marcado manual.
2. **Las herramientas que automatizan no son accesibles ni retroactivas.** Catapult y Opta requieren instrumentación o servicios profesionales; Veo requiere su hardware y suscripción y no procesa grabaciones de terceros ni el archivo histórico.
3. **La investigación en rugby no cubre el caso de uso.** Los trabajos sobre eventos tácticos operan sobre transmisiones televisivas y no producen clips para el cuerpo técnico; los que abordan video amateur se enfocan en la seguridad del jugador.
4. **No se identificaron antecedentes en el contexto regional argentino.**

En consecuencia, la **contribución** del presente Trabajo Final consiste en:

- Un **sistema de software documentado** que reconoce y localiza temporalmente el **line-out** sobre **grabaciones amateur de una sola cámara**, **sin sensores ni hardware propietario**, y genera automáticamente los clips correspondientes.
- Su **aplicabilidad al archivo histórico** de video que los clubes ya poseen, independientemente del dispositivo con que fue grabado.
- Un **dataset anotado y un protocolo de etiquetado reproducible** de line-outs en video amateur, inexistentes en la literatura relevada, construidos y validados con un club del **contexto regional argentino**.
- Una **evaluación cuantitativa** (mAP, precisión, exhaustividad y F1) en condiciones reales de captura amateur, que la literatura de rugby —basada en transmisiones profesionales— no reporta.

---

*Los apartados subsiguientes del anteproyecto se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

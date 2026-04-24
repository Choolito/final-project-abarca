# 01 — Título del Proyecto y Descripción del Problema

> **Reglamento de TF — UCSE DAR, Art. 6b, inciso 1.**
> Trabajo Final de Carrera — Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

---

## 1. Título del Proyecto

**Sistema de Reconocimiento Automático de Eventos Deportivos en Video mediante Visión por Computadora — Caso de Estudio: Análisis de Partidos de Rugby.**

*Subtítulo técnico:* Plataforma modular de detección, segmentación y catalogación de eventos tácticos en secuencias de video, basada en arquitecturas de aprendizaje profundo aplicadas al reconocimiento de comportamiento colectivo.

El proyecto se encuadra en el **Artículo 2, inciso b** del Reglamento para la Elaboración de los Trabajos Finales de la Carrera de Ingeniería en Informática de la UCSE, en tanto propone el *desarrollo de una idea, prototipo y/o sistema que contribuya a la aplicación de las tecnologías afines a la currícula de la carrera*, integrando competencias de ingeniería de software, inteligencia artificial y procesamiento de señales.

---

## 2. Descripción del Problema

### 2.1. Contexto y dominio de aplicación

El análisis de video se ha consolidado como una herramienta determinante en la preparación táctica de los cuerpos técnicos del deporte profesional contemporáneo. En disciplinas de alta complejidad espacio-temporal como el rugby —caracterizadas por formaciones colectivas (*scrum*, *line-out*, *ruck*, *maul*), transiciones rápidas y una densidad elevada de agentes en interacción— la revisión sistemática de las grabaciones constituye una fuente primaria de información para la planificación estratégica, la evaluación del rendimiento individual y la toma de decisiones arbitrales.

Sin embargo, el proceso por el cual esa información en bruto se convierte en conocimiento táctico accionable presenta tres problemáticas concurrentes que motivan el presente Trabajo Final.

### 2.2. Enunciado del problema

#### 2.2.1. Ineficiencia del análisis manual de video

En la práctica habitual de instituciones amateur y semiprofesionales, la catalogación de eventos tácticos en video es un procedimiento **manual, iterativo y escasamente reproducible**. El analista recorre de forma secuencial la grabación completa del encuentro, identifica visualmente los eventos de interés, los marca temporalmente y los segmenta en clips para su posterior estudio. Esta tarea:

- Consume un volumen de horas desproporcionado respecto de la duración efectiva del partido, con ratios frecuentemente superiores a 4:1 entre tiempo de análisis y tiempo de juego.
- Depende de la pericia y disponibilidad de un recurso humano especializado, lo que introduce variabilidad en los criterios de etiquetado y dificulta la trazabilidad entre analistas.
- Restringe el tiempo disponible para el análisis interpretativo de alto nivel —la actividad que efectivamente aporta valor al cuerpo técnico— desplazándolo hacia tareas mecánicas de localización y recorte.

#### 2.2.2. Brecha de accesibilidad de las soluciones comerciales

Las plataformas comerciales actualmente disponibles en el mercado internacional abordan parcialmente esta problemática mediante la integración de **hardware especializado de IoT**, tales como sensores inerciales embebidos en el balón de juego, dispositivos GPS colocados en los jugadores o cámaras multiespectrales sincronizadas. Si bien esta clase de soluciones ofrece resultados de alta precisión, presenta barreras estructurales de adopción:

- **Barrera económica:** el costo de licenciamiento, adquisición y mantenimiento del hardware es incompatible con el presupuesto operativo de clubes amateur o federaciones regionales.
- **Barrera logística:** la necesidad de instrumentación física del entorno —balones certificados, chalecos con sensores, infraestructura de captura— resulta inviable en el contexto de partidos disputados en canchas de propiedad de terceros o en torneos sin control centralizado de material.
- **Barrera de dependencia:** la vinculación del software a un ecosistema de hardware propietario impide su uso sobre el archivo de video histórico del club, que constituye precisamente el activo de mayor valor analítico.

En consecuencia, el beneficio del análisis asistido por inteligencia artificial queda reservado al deporte profesional de primer nivel, reproduciendo a escala tecnológica la brecha competitiva ya existente a escala económica.

#### 2.2.3. Carencia tecnológica en el ámbito local

En el ecosistema deportivo regional —con el **Círculo Rafaelino de Rugby (CRAR)** como caso testigo representativo— no se ha identificado una herramienta de software de adopción masiva, económicamente accesible y operable sobre señales de video estándar, que automatice la detección y catalogación de eventos tácticos. La consecuencia es una situación de **asimetría informacional estructural**: instituciones con trayectoria deportiva y capacidad analítica no disponen de la infraestructura de software necesaria para explotar su propio archivo audiovisual con los mismos estándares cuantitativos que emplea el deporte de élite.

### 2.3. Síntesis del problema

> *No existe en el ámbito deportivo amateur regional una solución de software accesible que, operando exclusivamente sobre grabaciones de video estándar y sin requerir instrumentación física del entorno de juego, permita la detección, segmentación y catalogación automática de eventos tácticos en partidos de rugby con un nivel de precisión suficiente para asistir al cuerpo técnico en la preparación de un encuentro.*

Este enunciado delimita con precisión el espacio-problema sobre el cual se formula la propuesta técnica del siguiente apartado.

---

## 3. Idea de Proyecto (Propuesta Técnica)

### 3.1. Formulación general

Se propone el diseño, desarrollo y validación empírica de una **plataforma de software** capaz de procesar grabaciones de partidos de rugby en formato de video estándar y producir, de manera automática, una catalogación estructurada de los eventos tácticos ocurridos durante el encuentro. La plataforma se formula como una **arquitectura genérica de reconocimiento de eventos en video**, instanciada sobre el dominio del rugby a efectos de la validación académica del Trabajo Final, pero diseñada con criterios de modularidad que habilitan su extensión futura a otros dominios de análisis de comportamiento colectivo (seguridad urbana, análisis de tráfico, monitoreo industrial, entre otros).

### 3.2. Arquitectura conceptual por capas de abstracción

A fin de preservar la separación de responsabilidades y facilitar la evolución independiente de cada nivel, el sistema se estructura en tres capas lógicas:

| Capa | Responsabilidad abstracta | Instanciación en el caso de estudio (Rugby) |
|---|---|---|
| **Capa 1 — Percepción** | Segmentación de objetos, detección de agentes y estimación de flujo óptico sobre el cuadro de video. | Detección y seguimiento de jugadores, árbitros y balón en el campo de juego. |
| **Capa 2 — Semántica** | Reconocimiento de estados espacio-temporales complejos a partir de la agregación de las primitivas de percepción. | Identificación de formaciones tácticas (*scrum*, *line-out*, *ruck*, *maul*) y gestos arbitrales. |
| **Capa 3 — Eventos** | Disparo de etiquetas (*triggers*), persistencia de la información catalogada y exposición de los clips segmentados al usuario final. | Generación automática de clips segmentados, registro temporal indexado y puesta a disposición del cuerpo técnico. |

### 3.3. Enfoque técnico preliminar

El desarrollo se apoyará en el ecosistema de Python y, en particular, en el siguiente conjunto de tecnologías de referencia, sujeto a validación definitiva en el apartado de *Marco Teórico*:

- **Detección y seguimiento de agentes:** arquitecturas de detección en tiempo real de la familia **YOLO** (*You Only Look Once*) para la localización de jugadores y balón, complementadas con algoritmos de seguimiento multi-objeto del tipo **DeepSORT** para la persistencia de identidad entre cuadros.
- **Reconocimiento de acción y análisis temporal:** modelos **SlowFast** y/o arquitecturas recurrentes (**LSTM**) o basadas en **Transformers** para la clasificación de secuencias temporales y la identificación de patrones de movimiento colectivo.
- **Análisis biomecánico:** extracción de puntos clave corporales mediante **MediaPipe** para caracterizar geométricamente las formaciones fijas.
- **Infraestructura de soporte:** **OpenCV** para el procesamiento de video, **FastAPI** como capa de servicios del *backend* y **SQLite** (u otro motor relacional liviano) para la persistencia del catálogo de eventos.

### 3.4. Propuesta de valor

La propuesta persigue una doble contribución de ingeniería:

- **Contribución técnica.** La formulación del sistema como una arquitectura genérica de reconocimiento de eventos en video —y no como una aplicación *ad hoc* al rugby— constituye un aporte metodológico reutilizable en otros dominios de análisis de comportamiento colectivo caracterizados por alta densidad de agentes y oclusión parcial.
- **Contribución social.** La solución se formula como una plataforma **exclusivamente basada en software**, operable sobre video estándar y sin dependencia de hardware especializado, con el objeto de **democratizar el acceso** a herramientas de análisis táctico de alto rendimiento para instituciones deportivas de nivel amateur y regional, tomando como caso testigo al Círculo Rafaelino de Rugby.

### 3.5. Encuadre en el Reglamento de TF

La presente Idea de Proyecto responde a los criterios establecidos en el Artículo 2 inciso b del Reglamento de TF de la UCSE DAR, al proponer el desarrollo de un prototipo que integra de manera articulada los conocimientos de ingeniería de software, sistemas inteligentes y procesamiento de señales incorporados a lo largo de la Carrera de Ingeniería en Informática, satisfaciendo la expectativa del Artículo 1 en cuanto a la demostración de competencias en **formulación de problemas, investigación, redacción y gestión de proyectos de TIC**.

---

*Los apartados subsiguientes del anteproyecto —Objetivos y Metas (Art. 6b.2), Antecedentes (Art. 6b.3), Justificación (Art. 6b.4), Marco Teórico (Art. 6b.5), Metodología (Art. 6b.6), Alcance (Art. 6b.7), Plan de Trabajo y Cronograma (Art. 6b.8) y Bibliografía Tentativa (Art. 6b.9)— se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

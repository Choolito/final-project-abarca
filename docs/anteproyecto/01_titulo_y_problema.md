# 01 — Título del Proyecto y Descripción del Problema

> **Reglamento de TF — UCSE DAR, Art. 6b, inciso 1.**
> Trabajo Final de Carrera — Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

---

## 1. Título del Proyecto

**Sistema de Reconocimiento Automático de Eventos Deportivos en Video mediante Visión por Computadora — Caso de Estudio: Análisis de Partidos de Rugby.**

*Subtítulo técnico:* Detección automática de line-outs y generación de clips en video amateur mediante visión por computadora.

El proyecto se encuadra en el **Artículo 2, inciso b** del Reglamento para la Elaboración de los Trabajos Finales de la Carrera de Ingeniería en Informática de la UCSE, en tanto propone el *desarrollo de una idea, prototipo y/o sistema que contribuya a la aplicación de las tecnologías afines a la currícula de la carrera*, integrando competencias de ingeniería de software, inteligencia artificial y procesamiento de señales.

---

## 2. Descripción del Problema

### 2.1. Contexto y dominio de aplicación

El análisis de video se ha consolidado como una herramienta determinante en la preparación táctica de los cuerpos técnicos del deporte profesional contemporáneo. En disciplinas de alta complejidad espacio-temporal como el rugby —caracterizadas por formaciones colectivas (*scrum*, *line-out*, *ruck*, *maul*), transiciones rápidas y una densidad elevada de agentes en interacción— la revisión sistemática de las grabaciones constituye una fuente primaria de información para la planificación estratégica, y la evaluación del rendimiento individual y colectivo.

Sin embargo, el proceso por el cual esa información en bruto se convierte en conocimiento táctico accionable presenta tres problemáticas concurrentes que motivan el presente Trabajo Final.

### 2.2. Enunciado del problema

#### 2.2.1. Ineficiencia del análisis manual de video

En la práctica habitual de instituciones amateur y semiprofesionales, la catalogación de eventos tácticos en video es un procedimiento **manual, iterativo y escasamente reproducible**. El analista recorre de forma secuencial la grabación completa del encuentro, identifica visualmente los eventos de interés, los marca temporalmente y los segmenta en clips para su posterior estudio. Esta tarea:

- Consume un volumen de horas desproporcionado respecto de la duración efectiva del partido. En el club caso testigo, el análisis manual de un partido de 80 minutos demanda entre **2 y 3 horas** de trabajo del analista, que se repiten en cada fecha de la temporada.
- Depende de la pericia y disponibilidad de un recurso humano especializado, lo que introduce variabilidad en los criterios de etiquetado y dificulta la trazabilidad entre analistas.
- Restringe el tiempo disponible para el análisis interpretativo de alto nivel —la actividad que efectivamente aporta valor al cuerpo técnico— desplazándolo hacia tareas mecánicas de localización y recorte.

#### 2.2.2. Brecha de accesibilidad de las soluciones comerciales

Las soluciones que automatizan parcialmente esta tarea siguen dos caminos. En el **alto rendimiento** se apoyan en la instrumentación del entorno de juego, como dispositivos GPS e inerciales colocados en los jugadores o sistemas de cámaras sincronizadas para el seguimiento óptico. En el ámbito amateur surgieron **cámaras autónomas con inteligencia artificial**, que detectan algunos eventos sobre el video que ellas mismas graban (ver *Antecedentes*). Ambos caminos presentan barreras de adopción:

- **Barrera económica:** la adquisición de hardware y las licencias o suscripciones, en general en moneda extranjera, son difíciles de sostener para clubes amateur o federaciones regionales.
- **Barrera logística:** instrumentar el entorno de juego —chalecos con sensores, infraestructura de captura— resulta inviable en partidos disputados en canchas de terceros o en torneos sin control centralizado del material.
- **Barrera de dependencia:** el análisis queda atado al dispositivo del fabricante. No se aplica al archivo histórico del club ni a video registrado con otros equipos, y su método es cerrado, sin posibilidad de auditarlo o adaptarlo.

En consecuencia, el análisis automático de eventos queda condicionado a la adquisición de hardware y servicios propietarios, y no alcanza al video que los clubes ya registran con sus propios medios.

#### 2.2.3. Carencia tecnológica en el ámbito local

En el ecosistema deportivo regional —con el **Círculo Rafaelino de Rugby (CRAR)** como caso testigo representativo— no se ha identificado una herramienta de software de adopción masiva, económicamente accesible y operable sobre señales de video estándar, que automatice la detección y catalogación de eventos tácticos. La consecuencia es una situación de **asimetría informacional estructural**: instituciones con trayectoria deportiva y capacidad analítica no disponen de la infraestructura de software necesaria para explotar su propio archivo audiovisual con los mismos estándares cuantitativos que emplea el deporte de élite.

### 2.3. Síntesis del problema

> *No existe en el ámbito deportivo amateur regional una solución de software accesible que, operando exclusivamente sobre grabaciones de video estándar y sin requerir instrumentación física del entorno de juego, permita la detección, segmentación y catalogación automática de eventos tácticos en partidos de rugby con un nivel de precisión suficiente para asistir al cuerpo técnico en la preparación de un encuentro.*

Este enunciado delimita con precisión el espacio-problema sobre el cual se formula la propuesta técnica del siguiente apartado.

---

## 3. Idea de Proyecto (Propuesta Técnica)

### 3.1. Formulación general

Se propone el diseño, desarrollo y validación empírica de una **plataforma de software** capaz de procesar grabaciones de partidos de rugby en formato de video estándar y producir, de manera automática, una catalogación estructurada de los eventos tácticos ocurridos durante el encuentro. El **rugby** es el objeto concreto sobre el cual el sistema se diseña, implementa y valida, tomando el **line-out** como evento inicial y único de validación obligatoria. La plataforma se organiza con criterios de **modularidad** —separando el núcleo de procesamiento de video del catálogo de eventos propio de la disciplina—; esta organización es una **orientación de diseño** que no clausura su extensión futura a otros deportes de características análogas, pero **no constituye un objetivo a validar** en el presente Trabajo Final (ver *Objetivos* y *Alcance*).

### 3.2. Arquitectura conceptual por capas de abstracción

A fin de preservar la separación de responsabilidades y facilitar la evolución independiente de cada nivel, el sistema se estructura en tres capas lógicas:

| Capa | Responsabilidad abstracta | Instanciación en el caso de estudio (Rugby) |
|---|---|---|
| **Capa 1 — Percepción** | Detección de agentes en cada cuadro de video y seguimiento de sus trayectorias entre cuadros. | Detección y seguimiento de jugadores y balón en el campo de juego, como paso intermedio para identificar el evento. |
| **Capa 2 — Semántica** | Reconocimiento de estados espacio-temporales complejos a partir de la agregación de las primitivas de percepción. | Identificación del *line-out* (evento inicial obligatorio); *scrum* y *ruck* especificados como eventos de extensión. |
| **Capa 3 — Eventos** | Disparo de etiquetas (*triggers*), persistencia de la información catalogada y exposición de los clips segmentados al usuario final. | Generación automática de clips segmentados, registro temporal indexado y puesta a disposición del cuerpo técnico. |

### 3.3. Enfoque técnico preliminar

El desarrollo se apoyará en el ecosistema de Python y, en particular, en el siguiente conjunto de tecnologías de referencia, confirmado y ajustado en el *Marco Teórico* ([`05_marco_teorico.md`](05_marco_teorico.md) §1.9). Se distingue el **núcleo comprometido**, suficiente para cumplir los objetivos, de las **extensiones opcionales**, que no condicionan ningún objetivo:

- **Detección y seguimiento de agentes:** arquitecturas de detección de la familia **YOLO** (*You Only Look Once*) para la localización de jugadores y balón, complementadas con el algoritmo de seguimiento multi-objeto **BoT-SORT** (sin reidentificación por apariencia), que compensa el movimiento de la cámara, para la persistencia de identidad entre cuadros.
- **Reconocimiento temporal del evento:** formulación como *action spotting* —un instante por line-out—, a partir de características espaciales de la formación derivadas de la percepción y procesadas por un modelo temporal liviano (**LSTM/GRU** o convolución 1D) y contrastadas con una línea base heurística.
- **Infraestructura de soporte:** **OpenCV** y **FFmpeg** para el procesamiento de video y el recorte de clips, **SQLite** para la persistencia del catálogo de eventos y una interfaz de línea de comandos para operar el sistema.
- **Extensiones opcionales:** comparación con otros algoritmos de seguimiento y métricas de seguimiento; registración de la cancha por homografía; un modelo de video de extremo a extremo (**E2E-Spot**); estimación de pose (**MediaPipe**); y un servicio web (**FastAPI**) para exponer el catálogo.

### 3.4. Propuesta de valor

La propuesta persigue una doble contribución de ingeniería:

- **Contribución técnica.** Una cadena completa y validada empíricamente de reconocimiento de un evento táctico del rugby —el *line-out*— sobre video estándar de nivel amateur, escenario caracterizado por alta densidad de agentes y oclusión parcial, organizada en capas desacopladas que dejan una base modular para incorporar nuevos eventos en trabajos posteriores.
- **Contribución social.** La solución se formula como una plataforma **exclusivamente basada en software**, operable sobre video estándar y sin dependencia de hardware especializado, con el objeto de **democratizar el acceso** a herramientas de análisis táctico de alto rendimiento para instituciones deportivas de nivel amateur y regional, tomando como caso testigo al Círculo Rafaelino de Rugby.

### 3.5. Encuadre en el Reglamento de TF

La presente Idea de Proyecto responde a los criterios establecidos en el Artículo 2 inciso b del Reglamento de TF de la UCSE DAR, al proponer el desarrollo de un prototipo que integra de manera articulada los conocimientos de ingeniería de software, sistemas inteligentes y procesamiento de señales incorporados a lo largo de la Carrera de Ingeniería en Informática, satisfaciendo la expectativa del Artículo 1 en cuanto a la demostración de competencias en **formulación de problemas, investigación, redacción y gestión de proyectos de TIC**.

---

*Los apartados subsiguientes del anteproyecto —Objetivos y Metas (Art. 6b.2), Antecedentes (Art. 6b.3), Justificación (Art. 6b.4), Marco Teórico (Art. 6b.5), Metodología (Art. 6b.6), Alcance (Art. 6b.7), Plan de Trabajo y Cronograma (Art. 6b.8) y Bibliografía Tentativa (Art. 6b.9)— se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

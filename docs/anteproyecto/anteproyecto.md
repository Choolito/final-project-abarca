# Anteproyecto — Trabajo Final de Carrera

> **Universidad Católica de Santiago del Estero — Departamento Académico Rafaela.**
> Carrera de Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

Este documento desarrolla los diez puntos requeridos por la consigna de Trabajo Final de la UCSE DAR. Las secciones se completan de manera iterativa; los apartados aún no abordados se mantienen como marcadores explícitos.

---

## 1. Título del Proyecto

_A definir al cierre del anteproyecto._

---

## 2. Descripción del Problema

El análisis de video se ha consolidado como una pieza central de la preparación táctica en el deporte contemporáneo. La grabación de un partido es, en sí misma, una fuente densa de información sobre el comportamiento individual y colectivo de los jugadores, sobre las decisiones del cuerpo arbitral y sobre la evolución del marcador en función de las situaciones de juego. Sin embargo, la conversión de esa grabación en bruto en información accionable para el cuerpo técnico continúa dependiendo, en buena parte del ecosistema deportivo, de un procedimiento esencialmente manual: un analista recorre la totalidad del video, identifica visualmente los eventos de interés, los marca temporalmente y los recorta en clips para su estudio posterior. Esta tarea consume un volumen de horas desproporcionado respecto de la duración efectiva del encuentro, depende fuertemente de la pericia del recurso humano disponible y desplaza el tiempo del analista desde el análisis interpretativo —que es la actividad que efectivamente aporta valor— hacia tareas mecánicas de localización y segmentación.

Las herramientas comerciales que automatizan parcialmente esta cadena de trabajo se apoyan en la instrumentación física del entorno de juego: chips embebidos en el balón, dispositivos GPS colocados en los jugadores, cámaras certificadas y otros componentes de IoT deportivo. Aunque ofrecen una precisión elevada, su costo de adquisición y mantenimiento, sumado a la logística que exigen, las vuelve inviables para el deporte amateur y semiprofesional. A esa barrera se añade una restricción de fondo: al estar atadas a un hardware específico, no pueden aplicarse sobre el archivo histórico de video de los clubes, que constituye precisamente el activo de mayor valor analítico de las instituciones con trayectoria deportiva.

El resultado es una brecha estructural de acceso entre el deporte profesional, capaz de instrumentar el entorno de juego, y el resto del ecosistema deportivo, que dispone del video pero carece de herramientas de software accesibles para explotarlo. Esta asimetría se manifiesta de forma particularmente nítida en disciplinas de alta complejidad táctica como el rugby —caso testigo del presente trabajo—, donde la densidad de formaciones colectivas, gestos arbitrales y transiciones rápidas vuelve al análisis de eventos en video un insumo crítico de la preparación del encuentro, y donde el ámbito amateur regional carece hoy de una herramienta de adopción masiva que opere exclusivamente sobre grabaciones de video estándar.

---

## 3. Objetivos Generales y Específicos

### Objetivo General

Desarrollar y validar un sistema de software para el reconocimiento automático de eventos deportivos en video de partidos de rugby, que opere exclusivamente sobre grabaciones en formato estándar —sin requerir instrumentación física del entorno de juego— y produzca una catalogación estructurada de los eventos tácticos relevantes del encuentro, junto con los clips segmentados correspondientes, a fin de asistir al cuerpo técnico de instituciones del ámbito amateur regional en la preparación táctica de los partidos. El rugby constituye el objeto concreto sobre el cual el sistema se diseña, implementa y valida; la organización modular del sistema se asume como una orientación de diseño y no como un objetivo a validar en el presente Trabajo Final.

### Objetivos Específicos

Formulados bajo criterio **SMART** y de forma incremental, tomando el **line-out** como evento inicial (scrum y ruck como extensión; detalle en *Alcance*). Los umbrales son metas de referencia preliminares y los plazos se expresan en **semanas** sobre una duración total de **6 meses (≈26 semanas)**; el etiquetado del dataset es la actividad de mayor extensión:

1. Delimitar y documentar el catálogo de eventos —line-out como evento inicial y scrum/ruck especificados como extensión— con sus criterios observables, hacia la semana 3, validado con el cuerpo técnico del club.
2. Construir un dataset de ≥200 clips de line-out en distintos puntos de vista, anotados y particionados 70/15/15, con protocolo reproducible (semanas 3–14, la tarea más larga).
3. Diseñar y aprobar el documento de arquitectura modular en tres capas (percepción, interpretación semántica y gestión de eventos) con interfaces definidas, hacia la semana 5.
4. Implementar el módulo de percepción (detección de jugadores y balón) con mAP@0.5 ≥ 0,70 para la clase jugador sobre el conjunto de prueba, hacia la semana 16.
5. Implementar el módulo de reconocimiento y catalogación del line-out (localización temporal + clips automáticos) con F1-score ≥ 0,70 sobre el conjunto de prueba, hacia la semana 22.
6. Evaluar el sistema completo con precisión, exhaustividad y F1-score del line-out contra el etiquetado de referencia, documentando un informe, hacia la semana 26.

> El desarrollo completo de este apartado se encuentra en [`02_objetivos_generales_y_especificos.md`](02_objetivos_generales_y_especificos.md).

---

## 4. Antecedentes

_A desarrollar._

---

## 5. Justificación

El Trabajo Final se justifica por la convergencia de una necesidad concreta y desatendida, una oportunidad tecnológica madura y una pertinencia académica directa con las competencias de la carrera.

- **Relevancia práctica.** El análisis de video es un insumo central de la preparación táctica, pero en el ámbito amateur depende de un proceso manual costoso en horas. Automatizar la detección y segmentación de eventos a partir de grabaciones estándar libera ese tiempo y lo redirige hacia el análisis interpretativo, que es donde se aporta valor. La solución es exclusivamente de software, operable sobre el video que los clubes ya producen.
- **Relevancia social.** Las herramientas comerciales dependen de instrumentación física (sensores en el balón, GPS, cámaras certificadas) inaccesible para el deporte amateur, reproduciendo la brecha competitiva a escala tecnológica. Al prescindir de hardware y operar sobre grabaciones estándar —incluido el archivo histórico— el sistema busca democratizar el acceso al análisis táctico, con el rugby amateur regional como caso testigo.
- **Relevancia académica y tecnológica.** Integra ingeniería de software, sistemas inteligentes y procesamiento de señales sobre un problema real, recorriendo el ciclo completo de formulación, diseño, implementación y validación, y dejando una base reutilizable.
- **Viabilidad.** Se apoya en tecnologías de visión por computadora maduras, no requiere infraestructura física especial y acota su validación a un evento inicial (el *line-out*), manteniendo el alcance controlado. La disponibilidad de un entorno real de prueba refuerza la factibilidad.

> El desarrollo completo de este apartado se encuentra en [`04_justificacion.md`](04_justificacion.md).

---

## 6. Marco Teórico

_A desarrollar._

---

## 7. Metodología

_A desarrollar._

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

**Supuestos:** grabaciones con calidad/encuadre suficientes, colaboración de un referente técnico para validar el etiquetado y recursos de cómputo estándar. Los volúmenes y umbrales son metas de referencia preliminares.

> El desarrollo completo de este apartado se encuentra en [`07_alcance.md`](07_alcance.md).

---

## 9. Plan de Trabajo y Cronograma

_A desarrollar._

---

## 10. Bibliografía Tentativa

_A desarrollar._

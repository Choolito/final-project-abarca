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

## 3. Objetivos y Metas

### Objetivo General

Desarrollar y validar un sistema de software para el reconocimiento automático de eventos deportivos en video de partidos de rugby, que opere exclusivamente sobre grabaciones en formato estándar —sin requerir instrumentación física del entorno de juego— y produzca una catalogación estructurada de los eventos tácticos relevantes del encuentro, junto con los clips segmentados correspondientes, a fin de asistir al cuerpo técnico de instituciones del ámbito amateur regional en la preparación táctica de los partidos. El rugby constituye el objeto concreto sobre el cual el sistema se diseña, implementa y valida; la organización modular del sistema se asume como una orientación de diseño y no como un objetivo a validar en el presente Trabajo Final.

### Objetivos Específicos

1. Relevar y delimitar el conjunto de eventos tácticos del rugby susceptibles de reconocimiento automático en video, definiendo los criterios observables de identificación de cada uno.
2. Construir un conjunto de datos representativo, etiquetado temporalmente, a partir de grabaciones de partidos en formato estándar.
3. Diseñar la arquitectura modular del sistema, separando las responsabilidades de percepción, interpretación semántica y gestión de eventos.
4. Implementar el módulo de percepción (detección y seguimiento de jugadores, árbitros y balón).
5. Implementar el módulo de reconocimiento de eventos tácticos y su localización temporal.
6. Desarrollar el módulo de catalogación y segmentación automática de clips.
7. Evaluar empíricamente el desempeño del sistema sobre grabaciones reales mediante métricas objetivas.
8. Documentar el proceso de diseño, desarrollo y validación conforme al Reglamento de TF.

### Metas

- **M1** — Catálogo documentado de eventos tácticos del rugby con sus criterios de observación.
- **M2** — Conjunto de datos etiquetado a partir de grabaciones reales, particionado para entrenamiento y evaluación.
- **M3** — Arquitectura modular del sistema especificada y documentada.
- **M4** — Prototipo funcional que procesa una grabación completa y produce el catálogo de eventos y los clips segmentados.
- **M5** — Informe de evaluación del desempeño con métricas objetivas de reconocimiento sobre el conjunto de prueba.
- **M6** — Documentación final del Trabajo Final conforme al Reglamento de TF de la UCSE DAR.

> El desarrollo completo de este apartado se encuentra en [`02_objetivos_y_metas.md`](02_objetivos_y_metas.md).

---

## 4. Antecedentes

_A desarrollar._

---

## 5. Justificación

_A desarrollar._

---

## 6. Marco Teórico

_A desarrollar._

---

## 7. Metodología

_A desarrollar._

---

## 8. Alcance

_A desarrollar._

---

## 9. Plan de Trabajo y Cronograma

_A desarrollar._

---

## 10. Bibliografía Tentativa

_A desarrollar._

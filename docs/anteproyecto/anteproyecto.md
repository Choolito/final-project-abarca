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

_A desarrollar._

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

Este apartado delimita **qué se va a hacer y qué no se va a hacer** en el Trabajo Final, manteniendo el esfuerzo acotado a un objetivo demostrable.

**Qué se va a hacer:**

- Sistema **exclusivamente de software** sobre grabaciones de rugby en formato de video estándar.
- Detección y seguimiento de jugadores y balón.
- Reconocimiento del *line-out* (evento inicial y único de validación obligatoria) y su localización temporal.
- Registro indexado de eventos y **generación automática de clips segmentados**.
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

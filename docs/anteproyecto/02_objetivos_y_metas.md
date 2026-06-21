# 02 — Objetivos y Metas

> **Reglamento de TF — UCSE DAR, Art. 6b, inciso 2.**
> Trabajo Final de Carrera — Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

---

## 1. Objetivo General

Desarrollar y validar un sistema de software para el **reconocimiento automático de eventos deportivos en video de partidos de rugby**, que opere exclusivamente sobre grabaciones en formato estándar —sin requerir instrumentación física del entorno de juego— y produzca una catalogación estructurada de los eventos tácticos relevantes del encuentro, junto con los clips segmentados correspondientes, a fin de asistir al cuerpo técnico de instituciones del ámbito amateur regional en la preparación táctica de los partidos.

> El **rugby** constituye el objeto concreto sobre el cual el sistema se diseña, implementa y valida. La organización modular del sistema —que separa el núcleo de procesamiento de video del catálogo de eventos propio de la disciplina— se asume como una **orientación de diseño** que no clausura su extensión futura a otros deportes de características análogas, pero **no se formula como un objetivo a validar** en el presente Trabajo Final.

---

## 2. Objetivos Específicos

Para alcanzar el objetivo general se establecen los siguientes objetivos específicos:

1. **Relevar y delimitar** el conjunto de eventos tácticos del rugby susceptibles de reconocimiento automático en video (formaciones fijas, infracciones y gestos arbitrales), definiendo para cada uno los criterios observables que permiten su identificación y etiquetado.

2. **Construir un conjunto de datos** representativo a partir de grabaciones de partidos en formato estándar, etiquetado temporalmente según el catálogo de eventos definido, que sirva como base para el entrenamiento y la evaluación del sistema.

3. **Diseñar la arquitectura** del sistema bajo criterios de modularidad, separando las responsabilidades de percepción (detección y seguimiento de agentes en el cuadro de video), de interpretación semántica (reconocimiento de estados espacio-temporales) y de gestión de eventos (catalogación y segmentación de clips).

4. **Implementar el módulo de percepción**, capaz de detectar y seguir a los agentes relevantes del juego (jugadores, árbitros y balón) a lo largo de la secuencia de video.

5. **Implementar el módulo de reconocimiento de eventos**, que a partir de las primitivas de percepción identifique los eventos tácticos del catálogo y determine su localización temporal dentro de la grabación.

6. **Desarrollar el módulo de catalogación y segmentación**, que registre los eventos detectados de forma indexada y genere automáticamente los clips de video correspondientes, dejándolos disponibles para el cuerpo técnico.

7. **Evaluar empíricamente** el desempeño del sistema sobre grabaciones reales de partidos, mediante métricas objetivas de calidad del reconocimiento, contrastando los resultados con un etiquetado de referencia.

8. **Documentar** el proceso de diseño, desarrollo y validación conforme a las exigencias metodológicas y reglamentarias del Trabajo Final.

---

## 3. Metas

Las metas constituyen los resultados concretos y verificables comprometidos por el Trabajo Final:

| # | Meta | Verificable mediante |
|---|------|----------------------|
| M1 | Catálogo documentado de eventos tácticos del rugby a reconocer, con sus criterios de observación. | Documento de especificación del catálogo de eventos. |
| M2 | Conjunto de datos etiquetado a partir de grabaciones reales de partidos, particionado para entrenamiento y evaluación. | Dataset versionado y descripción del protocolo de etiquetado. |
| M3 | Arquitectura modular del sistema especificada y documentada. | Documento de diseño arquitectónico. |
| M4 | Prototipo funcional capaz de procesar una grabación completa y producir el catálogo de eventos y los clips segmentados. | Demostración del prototipo sobre un partido de prueba. |
| M5 | Informe de evaluación del desempeño del sistema con métricas objetivas de reconocimiento sobre el conjunto de prueba. | Informe de resultados con métricas y análisis. |
| M6 | Documentación final del Trabajo Final conforme al Reglamento de TF de la UCSE DAR. | Documento de TF aprobado por la cátedra. |

> Los umbrales cuantitativos de las métricas de evaluación (meta M5) se definirán en el apartado de **Metodología** (Art. 6b.6) y **Alcance** (Art. 6b.7), una vez caracterizado el conjunto de datos disponible.

---

*Los apartados subsiguientes del anteproyecto —Antecedentes (Art. 6b.3), Justificación (Art. 6b.4), Marco Teórico (Art. 6b.5), Metodología (Art. 6b.6), Alcance (Art. 6b.7), Plan de Trabajo y Cronograma (Art. 6b.8) y Bibliografía Tentativa (Art. 6b.9)— se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

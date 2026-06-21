# 02 — Objetivos Generales y Específicos

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

1. **Relevar y delimitar** el conjunto de eventos tácticos del rugby susceptibles de reconocimiento automático en video (formaciones fijas, infracciones y gestos arbitrales), definiendo para cada uno los criterios observables que permiten su identificación, y **construir** a partir de grabaciones reales en formato estándar un conjunto de datos etiquetado temporalmente que sirva de base para el entrenamiento y la evaluación del sistema.

2. **Diseñar la arquitectura** del sistema bajo criterios de modularidad, separando las responsabilidades de percepción (detección y seguimiento de agentes en el cuadro de video), de interpretación semántica (reconocimiento de estados espacio-temporales) y de gestión de eventos (catalogación y segmentación de clips).

3. **Implementar el módulo de percepción**, capaz de detectar y seguir a los agentes relevantes del juego —jugadores, árbitros y balón— a lo largo de la secuencia de video.

4. **Implementar el módulo de reconocimiento y catalogación de eventos**, que a partir de las primitivas de percepción identifique los eventos tácticos del catálogo, determine su localización temporal en la grabación, los registre de forma indexada y genere automáticamente los clips segmentados correspondientes.

5. **Evaluar empíricamente** el desempeño del sistema sobre grabaciones reales de partidos, mediante métricas objetivas de calidad del reconocimiento, contrastando los resultados con un etiquetado de referencia.

---

*Los apartados subsiguientes del anteproyecto —Antecedentes (Art. 6b.3), Justificación (Art. 6b.4), Marco Teórico (Art. 6b.5), Metodología (Art. 6b.6), Alcance (Art. 6b.7), Plan de Trabajo y Cronograma (Art. 6b.8) y Bibliografía Tentativa (Art. 6b.9)— se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

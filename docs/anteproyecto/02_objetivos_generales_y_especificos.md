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

Los objetivos específicos se formulan bajo el criterio **SMART** —específicos, medibles, alcanzables, relevantes y acotados en el tiempo—. El sistema se aborda de manera incremental: el **line-out** se adopta como **evento inicial** sobre el cual se construye y valida la cadena completa de reconocimiento, dejando el *scrum* y el *ruck* como eventos de extensión. La delimitación definitiva de los eventos cubiertos se desarrolla en el apartado de *Alcance* (Art. 6b.7). Los umbrales cuantitativos consignados son metas de referencia preliminares, sujetas a ajuste definitivo en *Metodología* (Art. 6b.6) y *Alcance*. Los plazos se expresan en **semanas relativas al inicio del desarrollo**, sobre una duración total prevista de **6 meses (≈26 semanas)**; algunas actividades se solapan —en particular el etiquetado del dataset, que es la tarea de mayor extensión—. Su ubicación exacta en el calendario se detalla en el *Plan de Trabajo y Cronograma* (Art. 6b.8).

1. **Delimitar y especificar el catálogo de eventos.** Definir y documentar, dentro de las primeras **3 semanas** de desarrollo, el catálogo de eventos tácticos a reconocer —tomando el **line-out** como evento inicial y dejando especificados el *scrum* y el *ruck* como extensión—, estableciendo para cada uno sus criterios observables de identificación, validados con al menos un referente del cuerpo técnico del club de prueba. *(Medible: documento de catálogo con criterios del evento inicial + 2 eventos de extensión especificados.)*

2. **Construir el conjunto de datos etiquetado.** Conformar, entre la **semana 3 y la 14** (la actividad de mayor duración del proyecto, ≈12 semanas), un *dataset* de **al menos 200 clips de line-out** extraídos de grabaciones reales en distintos puntos de vista y condiciones de captura, anotados temporalmente y particionados en entrenamiento, validación y prueba (70/15/15), con un protocolo de etiquetado documentado y reproducible. *(Medible: ≥200 clips etiquetados y partición verificable.)*

3. **Diseñar la arquitectura modular del sistema.** Elaborar y aprobar con el director, antes del inicio de la etapa de implementación (hacia la **semana 5**), un documento de diseño que especifique las tres capas del sistema —percepción, interpretación semántica y gestión de eventos— con sus interfaces y responsabilidades definidas, de modo que cada módulo sea desarrollable y comprobable de forma independiente. *(Medible: documento de diseño aprobado, con las 3 capas e interfaces especificadas.)*

4. **Implementar el módulo de percepción.** Desarrollar, hacia la **semana 16**, el componente de detección y seguimiento de los agentes del juego (jugadores y balón) capaz de procesar una grabación completa, alcanzando sobre el conjunto de prueba un desempeño de detección de referencia de **mAP@0.5 ≥ 0,70** para la clase *jugador*. *(Medible: mAP@0.5 sobre conjunto de prueba.)*

5. **Implementar el módulo de reconocimiento y catalogación del line-out.** Desarrollar, hacia la **semana 22**, el componente que a partir de las primitivas de percepción identifique los line-outs, determine su localización temporal, los registre de forma indexada y genere automáticamente los clips segmentados, alcanzando sobre el conjunto de prueba un **F1-score ≥ 0,70** en la detección del evento. *(Medible: F1-score del evento sobre conjunto de prueba.)*

6. **Evaluar empíricamente el sistema.** Medir, antes del cierre del Trabajo Final (hacia la **semana 26**), el desempeño del sistema completo sobre el conjunto de prueba mediante precisión, exhaustividad y F1-score del line-out, contrastando los resultados con el etiquetado de referencia, y documentar las conclusiones en un informe de evaluación. *(Medible: informe con métricas precisión/exhaustividad/F1.)*

---

*Los apartados subsiguientes del anteproyecto —Antecedentes (Art. 6b.3), Justificación (Art. 6b.4), Marco Teórico (Art. 6b.5), Metodología (Art. 6b.6), Alcance (Art. 6b.7), Plan de Trabajo y Cronograma (Art. 6b.8) y Bibliografía Tentativa (Art. 6b.9)— se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

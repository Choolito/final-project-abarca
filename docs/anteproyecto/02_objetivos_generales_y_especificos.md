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

Los objetivos específicos se formulan bajo el criterio **SMART** —específicos, medibles, alcanzables, relevantes y acotados en el tiempo—. Los umbrales cuantitativos consignados son metas de referencia preliminares, sujetas a ajuste definitivo en los apartados de *Metodología* (Art. 6b.6) y *Alcance* (Art. 6b.7) una vez caracterizado el conjunto de datos disponible.

1. **Delimitar y especificar el catálogo de eventos.** Definir, durante los primeros 2 meses del proyecto, un catálogo documentado de al menos **6 eventos tácticos** del rugby susceptibles de reconocimiento en video (formaciones fijas, infracciones y gestos arbitrales), estableciendo para cada uno sus criterios observables de identificación, validados con al menos un referente del cuerpo técnico del club de prueba.

2. **Construir el conjunto de datos etiquetado.** Conformar, en un plazo de 3 meses, un *dataset* a partir de grabaciones reales en formato estándar con un mínimo de **3 partidos completos** anotados temporalmente según el catálogo, particionado en subconjuntos de entrenamiento, validación y prueba, y documentado mediante un protocolo de etiquetado reproducible.

3. **Diseñar la arquitectura modular del sistema.** Producir un documento de diseño que especifique las tres capas del sistema —percepción, interpretación semántica y gestión de eventos— con sus interfaces y responsabilidades definidas, de modo que cada módulo sea desarrollable y comprobable de forma independiente.

4. **Implementar el módulo de percepción.** Desarrollar el componente de detección y seguimiento de los agentes del juego (jugadores, árbitros y balón) que procese una grabación completa y alcance, sobre el conjunto de prueba, un desempeño de detección de referencia de **mAP ≥ 0,70** para la clase jugador.

5. **Implementar el módulo de reconocimiento y catalogación de eventos.** Desarrollar el componente que, a partir de las primitivas de percepción, identifique los eventos del catálogo, determine su localización temporal, los registre de forma indexada y genere automáticamente los clips segmentados correspondientes para su consulta por el cuerpo técnico.

6. **Evaluar empíricamente el sistema.** Medir el desempeño del sistema completo sobre el conjunto de prueba mediante métricas objetivas (precisión, exhaustividad y F1 por tipo de evento), contrastando los resultados con el etiquetado de referencia, y documentar las conclusiones en un informe de evaluación antes del cierre del Trabajo Final.

---

*Los apartados subsiguientes del anteproyecto —Antecedentes (Art. 6b.3), Justificación (Art. 6b.4), Marco Teórico (Art. 6b.5), Metodología (Art. 6b.6), Alcance (Art. 6b.7), Plan de Trabajo y Cronograma (Art. 6b.8) y Bibliografía Tentativa (Art. 6b.9)— se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

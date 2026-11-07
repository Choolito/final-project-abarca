# 06 — Metodología de Trabajo

> **Reglamento de TF — UCSE DAR, Art. 6b, inciso 6.**
> Trabajo Final de Carrera — Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

---

## 1. Metodología de Trabajo

Este apartado define las estrategias con las que se desarrollará el trabajo. Cierra las decisiones que los *Objetivos* le delegan: cómo se construye y valida el conjunto de datos, cómo se mide cada métrica y qué proceso de desarrollo se sigue. Los conceptos técnicos que se mencionan se desarrollan en el *Marco Teórico* ([`05_marco_teorico.md`](05_marco_teorico.md)).

> Las referencias completas se encuentran en [`09_bibliografia.md`](09_bibliografia.md).

### 1.1. Modelo de proceso

El trabajo combina tres enfoques, uno por cada nivel del proyecto:

| Nivel | Enfoque | Qué gobierna |
|---|---|---|
| Gestión del proyecto | **PMBOK**, 7.ª ed. (Project Management Institute, 2021) | Los dominios de desempeño de planificación, medición e incertidumbre: hitos y cronograma, seguimiento del avance y gestión de riesgos |
| Ciclo de aprendizaje automático | **CRISP-ML(Q)** (Studer et al., 2021) | Las iteraciones técnicas, desde los datos hasta la evaluación, con aseguramiento de calidad en cada fase |
| Desarrollo de software | **Iterativo e incremental** | La construcción del sistema por capas, empezando por el line-out |

CRISP-ML(Q) extiende CRISP-DM con controles de calidad específicos de ML y se organiza en seis fases. Su correspondencia con los objetivos específicos es la siguiente:

| Fase de CRISP-ML(Q) | Objetivo específico | Control de calidad principal |
|---|---|---|
| Comprensión del dominio y de los datos | 1 (catálogo) | Criterios observables validados con el cuerpo técnico |
| Ingeniería de datos | 2 (dataset) | Acuerdo de anotación y partición sin fuga (§1.3) |
| Ingeniería del modelo | 4 y 5 (percepción y evento) | Selección de modelos sólo sobre validación (§1.4) |
| Aseguramiento de calidad (evaluación) | 6 (evaluación) | Métricas sobre el conjunto de prueba, usado una sola vez |
| Despliegue | 5 (clips y catálogo) | Generación de clips verificada sobre partidos de prueba |
| Monitoreo y mantenimiento | — | Fuera del alcance del TF |

El desarrollo se organiza en **iteraciones cortas**, cuya duración se fija en el *Plan de trabajo y cronograma*. El seguimiento se lleva en los *issues* del repositorio, priorizados con un sistema de etiquetas, y el código y la documentación se versionan con Git siguiendo el flujo *Git Flow*, con integración continua.

**Seguimiento con el Director.** El trabajo se desarrolla bajo la dirección del Ing. Mariano Ferrero, docente de Inteligencia Artificial de la UCSE DAR (Profesor Tutor, Art. 6a), mediante **reuniones periódicas de seguimiento**. El autor lleva un registro de cada reunión con los puntos tratados, las decisiones tomadas y las tareas acordadas, y el documento final se revisa en forma iterativa.

### 1.2. Componentes que se entrenan

El sistema integra componentes de distinta naturaleza. Sólo dos se entrenan; el resto son algoritmos o reglas que se configuran:

| Componente | ¿Se entrena? | Cómo | Datos | Evaluación |
|---|---|---|---|---|
| Detector YOLO | **Sí, por ajuste fino** | Desde pesos preentrenados en COCO | Cajas de *jugador* y *balón* | AP@0.5 de *jugador* (objetivos 4 y 6) |
| Seguimiento BoT-SORT | No | Algoritmo; se configuran umbrales y la compensación del movimiento de cámara | — | Sin evaluación formal |
| Características geométricas | No | Se calculan a partir de las trayectorias | — | — |
| Modelo temporal (LSTM/GRU o convolución 1D) | **Sí, desde cero** | Sobre la serie de características | Instantes de lanzamiento | F1 con δ = 3 s (objetivos 5 y 6) |
| Línea base heurística | No | Reglas fijas sobre las mismas características | — | F1 con δ = 3 s, como comparación |
| Clips y catálogo | No | FFmpeg y SQLite | — | Verificación funcional |

### 1.3. Protocolo de construcción del conjunto de datos

**Fuente.** Grabaciones del **plantel superior** del Círculo Rafaelino de Rugby (CRAR), todas de jugadores mayores de 18 años, en partidos **de local y de visitante**. Estos últimos aportan distintas canchas, fondos, iluminaciones y condiciones de captura. Se dispone de más de 60 partidos. Se anotan partidos hasta reunir **≈300 line-outs**, por encima de la meta de 200 del objetivo 2. A razón de ≈25 line-outs por partido (Cullen, 2026), se estiman unos 12 partidos. Los partidos no anotados quedan como **reserva** para el punto de decisión de §1.5.

**Datos personales.** Las imágenes de los jugadores son datos personales en los términos de la Ley 25.326 (Ley N.º 25.326, 2000). Esto incluye a los jugadores de los equipos rivales, que son terceros sin vínculo con el club caso testigo. Por eso el material se almacena en forma local, con copias de respaldo cifradas, el conjunto de datos no se publica y las figuras del informe no permiten identificar a ningún jugador.

**Anotación.** Se construyen dos conjuntos, uno por componente entrenado:

1. **Instantes de lanzamiento.** Para cada partido se registra en una planilla el instante en que el balón sale de las manos del lanzador (Ley 18.20, ver *Marco Teórico* §1.1), junto con el partido y el lado de la cancha. Una **guía de etiquetado** escrita fija los casos dudosos, como line-outs fuera de cuadro o lanzamientos repetidos, y se valida con el referente técnico del club.
2. **Cajas delimitadoras.** Se anotan entre 300 y 500 cuadros, muestreados de los partidos de cada partición y de situaciones variadas (line-outs, juego abierto, distintos planos). Las cajas se **pre-anotan** con el detector preentrenado en COCO y se corrigen a mano en **CVAT** (CVAT.ai Corporation, s.f.), que exporta directamente al formato de YOLO.

**Control de calidad.** Como el trabajo es individual (Art. 4 del Reglamento), la calidad de la anotación se mide de dos formas:

- **Acuerdo intra-anotador:** el autor vuelve a anotar un partido al menos tres semanas después de la primera anotación.
- **Acuerdo inter-anotador:** el referente técnico del club anota un partido de forma independiente.

En ambos casos se informa el error absoluto medio entre instantes, en segundos, y el porcentaje de marcas que coinciden dentro de δ = 3 s. Para las cajas se informa el IoU medio entre anotaciones.

**Partición por partido, balanceada por line-outs.** Cada partido se asigna completo a un único conjunto. Los line-outs y cuadros de un mismo partido comparten cancha, iluminación y equipos, y repartirlos entre conjuntos produciría una **fuga de datos** que inflaría las métricas. Como la cantidad de line-outs varía entre partidos, la proporción 70/15/15 del objetivo 2 se mide sobre el **total de line-outs** y no sobre la cantidad de partidos: los partidos se asignan de modo que entrenamiento, validación y prueba reúnan aproximadamente el 70 %, el 15 % y el 15 % de los line-outs, y se informa la proporción finalmente alcanzada. Los cuadros con cajas siguen la misma partición. Además, la asignación procura que validación y prueba incluyan partidos de local y de visitante, para que reflejen la variedad de condiciones de captura.

**Documentación.** El conjunto de datos se documenta con una ficha según *Datasheets for Datasets* (Gebru et al., 2021): origen, criterios de selección de partidos, guía de etiquetado, acuerdo entre anotaciones y partición. Un **manifiesto** con el *hash* de cada archivo de video y la asignación de partidos a conjuntos garantiza que la partición sea reproducible.

### 1.4. Protocolo de entrenamiento y evaluación

**Roles de cada conjunto.**

| Conjunto | Uso |
|---|---|
| Entrenamiento | Ajustar los pesos de los modelos |
| Validación | Elegir hiperparámetros, detener el entrenamiento a tiempo, fijar el umbral de confianza y comparar el modelo contra la línea base |
| Prueba | Medir las métricas que se reportan. Se usa **una sola vez**, al final |

**Detección (objetivo 4).** YOLO se ajusta desde los pesos de COCO. La variante y la resolución de entrada se eligen por el AP en validación. La meta definitiva es un **AP@0.5 ≥ 0,70 para la clase *jugador***, medido sobre el conjunto de prueba en la evaluación final (objetivo 6). Para el balón se informa el resultado sin umbral exigido.

**Reconocimiento del line-out (objetivo 5).** El modelo temporal se entrena sobre la serie de características geométricas de los partidos de entrenamiento, con dilatación de etiquetas y muestreo balanceado de ventanas negativas. La línea base heurística se calibra con los mismos datos. La meta definitiva es un **F1 ≥ 0,70 con δ = 3 s**, medido sobre el conjunto de prueba en la evaluación final (objetivo 6), con el criterio de acierto uno a uno definido en el *Marco Teórico* §1.7. Como datos complementarios se informan el F1 con δ = 2 s, la curva de F1 para δ ∈ {1, 2, 3, 5} s y el average-mAP.

**Incertidumbre de las métricas.** Con ≈300 line-outs y la partición 70/15/15, el conjunto de prueba reúne ≈45 line-outs de pocos partidos, por lo que un F1 puntual tiene un margen de error del orden de ±0,1. Las métricas de prueba se informan con un **intervalo de confianza del 95 % por *bootstrap***, remuestreando partidos completos. Si el tiempo lo permite, se suma una validación cruzada dejando un partido afuera por vez (*leave-one-match-out*) como estimación complementaria.

**Tiempo de procesamiento (objetivo 6).** Se mide el tiempo que el sistema completo demora en procesar un partido, tanto en GPU como sólo en CPU, para dimensionar los requisitos de cómputo de un club que quiera utilizarlo.

**Análisis de errores (objetivo 6).** Los falsos positivos y negativos del conjunto de prueba se clasifican según su causa probable: line-out en el lado lejano de la cancha, oclusión, movimiento de cámara, formación parcial fuera de cuadro o falla de la detección. El análisis orienta las conclusiones y el trabajo futuro.

**Registro de experimentos.** Cada entrenamiento registra su configuración, la semilla aleatoria, las métricas y los artefactos producidos con **MLflow** (Zaharia et al., 2018), en modo local. Así cualquier resultado del informe puede rastrearse hasta el experimento que lo generó.

### 1.5. Punto de decisión y riesgos

Al cumplirse el objetivo 4, hacia la **semana 16**, se evalúa el detector sobre el conjunto de validación (**Go/No-Go**). La capa semántica ya está en desarrollo para ese momento, con las detecciones disponibles. Si el AP@0.5 de *jugador* no alcanza 0,70, se aplican en orden las siguientes medidas, financiadas con la reserva de horas del cronograma:

1. ampliar la anotación de cajas con cuadros de los partidos de reserva;
2. aumentar la resolución de entrada o usar una variante más grande de YOLO;
3. aplicar inferencia por mosaicos.

Si tras las tres medidas el umbral sigue sin alcanzarse, se continúa con el mejor detector obtenido: el umbral es una meta de desempeño y no una condición para avanzar. El desvío se documenta y se analiza su impacto sobre el objetivo 5.

| Riesgo | Impacto | Mitigación |
|---|---|---|
| El detector no alcanza el umbral | Objetivo 4 | Punto de decisión de la semana 16 |
| El F1 del evento no alcanza el umbral | Objetivo 5 | Revisar las características, sumar partidos de la reserva y analizar errores sobre validación |
| Grabaciones con encuadre o calidad insuficiente | Objetivos 2, 4 y 5 | Criterios de selección de partidos y reserva de partidos no anotados |
| Incompatibilidades entre el software y el hardware disponible | Objetivos 4 y 5 | Verificar y fijar las versiones del entorno antes de entrenar |
| Paneo y *zoom* de la cámara | Objetivos 4 y 5 | Compensación del movimiento de cámara y características normalizadas por la altura de los jugadores |
| Menor disponibilidad horaria del autor | Todos | Reserva de horas en el cronograma y priorización del núcleo sobre las extensiones |
| Pérdida de datos o anotaciones | Objetivo 2 | Copias de respaldo periódicas y versionado del manifiesto y de las anotaciones |

### 1.6. Arquitectura e implementación

El sistema se implementa como un **pipeline *offline*** de tres capas. Cada capa persiste un artefacto intermedio que materializa su interfaz con la siguiente:

| Capa | Entrada | Artefacto de salida |
|---|---|---|
| Percepción | Video | Detecciones y trayectorias por cuadro (formato tabular tipo MOTChallenge) |
| Semántica | Trayectorias | Serie temporal de confianza y lista de eventos (instante, confianza) |
| Eventos | Lista de eventos y video | Clips y catálogo indexado |

Los artefactos permiten volver a ejecutar una etapa sin recalcular las anteriores, por ejemplo para probar otro modelo semántico sobre las mismas trayectorias, y hacen reproducibles los experimentos. El diseño detallado de las capas y sus interfaces es el entregable del objetivo 3, que se presenta al Director antes de la implementación.

Los clips de ±10 s se recortan con FFmpeg **recodificando** el video. La copia directa del flujo (*stream copy*) sólo puede cortar en cuadros clave y desfasaría la ventana en hasta algunos segundos; con unos 25 clips de 20 s por partido, el costo de recodificar es despreciable. El catálogo se guarda en SQLite con el partido, el instante, la confianza, la ruta del clip y un estado de revisión. El sistema se opera por línea de comandos.

### 1.7. Herramientas y entorno de cómputo

| Uso | Herramienta |
|---|---|
| Lenguaje y aprendizaje profundo | Python y PyTorch |
| Detección y seguimiento | Ultralytics YOLO y BoT-SORT |
| Procesamiento de video | OpenCV y FFmpeg |
| Anotación | CVAT (cajas) y planilla de instantes |
| Registro de experimentos | MLflow (local) |
| Persistencia | SQLite |
| Versionado y gestión | Git y GitHub: *Git Flow*, *issues* con etiquetas e integración continua |

Las herramientas son de referencia: pueden reemplazarse por equivalentes sin modificar el método.

El desarrollo se realiza sobre el equipo del autor, con una **GPU de 16 GB de VRAM** y **64 GB de RAM**. Esta configuración alcanza para ajustar variantes medianas y grandes de YOLO y para entrenar el modelo temporal, que tiene pocos parámetros. Así se cumple el supuesto del *Alcance* de trabajar con recursos de cómputo propios, sin infraestructura especializada. El entorno se fija con las versiones exactas de cada dependencia y semillas aleatorias controladas.

---

*Los apartados subsiguientes del anteproyecto se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

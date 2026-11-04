# 05 — Marco Teórico

> **Reglamento de TF — UCSE DAR, Art. 6b, inciso 5.**
> Trabajo Final de Carrera — Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

---

## 1. Marco Teórico

Este apartado expone los aspectos teórico-prácticos necesarios para el desarrollo del trabajo. El criterio de selección es deliberadamente acotado: se desarrollan **sólo los conceptos que nombran los *Objetivos* y el *Alcance***. Son las tres capas del sistema, las métricas mAP y F1, el line-out y los clips de ±10 s. Al cierre se confirma o ajusta el stack tecnológico tentativo de [`01_titulo_y_problema.md`](01_titulo_y_problema.md) §3.3.

| Concepto | Capa del sistema | Objetivo específico que lo requiere |
|---|---|---|
| Line-out: definición y rasgos observables | — (dominio) | 1 (catálogo), 2 (dataset) |
| Detección de objetos y mAP@0.5 | 1 — Percepción | 4 |
| Seguimiento multi-objeto | 1 — Percepción | 4 |
| *Action spotting* y criterio de acierto temporal | 2 — Semántica | 5, 6 |
| Pipeline *offline*, clips y persistencia | 3 — Eventos | 3, 5 |

> Las referencias completas se encuentran en [`09_bibliografia.md`](09_bibliografia.md).

### 1.1. Dominio: el line-out

El line-out es la formación con la que se reanuda el juego cuando el balón sale por la línea de *touch*. Está regulado por la Ley 18 del reglamento de World Rugby (*Touch, quick throw and lineout*) (World Rugby, s.f.). A los fines de este trabajo interesan los rasgos que la ley impone y que, por lo tanto, son **observables en video**:

- **Dos filas paralelas** de jugadores, una por equipo, perpendiculares a la línea de *touch*, con un mínimo de dos jugadores por fila.
- **Ubicación acotada**: las filas se forman entre las líneas de 5 m y de 15 m, es decir, siempre junto a una de las bandas.
- **Un espacio de separación** de aproximadamente 1 m entre ambas filas.
- **Un lanzador** ubicado en la marca de *touch*, fuera del campo, que arroja el balón en línea recta a lo largo de la línea de lanzamiento, entre ambas filas.
- **Saltadores elevados** por compañeros, que disputan el balón en el aire.

Estos rasgos tienen dos consecuencias de diseño:

1. El line-out es una **configuración espacial colectiva muy característica** y relativamente estática en los segundos previos al lanzamiento. Por eso puede describirse a partir de la **disposición de los jugadores**, sin necesidad de modelar gestos individuales.
2. Tiene un **instante canónico**: el momento en que el balón sale de las manos del lanzador. Es breve, inequívoco y fácil de marcar por un anotador. Se adopta como **instante de referencia del evento** para la anotación (objetivo 2) y para la evaluación (§1.7), sujeto a validación con el referente técnico del club (issue #19).

### 1.2. Fundamentos: video digital, aprendizaje profundo y transferencia

**Video digital.** Una grabación es una secuencia de cuadros (*frames*) muestreados a una tasa fija, típicamente de 25 a 60 cuadros por segundo (Szeliski, 2022). Un partido de 80 minutos a 25 fps tiene ≈120.000 cuadros. Para un problema de eventos poco frecuentes, el costo de procesamiento obliga a **submuestrear temporalmente** la señal. Se procesan, por ejemplo, entre 2 y 5 cuadros por segundo en la capa semántica, con un costo acotado en precisión temporal, que es compatible con la tolerancia definida en §1.7.

**Aprendizaje profundo.** Las redes neuronales convolucionales (CNN) aprenden representaciones jerárquicas de la imagen, que van de bordes y texturas a partes y objetos, mediante capas de convolución entrenadas por descenso del gradiente (Goodfellow et al., 2016). Las conexiones residuales permitieron entrenar redes muy profundas de forma estable y son hoy la base de la mayoría de los extractores de características (He et al., 2016).

**Aprendizaje por transferencia.** Las características aprendidas en grandes conjuntos genéricos se reutilizan en dominios nuevos con pocos datos. Se parte de un modelo preentrenado y se lo ajusta (*fine-tuning*) con el conjunto propio (Pan & Yang, 2010; Yosinski et al., 2014). Es una condición de viabilidad del trabajo: el dataset objetivo tiene del orden de 200 line-outs. COCO (Lin et al., 2014) ya incluye las clases *person* y *sports ball*, por lo que el detector parte de un punto de partida razonable y sólo debe adaptarse a la escala, el encuadre y las oclusiones del video amateur.

### 1.3. Capa de percepción I: detección de objetos

**Detectores de una etapa.** La familia **YOLO** (*You Only Look Once*) formula la detección como una única regresión. La red predice en una sola pasada las cajas delimitadoras y las probabilidades de clase sobre una grilla de la imagen (Redmon et al., 2016). Las versiones actuales, mantenidas por Ultralytics (Jocher et al., 2023), son detectores sin *anchors*, con variantes de distinto tamaño. Permiten intercambiar exactitud por velocidad con la misma interfaz de entrenamiento e inferencia. Para un procesamiento *offline* sobre hardware estándar, una variante mediana a resolución de entrada 640–1280 px es un punto de equilibrio razonable.

**Objetos pequeños.** En el plano general de una cámara amateur, los jugadores del lado opuesto de la cancha y, sobre todo, el balón ocupan pocas decenas de píxeles. Para este caso, la inferencia por mosaicos (*slicing*) divide el cuadro en recortes superpuestos y luego fusiona las detecciones, con lo que mejora la exhaustividad en objetos pequeños a cambio de mayor costo (Akyon et al., 2022). Se reserva como alternativa para la clase *balón*, que por esta razón no tiene umbral exigido en el objetivo 4.

**Conceptos de evaluación.**

- **IoU** (*Intersection over Union*): cociente entre el área de intersección y el área de unión de la caja predicha y la caja real. Una predicción se considera correcta si su IoU con una caja real no asignada supera un umbral.
- **NMS** (*Non-Maximum Suppression*): posprocesamiento que elimina las cajas redundantes sobre un mismo objeto y conserva la de mayor confianza.
- **AP y mAP**: la *Average Precision* es el área bajo la curva precisión-exhaustividad de una clase, que se obtiene al ordenar las predicciones por confianza. El **mAP@0.5** promedia la AP de las clases con umbral de IoU 0,5, según el criterio de PASCAL VOC (Everingham et al., 2010). Es la métrica del **objetivo 4**, exigida para la clase *jugador*. COCO popularizó una variante más estricta que promedia los umbrales de IoU entre 0,5 y 0,95. Se reportará como dato complementario, sin umbral asociado.

### 1.4. Capa de percepción II: seguimiento multi-objeto

El seguimiento multi-objeto (MOT) asocia las detecciones de cuadros sucesivos en **trayectorias** con identidad persistente. El paradigma dominante es el ***tracking-by-detection***, que combina tres componentes:

1. un **detector** por cuadro (§1.3);
2. un **modelo de movimiento** que predice la posición de cada trayectoria en el cuadro siguiente, típicamente un **filtro de Kalman** con modelo de velocidad constante (Kalman, 1960);
3. una **asociación** entre predicciones y detecciones, resuelta como un problema de asignación con el **algoritmo húngaro** sobre una matriz de costos basada en IoU o en similitud de apariencia (Kuhn, 1955).

| Algoritmo | Asociación | Fortaleza | Limitación en rugby |
|---|---|---|---|
| SORT (Bewley et al., 2016) | Kalman + IoU | Muy rápido y simple | Pierde la identidad ante oclusiones |
| DeepSORT (Wojke et al., 2017) | Kalman + IoU + *embedding* de apariencia | Recupera identidades tras oclusiones breves | Requiere un modelo de re-identificación. Jugadores del mismo equipo visten igual, lo que debilita la apariencia como discriminante |
| **ByteTrack** (Y. Zhang et al., 2022) | Kalman + IoU en dos rondas: detecciones de alta confianza y, luego, las de **baja confianza** | Recupera objetos parcialmente ocluidos, cuya confianza cae, sin modelo de apariencia | Depende de la calidad del modelo de movimiento en cambios bruscos |
| BoT-SORT (Aharon et al., 2022) | ByteTrack + compensación del movimiento de cámara; apariencia opcional (ReID) | Tolera los paneos de una cámara operada a mano | La variante con ReID hereda la debilidad de la apariencia |

En el line-out, la oclusión es estructural: hay dos filas compactas, saltadores elevados y levantadores superpuestos. ByteTrack ataca exactamente ese caso, porque no descarta las detecciones de baja confianza, que son las típicas de un jugador parcialmente tapado. Además, no agrega un modelo de re-identificación que entrenar. Por eso **se adopta ByteTrack como algoritmo de seguimiento**. Como **extensión opcional**, puede compararse con BoT-SORT: ambos vienen integrados en Ultralytics y se intercambian con un archivo de configuración, sin código adicional. DeepSORT, en cambio, no está integrado y se mantiene sólo como referencia conceptual de la asociación por apariencia.

Para este trabajo no se requiere identidad persistente durante todo el partido. Alcanza con **trayectorias coherentes en ventanas de algunos segundos**, que son las que alimentan las características de la capa semántica (§1.5.3). Por eso el seguimiento **se usa pero no se evalúa formalmente**: el objetivo 4 se mide sólo con el mAP de la detección. Las métricas estándar de MOT, **MOTA** (Bernardin & Stiefelhagen, 2008) e **IDF1** (Ristani et al., 2016), exigen anotar la identidad de cada jugador cuadro a cuadro, la anotación más costosa del dominio, y quedan como **extensión opcional**.

### 1.5. Capa semántica: comprensión temporal de video

#### 1.5.1. Tareas de comprensión temporal

La literatura distingue tres tareas con insumos, salidas y métricas distintas (Wu et al., 2022; Xu et al., 2025):

| Tarea | Insumo | Salida | Métrica típica | Ejemplos |
|---|---|---|---|---|
| Clasificación de acciones | Clip ya recortado | Una etiqueta por clip | Exactitud | C3D (Tran et al., 2015), SlowFast (Feichtenhofer et al., 2019) |
| Localización temporal (*temporal action localization*) | Video largo sin recortar | Segmentos (inicio, fin, clase) | mAP con umbral de tIoU | ActionFormer (C.-L. Zhang et al., 2022) |
| ***Action spotting*** | Video largo sin recortar | **Un instante** por evento (tiempo, clase) | Precisión, exhaustividad o mAP con **tolerancia temporal δ** | SoccerNet (Giancola et al., 2018), E2E-Spot (Hong et al., 2022) |

#### 1.5.2. Formulación adoptada: *action spotting*

**La tarea de la capa semántica es el *action spotting* del line-out.** Dado un partido completo, el sistema debe producir el conjunto de instantes en que ocurre un lanzamiento de line-out, cada uno con una confianza. El clip se obtiene después como una **ventana fija de ±10 s** alrededor de cada instante, tal como establece el *Alcance*.

Se elige spotting y no localización temporal por cuatro razones:

- **Coincide con la salida del sistema.** Un clip de ventana fija sólo necesita un instante, no los bordes del segmento.
- **Abarata la anotación.** Se marca un instante por evento en lugar de dos bordes, que además son ambiguos: es difícil decidir cuándo "empieza" un line-out que se forma de manera gradual. Esto reduce el costo de construir el dataset (objetivo 2) y la variabilidad entre anotadores.
- **Es la formulación estándar para eventos dispersos en videos largos.** Es el caso del deporte, que SoccerNet formalizó (Giancola et al., 2018; Deliège et al., 2021).
- **Hace medible el objetivo 5 sin ambigüedad**, mediante el criterio de acierto de §1.7.

**Desbalance extremo.** Con ≈25 line-outs por partido (Cullen, 2026), los instantes positivos son una fracción ínfima de la señal: menos de 1 cuadro positivo cada 4.000 a 25 fps. El entrenamiento debe compensarlo con **dilatación o suavizado de las etiquetas** alrededor del instante, que convierte el punto en una pequeña región de cuadros positivos, y con **muestreo balanceado** de ventanas negativas. En inferencia, la salida es una **serie temporal de confianza** sobre la que se aplica una **supresión de no-máximos temporal**: se conservan los picos y se eliminan los que caen a menos de una separación mínima de otro pico más fuerte, de modo que cada line-out produzca un solo instante.

#### 1.5.3. Enfoques candidatos

El enfoque **A** constituye el núcleo comprometido del trabajo; el enfoque **B** se describe como **extensión opcional**, a abordar sólo si el núcleo está cumplido:

**A. Características espaciales derivadas de la percepción y modelo temporal liviano (enfoque principal).** A partir de las detecciones y trayectorias de la capa 1, se calcula por cuadro un vector de características que codifica los rasgos de §1.1. Algunos ejemplos:

- cantidad de jugadores próximos a una banda;
- grado de alineación de esos jugadores en dos rectas paralelas, estimado por ajuste de rectas o análisis de componentes principales sobre los centros de las cajas;
- separación entre ambas filas;
- velocidad media del grupo, ya que el line-out es casi estático antes del lanzamiento.

La secuencia de vectores se procesa con un modelo temporal liviano, que puede ser una red recurrente **LSTM/GRU** (Hochreiter & Schmidhuber, 1997), una convolución temporal 1D o incluso un clasificador clásico sobre ventanas. El modelo emite la confianza por instante.

- *Ventajas:* tiene pocos parámetros, por lo que es entrenable con ≈200 eventos. Además, es **interpretable**, porque cada característica corresponde a un criterio del catálogo del objetivo 1, y desacopla las capas 1 y 2, como exige el objetivo 3.
- *Riesgo:* su desempeño queda acotado por la calidad de la percepción, de modo que los errores de detección se propagan.

**B. Modelo de video de extremo a extremo (extensión opcional).** Un modelo aprende directamente sobre los cuadros. **E2E-Spot** combina un extractor convolucional por cuadro (RegNet-Y) con módulos de desplazamiento temporal con compuertas (*Gate Shift Modules*) y una GRU bidireccional que clasifica cada cuadro (Hong et al., 2022). Fue diseñado para eventos de alta precisión temporal y es entrenable en una sola GPU. Las arquitecturas basadas en **Transformers** (Vaswani et al., 2017), como ActionFormer, logran el estado del arte en localización temporal, pero resuelven una tarea más rica que la necesaria y requieren más datos.

- *Ventajas:* no depende de reglas ni de la precisión del tracking.
- *Riesgo:* con un dataset pequeño tiende al sobreajuste y es menos interpretable.

La evaluación del enfoque A incluye, como parte del núcleo, una **línea base heurística**: reglas fijas sobre las mismas características geométricas, sin aprendizaje. Su costo es bajo y sirve para dimensionar cuánto aporta el aprendizaje a los resultados.

### 1.6. Estimación de pose

La estimación de pose localiza puntos clave del cuerpo, como hombros, caderas y rodillas. **MediaPipe** (Lugaresi et al., 2019) está optimizado para personas en primer plano y con gran tamaño en el cuadro. **OpenPose** (Cao et al., 2021) resuelve el caso multipersona, con mayor costo.

En el plano general de una cámara amateur, cada jugador ocupa pocas decenas de píxeles y está superpuesto con otros en la formación. En esas condiciones, la estimación de pose es poco confiable y su costo crece con la cantidad de jugadores. Además, los rasgos de §1.1 se describen con la **disposición de las cajas**, sin necesidad de articulaciones.

Por estas razones, **la estimación de pose se excluye del núcleo del sistema**. Queda como extensión posible, por ejemplo para reconocer el salto con elevación, si el enfoque A resultara insuficiente.

### 1.7. Métricas de evaluación del evento

El **objetivo 5** exige un **F1 ≥ 0,70** en la detección del line-out. Para que esa meta sea verificable sin ambigüedad, se define el siguiente **criterio de acierto**:

1. Cada evento real se representa por su instante anotado *t*, el del lanzamiento (§1.1). Cada predicción se representa por su instante *t̂* y su confianza.
2. Una predicción es un **verdadero positivo (TP)** si |*t̂* − *t*| ≤ **δ** para algún evento real todavía no asignado. La asignación es **uno a uno**: se recorren las predicciones de mayor a menor confianza, y cada evento real puede absorber como máximo una predicción.
3. Las predicciones no asignadas son **falsos positivos (FP)** y los eventos reales no asignados son **falsos negativos (FN)**.
4. Con esas cantidades se calculan (Sokolova & Lapalme, 2009):

   - **Precisión** = TP / (TP + FP)
   - **Exhaustividad** = TP / (TP + FN)
   - **F1** = 2 · P · E / (P + E)

**Tolerancia de referencia: δ = 5 s.** Con un clip de ±10 s, un error de hasta 5 s garantiza que el clip todavía contenga el lanzamiento con al menos 5 s de contexto a cada lado, de modo que sigue siendo útil para el cuerpo técnico. El valor definitivo se fija en *Metodología* (Art. 6b.6).

Para que los resultados sean comparables con la literatura, se reportarán dos datos adicionales:

- la **curva de F1 en función de δ**, con δ ∈ {1, 2, 5, 10} s;
- el **average-mAP** de SoccerNet, que promedia la AP en un rango de tolerancias (Giancola et al., 2018; Deliège et al., 2021).

El umbral de confianza que define el punto de operación se elige sobre el conjunto de **validación**, nunca sobre el de prueba.

### 1.8. Capa de eventos e ingeniería del sistema

**Arquitectura en capas.** El sistema adopta un estilo arquitectónico en capas. Cada capa ofrece servicios sólo a la superior y oculta su implementación tras una interfaz, lo que favorece la modificabilidad y la prueba independiente (Bass et al., 2021), tal como exige el objetivo 3.

**Pipeline *offline*.** Como el análisis es posterior al partido (*Alcance*), el sistema se implementa como un **pipeline por lotes**. Cada etapa persiste un **artefacto intermedio** con formato definido:

| Etapa | Entrada | Artefacto de salida |
|---|---|---|
| Percepción | Video | Detecciones y trayectorias por cuadro (formato tabular tipo MOTChallenge) |
| Semántica | Trayectorias o cuadros | Serie temporal de confianza y lista de eventos (instante, confianza) |
| Eventos | Lista de eventos y video | Clips, catálogo indexado en la base de datos |

Los artefactos intermedios **materializan las interfaces** entre capas y permiten re-ejecutar una etapa sin recalcular las anteriores. Por ejemplo, se puede probar otro modelo semántico sobre las mismas trayectorias. También hacen reproducibles los experimentos.

**Procesamiento de video y clips.** La lectura de cuadros se apoya en **OpenCV** (Bradski, 2000) y el recorte de clips, en **FFmpeg** (FFmpeg Developers, s.f.).

El recorte por copia de flujo (*stream copy*) es casi instantáneo, pero sólo puede cortar en cuadros clave. Eso introduce un desfase de hasta algunos segundos según el intervalo entre cuadros clave de la grabación. Para respetar la ventana de ±10 s, los clips se **recodifican**, lo que permite cortar en el cuadro exacto. Con unos 25 clips de 20 s por partido, el costo es despreciable.

**Persistencia y servicios.** El catálogo de eventos (partido, instante, confianza, ruta del clip, estado de revisión) se persiste en **SQLite**. Es suficiente para un uso monousuario y no requiere servidor. El sistema se opera mediante una **interfaz de línea de comandos** y deja los clips en una estructura de carpetas indexada por el catálogo, lo que alcanza para ponerlos a disposición del cuerpo técnico, tal como establece el *Alcance*. Exponer el catálogo como servicio web (por ejemplo, con **FastAPI**) queda como **extensión opcional**.

### 1.9. Síntesis: stack tecnológico confirmado

El stack se divide en un **núcleo comprometido**, necesario y suficiente para cumplir los objetivos específicos, y **extensiones opcionales**, que no condicionan ningún objetivo y se abordan sólo si el núcleo está cumplido.

| Componente | Stack tentativo (§3.3 del *Problema*) | Núcleo comprometido | Extensión opcional |
|---|---|---|---|
| Detección | YOLO | YOLO de Ultralytics, preentrenado en COCO y ajustado (objetivo 4) | Inferencia por mosaicos para el balón |
| Seguimiento | DeepSORT | **ByteTrack**, usado sin evaluación formal | Comparación con BoT-SORT; métricas MOTA e IDF1 |
| Reconocimiento temporal | SlowFast, LSTM o Transformers | *Action spotting* con características espaciales y un modelo temporal liviano (LSTM/GRU o convolución 1D), más una línea base heurística (objetivo 5) | Modelo de extremo a extremo (E2E-Spot) |
| Análisis biomecánico | MediaPipe | — | Estimación de pose |
| Infraestructura | OpenCV, FastAPI, SQLite | OpenCV, **FFmpeg** para los clips, SQLite y una interfaz de línea de comandos | Servicio web con FastAPI |

---

*Los apartados subsiguientes del anteproyecto se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

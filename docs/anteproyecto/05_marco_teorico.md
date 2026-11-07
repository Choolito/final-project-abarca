# 05 — Marco Teórico

> **Reglamento de TF — UCSE DAR, Art. 6b, inciso 5.**
> Trabajo Final de Carrera — Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

---

## 1. Marco Teórico

Este apartado expone los aspectos teórico-prácticos necesarios para el desarrollo del trabajo. Se desarrollan **sólo los conceptos que nombran los *Objetivos* y el *Alcance***: las tres capas del sistema, las métricas AP y F1, el line-out y los clips de ±10 s. Al cierre se confirma o ajusta el stack tecnológico tentativo de [`01_titulo_y_problema.md`](01_titulo_y_problema.md) §3.3.

| Concepto | Capa del sistema | Objetivo específico que lo requiere |
|---|---|---|
| Line-out: definición y rasgos observables | — (dominio) | 1 (catálogo), 2 (dataset) |
| Detección de objetos y AP@0.5 | 1 — Percepción | 4 |
| Seguimiento multi-objeto | 1 — Percepción | 4 |
| *Action spotting* y criterio de acierto temporal | 2 — Semántica | 5, 6 |
| Pipeline *offline*, clips y persistencia | 3 — Eventos | 3, 5 |

> Las referencias completas se encuentran en [`09_bibliografia.md`](09_bibliografia.md).

### 1.1. Dominio: el line-out

El line-out es la formación con la que se reanuda el juego cuando el balón sale por la línea de *touch*. Está regulado por la Ley 18 del reglamento de World Rugby (*Touch, quick throw and lineout*) (World Rugby, s.f.). Interesan los rasgos que la ley impone y que, por lo tanto, son **observables en video**:

- **Dos filas paralelas** de jugadores, una por equipo, perpendiculares a la línea de *touch*, con un mínimo de dos jugadores por equipo (Ley 18.11).
- **Ubicación acotada**: las filas se forman entre las líneas de 5 m y de 15 m, siempre junto a una de las bandas (Ley 18.10).
- **Un espacio de separación**: cada fila se ubica a medio metro de la línea de lanzamiento (*mark of touch*), de su lado, lo que deja ≈1 m entre ellas (Ley 18.10).
- **Un lanzador** en la marca de *touch*, fuera del campo, que arroja el balón derecho a lo largo de esa línea (Ley 18.23).
- **Saltadores elevados** por compañeros, que disputan el balón en el aire (Ley 18.29).
- **Aislamiento espacial**: el resto de los jugadores debe permanecer a 10 m (Ley 18.35), por lo que la formación queda separada del juego en la imagen.

De aquí surgen dos decisiones de diseño:

1. El line-out es una **configuración espacial colectiva muy característica** y casi estática antes del lanzamiento. Puede describirse por la **disposición de los jugadores**, sin modelar gestos individuales.
2. Tiene un **instante canónico**: el momento en que el balón sale de las manos del lanzador. El propio reglamento lo usa como frontera, ya que nadie puede saltar ni ser levantado antes (Ley 18.20). Es inequívoco y fácil de marcar, y se adopta como **instante de referencia** para la anotación (objetivo 2) y la evaluación (§1.7).

### 1.2. Fundamentos: video y aprendizaje por transferencia

Una grabación es una secuencia de cuadros a una tasa fija, típicamente de 25 a 60 por segundo (Szeliski, 2022). Un partido de 80 minutos a 25 fps tiene ≈120.000 cuadros. La percepción procesa el video a la tasa que requiere el seguimiento (del orden de 10 a 25 cuadros por segundo), que es el costo dominante del sistema, y la capa semántica **submuestrea** la señal resultante a 2–5 cuadros por segundo, una resolución compatible con la tolerancia de §1.7.

Los modelos se basan en redes neuronales convolucionales, que aprenden representaciones jerárquicas de la imagen (Goodfellow et al., 2016). Con un dataset del orden de 200 line-outs, la viabilidad depende del **aprendizaje por transferencia**: se parte de un modelo preentrenado en un conjunto genérico y se lo ajusta (*fine-tuning*) con los datos propios (Pan & Yang, 2010; Yosinski et al., 2014). COCO (Lin et al., 2014) ya incluye las clases *person* y *sports ball*, de modo que el detector sólo debe adaptarse a la escala, el encuadre y las oclusiones del video amateur.

### 1.3. Capa de percepción I: detección de objetos

La familia **YOLO** formula la detección como una única regresión: la red predice en una sola pasada las cajas delimitadoras y las clases sobre una grilla de la imagen (Redmon et al., 2016). Las versiones actuales, mantenidas por Ultralytics (Jocher et al., 2023), ofrecen variantes de distinto tamaño con la misma interfaz de entrenamiento e inferencia.

**Conceptos de evaluación:**

- **IoU** (*Intersection over Union*): cociente entre el área de intersección y la de unión de la caja predicha y la real. Una predicción es correcta si su IoU con una caja real no asignada supera un umbral.
- **NMS** (*Non-Maximum Suppression*): elimina las cajas redundantes sobre un mismo objeto y conserva la de mayor confianza.
- **AP@0.5 y mAP@0.5**: la *Average Precision* (AP) es el área bajo la curva precisión-exhaustividad de una clase, con umbral de IoU 0,5; el mAP@0.5 es su promedio entre clases (Everingham et al., 2010). Como la meta del **objetivo 4** se exige para una sola clase (*jugador*), corresponde al **AP@0.5** de esa clase.

El balón ocupa pocas decenas de píxeles en un plano general, por lo que no tiene umbral exigido. La inferencia por mosaicos (Akyon et al., 2022) queda como extensión opcional para mejorar su detección.

### 1.4. Capa de percepción II: seguimiento multi-objeto

El seguimiento multi-objeto asocia las detecciones de cuadros sucesivos en **trayectorias**. El paradigma dominante, ***tracking-by-detection***, combina un detector por cuadro, un **filtro de Kalman** que predice la posición de cada trayectoria (Kalman, 1960) y una asociación resuelta con el **algoritmo húngaro** sobre una matriz de costos de IoU o de apariencia (Kuhn, 1955).

| Algoritmo | Asociación | Limitación en el line-out |
|---|---|---|
| DeepSORT (Wojke et al., 2017) | Kalman + IoU + *embedding* de apariencia | Jugadores del mismo equipo visten igual: la apariencia discrimina poco |
| **ByteTrack** (Y. Zhang et al., 2022) | Kalman + IoU en dos rondas: primero las detecciones de alta confianza y luego las de **baja confianza** | Su modelo de movimiento supone una cámara quieta |
| BoT-SORT (Aharon et al., 2022) | ByteTrack + compensación del movimiento de cámara; apariencia opcional | La variante con apariencia hereda la limitación de DeepSORT |

En el line-out la oclusión es estructural: filas compactas, saltadores elevados y levantadores superpuestos. ByteTrack no descarta las detecciones de baja confianza, típicas de un jugador parcialmente tapado, y no requiere un modelo de apariencia. Pero su filtro de Kalman predice en coordenadas de imagen y supone una cámara quieta: si la cámara gira o cambia el *zoom*, todas las cajas se desplazan juntas, las predicciones fallan y las trayectorias se cortan o intercambian identidades. Como en el club caso testigo la cámara se orienta y acerca para seguir el juego, **se adopta BoT-SORT sin reidentificación por apariencia**: conserva la asociación en dos rondas de ByteTrack y le agrega la **compensación del movimiento de cámara**, que estima la transformación global entre cuadros consecutivos sobre el fondo y la descuenta antes de asociar. Usado sin apariencia, no le aplica la limitación de los equipos que visten igual. Es el algoritmo de seguimiento por defecto de Ultralytics.

No se requiere identidad persistente durante todo el partido, sino **trayectorias coherentes en ventanas de algunos segundos**, que alimentan la capa semántica. El seguimiento **se usa pero no se evalúa formalmente**: el objetivo 4 se mide con el mAP de la detección. La comparación con otros algoritmos de seguimiento y las métricas MOTA (Bernardin & Stiefelhagen, 2008) e IDF1 (Ristani et al., 2016), que exigen anotar identidades cuadro a cuadro, quedan como extensiones opcionales.

### 1.5. Capa semántica: comprensión temporal de video

#### 1.5.1. Tareas de comprensión temporal

La literatura distingue tres tareas (Wu et al., 2022; Xu et al., 2025):

| Tarea | Insumo | Salida | Métrica típica | Ejemplos |
|---|---|---|---|---|
| Clasificación de acciones | Clip ya recortado | Una etiqueta por clip | Exactitud | C3D (Tran et al., 2015), SlowFast (Feichtenhofer et al., 2019) |
| Localización temporal | Video largo sin recortar | Segmentos (inicio, fin, clase) | mAP con umbral de tIoU | ActionFormer (C.-L. Zhang et al., 2022) |
| ***Action spotting*** | Video largo sin recortar | **Un instante** por evento | Precisión, exhaustividad o mAP con **tolerancia temporal δ** | SoccerNet (Giancola et al., 2018), E2E-Spot (Hong et al., 2022) |

#### 1.5.2. Formulación adoptada: *action spotting*

**La capa semántica resuelve el *action spotting* del line-out**: dado un partido completo, produce los instantes de lanzamiento, cada uno con una confianza. El clip se obtiene como una **ventana de referencia de ±10 s**, configurable, alrededor de cada instante, tal como establece el *Alcance*.

Se elige spotting y no localización temporal porque un clip de ventana predefinida sólo necesita un instante; porque anotar un instante es más barato y menos ambiguo que decidir dónde "empieza" y "termina" un line-out; y porque es la formulación estándar para eventos dispersos en videos deportivos largos (Giancola et al., 2018; Deliège et al., 2021). Además, hace medible el objetivo 5 sin ambigüedad (§1.7).

**Desbalance.** Con ≈25 line-outs por partido (Cullen, 2026), a 25 cuadros por segundo hay menos de un cuadro positivo cada 4.000; a la tasa de la capa semántica (2–5 cuadros por segundo), uno cada ≈500 a 1.000. El entrenamiento lo compensa con **dilatación de las etiquetas** alrededor del instante y **muestreo balanceado** de ventanas negativas. En inferencia, sobre la serie temporal de confianza se aplica una **supresión de no-máximos temporal**, para que cada line-out produzca un solo instante.

#### 1.5.3. Enfoque adoptado

A partir de las detecciones y trayectorias de la capa 1, se calcula por cuadro un vector de **características geométricas** que codifica los rasgos de §1.1. Con una sola cámara en perspectiva, las distancias del reglamento (metros sobre el plano de juego) no se obtienen directamente de los píxeles, y registrar la cancha por homografía exige detectar sus líneas, algo frágil sobre el césped de una cancha amateur. Por eso las características se formulan **en el espacio de la imagen, normalizadas**:

- la **altura de la caja** de cada jugador se usa como escala local (≈1,8 m), de modo que las separaciones se miden en "alturas de jugador" y se vuelven robustas al *zoom* y a la distancia a la cámara;
- la **alineación del grupo** en dos rectas paralelas y su orientación respecto de la línea de *touch*, estimada en la imagen como el segmento recto dominante del borde de la cancha;
- la **separación entre ambas filas**, en alturas de jugador;
- la **elongación y la densidad** del grupo;
- la **velocidad media del grupo**, una vez descontado el movimiento de la cámara (§1.4), ya que el line-out es casi estático antes del lanzamiento.

La registración de la cancha por homografía queda como extensión opcional.

La secuencia de vectores se procesa con un **modelo temporal liviano**, como una red **LSTM/GRU** (Hochreiter & Schmidhuber, 1997) o una convolución temporal 1D, que emite la confianza por instante. Tiene pocos parámetros, por lo que es entrenable con ≈200 eventos. Es **interpretable**, porque cada característica corresponde a un criterio del catálogo (objetivo 1), y desacopla las capas 1 y 2 (objetivo 3). Su riesgo es que los errores de la percepción se propagan.

Como **línea base**, se evalúan reglas fijas sobre las mismas características, sin aprendizaje, para dimensionar cuánto aporta el modelo. Un modelo de video de extremo a extremo como E2E-Spot (Hong et al., 2022), que aprende directamente de los cuadros, queda como **extensión opcional**: no depende del tracking, pero con un dataset pequeño tiende al sobreajuste y es menos interpretable.

### 1.6. Estimación de pose

La estimación de pose localiza articulaciones del cuerpo; **MediaPipe** (Lugaresi et al., 2019) es una herramienta habitual para hacerlo. En el plano general de una cámara amateur, cada jugador ocupa pocas decenas de píxeles y se superpone con otros en la formación, lo que vuelve poco confiable la estimación. Como los rasgos de §1.1 se describen con la **disposición de las cajas**, la estimación de pose **se excluye del núcleo** y queda como extensión opcional.

### 1.7. Métricas de evaluación del evento

El **objetivo 5** exige un **F1 ≥ 0,70** en la detección del line-out. Para que la meta sea verificable, se define el siguiente **criterio de acierto**:

1. Cada evento real se representa por su instante anotado *t*, el del lanzamiento (§1.1). Cada predicción se representa por su instante *t̂* y su confianza.
2. Una predicción es un **verdadero positivo (TP)** si |*t̂* − *t*| ≤ **δ** para algún evento real todavía no asignado. La asignación es **uno a uno**: se recorren las predicciones de mayor a menor confianza, y cada evento real absorbe como máximo una.
3. Las predicciones no asignadas son **falsos positivos (FP)** y los eventos reales no asignados son **falsos negativos (FN)**.
4. Con esas cantidades se calculan (Sokolova & Lapalme, 2009):

   - **Precisión** = TP / (TP + FP)
   - **Exhaustividad** = TP / (TP + FN)
   - **F1** = 2 · P · E / (P + E)

**Tolerancia de referencia: δ = 3 s.** La disputa del line-out es breve: pocos segundos después del lanzamiento el balón sale de la formación, por un pase al medio scrum o porque se arma un *maul*. Con una tolerancia mayor, una predicción podría caer cuando el balón ya dejó el line-out y contarse igual como acierto. Con δ = 3 s, la predicción queda dentro de la secuencia formación–lanzamiento–disputa, y el clip de ±10 s conserva al menos 7 s de contexto a cada lado. El criterio surge de la práctica de análisis de video del autor en el club caso testigo y está dentro del rango estricto de SoccerNet (1 a 5 s). *Metodología* (Art. 6b.6) lo adopta como parte de la meta definitiva del objetivo 5.

Como datos complementarios se reportarán el F1 con δ = 2 s, la curva de F1 para δ ∈ {1, 2, 3, 5} s y el **average-mAP** de SoccerNet, que promedia la AP en un rango de tolerancias (Deliège et al., 2021). El umbral de confianza se elige sobre el conjunto de **validación**, nunca sobre el de prueba.

### 1.8. Capa de eventos e ingeniería del sistema

El sistema adopta un **estilo arquitectónico en capas**, en el que cada capa ofrece servicios sólo a la superior y oculta su implementación tras una interfaz, lo que favorece la modificabilidad y la prueba independiente (Bass et al., 2021), tal como exige el objetivo 3. Como el análisis es posterior al partido, se implementa como un **pipeline *offline*** en el que cada capa persiste un artefacto intermedio (detecciones, serie de confianza, lista de eventos) que materializa su interfaz con la siguiente.

La capa de eventos recorta los clips con **FFmpeg** (FFmpeg Developers, s.f.), a partir de cuadros leídos con **OpenCV** (Bradski, 2000), y registra el catálogo en **SQLite**. El sistema se opera por **línea de comandos**; un servicio web queda como extensión opcional.

### 1.9. Síntesis: stack tecnológico confirmado

El stack se divide en un **núcleo comprometido**, suficiente para cumplir los objetivos específicos, y **extensiones opcionales**, que no condicionan ningún objetivo.

| Componente | Núcleo comprometido | Extensión opcional |
|---|---|---|
| Detección | YOLO de Ultralytics, preentrenado en COCO y ajustado (objetivo 4) | Inferencia por mosaicos para el balón |
| Seguimiento | **BoT-SORT** sin reidentificación, con compensación del movimiento de cámara; usado sin evaluación formal | Comparación con otros algoritmos; métricas MOTA e IDF1 |
| Reconocimiento temporal | *Action spotting* con características geométricas normalizadas en la imagen y un modelo temporal liviano (LSTM/GRU o convolución 1D), más una línea base heurística (objetivo 5) | Registración de la cancha por homografía; modelo de extremo a extremo (E2E-Spot) |
| Análisis biomecánico | — | Estimación de pose |
| Infraestructura | OpenCV, **FFmpeg** para los clips, SQLite y una interfaz de línea de comandos | Servicio web con FastAPI |

---

*Los apartados subsiguientes del anteproyecto se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

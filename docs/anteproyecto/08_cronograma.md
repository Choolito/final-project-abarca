# 08 — Plan de Trabajo y Cronograma

> **Reglamento de TF — UCSE DAR, Art. 6b, inciso 8.**
> Trabajo Final de Carrera — Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

---

## 1. Plan de Trabajo y Cronograma

Este apartado detalla las actividades del proyecto, con su descripción y duración. Las actividades surgen de los *Objetivos* y del proceso definido en *Metodología* ([`06_metodologia.md`](06_metodologia.md)).

**Convenciones:**

- Los plazos se expresan en **semanas relativas** sobre una duración total de **26 semanas (≈6 meses)**. La semana 1 (S1) corresponde al inicio del desarrollo, una vez aprobado el anteproyecto (Art. 7 del Reglamento).
- La dedicación de referencia es de **≈10 horas semanales**, es decir, ≈260 horas en total.
- El desarrollo se organiza en **iteraciones de dos semanas**; cada iteración cierra con una revisión de avances respecto de este plan.
- Las extensiones opcionales (*scrum*, comparación de algoritmos de seguimiento, modelo de extremo a extremo, servicio web) no se planifican: sólo se abordan si, cumplido el objetivo 5, queda holgura.

### 1.1. Actividades

| ID | Actividad | Descripción | Semanas | Duración (sem.) | Horas | Predecesoras | Entregable |
|---|---|---|---|---|---|---|---|
| A0 | Preparación del entorno | Repositorio de código, entorno de Python y PyTorch con versiones fijadas, verificación de la GPU y registro de experimentos | S1–S2 | 2 | 8 | — | Entorno reproducible |
| A1 | Catálogo de eventos | Criterios observables del line-out (evento inicial) y especificación del scrum y el ruck como extensión, validados con el referente del club | S1–S3 | 3 | 10 | — | Documento de catálogo |
| A2 | Guía de etiquetado | Criterio del instante de lanzamiento y tratamiento de los casos dudosos | S2–S3 | 2 | 5 | A1 | Guía de etiquetado |
| A3 | Diseño de la arquitectura | Tres capas, interfaces y artefactos intermedios; presentación al Director | S3–S5 | 3 | 15 | A1 | Documento de diseño |
| A4 | Selección de partidos | Selección de partidos del plantel superior y manifiesto con *hashes* | S3–S4 | 2 | 4 | A2 | Lista de partidos y manifiesto |
| A5 | Anotación de instantes | Instantes de lanzamiento hasta reunir ≈300 line-outs (≈12 partidos) | S4–S8 | 5 | 15 | A4 | Planilla de instantes |
| A6 | Anotación de cajas | 300–500 cuadros pre-anotados con el detector de COCO y corregidos en CVAT | S5–S11 | 7 | 25 | A0, A4 | Cuadros con cajas |
| A7 | Control de calidad de la anotación | Reanotación propia de un partido (≥3 semanas después) y un partido anotado por el referente | S9–S12 | 4 | 8 | A5 | Medidas de acuerdo |
| A8 | Partición y ficha del dataset | Asignación de partidos completos balanceada por line-outs (≈70/15/15) y *datasheet* | S12–S14 | 3 | 6 | A5, A6, A7 | Dataset completo |
| A9 | Ajuste fino del detector | Ajuste de YOLO; se inicia con las cajas disponibles y se completa con el dataset final | S8–S15 | 8 | 25 | A3, A6 (parcial) | Detector ajustado |
| A10 | Integración del seguimiento | ByteTrack sobre las detecciones y artefacto de trayectorias | S12–S15 | 4 | 8 | A9 | Trayectorias por cuadro |
| A11 | Evaluación del detector (Go/No-Go) | mAP@0.5 sobre validación y decisión sobre las medidas del plan B | S16 | 1 | 3 | A8, A10 | Informe de decisión |
| A12 | Características y línea base | Características geométricas de la formación y reglas heurísticas | S14–S17 | 4 | 15 | A5, A10 | Series de características y línea base |
| A13 | Modelo temporal de *spotting* | Entrenamiento, posprocesamiento (NMS temporal) y selección sobre validación | S17–S21 | 5 | 25 | A11, A12 | Modelo de reconocimiento |
| A14 | Capa de eventos | Recorte de clips, catálogo en SQLite e interfaz de línea de comandos | S19–S22 | 4 | 12 | A3, A13 | Sistema integrado |
| A15 | Evaluación final | Evaluación única sobre prueba (mAP, F1 con δ = 3 s y complementarias) y análisis de errores | S22–S24 | 3 | 15 | A14 | Informe de evaluación |
| A16 | Redacción del informe del TF | Redacción incremental durante todo el proyecto; borrador completo en la semana 24 y revisión iterativa con el Director | S1–S26 | 26 | 40 | — | Informe final |
| A17 | Seguimiento con el Director | Reuniones periódicas y registro de cada reunión | S1–S26 | 26 | 6 | — | Minutas |
| | **Total** | | | | **245** | | |

Las horas estimadas suman ≈245 sobre ≈260 disponibles, lo que deja una **holgura de ≈15 horas** (≈6 %) para absorber desvíos.

### 1.2. Diagrama de Gantt

Las barras marcadas en rojo forman el **camino crítico**. Las fechas del diagrama son sólo una referencia para dibujarlo: el eje se lee en semanas relativas, y cada marca indica el inicio de la semana (S27 marca el cierre de la S26).

```mermaid
gantt
    dateFormat YYYY-MM-DD
    axisFormat S%W
    tickInterval 1week
    weekday monday
    section Transversal
    A0 Preparación del entorno : a0, 2024-01-01, 14d
    A16 Redacción del informe del TF : a16, 2024-01-01, 182d
    A17 Seguimiento con el Director : a17, 2024-01-01, 182d
    section Obj. 1 — Catálogo
    A1 Catálogo de eventos : a1, 2024-01-01, 21d
    section Obj. 2 — Dataset
    A2 Guía de etiquetado : a2, 2024-01-08, 14d
    A4 Selección de partidos : a4, 2024-01-15, 14d
    A5 Anotación de instantes : crit, a5, 2024-01-22, 35d
    A6 Anotación de cajas : crit, a6, 2024-01-29, 49d
    A7 Control de calidad de la anotación : a7, 2024-02-26, 28d
    A8 Partición y ficha del dataset : crit, a8, 2024-03-18, 21d
    section Obj. 3 — Diseño
    A3 Diseño de la arquitectura : a3, 2024-01-15, 21d
    section Obj. 4 — Percepción
    A9 Ajuste fino del detector : crit, a9, 2024-02-19, 56d
    A10 Integración del seguimiento : a10, 2024-03-18, 28d
    A11 Evaluación del detector (Go/No-Go) : a11, 2024-04-15, 7d
    section Obj. 5 — Line-out
    A12 Características y línea base : a12, 2024-04-01, 28d
    A13 Modelo temporal de spotting : crit, a13, 2024-04-22, 35d
    A14 Capa de eventos : a14, 2024-05-06, 28d
    section Obj. 6 — Evaluación
    A15 Evaluación final : crit, a15, 2024-05-27, 21d
    section Hitos
    H1 Catálogo : milestone, 2024-01-21, 0d
    H2 Diseño presentado : milestone, 2024-02-04, 0d
    H3 Dataset completo : milestone, 2024-04-07, 0d
    H4 Go/No-Go : milestone, 2024-04-21, 0d
    H5 Line-out integrado : milestone, 2024-06-02, 0d
    H6 Informe final : milestone, 2024-06-30, 0d
```

### 1.3. Hitos

| Hito | Semana | Criterio de cumplimiento | Objetivo |
|---|---|---|---|
| H1 | S3 | Catálogo de eventos documentado y validado con el referente del club | 1 |
| H2 | S5 | Documento de diseño presentado al Director | 3 |
| H3 | S14 | Dataset anotado (≥200 line-outs), con control de calidad y partición | 2 |
| H4 | S16 | mAP@0.5 de *jugador* evaluado y decisión Go/No-Go tomada | 4 |
| H5 | S22 | Line-out reconocido y clips generados por el sistema integrado | 5 |
| H6 | S26 | Evaluación final documentada e informe del TF revisado | 6 |

### 1.4. Camino crítico y holguras

El camino crítico pasa por la **construcción del dataset** (A5, A6 y A8), el **ajuste del detector** (A9), el **modelo temporal** (A13) y la **evaluación final** (A15). Un atraso en la anotación desplaza todas las actividades posteriores. Para reducir ese riesgo:

- el ajuste del detector (A9) comienza en la S8 con las cajas ya anotadas, sin esperar el dataset completo;
- la anotación de instantes (A5) termina antes que la de cajas, de modo que las características y la línea base (A12) pueden empezar en la S14;
- las semanas 25 y 26 se reservan para la revisión iterativa del informe, y absorben desvíos menores de la evaluación final.

---

*Los apartados subsiguientes del anteproyecto se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

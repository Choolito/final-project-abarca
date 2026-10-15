# Presentación — Anteproyecto TF

> **Título provisorio (no definitivo):** *"Ojo de Halcón Amateur"* — Reconocimiento automático de eventos de rugby en video.
> Formato: 8 ventanas (slides). Poco texto, foco en lo visual. El detalle va en el guion de estudio.

---

## Ventana 1 — Portada

**Ojo de Halcón Amateur**
Reconocimiento automático de eventos de rugby en video

- Juan Ignacio Abarca
- Trabajo Final — Ingeniería en Informática, UCSE DAR
- Fase de Anteproyecto

> *Visual:* imagen de fondo de un partido de rugby (line-out) + logo UCSE.

---

## Ventana 2 — El problema

**Analizar video a mano cuesta demasiado.**

- ⏱️ +4 horas de análisis por 1 hora de partido
- 👤 Depende de un analista experto y disponible
- 🔁 Manual, repetitivo y poco reproducible

> *Visual:* reloj / persona frente a horas de video. Un solo número grande: **4:1**.

---

## Ventana 3 — La brecha

**Lo que ya existe no sirve para el club amateur.**

- 💰 Software comercial = caro
- 📡 Requiere hardware: sensores en el balón, GPS, cámaras especiales
- 🗄️ No funciona sobre el archivo histórico del club

> *Visual:* balanza → "Profesional" vs "Amateur". Caso testigo: **CRAR (Círculo Rafaelino de Rugby)**.

---

## Ventana 4 — La idea

**Una plataforma que solo necesita el video.**

Entra grabación estándar → sale catálogo de eventos + clips listos.

- Sin hardware especial
- Sobre el video que el club ya tiene

> *Visual:* diagrama simple → 🎥 Video ➜ ⚙️ Sistema ➜ 🏷️ Eventos + ✂️ Clips.

---

## Ventana 5 — Cómo funciona (3 capas)

| Capa | Qué hace |
|---|---|
| 👁️ **Percepción** | Detecta y sigue jugadores y balón |
| 🧠 **Semántica** | Reconoce la formación (line-out) |
| 🏷️ **Eventos** | Marca, registra y corta el clip |

> *Visual:* tres bloques apilados con flechas hacia arriba.

---

## Ventana 6 — Objetivo concreto

**Detectar el _line-out_: el evento inicial de validación.**

- 📍 Ubicarlo en el tiempo de la grabación
- ✂️ Generar el clip (~10 s antes y después)
- ➕ *Scrum* y *ruck* quedan como extensión futura

> *Visual:* línea de tiempo de un partido con marcas en los line-outs.

---

## Ventana 7 — Alcance y metas

**Acotado y medible.**

- ✅ Solo software, análisis *offline*
- 🎯 Dataset: ≥200 clips de line-out etiquetados
- 📊 Metas: detección **mAP ≥ 0,70** · evento **F1 ≥ 0,70**
- ❌ No tiempo real · no otros eventos · no interfaz comercial

> *Visual:* checklist incluido/excluido en dos columnas.

---

## Ventana 8 — Cierre

**Democratizar el análisis táctico para el rugby amateur.**

- 🔧 Aporte técnico: arquitectura reutilizable de reconocimiento de eventos
- 🤝 Aporte social: herramienta accesible, sin hardware
- 🗓️ ~6 meses de desarrollo

> *Visual:* foto del club / equipo. Frase de cierre grande.
> ¿Preguntas?

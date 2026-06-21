# Guion de estudio — Presentación del Anteproyecto

> Texto de apoyo para hablar cada ventana. No leer de corrido: usar como machete.
> Tiempo objetivo: ~6–8 minutos. Una idea por ventana.

---

## Ventana 1 — Portada

> *"Buenas, soy Juan Ignacio Abarca. Les voy a presentar el anteproyecto de mi Trabajo Final de Ingeniería en Informática: un sistema que reconoce automáticamente eventos de rugby en video. El título es provisorio."*

- Saludar, presentarte, dar el marco (TF, fase de anteproyecto).
- No entrar en detalle todavía: es solo la apertura.

---

## Ventana 2 — El problema

> *"Hoy, analizar un partido en video es un trabajo manual y carísimo en tiempo. Por cada hora de juego se pueden ir más de cuatro horas de análisis."*

- El analista mira toda la grabación, marca los eventos a mano y los recorta.
- Tres problemas: **lento**, **depende de una persona experta** y **poco reproducible** (cada analista marca distinto).
- Quedate con el número: **4 a 1**.

---

## Ventana 3 — La brecha

> *"Ya existen herramientas que automatizan esto, pero no sirven para un club amateur."*

- Las soluciones comerciales dependen de **hardware**: sensores en el balón, GPS en los jugadores, cámaras especiales.
- Eso las vuelve **caras** y **logísticamente inviables** para el amateur.
- Peor: no se pueden usar sobre el **archivo histórico** del club, que es su material más valioso.
- Resultado: una brecha entre el deporte profesional y el amateur. Caso testigo: el **CRAR**, de Rafaela.

---

## Ventana 4 — La idea

> *"Mi propuesta es una plataforma que solo necesita el video que el club ya tiene."*

- Entrada: grabación en **formato estándar**, sin instrumentar nada.
- Salida: un **catálogo de eventos** y los **clips ya cortados** para el cuerpo técnico.
- La clave: **solo software**. Eso es lo que la hace accesible.

---

## Ventana 5 — Cómo funciona (3 capas)

> *"El sistema se organiza en tres capas, de lo más simple a lo más abstracto."*

- **Percepción:** detecta y sigue a los agentes del juego (jugadores y balón). Acá entran tecnologías de visión como YOLO y seguimiento tipo DeepSORT.
- **Semántica:** con esa información reconoce la **formación táctica**, en este caso el line-out.
- **Eventos:** marca el momento, lo guarda indexado y genera el clip.
- Mencionar que es **modular**: cada capa se desarrolla y prueba por separado.

---

## Ventana 6 — Objetivo concreto

> *"Para que el alcance sea realista, el objetivo central es un único evento: el line-out."*

- El line-out es el **evento inicial** sobre el que se valida toda la cadena.
- El sistema lo **ubica en el tiempo** y genera un clip de ~10 segundos antes y después.
- *Scrum* y *ruck* quedan **especificados como extensión**, no son obligatorios.
- Por qué el line-out: es una formación fija, visualmente clara y fácil de etiquetar.

---

## Ventana 7 — Alcance y metas

> *"El alcance está acotado a propósito, para que sea demostrable en un Trabajo Final."*

- **Incluye:** solo software, análisis posterior al partido (*offline*).
- Dataset de referencia: **al menos 200 clips** de line-out etiquetados, partidos en entrenamiento/validación/prueba.
- Metas medibles: **mAP ≥ 0,70** en detección y **F1 ≥ 0,70** en el reconocimiento del evento.
- **No incluye:** tiempo real, otros eventos, análisis táctico interpretativo ni interfaz comercial.
- Aclarar: los números son **metas de referencia**, ajustables según el material real.

---

## Ventana 8 — Cierre

> *"En resumen: busco democratizar el análisis táctico para el rugby amateur."*

- Doble aporte: **técnico** (una arquitectura de reconocimiento de eventos reutilizable en otros dominios) y **social** (una herramienta accesible, sin hardware).
- Duración estimada: **~6 meses** de desarrollo.
- Cerrar con la frase fuerte y abrir a preguntas.

---

## Posibles preguntas (preparar)

- **¿Por qué rugby y no otro deporte?** → Alta complejidad táctica, eventos estructurados y entorno real de prueba (CRAR).
- **¿Por qué solo el line-out?** → Acotar el alcance; es el evento más claro para validar la cadena completa.
- **¿Qué pasa con la oclusión / muchos jugadores juntos?** → Es el desafío técnico central; se aborda con detección + seguimiento.
- **¿Funciona en cualquier cancha?** → Sí, opera sobre video estándar; supone calidad y encuadre suficientes.
- **¿Es extensible a otros deportes?** → Por diseño sí (modular), pero **no** se valida en este TF.

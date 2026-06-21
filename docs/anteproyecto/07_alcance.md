# 07 — Alcance

> **Reglamento de TF — UCSE DAR, Art. 6b, inciso 7.**
> Trabajo Final de Carrera — Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

---

## 1. Alcance

Este apartado delimita con precisión **qué se va a hacer y qué no se va a hacer** en el Trabajo Final, a fin de mantener el esfuerzo acotado a un objetivo demostrable dentro del marco temporal y de recursos previsto.

### 1.1. Qué se va a hacer (incluido)

- Desarrollar un sistema **exclusivamente de software**, que opere sobre **grabaciones de rugby en formato de video estándar**.
- Detectar y seguir a los **agentes del juego** relevantes (jugadores y balón) dentro del video.
- Reconocer el **line-out** como **evento inicial y único de validación obligatoria**, determinando su **localización temporal** en la grabación.
- Registrar los eventos detectados de forma indexada y **generar automáticamente los clips segmentados** correspondientes, listos para el cuerpo técnico.
- **Validar** el sistema sobre grabaciones reales del ámbito amateur regional, con **métricas objetivas** (mAP para la detección; precisión, exhaustividad y F1-score para el reconocimiento del evento).
- Dejar la arquitectura organizada de forma **modular**, especificando el *scrum* y el *ruck* en el catálogo como **eventos de extensión** (su implementación queda como mejora opcional, no exigible).

### 1.2. Qué no se va a hacer (excluido)

- **No** se usará instrumentación física del entorno de juego (sensores en el balón, GPS, cámaras especiales): la solución opera sólo sobre video estándar.
- **No** habrá procesamiento en **tiempo real** durante el partido; el análisis es posterior a la grabación (*offline*).
- **No** se reconocerán otros eventos del rugby fuera del line-out (tries, conversiones, infracciones diversas, gestos arbitrales detallados, marcador), más allá de su mención en el catálogo de extensión.
- **No** se realizará análisis táctico interpretativo automático, recomendaciones estratégicas ni estadísticas avanzadas de rendimiento individual.
- **No** se construirá una **interfaz de nivel comercial** ni se desplegará en producción: la salida se limita a poner los clips y el catálogo a disposición.
- **No** se abordan comercialización, soporte, mantenimiento ni gestión de usuarios.
- **No** se valida la extensión del sistema a otros deportes o dominios; la modularidad es sólo una orientación de diseño.

### 1.3. Supuestos y restricciones

- Se dispone de grabaciones de partidos con calidad y encuadre suficientes para identificar visualmente los eventos.
- Se cuenta con la colaboración de al menos un referente del cuerpo técnico para validar los criterios de etiquetado.
- El volumen del conjunto de datos y los umbrales de las métricas son metas de referencia preliminares, sujetas a ajuste según la disponibilidad real de material.
- El desarrollo se realiza con recursos de cómputo estándar disponibles para el autor, sin infraestructura especializada.

---

*Los apartados subsiguientes del anteproyecto se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

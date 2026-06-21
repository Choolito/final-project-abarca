# 07 — Alcance

> **Reglamento de TF — UCSE DAR, Art. 6b, inciso 7.**
> Trabajo Final de Carrera — Ingeniería en Informática.
> Autor: Juan Ignacio Abarca.

---

## 1. Alcance

Este apartado delimita con precisión qué aspectos del problema serán cubiertos por el Trabajo Final, a fin de mantener el esfuerzo acotado a un objetivo demostrable dentro del marco temporal y de recursos previsto.

### 1.1. Dominio y caso de estudio

- El sistema se diseña, implementa y valida **exclusivamente sobre el rugby**, que constituye el objeto concreto del Trabajo Final.
- La validación se realiza sobre **grabaciones reales de partidos del ámbito amateur regional**, en formato de video estándar.
- La organización modular del sistema es una orientación de diseño; **la extensión a otros deportes o dominios no forma parte del alcance** de este trabajo.

### 1.2. Eventos cubiertos

- El **line-out** se adopta como **evento inicial y único de validación obligatoria**: sobre él se construye y verifica la cadena completa de reconocimiento (percepción → reconocimiento → catalogación → segmentación de clips).
- El *scrum* y el *ruck* quedan **especificados en el catálogo como eventos de extensión**, pero su implementación y validación **no son exigibles** dentro del alcance comprometido; podrán abordarse como mejora si el tiempo lo permite.
- Otros eventos del rugby (infracciones diversas, gestos arbitrales detallados, tries, conversiones, etc.) **quedan fuera del alcance**.

### 1.3. Funcionalidad incluida

- Detección y seguimiento de los agentes relevantes (jugadores y balón) en el video.
- Reconocimiento del line-out y determinación de su localización temporal en la grabación.
- Registro indexado de los eventos detectados y **generación automática de los clips segmentados** correspondientes.
- Evaluación del desempeño mediante métricas objetivas (mAP para la detección; precisión, exhaustividad y F1-score para el reconocimiento del evento).

### 1.4. Funcionalidad excluida

- **No** se desarrollará instrumentación física del entorno de juego (sensores, GPS, cámaras especiales): la solución opera sólo sobre video estándar.
- **No** se contempla procesamiento en **tiempo real** durante el partido; el análisis es posterior a la grabación (*offline*).
- **No** forman parte del alcance: el análisis táctico interpretativo automático, las recomendaciones estratégicas, las estadísticas avanzadas de rendimiento individual ni el reconocimiento del marcador.
- La **interfaz de usuario** se limitará a lo necesario para poner los clips y el catálogo a disposición; no se persigue un producto de nivel comercial ni su despliegue en producción.
- **No** se abordan aspectos de comercialización, soporte, mantenimiento ni gestión de usuarios.

### 1.5. Supuestos y restricciones

- Se dispone de grabaciones de partidos en calidad y encuadre suficientes para identificar visualmente los eventos.
- Se cuenta con la colaboración de al menos un referente del cuerpo técnico para validar los criterios de etiquetado.
- El volumen del conjunto de datos y los umbrales de las métricas son metas de referencia preliminares, sujetas a ajuste según la disponibilidad real de material (ver *Objetivos* y *Metodología*).
- El desarrollo se realiza con recursos de cómputo estándar disponibles para el autor, sin infraestructura especializada.

---

*Los apartados subsiguientes del anteproyecto se desarrollan en los archivos correspondientes del directorio `docs/anteproyecto/`.*

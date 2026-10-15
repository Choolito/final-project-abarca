# Guion de estudio — Qué decir en la presentación

> Texto para decir **directamente**, palabra por palabra. Una sección por ventana.
> Hablá tranquilo, sin apurarte. Total: ~6–8 minutos. Las frases entre [corchetes] son indicaciones, no se dicen.

---

## Ventana 1 — Portada

"Buenas a todos. Mi nombre es Juan Ignacio Abarca y les voy a presentar el anteproyecto de mi Trabajo Final de la carrera de Ingeniería en Informática.

El proyecto consiste en un sistema que reconoce de forma automática eventos de un partido de rugby a partir del video. El título que ven es provisorio, todavía no es el definitivo.

Les voy a contar primero qué problema busca resolver, después la idea, cómo funciona, y por último el alcance concreto del trabajo."

[Pasás a la siguiente ventana.]

---

## Ventana 2 — El problema

"Hoy, en casi todos los equipos, el análisis de los partidos se hace mirando el video. El problema es que ese análisis se hace a mano, y eso lleva muchísimo tiempo.

Un analista tiene que mirar la grabación entera, ir encontrando los momentos importantes, y recortarlos uno por uno para poder estudiarlos después. Para que se den una idea: por cada hora de partido se pueden ir más de cuatro horas de trabajo.

Y además de ser lento, depende de que haya una persona experta y disponible para hacerlo, y cada analista lo hace un poco a su manera, así que tampoco es algo que se pueda repetir igual siempre."

---

## Ventana 3 — La brecha

"Ahora, alguno podría decir: bueno, pero ya existen herramientas que hacen esto automáticamente. Y es verdad, existen. El tema es que no sirven para un club amateur.

¿Por qué? Porque esas herramientas comerciales necesitan hardware especial: sensores adentro de la pelota, GPS en los jugadores, cámaras especiales. Eso las hace muy caras y muy difíciles de usar en la práctica.

Y lo peor de todo: como dependen de ese equipamiento, no se pueden aplicar sobre las grabaciones viejas que el club ya tiene guardadas, que justamente son su material más valioso.

El resultado es una brecha: el deporte profesional puede pagar todo esto, y el deporte amateur se queda afuera. Como caso testigo de este trabajo voy a tomar al Círculo Rafaelino de Rugby, el CRAR."

---

## Ventana 4 — La idea

"Entonces, mi propuesta es un sistema que solamente necesita el video. Nada más.

La idea es simple: vos le das una grabación normal del partido, y el sistema te devuelve, por un lado, un listado de los eventos que pasaron, y por el otro, los clips ya recortados y listos para que el entrenador los mire.

La clave de todo esto es que es solo software. No hace falta comprar ningún aparato. Funciona con el video que el club ya graba y ya tiene. Eso es lo que lo hace accesible."

---

## Ventana 5 — Cómo funciona

"¿Y cómo hace el sistema para lograr esto? Lo organicé en tres capas, de lo más simple a lo más complejo.

La primera capa es la de percepción: acá el sistema mira el video y detecta y sigue a los jugadores y a la pelota a lo largo del tiempo.

La segunda capa es la semántica: con esa información, reconoce la jugada o la formación que se está dando. En este caso, el line-out.

Y la tercera capa es la de eventos: una vez que reconoció la jugada, la marca en el tiempo, la guarda, y genera el clip recortado.

Algo importante: las tres capas son independientes, así que cada una se puede desarrollar y probar por separado."

---

## Ventana 6 — Objetivo concreto

"Para que el trabajo sea realista y se pueda terminar, no voy a intentar reconocer todas las jugadas del rugby. Me voy a enfocar en una sola: el line-out.

El line-out es ese saque de lateral donde los jugadores se forman en dos filas y se levanta a un compañero para agarrar la pelota. Lo elegí porque es una formación fija, se ve muy clara en el video, y es fácil de etiquetar.

El sistema tiene que poder ubicar ese line-out en el tiempo de la grabación y generar el clip, con unos diez segundos antes y diez segundos después.

Otras jugadas como el scrum o el ruck las dejo planteadas para más adelante, como una posible extensión, pero no son obligatorias para este trabajo."

---

## Ventana 7 — Alcance y metas

"Acá quiero ser claro con hasta dónde llega el trabajo, porque parte de hacer un buen proyecto es saber ponerle un límite.

Lo que sí voy a hacer: es un sistema solo de software, que analiza el partido después de que terminó, no en vivo. Voy a armar un conjunto de al menos doscientos clips de line-out para entrenar y probar el sistema. Y me pongo metas concretas y medibles: que la detección de los jugadores alcance al menos cero coma setenta en mAP —que es la métrica estándar para medir qué tan bien detecta un modelo—, y que el reconocimiento del line-out alcance al menos cero coma setenta en F1-score, que combina la precisión y la exhaustividad del sistema.

Lo que NO voy a hacer: no funciona en tiempo real durante el partido, no reconoce otros eventos más allá del line-out, y no incluye una interfaz comercial pulida. La salida son los clips y el listado, nada más.

[Si te preguntan por los números: aclarar que son metas de referencia, ajustables según el material que se consiga.]"

---

## Ventana 8 — Cierre

"Para cerrar: la idea de fondo de este proyecto es democratizar el análisis táctico, es decir, acercarle al rugby amateur una herramienta que hoy solo está al alcance del profesional.

El trabajo tiene un doble aporte. Por el lado técnico, queda una arquitectura de reconocimiento de eventos que se podría reutilizar para otros casos. Y por el lado social, es una herramienta accesible, que no necesita ningún hardware caro.

El desarrollo lo estimo en unos seis meses.

Eso es todo de mi parte. Muchas gracias, y quedo abierto a las preguntas que tengan."

---

## Si te preguntan (respuestas cortas para decir)

- **¿Por qué rugby?** "Porque es un deporte con muchas jugadas estructuradas y bien definidas, y porque tengo un entorno real donde probarlo, que es el CRAR."
- **¿Por qué solo el line-out?** "Para acotar el alcance. Es la jugada más clara para validar que todo el sistema funciona de punta a punta. Después se puede extender."
- **¿Y cuando hay muchos jugadores amontonados?** "Ese es justamente el desafío técnico principal. Lo abordo con la detección y el seguimiento de la primera capa."
- **¿Sirve para cualquier cancha?** "Sí, funciona con video normal. Lo único que necesito es que la grabación tenga calidad y un encuadre razonable."
- **¿Se puede usar en otros deportes?** "Por cómo está diseñado, sí se podría, pero eso no lo voy a validar en este trabajo. Queda como posibilidad a futuro."
- **¿Qué es el mAP?** "Es la métrica estándar para medir qué tan bien un modelo detecta objetos. Tiene en cuenta dos cosas: que el sistema no se equivoque marcando cosas que no son, y que tampoco se pierda jugadores que sí están. Va de cero a uno, y mi meta es al menos cero coma setenta."
- **¿Y el F1-score?** "Es parecido, pero para el reconocimiento del evento. Combina en un solo número la precisión —cuántos de los line-outs que marcó eran de verdad— y la exhaustividad —cuántos de los que había logró encontrar—. También va de cero a uno y la meta es cero coma setenta."

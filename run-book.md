# Run-book

Topic: Fast Prototyping
Status: Not started

# Runbook v3 — Fast-Prototyping con IA + Design Thinking + Prompt Engineering

## Tres mensajes principales

> **MENSAJE 1.** “La IA no reemplaza el Design Thinking. Lo acelera. El cuello de botella ya no es construir el prototipo; es la calidad de las preguntas que le hacemos al usuario, al problema y a la herramienta.”
> 

> **MENSAJE 2.** “Saber prompt engineering hoy es como saber hacer búsquedas en Google en 2005: no es opcional, es la habilidad base.”
> 

> **MENSAJE 3.** “Vibe coding no es el problema. La falta de criterio es el problema. La IA acelera lo que ya sabes hacer y enmascara lo que no.”
> 

---

## Línea de tiempo estimada

| # | Bloque | Min | Acumulado |
| --- | --- | --- | --- |
| 1 | Apertura | 3 | 3 |
| 2 | Design Thinking + Prompt Engineering | 7 | 10 |
| 3 | El reto: TulúAlerta | 2 | 12 |
| 4 | **EMPATIZAR**: explicar (3) + Fillout AI live (2) + form audiencia (1.5) + procesar (3) + comentar (1.5) | 11 | 23 |
| 5 | **DEFINIR**: explicar (1) + form (1) + procesar (3) + comentar (2) | 7 | 30 |
| 6 | **IDEAR**: explicar (1) + form (1) + procesar (3) + comentar (2) | 7 | 37 |
| 7 | **Brief de prototipo** (el puente) | 1 | 38 |
| 8 | **PROTOTIPAR**: explicar (1) + Stitch (2) + Claude Artifacts (10) + Publish + QR (2) | 15 | 53 |
| 9 | **EVALUAR**: explicar (1) + audiencia usa prototipo + form (3) + procesar (3) | 7 | 60 |
| 10 | **Vibe Coding**: la conversación incómoda | 5 | 65 |
| 11 | Cierre + recursos | 4 | 69 |
| 12 | Q&A buffer | 6 | 75 |

---

## Prompt Engineering

### Las cuatro técnicas que vas a mostrar

**1. Role Prompting (asignar un rol).**
Empezar el prompt con “Eres un investigador UX…” o “Actúa como diseñador senior…” cambia drásticamente la calidad y el tono de la respuesta. Le dices al modelo desde qué punto de vista hablar.

> *Ejemplo en la charla:* el prompt de procesamiento de Empatizar empieza con “Eres un investigador UX trabajando con datos cualitativos”.
> 

**2. Contextual Prompting (cargar el modelo de contexto).**
Antes de pedir, das suficiente información: el problema, el usuario, las restricciones, los datos previos. Sin contexto, el modelo asume — y casi siempre asume mal.

> *Ejemplo:* el prompt del prototipo incluye persona elegida + POV + HMW + idea final. Sin eso, Claude haría una app genérica de reportes.
> 

**3. Chain of Thought / Razonamiento explícito.**
Pedirle al modelo que muestre los pasos antes de la conclusión. “Antes de responder, identifica patrones, agrupa, justifica.” En vez de pedir el resultado, pides el camino. La calidad del resultado mejora porque el modelo “piensa en voz alta”.

> *Ejemplo:* todos los prompts de procesamiento incluyen “procesa en este orden” + lista numerada. Eso es CoT estructurado.
> 

**4. Prompts enriquecidos (multi-componente).**
Un prompt bien armado tiene cinco partes que las técnicas anteriores combinan: **rol** + **contexto** + **tarea específica** + **formato de salida deseado** + **restricciones o tono**. Si falta alguna, el modelo improvisa esa parte y suele equivocarse.

> *Plantilla universal que vas a enseñar:*
> 
> 
> ```
> [ROL] Eres un X experto en Y.
> [CONTEXTO] Estás trabajando en [proyecto] con [usuarios] que [necesidad].
>             Hasta ahora hemos descubierto [hallazgos previos].
> [TAREA] Genera/Sintetiza/Evalúa [acción específica].
> [FORMATO] Responde en [estructura] con [longitud].
> [RESTRICCIONES] Evita [X]. Considera [Y]. Sé [Z].
> ```
> 

### Anti-patrones

**El prompt de una línea.** “Hazme una app de reportes para Tuluá” — el modelo va a generar algo, pero será genérico, predecible, sin alma. La diferencia entre un prompt de 1 línea y uno de 15 es la diferencia entre un becario sin contexto y un consultor que entendió el brief.

**El prompt sin formato.** “Dame ideas, frustraciones, personas y un POV todo junto” — sale una sopa de texto. Si quieres estructura en la respuesta, pídela explícita: “1. … 2. … 3. …” con etiquetas claras.

---

## Apertura

Idea para abordar la apertura

> “Una pregunta antes de empezar. Levanten la mano si alguna vez tuvieron una idea para algo —una app, una plataforma, un servicio— y la idea murió porque no sabían cómo construirla, o no tenían tiempo, o el equipo era muy chiquito.
> 
> 
> Durante años, esa fue la regla del juego: ideas baratas, prototipos caros. El 90% de las ideas se quedaba en una servilleta.
> 
> En los últimos dos años eso cambió. Y no es porque programar se haya vuelto más fácil — es porque ahora podemos delegarle a una IA partes enteras del proceso de diseño y desarrollo. La pregunta ya no es ‘¿puedo construirlo?’. Es ‘¿debería construirlo, y para quién?’.
> 
> En esta charla vamos a hacer un experimento. Vamos a tomar un problema real de Tuluá. Vamos a recorrer juntos cinco fases de un método llamado **Design Thinking** —no se preocupen si no lo conocen, lo voy explicando— y al final vamos a tener un prototipo que ustedes podrán abrir en su celular.
> 
> Hay una condición: ustedes son parte del experimento. En cada fase voy a abrirles un formulario, ustedes responden con su celular, y yo proceso sus respuestas en vivo con IA. 
> 
> Y hay un spoiler: algo va a salir mal en algún momento de la próxima hora. Esa parte también es importante.”
> 

---

## Design Thinking + Prompt Engineering

### Design Thinking

> “Design Thinking suena pretencioso. En realidad son cinco pasos para no enamorarse de una solución antes de entender el problema. Lo crearon entre Stanford y la empresa IDEO en los 90.
> 
> 
> El descubrimiento que hicieron es incómodo: cuando los humanos enfrentamos un problema, saltamos a la solución que ya conocemos. Eso lleva a productos que nadie usa. Las cinco fases existen para forzarte a tomar el camino largo.
> 
> **EMPATIZAR.** Entender a la persona que tiene el problema. Preguntarle, no imaginarla.
> 
> **DEFINIR.** Resumir lo aprendido en una frase clara. Si no puedes resumirlo, no lo entendiste.
> 
> **IDEAR.** Generar muchas soluciones. La buena emerge de las malas.
> 
> **PROTOTIPAR.** Construir algo lo suficientemente bueno para que alguien lo toque.
> 
> **EVALUAR.** Pasarle el prototipo a un humano real. Aprender. Volver al paso que toque.
> 
> Hoy vamos a hacer las cinco. Con IA acelerando cada una. Ustedes haciendo de usuarios reales en cada fase.”
> 

### Prompt Engineering

**“Antes de seguir: ¿cómo se le habla a una IA?”**

> “Antes de empezar las fases, dos minutos sobre la habilidad que va a estar presente toda la hora: cómo darle instrucciones a una IA. Esto se llama **prompt engineering**, y hoy es lo que era saber buscar en Google en 2005: no es opcional, es la habilidad base.
> 
> 
> Cuatro técnicas que vamos a usar:
> 
> **Role prompting.** Empezar el prompt diciéndole al modelo qué rol jugar. ‘Eres un investigador UX’ no es decorativo — cambia el tono, la profundidad, el vocabulario de la respuesta.
> 
> **Contextual prompting.** Cargar el modelo con la información necesaria antes de pedir. Sin contexto, la IA asume — y suele asumir mal.
> 
> **Chain of thought.** Pedirle que muestre los pasos antes de la conclusión. ‘Antes de responder, agrupa, identifica patrones, justifica’. La calidad mejora cuando el modelo piensa en voz alta.
> 
> **Prompts enriquecidos.** La fórmula que combina todo: **rol + contexto + tarea + formato + restricciones**.
> 
> Y dos errores comunes:
> 
> **Prompt de una línea.** ‘Hazme una app para Tuluá’ — sale algo, pero genérico. La diferencia entre un prompt de 1 línea y uno de 15 es la diferencia entre un becario sin contexto y un consultor que entendió el brief.
> 
> **Prompt sin formato.** ‘Dame ideas, frustraciones y personas todo junto’ — sale sopa de texto. Si quieres estructura en la respuesta, pídela explícita.
> 
> En cada prompt que les muestre hoy, voy a señalarles cuál técnica estoy usando. Que no se les escape el patrón.”
> 

**Slide de respaldo (Plantilla):**

```
[ROL]          Eres un ___ experto en ___.
[CONTEXTO]     Estás trabajando en ___ con ___ que ___.
               Hasta ahora hemos descubierto ___.
[TAREA]        Genera / Sintetiza / Evalúa ___.
[FORMATO]      Responde en ___ con ___.
[RESTRICCIONES] Evita ___. Considera ___. Sé ___.
```

---

## El reto: TulúAlerta

> “Tuluá tiene un río. Ha sido bendición y problema. En 2011 se desbordó y dejó miles de damnificados. Hoy, en cada época de lluvias, hay puntos críticos: basuras que tapan alcantarillas, niveles que suben de noche y nadie reporta a tiempo, contaminación que llega de aguas arriba.
> 
> 
> La información existe — la tiene la CVC (Coorporación Autónoma Regional del Valle del Cauca), los vecinos, ustedes que cruzan el puente. Pero está fragmentada.
> 
> El reto: en lo que queda de la charla, queremos pasar de esa observación a un prototipo de **TulúAlerta**, una plataforma donde cualquier ciudadano pueda reportar un punto crítico, ver lo que otros han reportado en un mapa, y recibir alertas.
> 
> No vamos a construir un producto perfecto. Vamos a construir un prototipo lo suficientemente bueno para que alguien de la CVC, mañana, lo abra y diga: ‘esto sí podría existir’.”
> 

---

## EMPATIZAR + Fillout AI live

Qué es Empatizar

> “Empatizar suena suave. En realidad es la fase más rigurosa: dejar de creer que ya sabes lo que el otro necesita. Es ponerse en los zapatos de alguien — pero no imaginarse los zapatos, **ir a verlos**.
> 
> 
> En Design Thinking clásico, esta fase implica salir a la calle: entrevistas, observación, vivir un día como el usuario. Para TulúAlerta, idealmente, iríamos a barrios cerca del río, hablaríamos con vendedores informales, con la JAC. Eso toma semanas.
> 
> Hay tres herramientas clásicas:
> 
> **Entrevistas semiestructuradas.** Preguntas abiertas. La pregunta correcta no es ‘¿le gustaría una app?’ — es ‘¿qué hizo la última vez que el río subió?’.
> 
> **Empathy Map.** Cuatro casillas: lo que la persona DICE, PIENSA, HACE y SIENTE. Las cuatro suelen contradecirse. Ahí están los insights.
> 
> **Personas.** Perfiles ficticios pero verosímiles que sintetizan a varios usuarios reales.
> 
> ¿Qué hace la IA aquí? Genera versiones rápidas de personas, simula entrevistas, te da hipótesis. **No reemplaza** salir al barrio — te ayuda a llegar al barrio con mejores preguntas.
> 
> Hoy ustedes van a ser nuestros ‘usuarios entrevistados’. Pero antes de mandarles el formulario, vean algo: voy a construir el formulario con IA, en vivo, con una herramienta que se llama Fillout. Esto es un mini-ejemplo de prompt engineering aplicado a una herramienta distinta de Claude.”
> 

### Construir el form con Fillout AI live

Abre `fillout.com/ai-form-builder`. Pega este prompt en el cuadro del AI Form Builder:

```
Form title: "Empatizar — Vecinos del Río Tuluá"

Form purpose: collect short qualitative responses from a live audience
where each person imagines being a neighbor of the Tuluá River in Colombia.
The form will be answered in 90 seconds during a live talk. Spanish language.

Generate exactly 4 questions:

1. Short text: "Imagina que eres un vecino del Río Tuluá. ¿Cuántos años
   tienes y a qué te dedicas?" (required)
2. Short text: "¿Qué es lo más frustrante para ti del río?" (required)
3. Short text: "Cuando llueve fuerte, ¿qué haces? ¿A quién le avisas?"
   (required)
4. Short text: "Si pudieras pedirle algo a las autoridades sobre el río,
   ¿qué sería?" (required)

Settings: no login required, single page, large submit button labeled
"Enviar respuesta", thank you message: "Listo. Vuelve a la pantalla
principal."
```

> “El prompt tiene **role prompting** implícito — definí qué tipo de form es. Tiene **contexto** — para qué se va a usar, en qué charla, en qué idioma. Tiene **tarea específica** — exactamente 4 preguntas con su tipo. Tiene **formato** — single page, mensaje de gracias específico. Esto es lo mismo que le pedimos a Claude, solo que aplicado a una herramienta de no-code. **El prompt engineering es transversal, no exclusivo de chatbots.**”
> 

> “Imaginen que son la señora que vende minutos en la esquina del puente. O el estudiante que cruza en bici. O el vigilante que trabaja de noche.”
> 

### Prompt de procesamiento

```
[ROL]
Eres un investigador UX experto en métodos cualitativos, trabajando con
datos primarios recogidos en una sesión de research.

[CONTEXTO]
Estamos en una charla en Tuluá, Valle del Cauca, Colombia, sobre
prototipado rápido. Acabo de pedirle a la audiencia (≈25 personas) que
se metan en el papel de vecinos imaginarios del Río Tuluá y respondan
desde esa perspectiva. El objetivo es identificar patrones para diseñar
TulúAlerta — una plataforma ciudadana de reporte de puntos críticos
(inundaciones, residuos, contaminación). Cada bloque de abajo es una
respuesta de una persona, con 4 campos en este orden:
edad/ocupación, frustración, comportamiento ante lluvia fuerte,
petición a las autoridades.

[DATOS]
[PEGA AQUÍ LAS RESPUESTAS]

[TAREA — Chain of thought, en este orden]
Antes de dar conclusiones, recorre los datos y procesa así:

1. **Personas emergentes.** Identifica 2 o 3 perfiles que se repiten en
   las respuestas (no inventes, agrupa). Para cada uno: nombre tentativo,
   rango de edad, ocupación típica, una frustración representativa.

2. **Top 5 frustraciones**, ordenadas por frecuencia, con conteo aproximado.

3. **Una frase textual sorprendente o conmovedora** que aparezca en las
   respuestas. Cítala literal y explica por qué llamó la atención.

4. **Empathy Map del perfil más frecuente.** Cuatro casillas:
   - DICE / PIENSA / HACE / SIENTE

5. **Tres hipótesis para la siguiente fase**, en formato:
   "Asumimos que [X], pero podría ser que [Y]"

[FORMATO]
Responde con encabezados claros para cada uno de los 5 puntos. Usa
viñetas. Máximo 350 palabras totales.

[RESTRICCIONES]
Sé concreto. Evita generalidades como "los usuarios necesitan información".
Si en las respuestas aparece desconfianza institucional, dilo. Si aparece
resignación, dilo. No suavices.
```

> “Esto que está pasando —y aquí está la trampa— no es investigación de verdad. Es una primera lectura que después yo iría a contrastar con personas reales del barrio. Pero parte de hipótesis específicas en vez de la mente en blanco.”
> 

---

## DEFINIR

> “Definir es resumir todo lo aprendido en una sola pregunta. Dos herramientas:
> 
> 
> **Punto de Vista (POV).** Una frase: *[usuario] necesita [necesidad emocional o funcional] porque [insight sorprendente]*. Tiene que doler un poco.
> 
> **¿Cómo Podríamos…? (HMW).** Pregunta abierta que invita ideas. ‘Hagamos una app’ cierra. ‘¿Cómo podríamos lograr X?’ abre.
> 
> La IA es excelente sintetizando. NO elige cuál POV vale la pena perseguir — esa decisión es 100% humana, y la voy a tomar yo en frente de ustedes.”
> 

### Form de Fillout

**Título:** “Definir — La frustración central”

| # | Pregunta | Tipo |
| --- | --- | --- |
| 1 | En una frase: ¿cuál es el problema central que ven? | Texto corto |
| 2 | ¿A quién afecta más? | Selección: Ciudadanos / Autoridades / Academia / Todos |
| 3 | ¿Qué debería poder hacer una solución para resolverlo? | Texto corto |

### Prompt de procesamiento

```
[ROL]
Eres un facilitador de Design Thinking sintetizando hallazgos de research
en POVs y HMWs accionables.

[CONTEXTO]
Continuamos la sesión de TulúAlerta en Tuluá. En la fase anterior
identificamos al persona principal: [PEGAR persona elegido]. Y los
insights: [PEGAR top 3 insights de la respuesta anterior de Claude].

Ahora la audiencia respondió 3 preguntas sobre el problema central.
Aquí están las 25 respuestas:

[PEGA AQUÍ]

[TAREA]
1. Identifica **tres patrones** que se repiten. Frases distintas que
   apuntan a la misma idea de fondo.

2. Construye **un Punto de Vista (POV)** en formato:
   "[persona específico] necesita [necesidad concreta] porque
   [insight sorprendente]"
   Hazlo específico. Si tiene que ser largo, que lo sea.

3. Genera **tres preguntas '¿Cómo podríamos…?'** diferentes entre sí
   (no variaciones del mismo HMW). Para cada una, una línea que
   justifique por qué vale la pena.

4. Recomienda cuál de las tres HMW perseguirías hoy y por qué.

[FORMATO]
Encabezados claros para cada punto. Máximo 300 palabras.

[RESTRICCIONES]
El POV debe ser específico al persona, no genérico. Las HMW deben ser
diferentes en alcance y enfoque, no en redacción.
```

**Contextual prompting** 

---

## IDEAR

> “Idear no es ‘tener una buena idea’. Es tener muchas — incluyendo malas, raras, imposibles. La buena emerge de las malas. Dos reglas: **aplazar el juicio** y **cantidad sobre calidad**. Una técnica que me gusta: **‘la peor idea posible’** — libera y revela supuestos escondidos.
> 
> 
> La IA genera 50 ideas en 30 segundos. Es divergencia turbo. Pero tiene un costo: la IA tiende a ideas predecibles. Tu trabajo es empujarla a lo raro y filtrar lo bueno.
> 
> Para esta fase se va a sumar las ideas de ustedes con las que genere la IA y vamos a buscar patrones cruzados.”
> 

### Form de Fillout

**Título:** “Idear — Tres ideas en 60 segundos”

| # | Pregunta | Tipo |
| --- | --- | --- |
| 1 | Tu idea para resolver esto, en tres palabras | Texto corto |
| 2 | La idea más loca que se te ocurra (no tiene que ser realista) | Texto corto |
| 3 | Una solución NO tecnológica que también resolvería esto | Texto corto |

### Prompt de procesamiento

```
[ROL]
Eres un facilitador de design sprints generando y curando ideas en fase
divergente y convergente.

[CONTEXTO]
Continuamos la sesión TulúAlerta. La HMW elegida es:
"[PEGAR HMW]"

El persona principal es: [PEGAR persona]
El POV es: [PEGAR POV]

La audiencia generó tres tipos de ideas. Aquí las 75 respuestas:
[PEGA RESPUESTAS DE LA AUDIENCIA]

[TAREA — divergente luego convergente]

PRIMERO genera tú mismo 15 ideas adicionales para la HMW:
- 5 obvias (necesitamos tenerlas)
- 5 raras o de ciencia ficción
- 3 low-tech (radio, voz, papel, presencial)
- 2 que combinen infraestructura existente en Tuluá (parroquias,
  emisoras, JAC, tiendas de barrio)

DESPUÉS, procesa TODO el material (75 de la audiencia + 15 tuyas) así:

1. **Cuatro clusters temáticos.** Agrupa todas las ideas. Nómbralos.

2. **Para cada cluster:** la idea más prometedora considerando estos
   tres criterios — viabilidad de prototiparlo en 15 minutos con IA
   sin backend real, valor para el usuario (en relación al POV),
   originalidad. Justifica brevemente.

3. **La idea cruzada.** Una propuesta que combine algo tecnológico de
   Claude con algo no tecnológico de la audiencia. Las soluciones
   híbridas suelen ser más resilientes.

4. **Recomendación final.** UNA idea para prototipar hoy, con
   justificación en 3 frases. Debe responder específicamente a la HMW
   y ser implementable en una app móvil sin backend.

[FORMATO]
Encabezados claros. Máximo 400 palabras totales.

[RESTRICCIONES]
- No descartes las ideas raras: anótalas, después decide.
- La recomendación final debe ser implementable como Artifact de Claude
  (frontend React, sin servidor real).
```

---

## Brief de prototipo: el puente

### Lo que la audiencia decidió

```
┌─────────────────┐
│ PERSONA         │
│ Marta, 54,      │ ─┐
│ vendedora       │  │
└─────────────────┘  │
                     │
┌─────────────────┐  │
│ POV             │  │
│ Marta necesita  │ ─┤
│ confiar en que  │  │      ┌───────────────┐
│ su reporte ...  │  │      │  PROTOTIPO    │
└─────────────────┘  ├──→   │  TulúAlerta   │
                     │      │  (siguientes  │
┌─────────────────┐  │      │   16 min)     │
│ HMW             │ ─┤      └───────────────┘
│ ¿Cómo podríamos │  │
│ lograr que ...  │  │
└─────────────────┘  │
                     │
┌─────────────────┐  │
│ IDEA            │  │
│ Mapa + reporte  │ ─┘
│ + WhatsApp ...  │
└─────────────────┘
```

> “Esto que ven en pantalla son cuatro decisiones que NO tomé yo solo. Las construyeron ustedes con su input en cada fase. La IA sintetizó, pero los datos vinieron de ustedes.
> 
> 
> El persona vino de las respuestas que dieron en Empatizar. El POV se construyó con la frustración central que ustedes nombraron. La HMW responde a la urgencia que ustedes priorizaron. La idea final mezcla la recomendación de Claude con el insight de WhatsApp que apareció en sus respuestas.
> 
> Esto que ven aquí —este Brief— es lo que va a entrar al prompt del prototipo. No le voy a decir a Claude ‘haz una app de Tuluá’. Le voy a pegar este brief completo. Por eso lo que sale del prototipo va a tener su huella, no la mía sola.
> 
> Esto, técnicamente, es **contextual prompting llevado al extremo**: cargar al modelo con todo el trabajo previo antes de pedirle que construya.”
> 

---

## PROTOTIPAR

> “Prototipar cambió radicalmente con la IA. Antes: diseñador + dev + una semana. Hoy: una hora con IA.
> 
> 
> Principio guía: **‘lo suficientemente bueno para que alguien lo toque’**. No perfecto. Tocable. Sin backend real, sin autenticación. Pantalla principal, flujo principal, se siente real.
> 
> Dos pasos: primero un mockup visual con **Stitch** (‘cómo se ve’), después una app funcional en React con **Claude Artifacts** (‘cómo se siente’). Vamos.”
> 

### Stitch — el mockup visual

`stitch.withgoogle.com`. Pega:

```
A mobile-first web app called TulúAlerta for citizens of Tuluá, Colombia,
to report critical points on the Tuluá River.

Three screens:

1. MAP (home): full-screen map with colored pins. Red = flooding,
   yellow = trash, blue = pollution. Floating action button "Reportar"
   bottom right. Top bar with app name and bell icon for alerts.

2. REPORT: opens when tapping the FAB. Form with: incident type
   (3 large buttons with icons: Inundación, Residuos, Contaminación),
   urgency level (3 options, color-coded), short description (max 200
   chars), neighborhood (optional, with placeholder examples), submit
   button. Plus a prominent "Compartir por WhatsApp" link below the form.

3. ALERTS: list of system alerts with severity color, title, neighborhood,
   time ago, "Ver en mapa" link.

Style: clean, accessible, large touch targets, generous spacing, blue
and earth tones (river palette but high contrast for accessibility).
Spanish text. WCAG AA compliant.
```

**Contextual prompting** y **formato de salida muy específico** “haz una app para reportar problemas en un río”, saldría algo genérico.

> “60 segundos para lo que sería el trabajo de un diseñador junior una mañana. La IA no quita el trabajo creativo — sube el piso desde el cual empieza.”
> 

### Claude Artifacts — el prototipo funcional

```
[ROL]
Eres un desarrollador frontend senior con experiencia en accesibilidad
y prototipos para presentaciones a stakeholders no técnicos.

[CONTEXTO — Brief completo de la sesión]

Estamos en una charla en Tuluá, Colombia, construyendo un prototipo
funcional de TulúAlerta — una plataforma ciudadana de reporte de puntos
críticos en el Río Tuluá.

PERSONA PRINCIPAL: [PEGAR persona elegido, ej. "Marta, 54 años, vendedora
informal cerca del puente. No usa apps modernas pero sí WhatsApp diario.
No confía en la respuesta institucional."]

POV: [PEGAR POV elegido]

HMW: [PEGAR HMW elegida]

IDEA A IMPLEMENTAR: [PEGAR idea final, ej. "App móvil con mapa para
reportar puntos críticos, tres niveles de urgencia, sin login, con
enlace explícito a canal de WhatsApp para que el reporte se sienta
escuchado."]

INSIGHT CRÍTICO DE LA AUDIENCIA: la confianza se gana con respuesta
visible, no con interfaces sofisticadas. WhatsApp aparece repetidamente
como el canal de confianza.

[TAREA]
Construye un Artifact único en React con Tailwind, mobile-first, con
estas funcionalidades:

1. **Pantalla principal: mapa simulado.**
   - Div grande con SVG estilizado representando un área urbana con
     un río atravesándola.
   - 5 pins de ejemplo posicionados absolutamente. Colores:
     rojo (inundación), amarillo (residuos), azul (contaminación).
   - Tap en un pin abre un panel inferior con: tipo, descripción,
     tiempo del reporte, número de "yo también lo veo", botón para
     confirmar.
   - Top bar: nombre "TulúAlerta" + ícono de campana.
   - Tab inferior con dos opciones: Mapa / Alertas.

2. **Botón flotante "Reportar"** (rojo, abajo derecha).
   Al tocar abre modal con:
   - Selector visual de tipo (3 botones grandes con íconos:
     inundación, residuos, contaminación).
   - Selector de urgencia (3 niveles: baja/media/alta, color-coded).
   - Campo de barrio (opcional, placeholder con ejemplos de barrios
     de Tuluá: "Mateguadua, Aguaclara, Carlos Sarmiento...").
   - Textarea de descripción (máx 200 caracteres, contador visible).
   - Botón "Enviar reporte".
   - **Después de enviar**: animación de éxito + un botón prominente
     "Compartir también por WhatsApp" (este es el insight crítico —
     conecta la app con el canal de confianza).
   - Agrega el nuevo pin al mapa con los datos ingresados.

3. **Tab "Alertas"**: lista de 3 alertas de ejemplo. Cada card con
   badge de severidad, título, barrio, hace X horas, botón
   "Ver en mapa".

4. Estado en memoria con useState. Sin backend. Sin localStorage.
   Lucide-react para íconos.

[FORMATO]
Un solo Artifact React. Componentes funcionales. Tailwind para estilos.

[RESTRICCIONES]
- Mobile-first pero centrado y elegante en desktop.
- Paleta: azules de río no saturados, ámbar y rojo para alertas, fondo
  blanco hueso.
- Tipografía system-ui, jerarquía clara.
- Accesibilidad: labels en todos los inputs, contraste AA, foco visible,
  alt text en íconos.
- Idioma: español colombiano natural.
- Sin emojis decorativos. Profesional.
- El botón de WhatsApp debe ser visualmente prominente — no escondido.
- Que un alcalde lo vea y crea que es producto real.
```

> “Vean cómo descompone el problema. Está creando los componentes, definiendo el estado, decidiendo cómo posicionar los pins. Esto que está pasando es trabajo de horas en una primera iteración tradicional.
> 
> 
> Y miren el prompt una vez más: ¿se dan cuenta cuánto contexto cargué? El persona, el POV, la HMW, la idea final, el insight crítico de WhatsApp. Sin ese contexto Claude habría hecho una app genérica de reportes — útil, pero sin conexión con la conversación que tuvimos.”
> 

### Iteración en vivo

```
Buen primer intento. Tres ajustes:

1. Los pins de inundación deben pulsar suavemente (animación pulse) — la
   urgencia tiene que comunicarse visualmente.

2. El botón "Compartir por WhatsApp" después de enviar tiene que ser MÁS
   prominente — color verde de WhatsApp, ícono grande. Es nuestro insight
   más fuerte.

3. En el placeholder del barrio, agrega también "el puente de la 25" porque
   muchas referencias en Tuluá son a infraestructura, no solo a barrios.

Aplica solo estos cambios sin reescribir el resto.
```

> “Pedir cambios concretos en lenguaje natural es lo que separa la IA de un truco. La primera versión nunca es la final. Pero a diferencia de un equipo humano, la iteración no toma una semana. Toma 30 segundos. Esto, dicho con todas sus letras, es vibe coding — y vamos a hablar de eso al final, porque tiene un lado que celebrar y un lado del que cuidarse.”
> 

### Publish + QR

> “Saquen el celular. Apunten al QR. Va a abrir el prototipo. Tóquenlo. Reporten algo. A ver qué pasa.”
> 

---

## EVALUAR

> “Evaluar es la fase humilde. Casi siempre el prototipo está peor de lo que crees. Eso no es fracaso — es información.
> 
> 
> Dos formas: **pruebas de usabilidad** (le das el prototipo a alguien sin explicar y observas dónde se traba) y **evaluación heurística** (un experto revisa contra principios — los más famosos son las 10 heurísticas de Nielsen).
> 
> La IA hace evaluación heurística en segundos. Lo que NO hace es estar parada al lado de Marta cuando intenta usar la app. Para eso seguimos necesitando humanos. Hoy ustedes son nuestros humanos.”
> 

### Form de Fillout

**Título:** “Evaluar — Tu experiencia con TulúAlerta”

| # | Pregunta | Tipo |
| --- | --- | --- |
| 1 | En 1 palabra: ¿qué te transmite el prototipo? | Texto corto |
| 2 | Si vieras un problema en el río mañana, ¿reportarías con esto? | Selección: Sí / Tal vez / No |
| 3 | ¿Qué te falta? | Texto corto |
| 4 | ¿Qué te sobra? | Texto corto |
| 5 | (Opcional) Una sugerencia concreta | Texto corto |

### Prompt de procesamiento

```
[ROL]
Eres un evaluador UX experto en heurísticas de Nielsen y síntesis de
feedback de pruebas con usuarios reales.

[CONTEXTO]
La audiencia de la charla TulúAlerta acaba de probar el prototipo en sus
celulares. Aquí están las 25 respuestas a 5 preguntas:

[PEGA RESPUESTAS]

El persona principal es: [PEGAR persona]
La HMW elegida fue: [PEGAR HMW]

[TAREA — en este orden]

1. **Las 3 palabras más frecuentes** en la pregunta 1. Qué nos dicen.

2. **Distribución de la pregunta 2** (% Sí / Tal vez / No) y la razón
   más mencionada para cada categoría.

3. **Top 3 cosas que faltan** (pregunta 3), con un ejemplo textual cada
   una.

4. **Top 3 cosas que sobran** (pregunta 4).

5. **Tres sugerencias concretas** (pregunta 5) que considerarías
   implementar en la próxima iteración. Justificación corta para cada una.

6. **Evaluación heurística de Nielsen** aplicada al prototipo: los 3
   hallazgos con mayor severidad.

7. **Recomendación final.** Si tuvieras que elegir UN cambio antes de
   mostrarle esto a alguien de la CVC, ¿cuál sería?

[FORMATO]
Encabezados claros. Máximo 400 palabras.

[RESTRICCIONES]
Honesto, no condescendiente. Si la app está mediocre, dilo. Si los
usuarios no la usarían, dilo.
```

> “Esto es lo más valioso que pasó en la última hora. Retroalimentación real, sin filtros. Si yo hubiera lanzado esto sin esta fase, mañana la CVC me lo devuelve.”
> 

---

## Vibe Coding — la conversación incómoda

### Vibe coding — ¿amigo o enemigo?

> “En esta misma conferencia he escuchado preguntas que me parecen sanas. Profesores que se preguntan si sus estudiantes están aprendiendo o están haciendo vibe coding. Estudiantes que se preguntan si lo que están aprendiendo va a importar en cinco años. Profesionales preguntándose si su trabajo está en peligro. Las tres preguntas son reales. Las tres tienen una respuesta común que quiero compartir.
> 
> 
> *Vibe coding* es el término que el investigador Andrej Karpathy popularizó: programar dejándose llevar por la intuición, pidiéndole a la IA, aceptando lo que sale, sin entender necesariamente qué está pasando. Lo que acabo de hacer en los últimos 15 minutos —pedirle a Claude un prototipo, pedirle iteraciones, aceptar lo que devolvió— **es vibe coding**. Y lo defiendo, en este contexto, por una razón: el contexto es prototipo, no producción. La consecuencia de un error es que el demo se ve raro. La iteración cuesta 30 segundos.
> 
> Pero si yo tomara este código, lo pusiera en producción real, manejara datos personales de ciudadanos, lo conectara a sistemas de la alcaldía — sin entender lo que hice, sin poder debuggear, sin saber qué está expuesto y qué no — eso no es vibe coding. Eso es negligencia.
> 
> **Cuándo el vibe coding está bien:** cuando estás explorando una idea, cuando las consecuencias del error son bajas, cuando puedes botar lo que salga y empezar de nuevo, cuando estás aprendiendo y la IA te sirve de tutor que te enseña al hacer. En estos casos, la IA te acelera bien.
> 
> **Cuándo el vibe coding es peligroso:** cuando hay datos sensibles, cuando hay vidas o dinero en juego, cuando la decisión es difícil de revertir, cuando no puedes explicar línea por línea qué hace tu código. Ahí la IA no te acelera — te disfraza.
> 
> Hay una distinción que me ha servido. La frase es: **la IA es una palanca. Multiplica lo que tú aportas. Si aportas criterio, multiplica criterio. Si aportas vacío, multiplica vacío.**
> 
> Tres principios prácticos para llevar:
> 
> **Uno: ensúciate las manos primero.** Antes de delegar X a la IA, aprende lo suficiente de X como para detectar cuando te miente. La IA falla más seguido de lo que parece, y la mentira más peligrosa es la que suena bien. Si nunca programaste auth desde cero, no puedes detectar cuando Claude te genera auth con un hueco de seguridad.
> 
> **Dos: la IA acelera lo que sabes hacer; enmascara lo que no.** Esta no es retórica. Es pragmática. Un ingeniero senior con IA produce más rápido y mejor. Un junior con IA produce más rápido y peor — más rápido porque genera código volúmenes; peor porque acumula deuda técnica que no detecta. Si están empezando, usen la IA como tutor, no como reemplazo del esfuerzo de aprender.
> 
> **Tres: conviértanse en arquitectos, no en estenógrafos.** El trabajo del ingeniero de software no se va a reemplazar — se va a recolocar. La parte de teclear código rutinario sí, casi seguro. La parte de decidir qué construir, cómo descomponer un problema, qué tradeoffs tomar, qué se debe automatizar y qué no — esa parte se vuelve más valiosa, no menos. La pregunta para ustedes los estudiantes no es ‘¿voy a perder mi trabajo?’. Es ‘¿estoy entrenándome para teclear o para decidir?’.
> 
> A los profesores: si tienen un estudiante que solo hace vibe coding y no entiende lo que entrega, eso es un problema pedagógico, no un problema de IA. La pregunta correcta no es ‘cómo prohíbo la IA’. Es ‘cómo evalúo comprensión cuando la entrega es trivial’. Eso requiere repensar las tareas, y es una conversación que su universidad ya está teniendo.
> 
> A los estudiantes: el día que la IA falle —y va a fallar en algún momento crítico— ustedes necesitan poder hacer la tarea sin ella. Esa es la prueba ácida. Si la respuesta es ‘no podría’, ahí está el agujero que tienen que cerrar.
> 
> No estoy diciendo: ‘no usen IA’. Acabo de pasar una hora diciendo lo contrario. Estoy diciendo: **úsenla como palanca de algo, no como sustituto de todo**. La diferencia entre las dos es su carrera.”
> 

---

## Cierre

### Lo que la IA NO hizo hoy

- No fue al barrio.
- No habló con Marta de verdad.
- No sabe si la CVC tiene capacidad real de atender estos reportes.
- No detectó que el prototipo, sin moderación, podría usarse para denunciar personas en vez de problemas.
- No considera que partes de Tuluá tienen poca señal.
- No te pregunta si esto debería existir. Solo te ayuda a construirlo.

> “El prototipo es bueno. Pero si yo, mañana, lo lanzo así —sin haber ido al barrio, sin haber hablado con la CVC, sin haber pensado en quién podría hacer mal uso, sin haber considerado a quien usa un Nokia básico— estaría usando la IA mal.
> 
> 
> La IA no acelera el Design Thinking si te saltas las fases. Solo acelera tu camino al fracaso. La velocidad sin dirección es solo desperdicio caro.”
> 

### Tres frases finales

> *Mensaje 1.* “La IA acelera el Design Thinking. No lo reemplaza.”
> 
> 
> *Mensaje 2.* “Prompt engineering hoy es como Google en 2005: la habilidad base.”
> 
> *Mensaje 3.* “Vibe coding no es el problema. La falta de criterio es el problema.”
> 

> “**Tu próxima idea ya no muere por falta de manos. Asegúrate de que viva por las razones correctas — y de que tú entiendas, en el fondo, por qué vive.**”
>
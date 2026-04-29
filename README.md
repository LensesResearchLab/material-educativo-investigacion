# Fast-Prototyping con IA · Recursos de la charla

> Material complementario de la charla del **Miércoles 29 de abril de 2026**, V Semana Internacional Ucevista 2026 — *Horizontes Nórdicos*.
> 
> 
> Aquí están los prompts, herramientas, lecturas y enlaces que prometí. Si construyes algo con esto en tu ciudad, escríbeme. Me encanta saber.
> 
> — Wilmer Arévalo
> 

---

## Enlaces rápidos

- **Prototipo final de TulúAlerta:** [pegar URL del Artifact publicado]
- **Diapositivas de la charla:** [pegar URL de las slides en HTML o PDF]
- **Mi correo:** w.arevalo@uniandes.edu.co
- **LinkedIn:** https://www.linkedin.com/in/wareval0/

---

## La plantilla universal de prompt engineering

Esta es la plantilla que vimos en la charla. Si tu prompt no incluye los cinco componentes, alguno se está improvisando — y el modelo improvisa peor que tú.

```
[ROL]           Eres un {rol} experto en {dominio}.

[CONTEXTO]      Estás trabajando en {proyecto} con {usuarios} que {necesidad}.
                Hasta ahora hemos descubierto {hallazgos previos}.

[TAREA]         Genera / Sintetiza / Evalúa {acción específica}.

[FORMATO]       Responde en {estructura} con {longitud}.

[RESTRICCIONES] Evita {X}. Considera {Y}. Sé {Z}.
```

### Las cuatro técnicas que se ven aplicadas en cada prompt

1. **Role Prompting** — asignarle al modelo un rol cambia tono, profundidad, vocabulario.
2. **Contextual Prompting** — cargar al modelo con la información necesaria antes de pedir.
3. **Chain of Thought** — pedirle que muestre los pasos antes de la conclusión.
4. **Prompts Enriquecidos** — la fórmula completa que combina todo lo anterior.

### Dos anti-patrones a evitar

- **Prompt de una línea:** *“Hazme una app para Tuluá”* → sale algo, pero genérico.
- **Prompt sin formato:** *“Dame ideas, frustraciones y personas todo junto”* → sopa de texto. Si quieres estructura, pídela explícita.

---

## Los 8 prompts de la charla

Cada uno está listo para copiar. Adáptalos a tu propio caso reemplazando lo que está entre `[corchetes]`.

### Prompt 1 · Fillout AI Form Builder (construcción de formularios con IA)

Para usar en `fillout.com/ai-form-builder`:

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

**Técnicas aplicadas:** rol implícito (form-builder UX), contexto (charla en vivo, idioma, propósito), tarea específica (4 preguntas exactas), formato (single page, mensaje de gracias).

---

### Prompt 2 · Procesamiento de Empatizar

Para usar en Claude después de recoger las respuestas del form:

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

---

### Prompt 3 · Procesamiento de Definir

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

---

### Prompt 4 · Procesamiento de Idear

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
   Claude con algo no tecnológico de la audiencia.

4. **Recomendación final.** UNA idea para prototipar hoy, con
   justificación en 3 frases. Debe responder específicamente a la HMW
   y ser implementable en una app móvil sin backend.

[FORMATO]
Encabezados claros. Máximo 400 palabras totales.

[RESTRICCIONES]
- No descartes las ideas raras: anótalas, después decide.
- La recomendación final debe ser implementable como Artifact de Claude.
- Si las respuestas de la audiencia son demasiado vagas o repetitivas,
  dilo explícitamente y compensa con tus 15 ideas.
- La idea cruzada DEBE combinar al menos un elemento explícito
  de la audiencia (cita la respuesta original) con un elemento de
  tu generación.
```

---

### Prompt 5 · Mockup visual con Stitch

Para usar en `stitch.withgoogle.com`:

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

---

### Prompt 6 · Prototipo funcional con Claude Artifacts

Este es el prompt más importante. Observa cómo carga **todo el contexto** del brief:

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

---

### Prompt 7 · Iteración del prototipo

Después del primer resultado, no aceptes la versión inicial. Itera con cambios concretos:

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

---

### Prompt 8 · Procesamiento de Evaluar

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

---

## El stack — qué herramienta para qué

### Para pensar y procesar

**Claude (claude.ai)**
Lo que usé hoy para todas las fases de procesamiento (Empatizar, Definir, Idear, Evaluar) y para construir el prototipo. Plan Pro o Max si vas a usarlo intensivo.
*Cuándo:* análisis cualitativo, síntesis, prototipos de tamaño medio.

### Para diseñar interfaces

**Stitch** ([stitch.withgoogle.com](https://stitch.withgoogle.com/))
Herramienta de Google que diseña interfaces a partir de texto. Genera mockups visuales mobile/desktop.
*Cuándo:* primer borrador visual antes de programar.

### Para construir prototipos

**Claude Artifacts**
Lo que vimos en vivo. React + Tailwind, en memoria, publicable a URL pública en un click.
*Cuándo:* prototipo funcional de hasta unos cientos de líneas, sin backend real.

**v0.dev** (de Vercel)
Alternativa a Artifacts, también genera React. Se especializa más en UI components.
*Cuándo:* cuando necesitas componentes muy pulidos visualmente y los vas a usar en un proyecto Next.js real.

### Para formularios y captura de datos

**Fillout** ([fillout.com](https://fillout.com/))
Lo que usamos para los formularios en vivo. Tiene un AI Form Builder que crea formularios desde una descripción.
*Cuándo:* formularios bonitos, sin código, con dashboard de respuestas.

**Tally** ([tally.so](https://tally.so/))
Alternativa más simple, gratis con menos funciones.

### Para deploy a producción

**Vercel** ([vercel.com](https://vercel.com/))
Subir un prototipo a una URL real con dominio propio. `vercel --prod` desde la terminal.
*Cuándo:* cuando el prototipo se vuelve algo que quieres compartir más allá de un Artifact.

### Para backend y datos reales

**Firebase Studio** ([firebase.studio](https://firebase.studio/))
Cuando tu prototipo necesita autenticación, base de datos, almacenamiento real. La siguiente parada lógica después de un Artifact.
*Cuándo:* cuando ya validaste la idea y quieres construir un MVP con datos persistentes.

**Supabase** ([supabase.com](https://supabase.com/))
Alternativa open-source a Firebase. Postgres real, auth, storage.

### Para proyectos más grandes que un Artifact

**Cursor** ([cursor.sh](https://cursor.sh/))
Editor de código con IA integrada. Trabaja sobre archivos reales en tu computador.
*Cuándo:* proyectos de varios archivos donde el contexto importa.

**Claude Code**
Herramienta de línea de comandos de Anthropic. Trabaja sobre archivos en tu repositorio.
*Cuándo:* cuando ya tienes un repositorio y quieres delegarle tareas concretas con contexto del código completo.

---

## Lecturas recomendadas

### Sobre Design Thinking y prototipado rápido

- **Sprint** — Jake Knapp, John Zeratsky, Braden Kowitz.
El método de Google Ventures para prototipar y validar en 5 días. Primo del enfoque que vimos hoy, escalado a una semana en vez de 75 minutos.
- **Stanford d.school Bootleg** ([dschool.stanford.edu](https://dschool.stanford.edu/))
Gratis online. Las técnicas clásicas del Design Thinking, presentadas como un mazo de cartas. Probablemente la mejor introducción gratuita al método.
- **The Design of Everyday Things** — Don Norman.
Por qué tantos productos están mal diseñados y cómo pensar diferente al respecto. Fundamental.
- **IDEO Human-Centered Design Toolkit** ([designkit.org](https://designkit.org/))
Métodos prácticos para investigación con usuarios.

### Sobre prompt engineering

- **Anthropic — Prompt Engineering Overview**[docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)
La guía oficial. Bien escrita, con ejemplos concretos.
- **OpenAI — Prompt Engineering Guide**
Aplicable más allá de los modelos de OpenAI. Las técnicas son transversales.
- **Lilian Weng — Prompt Engineering** (su blog)
Más técnico, más profundo. Para cuando quieras entender el por qué detrás del cómo.

### Sobre Vibe Coding

- **Andrej Karpathy — “Vibe Coding”** (publicación original en X/Twitter, varios análisis posteriores)
El que popularizó el término. Vale la pena leer su tweet original y los hilos que generó.
- **“AI-Assisted Coding: Carnage and Joy”** — Simon Willison’s blog.
Una de las miradas más equilibradas sobre los límites y oportunidades.

### Sobre IA y el futuro del trabajo

- **The Cathedral and the Bazaar** — Eric S. Raymond.
No es sobre IA, pero sus ideas sobre cómo el software se construye colectivamente son relevantes para entender hacia dónde va el desarrollo asistido.

---

## Preguntas frecuentes

### “¿Por qué Claude y no ChatGPT/Gemini/etc?”

Para esta charla específicamente, Claude tiene la ventaja de los **Artifacts** — el prototipo se construye dentro de la conversación y se publica con un click. ChatGPT puede generar código pero no tiene un equivalente nativo igual de pulido. Gemini es bueno para investigación. La respuesta honesta: usa el que mejor funcione para tu caso, y aprende prompt engineering — esa habilidad es transversal.

### “¿No es esto solo para programadores?”

No. La fase de Empatizar, Definir e Idear no requiere programar. Y para Prototipar, lo que vimos hoy fue construir una app sin escribir código — describiendo en lenguaje natural lo que queríamos. Si entiendes el problema, hoy puedes prototipar. La barrera técnica bajó muchísimo.

### “¿Y la seguridad? ¿Y los datos personales?”

Excelente pregunta — exactamente lo que descubriríamos en la fase Evaluar con un usuario real. Para producción se necesita: anonimización de reportes, moderación, política de retención clara, posiblemente registro de fuente para evitar abuso. Lo que vimos hoy es un **prototipo**, no un producto listo. Esa diferencia importa.

### “¿Cómo evalúo a mis estudiantes si pueden usar IA?”

La pregunta no es cómo prohibir la IA. Es cómo evaluar **comprensión** cuando la entrega es trivial de generar. Algunas ideas: evaluar el proceso (no solo el entregable), pedir defensas orales del trabajo, hacer evaluaciones en clase con restricciones, asignar tareas que requieran juicio contextual que la IA no tiene. Es una conversación abierta y vale la pena tenerla con tus colegas.

### “¿La IA va a reemplazar a los ingenieros de software?”

Creo que va a recolocar el trabajo, no eliminarlo. La parte de teclear código rutinario sí, en gran parte. La parte de decidir qué construir, cómo descomponer un problema, qué tradeoffs tomar, qué se debe automatizar y qué no — esa parte se vuelve más valiosa, no menos. La pregunta para los estudiantes es: ¿se están entrenando para teclear o para decidir?

---

## Si quieres seguir conversando

Si construyes algo con esto en tu ciudad, escríbeme. Si tienes preguntas que no contesté en la charla, escríbeme. Si quieres compartir cómo te fue intentando algo similar, también.

Las charlas se vuelven valiosas cuando lo que pasa después es más interesante que lo que pasó adentro.

Gracias por la hora y cuarto.

— **Wilmer Arévalo**
Universidad de los Andes · Lenses Research Lab
w.arevalo@uniandes.edu.co · https://www.linkedin.com/in/wareval0/

---

*V Semana Internacional Ucevista 2026 · Horizontes Nórdicos · Tuluá, Valle del Cauca · 29 de abril de 2026*
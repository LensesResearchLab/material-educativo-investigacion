# Agentic QA - Testing Basado en Intención con Stagehand

## **Testing Agéntico y Declarativo**

En este tutorial vamos a **cambiar el "chip"** mental. Venimos de años de luchar con selectores CSS, XPaths inestables y `timeouts`. Ahora, vamos a delegar esa complejidad a una Inteligencia Artificial, pero eso conlleva nuevos riesgos y responsabilidades.

"La automatización tradicional se rompe cuando la UI cambia. La automatización agéntica se adapta, porque entiende lo que el usuario quiere lograr, no solo dónde debe hacer clic."

**La Evolución del Paradigma: Imperativo vs. Declarativo**

Para entender **Stagehand**, primero debemos entender el cambio filosófico en cómo escribimos software de pruebas.

**El Pasado: Testing Imperativo (Playwright/Cypress clásico)**

Hasta ahora, hemos sido **Micro-managers**. Le decimos al navegador *exactamente* cómo hacer cada paso.

- **Código:** `await page.locator('div.product > button.add-btn').click();`
- **Mentalidad:** "Busca este elemento exacto en el DOM y haz clic".
- **Fragilidad:** Si el desarrollador cambia la clase `.add-btn` a `.buy-btn`, el test falla. El test está acoplado a la **Implementación**.

**El Futuro: Testing Declarativo (Stagehand/AI Agents)**

Con IA, nos convertimos en **Directores**. Le decimos al navegador *qué* queremos lograr.

- **Código:** `await stagehand.act("Add the first product to the cart");`
- **Mentalidad:** "Analiza la pantalla, encuentra algo que parezca un botón de añadir al carrito para el primer producto y haz clic".
- **Robustez:** Si la clase cambia, el Agente (LLM) mira el nuevo botón, lee "Add to Cart", entiende que cumple la intención y hace clic. El test está acoplado a la **Intención**.

### **¿Qué es un Agente de IA en QA?**

Un script de Playwright es "ciego"; solo sigue coordenadas o selectores.

Un **Agente de IA** (como los que construye Stagehand) opera en un bucle cognitivo continuo: **OODA Loop** (Observe, Orient, Decide, Act).

1. **Percepción (Observe):** El Agente toma una captura de pantalla (Vision) y extrae el árbol de accesibilidad (DOM simplificado) de la página actual.
2. **Razonamiento (Orient/Decide):** Envía esa información a un LLM (GPT-4o, Claude 3.5 Sonnet) junto con tu instrucción ("Quiero loguearme"). El modelo analiza la UI y decide: *"El campo de usuario es el input #user y el botón es #login"*.
3. **Acción (Act):** El Agente traduce esa decisión en comandos de bajo nivel de Playwright (`fill`, `click`).
4. **Verificación:** El Agente observa si la acción tuvo el efecto esperado.

```mermaid
graph TD
    User[Instrucción: Comprar Camisa] --> Agent
    subgraph AI Agent Loop
        Agent -->|1. Captura DOM & Screenshot| Browser
        Browser -->|2. Estado Visual| LLM[Cerebro GPT-4o/Claude]
        LLM -->|3. Plan de Acción Selector X| Agent
        Agent -->|4. Ejecuta Playwright| Browser
    end
    Browser -->|5. Nuevo Estado| Agent
```

### **Conceptos Clave de Stagehand**

Stagehand no es solo una librería para "hablar con chatGPT". Es un SDK diseñado para integrar este ciclo agéntico en el código de Playwright de manera confiable. Se basa en tres primitivas:

1. **act():** Realizar una acción en la página.
    - *Ej:* "Click en el botón de contacto".
2. **extract():** Sacar datos estructurados de la página.
    - *Ej:* "Dame una lista de todos los precios en formato JSON".
3. **observe():** Analizar el estado actual para tomar decisiones o hacer aserciones.
    - *Ej:* "¿Hay algún mensaje de error en pantalla?".

### **Los Riesgos: El Costo de la Magia**

Como Ingenieros de Calidad, debemos ser escépticos. La IA no es mágica, es probabilística. Introducir LLMs en el pipeline de CI/CD trae nuevos desafíos que no existían en el testing determinista.

**1. No Determinismo (Flakiness 2.0)**

En Playwright puro, si corres el test 100 veces, hará lo mismo 100 veces (salvo problemas de red).

Con IA, el modelo podría decidir hoy que el botón de "Entrar" es el correcto, y mañana decidir que el enlace "Iniciar Sesión" es mejor.

- *Mitigación:* Stagehand usa **Caching**. Una vez que el Agente descubre cómo cumplir una intención ("Loguearse"), guarda esa acción concreta. Las siguientes ejecuciones usan el cache (determinista y rápido), no la IA.

**2. Alucinaciones**

El modelo puede "creer" que hizo clic en un botón que no existe, o interpretar un icono de "Papelera" (Borrar) como un "Carrito de Compras" si el diseño es ambiguo.

- *Mitigación:* Validaciones estrictas post-acción (stagehand.observe) y uso de modelos de visión (Multimodales).

**3. Latencia y Costo**

Una instrucción `page.click()` tarda 5ms. Una instrucción `stagehand.act()` implica enviar una foto a los servidores de OpenAI/Anthropic, procesarla y recibir respuesta. Esto puede tardar **2 a 5 segundos** por paso. Además, cada paso cuesta dinero (tokens).

- *Estrategia:* Usar IA solo para flujos frágiles o complejos, y usar Playwright tradicional para navegación estática.

### **Requisitos del Taller**

Para proceder con este taller, asumiremos lo siguiente:

1. **Conocimiento de Playwright:** Ya sabes cómo funciona el navegador, qué es el DOM y cómo ejecutar tests.
2. **Node.js:** Versión 18 o superior.
3. **API Key:** Necesitarás una clave de **OpenAI** (para usar GPT-4o) o **Anthropic** (para Claude 3.5 Sonnet).
    - *Nota:* Stagehand funciona mejor con modelos capaces de interpretar imágenes (Vision). Modelos antiguos o pequeños (GPT-3.5) suelen fallar en tareas de UI.

Stagehand no viene a reemplazar tu trabajo. Viene a **elevar tu nivel de abstracción**.

En lugar de ser el albañil que pone ladrillo por ladrillo (selectores), te conviertes en el Arquitecto que define la estructura y el propósito del edificio (intenciones).

<aside>
¿Listos para configurar a nuestro primer Agente de IA? Pasemos a la Configuración del Entorno.

</aside>

## **Configuración del Entorno**

Ahora que entendemos la teoría (el *porqué*), vamos a construir la infraestructura (el *cómo*).

En este módulo, configuraremos un proyecto desde cero. A diferencia de Playwright estándar, **Stagehand** requiere una conexión vital con un "Cerebro" externo (el LLM). Sin esta conexión, el agente es solo un cascarón vacío.

En la automatización tradicional, el "cerebro" eras tú escribiendo selectores. En la automatización agéntica, el cerebro es un modelo de lenguaje (LLM) que vive en la nube.

Por lo tanto, el paso más crítico de este módulo no es instalar una librería, es **gestionar las credenciales** de forma segura.

### **Gestión de Secretos (API Keys)**

Stagehand actúa como un puente entre el navegador y el proveedor de IA. Necesitas una llave para abrir ese puente.

**Requisitos Previos:**

- Una cuenta en **OpenAI Platform** (con créditos) o **Anthropic Console**.
- Generar una API Key (`sk-...`).

> Advertencia de Seguridad: Jamás subas tus API Keys a GitHub. Si lo haces, bots las encontrarán en segundos y drenarán tu crédito. Usaremos variables de entorno (`.env`) para protegerlas.
> 

**Paso 1: Crear el proyecto**

Abre tu terminal y crea un directorio limpio para este taller:

```bash
npm init -y
```

**Paso 2: Instalar Dependencias**

Necesitamos **Stagehand** (el orquestador), **Playwright** (el ejecutor), **Zod** (para estructurar datos) y **Dotenv** (para seguridad).

```bash
# Instalamos Stagehand y sus compañeros
npm install @browserbasehq/stagehand zod dotenv

# Instalamos los navegadores de Playwright (solo Chromium para este taller)
npx playwright install chromium
```

*(Nota: Stagehand v3+ suele instalar Playwright automáticamente, pero forzamos la instalación para asegurar compatibilidad).*

**Paso 3: Configurar el `.env`**

Crea un archivo llamado `.env` en la raíz del proyecto y agrega tu llave.

```
# .env
# Opción A: Si usas OpenAI (Recomendado: gpt-4o)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx

# Opción B: Si usas Anthropic (Recomendado: claude-3-5-sonnet)
# ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxx

# Opción C: Si usas Groq (Recomendado: groq-llama-3.3-70b-versatile)
GROQ_API_KEY=gsk-xxxxxxxxxxxxxxxxxxxx

# Nivel de detalle de los logs (DEBUG para ver qué piensa el agente)
STAGEHAND_LOG_LEVEL=info
```

### **Configuración del Agente (`stagehand.config.ts`)**

Aunque Stagehand puede funcionar con configuraciones por defecto, un Ingeniero de QA debe tener control sobre el comportamiento del agente. Vamos a crear un archivo de configuración explícito.

Crea el archivo `stagehand.config.ts` en la raíz:

```tsx
import dotenv from "dotenv";

dotenv.config();

/**
 * Configuración Maestra del Agente (v3)
 */
export const StagehandConfig = {
  // 1. EL ENTORNO
  env: "LOCAL" as const, // Usa tu Chrome local
  
  // 2. EL CEREBRO (LLM) - Sintaxis v3
  model: {
    // Proveedor/Modelo (ej: openai/gpt-4o, anthropic/claude-3-5-sonnet-latest)
    modelName: "groq-llama-3.3-70b-versatile", 
    clientOptions: {
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    },
  },

  // 3. DEBUGGING
  debugDom: true, // Pinta cajas en la pantalla (Highlight)
  verbose: 1 as const, // Nivel de logs (0, 1, 2)
  headless: false, // Ver el navegador
};
```

<aside>
Nota: Si bien hemos recomendado el uso de openai/gpt-4o como LLM, para efectos del tutorial vamos a usar GROQ el cuál ofrece un API gratuito.

Se definió la variable OPENAI_API_KEY pero con el valor de la clave de Groq. Esto calmará al validador interno de Stagehand, el cual busca la constante OPENAI_API_KEY.

</aside>

```
# .env
OPENAI_API_KEY=[api key de GROQ]
```

### **Arquitectura del Test: "Hola Agente"**

Vamos a escribir nuestro primer script para verificar que la conexión cerebro-navegador funciona.

A diferencia de Playwright puro donde importamos `test` y `expect`, aquí importamos la clase Stagehand.

Crea una carpeta `tests` y dentro el archivo `tests/sanity.spec.ts`.

> Nota Técnica: Usaremos `ts-node` para ejecutar estos archivos TypeScript directamente sin compilar manualmente.
> 

```tsx
// tests/sanity.spec.ts
import { Stagehand } from "@browserbasehq/stagehand";
import { StagehandConfig } from "../stagehand.config.ts";

async function main() {
  console.log("Inicializando Stagehand v3...");

  const stagehand = new Stagehand(StagehandConfig);

  try {
    await stagehand.init();
    
    const page = stagehand.context.activePage();
    if (!page) throw new Error("No active page found");
    await page.goto("https://www.saucedemo.com/");

    console.log("Observando la página...");
    
    // ACCIÓN DECLARATIVA
    await stagehand.act("Escribe 'standard_user' en el campo de usuario");
    await stagehand.act("Escribe 'secret_sauce' en el campo de contraseña");
    
    // Opcional: Clickar el botón para completar el login
    await stagehand.act("Haz click en el botón de login");

    await page.waitForTimeout(3000);
    console.log("Prueba de cordura exitosa.");

  } catch (error) {
    console.error("Error fatal en el agente:", error);
  } finally {
    await stagehand.close();
  }
}

main();
```

### **Ejecución y Validación**

Para ejecutar archivos TypeScript fácilmente, usaremos `tsx` (un ejecutor moderno de TS).

- Instala `tsx` global o localmente:

```bash
npm install -D tsx
```

- Ejecuta el script de sanidad:

```bash
npx tsx tests/sanity.spec.ts
```

**¿Qué debería pasar?**

1. Se abrirá un navegador Chromium (no headless).
2. Navegará a Swag Labs.
3. **La Magia:** Verás que los campos de usuario y contraseña se llenan.
    - *Detalle Clave:* No le diste el ID `#user-name` ni `#password`.
    - Stagehand tomó una captura, la envió a `groq-llama-3.3-70b-versatile`, el modelo respondió "El campo de usuario está en las coordenadas X,Y" y Stagehand ejecutó la acción.
4. El navegador se cerrará.

**Solución de Problemas Comunes**

- **Error 401/403 (OpenAI):** Tu API Key es incorrecta o no tienes saldo/créditos en la plataforma.
- **"Model not found":** Verifica que en `stagehand.config.ts` el modelName sea exacto (ej: gpt-4o o gpt-4-turbo).
- **Playwright Error:** Si dice que no encuentra el ejecutable, corre `npx playwright install`.

Acabas de ejecutar una prueba **sin selectores**.

Si mañana Swag Labs cambia el ID del input de `id="user-name"` a `id="login-username-field"`, **tu test seguirá funcionando** sin que cambies una sola línea de código. Esa es la promesa de la **Resiliencia Agéntica**.

<aside>
¿Tu agente logró escribir las credenciales? Si es así, estamos listos para el Módulo 2: Acción e Intención, donde profundizaremos en la primitiva `act()`.

</aside>

## **Navegación Declarativa (`act`)**

Ahora, entramos en el corazón de Stagehand. Vamos a dejar de usar la IA solo para "llenar un login" y vamos a usarla para navegar flujos complejos sin saber nada del código fuente de la página.

**"El mejor selector no es un ID, es una instrucción clara."**

En la automatización tradicional, el mantenimiento de scripts consume el 40-60% del tiempo de un QA. ¿Por qué? Porque los scripts están acoplados a la **estructura** del HTML. Si el `div` cambia a `section`, el test muere.

En este módulo, aprenderemos a escribir pruebas acopladas a la **lógica de negocio**. Usaremos la primitiva `stagehand.act()` para realizar acciones complejas basándonos puramente en lo que el usuario ve y quiere hacer.

### **Teoría: Grounding (Anclaje Visual)**

¿Cómo sabe una IA dónde hacer clic si solo le decimos "agrega la mochila al carrito"?

El proceso técnico se llama **Grounding** (Anclaje).

1. **Snapshot:** Stagehand toma una representación del DOM (y en modelos de visión, una captura de pantalla).
2. **Indexing:** Etiqueta cada elemento interactivo con un ID numérico temporal.
3. **Reasoning:** El LLM recibe tu instrucción: *"Click en el botón de checkout"*. El modelo analiza el texto y la estructura y responde: *"El elemento que cumple esa intención es el número 42"*.
4. **Execution:** Stagehand convierte "Elemento 42" en una coordenada X,Y o un evento de JS y lo ejecuta.

Este enfoque es **resiliente**. Si el botón cambia de color, posición o ID, pero sigue diciendo "Checkout" o tiene un ícono de carrito, el test pasará.

### **Práctica: Flujo E2E Sin Selectores**

Vamos a realizar un flujo de compra completo en Swag Labs.

El reto: **Prohibido inspeccionar el elemento** (`Click derecho -> Inspect`). No queremos saber los IDs.

**El Escenario:**

1. Login.
2. Filtrar productos por precio (bajo a alto).
3. Agregar el primer producto (el más barato) y el "Sauce Labs Onesie".
4. Ir al carrito.
5. Proceder al Checkout.

**Paso 1: Crear el Test (`tests/shop.spec.ts`)**

Crea este archivo. Nota cómo las instrucciones son oraciones en lenguaje natural.

```tsx
import { Stagehand } from "@browserbasehq/stagehand";
import { StagehandConfig } from "../stagehand.config.js";

async function main() {
  console.log("Iniciando flujo de compra agéntico...");

  const stagehand = new Stagehand(StagehandConfig);

  try {
    await stagehand.init();
    const page = stagehand.context.activePage();
    if(!page) throw new Error("No hay página activa");

    await page.goto("https://www.saucedemo.com/");

    // 1. LOGIN (Ya dominado)
    console.log("Logueando...");
    await stagehand.act("Ingresa el usuario 'standard_user'");
    await stagehand.act("Ingresa la contraseña 'secret_sauce'");
    await stagehand.act("Click en el botón de Login");

    // 2. INTERACCIÓN COMPLEJA (Filtros)
    // Aquí la IA debe encontrar un dropdown, abrirlo y seleccionar una opción por su texto.
    console.log("Filtrando productos...");
    await stagehand.act("Cambia el filtro de productos para ordenar por 'Price (low to high)'");
    
    // Esperamos un segundo para ver visualmente el reordenamiento
    await page.waitForTimeout(1000);

    // 3. SELECCIÓN SEMÁNTICA
    // "Primer producto" es un concepto relativo visualmente.
    console.log("Agregando productos...");
    await stagehand.act("Agrega el primer producto de la lista al carrito haciendo click en su botón 'Add to cart'");
    
    // Esperamos un poco para que se actualice el contador
    await page.waitForTimeout(500);
    
    // Búsqueda específica por contenido
    await stagehand.act("Encuentra el producto llamado 'Sauce Labs Onesie' y agrega al carrito");

    // 4. NAVEGACIÓN POR ICONOS
    // Swag Labs tiene un icono de carrito, no siempre dice "Cart".
    // La IA infiere que el icono representa el carrito.
    console.log("Yendo al carrito...");
    await stagehand.act("Navega al carrito haciendo click en el ícono del carrito que está en la barra de navegación superior");

    // 5. CHECKOUT
    console.log("Iniciando checkout...");
    await stagehand.act("En la página del carrito, haz click en el botón 'Checkout'");

    // Validación visual para nosotros
    await page.waitForTimeout(2000);
    console.log("Flujo completado sin usar un solo selector CSS.");

  } catch (error) {
    console.error("El agente falló:", error);
  } finally {
    await stagehand.close();
  }
}

main();
```

**Paso 2: Ejecución**

Corre el test con `tsx`:

```bash
npx tsx tests/shop.spec.ts
```

Observa la terminal. Verás logs detallados de cómo Stagehand procesa cada instrucción.

### **Ingeniería de Prompts para QA**

En este paradigma, escribir código se parece más a escribir documentación. La calidad de tu test depende de la **Ambigüedad** de tu instrucción.

**Ejemplos de Intenciones:**

| Mala Instrucción | Buena Instrucción | Por qué |
| --- | --- | --- |
| `act("Click botón")` | `act("Click en el botón primario de confirmar compra")` | Hay muchos botones. Sé específico con la función. |
| `act("Escribe texto")` | `act("Limpia el campo de email y escribe 'test@test.com'")` | A veces el campo tiene texto previo. Especificar "limpiar" ayuda. |
| `act("Espera")` | (No usar act para esperar, usar `page.waitForTimeout`) | El LLM no controla el tiempo, Playwright sí. |

### **Vision-Based Actions (Manejando lo No-Textual)**

Llama 3.3 (Groq) es muy rápido. Aunque es un modelo de texto, Stagehand le alimenta el **Árbol de Accesibilidad (A11y Tree)**.

Cuando le dijimos: `act("Haz click en el icono del carrito")`, el modelo no "vio" los pixeles del icono. Vio algo como esto en el código que Stagehand le envió:

```html
<a class="shopping_cart_link" data-test="shopping-cart-link"></a>
```

El modelo razonó: *"El usuario quiere el icono del carrito. Este enlace tiene un atributos '*shopping-cart-link*'. Coincidencia encontrada."*

> **Ingeniería Tip:** Para que tus tests agénticos sean robustos, asegúrate de que tu aplicación sea **Accesible**. Si tu app tiene divs sin aria-labels actuando como botones, la IA (y los usuarios ciegos) sufrirán. **Testing con IA = Testing de Accesibilidad gratis.**
> 

### **Desafío Rápido de Módulo**

Modifica el script `shop.spec.ts`.

**Reto:** En lugar de ir al Checkout, intenta eliminar el producto "Sauce Labs Onesie" **desde el carrito**.

- Tendrás que navegar al carrito.
- Decirle a la IA que busque el botón de remover correspondiente a ESE producto específico.
- *Pista:* `act("Elimina el producto 'Sauce Labs Onesie' de la lista")`.

¿Lograste completar el flujo de compra? Si es así, estamos listos para la **Extracción de Datos Estructurados**, donde la IA deja de ser un usuario y se convierte en un analista de datos.

## **Extracción Estructurada (`extract`)**

Hemos aprendido a interactuar con la página de forma declarativa. Ahora vamos a desbloquear una de las capacidades más poderosas de los Agentes de IA: **La Extracción Semántica**.

En el testing tradicional, validar una tabla o una lista de productos implica bucles `for`, selectores `.nth(i)`, .`innerText()` y muchas expresiones regulares para limpiar "$29.99" a `29.99`.

Con **Stagehand** y **Zod**, simplemente definimos el *esquema* de los datos que queremos, y la IA se encarga de encontrarlos, limpiarlos y tiparlos.

**"No me digas dónde están los datos (XPath). Dime qué forma tienen (Schema)."**

### **Teoría: Schema Validation con Zod**

Los LLMs son excelentes para entender texto no estructurado (HTML sucio) y convertirlo en JSON estructurado. Pero los LLMs a veces alucinan formatos.

Para garantizar que el dato sea útil en nuestro código (TypeScript), usamos **Zod**.

- **Zod** es una librería de validación de esquemas.
- Definimos una "forma" (ej: un objeto con `name: string` y `price: number`).
- Stagehand le pasa esta forma al LLM y le dice: *"Extrae datos de la página que coincidan EXACTAMENTE con esta estructura"*.
- Si el LLM devuelve un string en lugar de un número, Zod lanza un error o intenta coercionarlo, protegiendo nuestro test.

### **Práctica: Extrayendo el Inventario**

Vamos a extraer todos los productos de la página de inventario de Swag Labs. Queremos una lista limpia con:

1. Nombre del producto.
2. Precio (como número, sin el signo $).
3. Descripción.

**Paso 1: Definir el Esquema (Zod)**

Primero, necesitamos importar `z` de `zod` y definir la estructura.

Crea un nuevo archivo `tests/inventory.spec.ts`:

```tsx
import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";
import { StagehandConfig } from "../stagehand.config.js";

// 1. DEFINICIÓN DEL ESQUEMA
// Le decimos a la IA qué buscar y cómo formatearlo.
const ProductSchema = z.object({
  name: z.string().describe("El nombre completo del producto"),
  price: z.number().describe("El precio del producto en formato numérico (sin símbolo de moneda)"),
  description: z.string().describe("La descripción corta del producto"),
  inStock: z.boolean().describe("Si el producto parece estar disponible (botón Add to Cart visible)"),
});

// Queremos una lista de productos, no uno solo.
const InventorySchema = z.object({
  products: z.array(ProductSchema).describe("Lista de todos los productos visibles en el inventario"),
});

async function main() {
  console.log("Iniciando extracción de datos...");
  const stagehand = new Stagehand(StagehandConfig);

  try {
    await stagehand.init();
    const page = stagehand.context.activePage();
    if(!page) throw new Error("No page");

    await page.goto("https://www.saucedemo.com/");

    // Login rápido (Reutilizamos lógica)
    console.log("Logueando...");
    await stagehand.act("Ingresa el usuario 'standard_user'");
    await stagehand.act("Ingresa la contraseña 'secret_sauce'");
    await stagehand.act("Click en el botón de Login");
    
    // Esperamos a que cargue el inventario visualmente
    await page.waitForTimeout(1000);

    console.log("Analizando el inventario con IA...");

    // 2. EXTRACCIÓN (EXTRACT)
    // Aquí ocurre la magia. No hay selectores CSS.
    // Stagehand toma el DOM, se lo pasa a Llama 3.3 junto con el esquema Zod.
    const data = await stagehand.extract(
      "Extrae todos los productos del inventario actual.",
      InventorySchema
    );

    // 3. VALIDACIÓN Y USO
    console.log(`Se extrajeron ${data.products.length} productos.`);
    
    // Mostramos los primeros 3 para verificar
    console.log("Ejemplo de datos extraídos:", data.products.slice(0, 3));

    // Aserción lógica (no visual)
    if (data.products.length < 6) {
      throw new Error("Esperábamos al menos 6 productos en Swag Labs.");
    }
    
    // Verificamos tipos de datos (gracias a Zod, esto ya viene tipado)
    const firstProduct = data.products[0];
    if (typeof firstProduct.price !== 'number') {
      throw new Error("El precio no es un número. La coerción falló.");
    }

    console.log("Precio del primer producto:", firstProduct.price); // Ya es un number!

  } catch (error) {
    console.error("Error en extracción:", error);
  } finally {
    await stagehand.close();
  }
}

main();
```

**Paso 2: Ejecución**

Corre el test:

```bash
npx tsx tests/inventory.spec.ts
```

**Análisis del Resultado**

Observa la salida en la consola.

1. Verás un array de objetos JSON perfectos.
2. El campo price será 29.99 (número), no "$29.99" (string).
    - *¿Por qué?* Porque en el esquema `z.number()`, Zod y el LLM colaboraron. El LLM vio "$29.99", leyó la instrucción "formato numérico" y lo limpió antes de devolverlo.
3. El campo inStock será true porque el LLM vio el botón "Add to cart".

Esto reemplaza docenas de líneas de código de manipulación de strings (price.replace('$', '')) y selectores frágiles.

```bash
Se extrajeron 6 productos.
Ejemplo de datos extraídos: [
  {
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    inStock: true,
    name: 'Sauce Labs Backpack',
    price: 29.99
  },
  {
    description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    inStock: true,
    name: 'Sauce Labs Bike Light',
    price: 9.99
  },
  {
    description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
    inStock: true,
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99
  }
]
Precio del primer producto: 29.99
```

### **Extracción en Sitios No Estructurados (Hacker News)**

Swag Labs es fácil porque es una tienda. Pero, ¿y si queremos extraer noticias de un sitio de texto denso?

Vamos a probar con **Hacker News**. El reto es extraer el título y los puntos de la primera noticia, **ignorando** los comentarios y enlaces de navegación.

Crea `tests/hackernews.spec.ts`:

```tsx
import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";
import { StagehandConfig } from "../stagehand.config.js";

const NewsSchema = z.object({
  topStory: z.object({
    title: z.string(),
    points: z.number().describe("Puntos o votos de la historia"),
    author: z.string(),
    commentsCount: z.number().describe("Número de comentarios, 0 si no hay"),
  }).describe("La noticia principal (número 1) de Hacker News"),
});

async function main() {
  const stagehand = new Stagehand(StagehandConfig);
  await stagehand.init();
  const page = stagehand.context.activePage();
  if(!page) throw new Error("No page");

  await page.goto("https://news.ycombinator.com/");

  console.log("Leyendo Hacker News...");
  
  const data = await stagehand.extract(
    "Extrae la información de la noticia #1 del ranking.",
    NewsSchema
  );

  console.log("Top Story:", data.topStory);
  await stagehand.close();
}

main();
```

Ejecútalo:

```bash
npx tsx tests/hackernews.spec.ts
```

```bash
Top Story: {
  points: 235,
  title: 'I Pitched a Roller Coaster to Disneyland at Age 10 in 1978'
}
```

**Poder Oculto: Limpieza de Datos**

Fíjate en `commentsCount`. En Hacker News, el texto dice algo como "156 comments" o "discuss" (si no hay comentarios).

- Si usaras Regex, tendrías que manejar el caso "discuss".
- Con IA + Zod (`z.number()`), el modelo entiende que "discuss" equivale a 0 comentarios o busca el número implícito, y te devuelve un dato limpio.

`stagehand.extract()` convierte la web (HTML sucio) en una API (JSON limpio).

Esto es invaluable para**Test Data Management:** puedes usar Stagehand para crear usuarios, obtener sus IDs generados en pantalla y guardarlos para usarlos en otros tests de API.

<aside>
¿Lograste extraer los productos y la noticia? Si es así, tu agente ya no solo actúa, ahora

entiende.

Ahora, aprenderemos a usar ese entendimiento para verificar que la aplicación funciona correctamente (observe).

</aside>

## **Observación y Aserciones (`observe`)**

Ya hemos dominado la **Acción** (`act`) y la **Extracción** (`extract`). Ahora toca cerrar el ciclo con la parte más importante de cualquier prueba: la **Verificación**.

En el testing tradicional, las aserciones son rígidas y visuales. `expect(text).toBe('Success')`. Pero, ¿y si el mensaje dice "Compra completada"? ¿Y si el icono cambia a verde? ¿Y si aparece un pop-up que tapa el texto?

Aquí entra `stagehand.observe()`. Es el "Ojo Analítico" de nuestro Agente. Le permite **razonar sobre el estado actual** y responder preguntas complejas (Sí/No/Quizás) basándose en lo que ve, no solo en lo que dice el HTML.

**"No verifiques si el texto es exacto. Verifica si el usuario percibe éxito."**

### **Teoría: Aserciones Semánticas vs Sintácticas**

- **Sintáctica (Playwright):** `await expect(page.locator('.success-msg')).toHaveText('Thank you for your order!');`
    - *Fallo:* Si el texto cambia a "Order placed successfully", el test falla (falso negativo).
- **Semántica (Stagehand):** `await stagehand.observe("¿La compra fue exitosa?");`
    - *Éxito:* La IA analiza el texto, el icono de check verde, el botón de "Volver a Inicio" y concluye: *"Sí, la compra fue exitosa porque veo confirmación visual y textual"*.

### **Práctica: Validando el Checkout en Swag Labs**

Vamos a completar el flujo de compra que iniciamos en una sección anterior del tutorial, pero esta vez agregaremos **puntos de control inteligentes**.

El Agente deberá:

1. Comprar un producto.
2. Llenar el formulario de checkout.
3. Llegar a la pantalla final.
4. **Observar** si la transacción fue exitosa.
5. **Observar** si hay errores en el formulario (caso negativo).

**Paso 1: Crear `tests/checkout-observer.spec.ts`**

```tsx
import { Stagehand } from "@browserbasehq/stagehand";
import { StagehandConfig } from "../stagehand.config.js";

async function main() {
  console.log("Iniciando validación de checkout...");
  const stagehand = new Stagehand(StagehandConfig);

  try {
    await stagehand.init();
    const page = stagehand.context.activePage();
    if(!page) throw new Error("No page");

    await page.goto("https://www.saucedemo.com/");

    // 1. LOGIN
    console.log("Iniciando sesión...");
    await stagehand.act("Escribe 'standard_user' en el campo de usuario");
    await stagehand.act("Escribe 'secret_sauce' en el campo de contraseña");
    await stagehand.act("Haz click en el botón de login");
    await page.waitForTimeout(1500);

    // 2. AGREGAR PRODUCTO
    console.log("Agregando producto al carrito...");
    await stagehand.act("Haz click en el botón que dice 'Add to cart' del primer producto visible");
    await page.waitForTimeout(1000);

    // 3. IR AL CARRITO
    console.log("Navegando al carrito...");
    await stagehand.act("Haz click en el icono del carrito de compras en la parte superior derecha de la página");
    await page.waitForTimeout(1500);

    // 4. VERIFICAR CARRITO
    console.log("Verificando página del carrito...");
    const cartCheck = await stagehand.observe("Encuentra el botón que dice 'Checkout' en la página del carrito");
    
    if (cartCheck.length === 0) {
      throw new Error("ERROR: No se encontró la página del carrito. Verifica el paso anterior.");
    }
    console.log(`Carrito confirmado. ${cartCheck.length} elementos detectados.`);

    // 5. CHECKOUT
    console.log("Iniciando checkout...");
    await stagehand.act("Haz click en el botón que dice 'Checkout'");
    await page.waitForTimeout(1500);

    // 6. VERIFICAR FORMULARIO
    console.log("Verificando formulario de información...");
    const formCheck = await stagehand.observe("Encuentra el campo de texto con el placeholder 'First Name'");
    
    if (formCheck.length === 0) {
      throw new Error("ERROR: No llegamos al formulario de checkout. Estamos en la página equivocada.");
    }
    console.log(`Formulario confirmado. ${formCheck.length} campos detectados.`);

    // 7. LLENAR DATOS - Campo por campo con precisión
    console.log("Completando información personal...");
    await stagehand.act("Escribe 'TestUser' en el campo que dice 'First Name'");
    await page.waitForTimeout(300);
    
    await stagehand.act("Escribe 'AutoBot' en el campo que dice 'Last Name'");
    await page.waitForTimeout(300);
    
    await stagehand.act("Escribe '12345' en el campo que dice 'Zip/Postal Code'");
    await page.waitForTimeout(500);
    
    // 8. CONTINUAR - Botón específico del formulario
    await stagehand.act("Haz click en el botón que dice 'Continue'");
    await page.waitForTimeout(2000);

    // 9. VERIFICAR OVERVIEW - Página de resumen
    console.log("Verificando página de resumen de compra...");
    const overviewCheck = await stagehand.observe("Encuentra el botón que dice 'Finish' para completar la orden");
    
    if (overviewCheck.length === 0) {
      throw new Error("ERROR: No llegamos a la página de resumen. Posible error en el formulario.");
    }
    console.log(`Resumen confirmado. ${overviewCheck.length} elementos encontrados.`);
    
    // 10. FINALIZAR COMPRA
    console.log("Finalizando orden...");
    await stagehand.act("Haz click en el botón que dice 'Finish'");
    await page.waitForTimeout(2000);

    // 11. VERIFICACIÓN FINAL - Observe el mensaje de éxito
    console.log("Verificando confirmación de compra exitosa...");
    const successCheck = await stagehand.observe("Encuentra el mensaje que dice 'Thank you for your order' o 'THANK YOU FOR YOUR ORDER'");

    if (successCheck.length > 0) {
      console.log("¡ÉXITO TOTAL! La compra se completó correctamente.");
      console.log(`Se detectó el mensaje de confirmación. (${successCheck.length} elementos confirmados)`);
    } else {
      // Intento alternativo de verificación
      const altCheck = await stagehand.observe("Encuentra cualquier mensaje de confirmación o ícono de éxito en la página");
      if (altCheck.length > 0) {
        console.log("ÉXITO (verificación alternativa). Orden completada pero mensaje no es exacto.");
      } else {
        throw new Error("FALLO CRÍTICO: No se encontró ningún mensaje de confirmación después de Finish.");
      }
    }

  } catch (error) {
    console.error("Error en el flujo:", error);
  } finally {
    await stagehand.close();
  }
}

main();
```

**Paso 2: Ejecución**

Corre el test:

```bash
npx tsx tests/checkout-observer.spec.ts
```

**Análisis del Comportamiento**

Cuando el script llegue al final, verás que observe toma unos segundos.

En ese tiempo, Stagehand:

1. Toma una captura del DOM.
2. Le pregunta a Llama 3.3: *"Basado en esta imagen, ¿la compra fue exitosa?"*.
3. Llama 3.3 ve el texto "THANK YOU FOR YOUR ORDER" y responde true.

### **Caso Negativo: Validando Errores**

Ahora vamos a probar la capacidad de razonamiento ante fallos.

Modifica el script anterior (o crea uno nuevo) para intentar hacer checkout **sin llenar el código postal**.

```tsx
// ... dentro del try ...
    
    // 7. LLENAR DATOS - Campo por campo con precisión
    // Intentamos continuar SIN llenar el Zip Code
    console.log("Completando información personal...");
    await stagehand.act("Escribe 'TestUser' en el campo que dice 'First Name'");
    await page.waitForTimeout(300);
    
    await stagehand.act("Escribe 'AutoBot' en el campo que dice 'Last Name'");
    await page.waitForTimeout(300);
    
    // 8. CONTINUAR - Botón específico del formulario
    await stagehand.act("Haz click en el botón que dice 'Continue'");
    await page.waitForTimeout(2000);

    // OBSERVACIÓN DE ERROR
    console.log("Verificando manejo de errores...");
    
    const hasError = await stagehand.observe("¿Hay algún mensaje de error visible relacionado con el código postal?");
    
    if (hasError) {
      console.log("Correcto: La IA detectó el mensaje de error.");
    } else {
      throw new Error("Falso Negativo: El error debería estar visible pero la IA no lo vio.");
    }
```

### **Self-Healing (Curación Automática)**

Aunque Stagehand no es una herramienta de *self-healing* per se (como Healenium), su naturaleza declarativa actúa como tal.

Si Swag Labs decide cambiar el mensaje de error de:

- *"Error: Postal Code is required"*
- a *"Please enter a zip code"*

Tu aserción observe("¿Hay algún mensaje de error relacionado con el código postal?") **seguirá pasando** sin cambios en el código.

El LLM entiende que ambos textos significan lo mismo semánticamente.

`observe()` es costoso (tiempo y tokens). No lo uses para todo.

Úsalo para **puntos críticos de decisión** donde la lógica es ambigua o visual.

Para verificar una URL exacta, sigue usar `expect(page).toHaveURL(...)` de Playwright, que es gratis y rápido.

<aside>
¿Lograste validar la compra y el error? Si es así, tu agente ahora tiene Juicio.En la siguiente sección hablaremos de dinero. Cómo hacer que todo esto sea rápido y barato.

</aside>

## **Optimización y Caching**

Ya sabemos cómo hacer que el agente piense, actúe y observe. Pero aquí viene la dura realidad de la ingeniería: **El pensamiento es lento y costoso**.

Si cada vez que corres tu suite de regresión (500 tests), el agente tiene que enviar capturas de pantalla a Groq/OpenAI, tu pipeline tardará horas y tu factura de API será astronómica.

En esta sección, aprenderemos a convertir a nuestro Agente Explorador en un **Robot Determinista** de alta velocidad.

**"La primera vez, explora como un humano. La segunda vez, ejecuta como una máquina."**

### **Teoría: El Ciclo de Vida del Caché**

Stagehand v3 implementa un sistema de **Caching Inteligente**.

1. **First Run (Discovery):**
    - Tú dices: act("Click login").
    - Stagehand envía el DOM al LLM.
    - LLM responde: *"El botón es #login-button"*.
    - Stagehand ejecuta el click **Y guarda** esta relación en un archivo local (`.stagehand/cache`).
2. **Subsequent Runs (Regression):**
    - Tú dices: act("Click login").
    - Stagehand mira su cache: *"Ya sé cómo hacer esto. El selector es #login-button"*.
    - **Salta la llamada al LLM** y ejecuta Playwright puro.
    - *Resultado:* Velocidad instantánea, Costo cero.

**¿Qué pasa si la UI cambia? (Self-Healing)**

Si el selector guardado (#login-button) ya no existe, Stagehand:

1. Detecta el fallo.
2. **Invalida el cache**.
3. Llama de nuevo al LLM para re-analizar la página.
4. Actualiza el cache con el nuevo selector.

### **Práctica: El Test de Velocidad (Benchmark)**

Vamos a demostrar empíricamente el impacto del caching. Crearemos un script que mida el tiempo de ejecución de un flujo de compra.

Lo ejecutaremos dos veces y compararemos los tiempos.

**Paso 1: Crear `tests/benchmark.spec.ts`**

```tsx
import { Stagehand } from "@browserbasehq/stagehand";
import { StagehandConfig } from "../stagehand.config.ts";

async function runFlow(iteration: number) {
  console.log(`\nINICIO ITERACIÓN ${iteration}`);
  console.time(`Tiempo Total Iteración ${iteration}`);

  const stagehand = new Stagehand({
    ...StagehandConfig,
    // Aseguramos que el cache esté activo (por defecto lo está en v3)
  });

  try {
    await stagehand.init();
    const page = stagehand.context.activePage();
    if(!page) throw new Error("No page");

    await page.goto("https://www.saucedemo.com/");

    // Medimos acciones individuales para ver el impacto
    console.time("Login Action");
    await stagehand.act("Escribe 'standard_user' en el campo de usuario");
    await stagehand.act("Escribe 'secret_sauce' en el campo de contraseña");
    await stagehand.act("Haz click en el botón de login");
    await page.waitForTimeout(1500);

    // Agregar producto
    console.log("Agregando producto al carrito...");
    await stagehand.act("Haz click en el botón que dice 'Add to cart' del primer producto visible");
    await page.waitForTimeout(1000);

    // Ir al carrito
    console.log("Navegando al carrito...");
    await stagehand.act("Haz click en el icono del carrito de compras en la parte superior derecha de la página");
    await page.waitForTimeout(1500);
    
    // Verificación visual rápida
    const url = page.url();
    if (!url.includes("cart")) throw new Error("No llegamos al carrito");

  } catch (error) {
    console.error(`Fallo en iteración ${iteration}:`, error);
  } finally {
    await stagehand.close();
    console.timeEnd(`Tiempo Total Iteración ${iteration}`);
  }
}

async function main() {
  // PRIMERA EJECUCIÓN (Cold Start - Sin Cache)
  console.log("EJECUCIÓN EN FRÍO (Usando LLM)...");
  await runFlow(1);

  console.log("\n-----------------------------------\n");

  // SEGUNDA EJECUCIÓN (Warm Start - Con Cache)
  console.log("EJECUCIÓN EN CALIENTE (Usando Cache)...");
  await runFlow(2);
}

main();

```

**Paso 2: Ejecución y Análisis**

Corre el benchmark:

```bash
npx tsx tests/benchmark.spec.ts
```

**Observa los tiempos en tu terminal:**

- **Iteración 1:** Verás tiempos de acción de 2s a 5s (dependiendo de la latencia de Groq). El total podría ser ~15s.
- **Iteración 2:** Verás tiempos de acción de **milisegundos** (0.1s - 0.5s). El total bajará drásticamente.

### **Estrategias Híbridas (Best Practices)**

Ahora que entendemos el costo, definamos cuándo usar qué herramienta. No todo clavo necesita un martillo de IA.

**La Pirámide de Automatización Híbrida**

1. **Capa Base (Playwright Puro):**
    - *Uso:* Flujos críticos, estáticos y de alta frecuencia (Login, Navegación Menú).
    - *Herramienta:* `page.locator('#id').click()`.
    - *Por qué:* Velocidad máxima, determinismo absoluto.
2. **Capa Intermedia (Stagehand Cached):**
    - *Uso:* Flujos de negocio complejos, formularios largos, interacciones dinámicas.
    - *Herramienta:* `stagehand.act("Llenar formulario...")`.
    - *Por qué:* Facilidad de mantenimiento. Si la UI cambia, el cache se invalida y se repara solo.
3. **Capa Superior (Stagehand Vision/LLM):**
    - *Uso:* Canvas, Gráficos, Captchas visuales, Validación de UX, Aserciones semánticas.
    - *Herramienta:* `stagehand.observe("¿El gráfico muestra una tendencia alcista?")`.
    - *Por qué:* Imposible de hacer con selectores.

**Consejo de Arquitectura: "The Lazy Migration"**

No reescribas tus tests de Playwright existentes.

Empieza usando Stagehand solo para:

1. Los tests "Flaky" que siempre se rompen.
2. Las nuevas funcionalidades donde la UI aún no es estable.
3. Validaciones de datos complejos (extract).

El caching transforma a Stagehand de una "demo divertida de IA" a una **herramienta de producción viable**.

Nos permite desarrollar a la velocidad del lenguaje natural y ejecutar a la velocidad del código compilado.

<aside>
¿Viste la diferencia de tiempos? Si es así, estás listo para graduarte.

En la próxima sección pondremos a prueba todo lo aprendido con desafíos que simulan el mundo real.

</aside>

## **Desafíos Prácticos**

Has aprendido a configurar un Agente, a darle órdenes (Intención), a pedirle datos (Extracción), a pedirle juicios (Observación) y a optimizarlo (Caching).

Ahora, soltamos tu mano. En este módulo final, te enfrentarás a dos desafíos diseñados para simular los problemas más difíciles de la automatización moderna: **Interfaces Complejas** y **Datos No Estructurados**.

**Regla de Oro:** Intenta resolver los desafíos escribiendo tu propio código antes de mirar las soluciones. El aprendizaje real ocurre cuando el Agente falla y tienes que refinar tu instrucción (Prompt Engineering).

### **Desafío 1: El Formulario "Polimórfico"**

**Contexto del Negocio:**

Estás probando una aplicación legacy donde los IDs de los elementos cambian dinámicamente o están ofuscados (común en React/Angular o sistemas anti-bot). Un selector CSS como `#input-123` fallará mañana.

**Tu Misión:**

Navega a [**Formy Project - Web Form**](https://www.google.com/url?sa=E&q=https%3A%2F%2Fformy-project.herokuapp.com%2Fform).

Debes llenar un formulario complejo que incluye:

1. Inputs de texto (Nombre/Apellido).
2. **Radio Buttons** (Nivel de educación).
3. **Checkboxes** (Sexo - *Nota: el sitio tiene etiquetas confusas, usa tu criterio*).
4. **Dropdowns** (Años de experiencia).
5. **Datepickers** (Fecha).
6. Enviar el formulario y validar el éxito.

**Restricciones:**

- **PROHIBIDO** usar `page.locator`, `$` o selectores `CSS/XPath`.
- Debes usar `stagehand.act()` con instrucciones puramente semánticas (ej: "Selecciona la opción de Universidad").

**Pista Técnica:**

- Los Datepickers suelen ser difíciles. A veces es mejor decirle al agente: *"Escribe '01/01/2025' en el campo de fecha y presiona Enter"* en lugar de *"Abre el calendario y clickea..."*.

### **Desafío 2: El Curador de Noticias (Extracción Inteligente)**

**Contexto del Negocio:**

Tu jefe quiere un reporte diario de las tendencias en tecnología. Te pide un script que vaya a **Hacker News**, busque artículos sobre "AI" (Inteligencia Artificial) y genere un JSON limpio.

**Tu Misión:**

1. Navega a [**Hacker News**](https://www.google.com/url?sa=E&q=https%3A%2F%2Fnews.ycombinator.com%2F).
2. Usa la barra de búsqueda (footer) o navega para encontrar artículos. *Simplificación: Puedes extraer directamente de la portada si hay alguno, o ir a la sección "newest".*
3. **Extracción:** Define un esquema Zod para extraer:
    - Titular.
    - Enlace.
    - Puntos (score).
    - **Relevancia:** Un campo booleano calculado por la IA que diga true si el título menciona "AI", "LLM" o "Intelligence".
4. Filtra y muestra solo los relevantes.

**Restricciones:**

- El esquema Zod debe hacer el trabajo pesado de tipado.
- La IA debe decidir qué es relevante basándose en tu descripción en Zod.

### **Soluciones Sugeridas (¡Solo para emergencias!)**

**Desafío 2 (Hacker News AI Filter)**

```tsx
import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";
import { StagehandConfig } from "../stagehand.config.ts";

// ESQUEMA INTELIGENTE
const NewsSchema = z.object({
  stories: z.array(z.object({
    title: z.string(),
    url: z.string().optional(),
    points: z.number().default(0),
    // Aquí está el truco: La descripción guía al LLM para llenar este booleano
    isAiRelated: z.boolean().describe("True if the title mentions AI, LLM, GPT, Machine Learning, or Neural Networks. False otherwise."),
  })),
});

async function main() {
  const stagehand = new Stagehand(StagehandConfig);
  await stagehand.init();
  const page = stagehand.context.activePage();
  if(!page) throw new Error("No page");

  try {
    await page.goto("https://news.ycombinator.com/");

    console.log("Buscando noticias...");

    // EXTRACCIÓN
    const data = await stagehand.extract(
      "Extrae las primeras 15 noticias de la portada.",
      NewsSchema
    );

    // FILTRADO (Ya viene pre-procesado por la IA, pero filtramos el array final)
    const aiStories = data.stories.filter((s: { isAiRelated: boolean }) => s.isAiRelated);

    console.log(`Análisis completado. Se encontraron ${data.stories.length} noticias.`);
    console.log(`Noticias de IA encontradas: ${aiStories.length}`);
    
    if (aiStories.length > 0) {
      console.log(aiStories);
    } else {
      console.log("Hoy no hay noticias de IA en la portada.");
    }

  } catch (e) {
    console.error(e);
  } finally {
    await stagehand.close();
  }
}
main();
```

## Referencias y Recursos Adicionales

Este taller ha sido diseñado para proporcionar una base sólida en la automatización profesional, alineada con las mejores prácticas de la industria actual.

### Créditos

Autor: Wilmer Arévalo

Rol: Profesional en Proyectos de Investigación

Departamento: Centro de Investigación, Facultad de Ingeniería, Universidad de los Andes

Fecha de creación/actualización: Febrero de 2026

### Referencias Oficiales

Todo el contenido de este taller está basado en la documentación oficial más reciente:

- **Playwright Docs:** [**https://playwright.dev**](https://www.google.com/url?sa=E&q=https%3A%2F%2Fplaywright.dev) - Especialmente la sección de *Network Interception* y *Selectors*.
- **Stagehand Docs:** [**browserbase.com/docs/stagehand**](https://www.google.com/url?sa=E&q=https%3A%2F%2Fdocs.browserbase.com%2Fstagehand)
- **Zod Schema:** [**zod.dev**](https://www.google.com/url?sa=E&q=https%3A%2F%2Fzod.dev)
- **Paper:** *"Large Language Models for Software Engineering: A Survey"* (ArXiv).

### **Enlaces de Utilidad**

Guarda estos enlaces en tus favoritos, los necesitarán en el día a día como Automatizador de Pruebas de Software:

1. **Selectores:** https://playwright.dev/docs/api/class-selectors
2. **Swag Labs (SUT):** [**SauceDemo**](https://www.google.com/url?sa=E&q=https%3A%2F%2Fwww.saucedemo.com%2F) - El sitio web que usamos para pruebas.

### **Soporte y Dudas**

Si tienen dudas al implementar esto en sus proyectos reales o encuentran problemas con la configuración:

- **Canal de Slack/Teams:** Puede hacer las preguntas a través de los medios habilitados y los profesores, tutores y monitores podrán ayudar con la aclaración
- **Email de Contacto:** w.arevalo@uniandes.edu.co

<aside>
Repositorio del Taller

El código final de este ejercicio está disponible en: https://github.com/LensesResearchLab/material-educativo-investigacion/tree/ai_testing_stagehand

</aside>

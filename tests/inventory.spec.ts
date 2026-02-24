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

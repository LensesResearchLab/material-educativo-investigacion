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

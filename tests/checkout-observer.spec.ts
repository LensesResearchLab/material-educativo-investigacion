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

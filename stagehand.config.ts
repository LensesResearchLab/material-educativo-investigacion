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

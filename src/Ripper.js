import fs from 'fs';
import path from 'path';

/**
 * El Cartógrafo Digital.
 * Responsable de navegar, catalogar y reportar el estado de la aplicación.
 */
export class Ripper {
  constructor(page, baseUrl) {
    this.page = page; // La instancia del navegador de Playwright
    this.baseUrl = baseUrl;

    // MEMORIA DEL ROBOT
    // Usamos un Set para búsquedas O(1) súper rápidas
    this.visitedUrls = new Set();

    // LA COLA DE TAREAS (Frontier)
    // Aquí guardamos las URLs que descubrimos pero aún no visitamos
    this.queue = [];

    // EL MAPA RESULTANTE (Grafo)
    // Estructura: { 'url_origen': ['url_destino_1', 'url_destino_2'] }
    this.adjacencyList = new Map();

    this.maxNodes = 15; // Límite de seguridad para el taller

    this.errors = []; // Aquí guardaremos los hallazgos
    
    // ACTIVAR EL ORÁCULO
    this.setupOracle();
  }

  /**
   * Método principal que inicia la exploración BFS
   */
  async start() {
    console.log(`Iniciando exploración en: ${this.baseUrl}`);

    // 1. Semilla inicial
    this.queue.push(this.baseUrl);

    // 2. Bucle de Exploración (El corazón del Ripper)
    while (this.queue.length > 0 && this.visitedUrls.size < this.maxNodes) {
      // Extraemos el siguiente nodo (BFS)
      const currentUrl = this.queue.shift();

      // Si ya lo visitamos, lo saltamos (Poda del grafo)
      if (this.visitedUrls.has(currentUrl)) continue;

      // Exploramos el nodo
      await this.visitAndExtract(currentUrl);
    }

    this.report();
  }

  /**
   * Visita una URL y extrae nuevos enlaces (Transiciones)
   * @param {string} url 
   */
  async visitAndExtract(url) {
    this.visitedUrls.add(url);
    
    try {
      console.log(`Visitando: ${url}`);
      await this.page.goto(url, { waitUntil: 'networkidle' });

      // --- NUEVO: FOTOGRAFÍA DEL ESTADO ---
      const nodeId = this.sanitizeNode(url);
      const screenshotPath = path.join(process.cwd(), 'ripper_artifacts', `${nodeId}.png`);
      
      // Creamos la carpeta si no existe
      if (!fs.existsSync('ripper_artifacts')) {
        fs.mkdirSync('ripper_artifacts');
      }

      await this.page.screenshot({ path: screenshotPath, fullPage: true });

      // FASE 1: Extracción Estática (Lo que ya teníamos)
      const staticLinks = await this.extractLinks();
      this.processLinks(url, staticLinks); // (Refactorizamos esto en un helper abajo)

      // FASE 2: Exploración Dinámica (NUEVO)
      // Solo lo hacemos si estamos en el inventario, carrito y pasos de checkout para no tardar años probando todo
      const isExplorable = 
        url.includes('inventory.html') || 
        url.includes('cart.html') || 
        url.includes('checkout-step-one.html') ||
        url.includes('checkout-step-two.html');

      if (isExplorable) {
        await this.exploreDynamicLinks(url);
      }

    } catch (error) {
      console.error(`Error procesando ${url}: ${error.message}`);
    }
  }

  // Helper para no repetir código
  processLinks(sourceUrl, links) {
    console.log(`   -> Encontrados ${links.length} enlaces estáticos.`);
    for (const link of links) {
      if (!this.visitedUrls.has(link) && !this.queue.includes(link)) {
        this.queue.push(link);
        if (!this.adjacencyList.has(sourceUrl)) {
           this.adjacencyList.set(sourceUrl, []);
        }
        this.adjacencyList.get(sourceUrl).push(link);
      }
    }
  }

  /**
   * Extrae todos los href válidos de la página actual.
   * Ejecuta JS dentro del navegador para máxima velocidad.
   */
  async extractLinks() {
    return await this.page.evaluate((baseUrl) => {
      // 1. Buscamos todos los tags <a> con atributo href
      const anchors = Array.from(document.querySelectorAll('a[href]'));
      
      return anchors
        .map(a => a.href) // Obtenemos la URL absoluta directamente del navegador
        .filter(href => {
          // --- FILTROS DE SEGURIDAD ---
          
          // 1. Debe pertenecer al mismo dominio (Scope)
          if (!href.startsWith(baseUrl)) return false;
          
          // 2. Ignorar anclas vacías o javascript
          if (href.includes('javascript:') || href === baseUrl + '#' || href === baseUrl + '/') return false;
          
          // 3. Ignorar archivos estáticos (opcional)
          if (href.endsWith('.pdf') || href.endsWith('.png')) return false;

          return true;
        })
        // Eliminamos duplicados en la misma página (Set dentro de Array)
        .filter((value, index, self) => self.indexOf(value) === index);
        
    }, this.baseUrl);
  }

  /**
   * Método auxiliar para romper la barrera de entrada.
   * Un Ripper necesita credenciales para explorar zonas privadas.
   */
  async login() {
    console.log('Iniciando sesión para acceder al sistema...');
    await this.page.goto(this.baseUrl);
    
    // Selectores específicos de Swag Labs
    await this.page.fill('[data-test="username"]', 'standard_user');
    await this.page.fill('[data-test="password"]', 'secret_sauce');
    await this.page.click('[data-test="login-button"]');
    
    // Esperamos a ver el inventario
    await this.page.waitForURL('**/inventory.html');
    console.log('Login exitoso. Comenzando exploración.');
    
    // Reiniciamos la cola con la nueva URL post-login
    this.queue = [this.page.url()];
    this.visitedUrls.clear(); // Limpiamos para empezar el mapa desde dentro
  }

  /**
   * Intenta descubrir estados ocultos haciendo clic en elementos ambiguos.
   * Estrategia: Click -> Check URL -> Backtrack
   */
  async exploreDynamicLinks(currentUrl) {
    console.log('   Iniciando exploración dinámica (Click & Back)...');
    
    // 1. Identificar candidatos (Heurística: Títulos de productos en SwagLabs)
    // En una app real, usaríamos selectores más genéricos como 'a[href="#"], button'
    // Para el taller, somos específicos para evitar caos.
    const selector = `
      .inventory_item_name, 
      .inventory_item_img a,
      .shopping_cart_link,
      [data-test="back-to-products"],
      [data-test="checkout"],
      [data-test="continue"],
      [data-test="finish"]
    `;

    const candidates = await this.page.$$(selector);
    
    console.log(`   -> Detectados ${candidates.length} elementos interactivos para probar.`);

    // Iteramos por los candidatos (Usamos un for clásico para manejar async)
    for (let i = 0; i < candidates.length; i++) {
      try {
        // Recargamos los candidatos porque al volver atrás el DOM se destruye
        // (El problema de "Stale Element" clásico de Selenium/Playwright)
        const freshCandidates = await this.page.$$(selector);
        const element = freshCandidates[i];

        if (!element) continue;
        
        // Obtenemos info para log (opcional)
        const text = await element.innerText().catch(() => 'Elemento sin texto');
        const isVisible = await element.isVisible();

        if (!isVisible) continue;

        // ACCIÓN: CLIC
        await element.click();
        
        // ESPERA: Damos tiempo a que la app reaccione (SPA transition)
        await this.page.waitForTimeout(800);

        // CHEQUEO: ¿Dónde estoy?
        const newUrl = this.page.url();

        if (newUrl !== currentUrl) {
          // ¡EUREKA! Encontramos un nuevo estado
          console.log(`   ¡Descubrimiento! Click llevó a: ${newUrl}`);
          
          if (!this.visitedUrls.has(newUrl) && !this.queue.includes(newUrl)) {
            this.queue.push(newUrl);
             // Guardamos la relación en el grafo
             if (!this.adjacencyList.has(currentUrl)) {
                this.adjacencyList.set(currentUrl, []);
              }
              this.adjacencyList.get(currentUrl).push(newUrl);
          }

          // RETROCESO (Backtrack): Vital para seguir probando el resto de botones
          await this.page.goBack();
          await this.page.waitForLoadState('domcontentloaded');
        } 
      } catch (err) {
        console.log(`   Fallo explorando elemento ${i}: ${err.message}`);
        // Intentamos recuperar la posición
        if (this.page.url() !== currentUrl) {
            await this.page.goto(currentUrl);
        }
      }
    }
  }

  /**
   * Convierte una URL larga en un ID corto para el gráfico.
   * Ej: ".../inventory.html" -> "Inventory"
   */
  sanitizeNode(url) {
    try {
      const urlObj = new URL(url);
      let name = urlObj.pathname.replace('/', '').replace('.html', '');
      
      // Si es la raíz, llámala Home
      if (name === '' || name === '/') name = 'Home';
      
      // Si tiene query params, agrégalos (ej: ?id=4)
      if (urlObj.search) {
        name += `_${urlObj.searchParams.toString()}`;
      }
      
      // Limpieza final de caracteres raros
      return name.replace(/[^a-zA-Z0-9_]/g, '_');
    } catch (e) {
      return 'Unknown_Node';
    }
  }

  setupOracle() {
    // 1. Oído de Red (Network Listener)
    this.page.on('response', response => {
      const status = response.status();
      const url = response.url();
      
      // Filtramos ruido (Google Analytics, etc.) y nos enfocamos en errores reales
      if (status >= 400 && url.includes(this.baseUrl)) {
        const errorMsg = `HTTP ${status} en ${url}`;
        console.error(errorMsg);
        this.errors.push({ type: 'HTTP', msg: errorMsg, location: this.page.url() });
      }
    });

    // 2. Oído de Consola (Console Listener)
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        const errorMsg = `CONSOLE ERROR: ${msg.text()}`;
        console.error(errorMsg);
        this.errors.push({ type: 'JS', msg: errorMsg, location: this.page.url() });
      }
    });
    
    // 3. Oído de Crashes (Page Crash)
    this.page.on('pageerror', exception => {
      const errorMsg = `UNCAUGHT EXCEPTION: ${exception.message}`;
      console.error(errorMsg);
      this.errors.push({ type: 'CRASH', msg: errorMsg, location: this.page.url() });
    });
  }

  report() {
    console.log('--- GENERANDO ARTEFACTOS ---');
    
    // 1. Cabecera del archivo Mermaid
    let mermaidContent = 'graph TD;\n';
    
    // 2. Iteramos sobre la lista de adyacencia
    // Formato: NodoOrigen --> NodoDestino
    this.adjacencyList.forEach((destinations, source) => {
      const sourceId = this.sanitizeNode(source);
      
      destinations.forEach(dest => {
        const destId = this.sanitizeNode(dest);
        // Evitamos auto-bucles visuales si no son necesarios
        if (sourceId !== destId) {
          mermaidContent += `  ${sourceId} --> ${destId};\n`;
        }
      });
    });

    // 3. Escribir al disco
    const outputPath = path.join(process.cwd(), 'ripper_artifacts', 'graph.mermaid');
    fs.writeFileSync(outputPath, mermaidContent);
    
    console.log(`Grafo generado en: ${outputPath}`);
    console.log(`Screenshots guardados en: /ripper_artifacts`);
    console.log(`Total Nodos: ${this.visitedUrls.size}`);

    console.log('\n--- REPORTE DE SALUD ---');
    if (this.errors.length === 0) {
      console.log('Sistema Saludable: No se detectaron anomalías.');
    } else {
      console.log(`SE ENCONTRARON ${this.errors.length} ANOMALÍAS:`);
      this.errors.forEach(err => {
        console.log(`   [${err.type}] en ${err.location} -> ${err.msg}`);
      });
      
      // Opcional: Escribir reporte de errores a disco
      const errorPath = path.join(process.cwd(), 'ripper_artifacts', 'errors.json');
      fs.writeFileSync(errorPath, JSON.stringify(this.errors, null, 2));
    }
  }
}

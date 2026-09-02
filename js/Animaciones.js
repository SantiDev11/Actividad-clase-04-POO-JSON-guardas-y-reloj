/* ============================================================
   Animaciones.js — Clase que centraliza TODO el movimiento
   ------------------------------------------------------------
   - reveal al hacer scroll (IntersectionObserver, nativo)
   - contadores que suben de 0 al número real
   - entrada del hero con anime.js (librería), con plan B en CSS
   Tener las animaciones en UN solo lugar = fácil de mantener.
   ============================================================ */
export class Animaciones {
  constructor() {
    // El observador vigila elementos y avisa cuando entran a pantalla.
    this.observador = new IntersectionObserver(
      (entradas) => this.alAparecer(entradas),
      { threshold: 0.15 }
    );
  }

  // Registra los elementos .reveal para que aparezcan al hacer scroll.
  observarReveals(contenedor = document) {
    contenedor.querySelectorAll(".reveal").forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.08}s`; // escalonado sutil
      this.observador.observe(el);
    });
  }

  observar(elemento) {
    this.observador.observe(elemento);   // para elementos creados después (repos)
  }

  alAparecer(entradas) {
    for (const entrada of entradas) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("is-visible");
        this.observador.unobserve(entrada.target); // solo una vez
      }
    }
  }

  // Sube un número de 0 a 'destino' de forma suave (requestAnimationFrame).
  contador(elemento, destino) {
    const duracion = 900;
    const inicio = performance.now();
    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / duracion, 1);
      elemento.textContent = Math.round(destino * t);
      if (t < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  }

  // Entrada del hero con anime.js. Se importa SOLO al usarla (import dinámico).
  // Si no hay internet o falla, no pasa nada: el CSS ya muestra el hero.
  async entradaHero() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const { default: anime } = await import(
        "https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js"
      );
      anime({
        targets: ".hero .reveal",
        translateY: [24, 0],
        opacity: [0, 1],
        delay: anime.stagger(90),      // cada uno un poquito después
        duration: 700,
        easing: "easeOutCubic"
      });
    } catch (e) {
      /* sin internet: el hero se ve igual gracias al CSS */
    }
  }
}

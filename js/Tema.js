/* ============================================================
   Tema.js — Clase (POO) que maneja el modo claro / oscuro
   ------------------------------------------------------------
   Una CLASE es un "molde": describe qué DATOS guarda (propiedades)
   y qué SABE HACER (métodos). Aquí, todo lo del tema vive junto.
   'export' = deja que otros archivos importen esta clase.
   ============================================================ */
export class Tema {
  // El CONSTRUCTOR corre una vez al crear el objeto: new Tema(boton).
  // Recibe el botón y deja todo listo (guarda referencias y escucha el clic).
  constructor(boton) {
    this.boton = boton;                 // 'this' = este objeto en concreto
    this.icono = boton.querySelector("i");

    this.aplicarPreferenciaGuardada();  // ¿el usuario ya eligió antes?
    this.actualizarIcono();

    // Cuando hagan clic, llamamos a NUESTRO método alternar().
    this.boton.addEventListener("click", () => this.alternar());
  }

  // ¿Estamos en oscuro ahora mismo? (método = una función de la clase)
  esOscuro() {
    const elegido = document.documentElement.dataset.theme;
    if (elegido) return elegido === "dark";                 // el usuario eligió
    return matchMedia("(prefers-color-scheme: dark)").matches; // si no, el sistema
  }

  // Cambia claro <-> oscuro y lo RECUERDA para la próxima visita.
  alternar() {
    const nuevo = this.esOscuro() ? "light" : "dark";
    document.documentElement.dataset.theme = nuevo;
    localStorage.setItem("tema", nuevo);   // se guarda en el navegador
    this.actualizarIcono();
  }

  // Al abrir la página, respeta lo que el usuario eligió la última vez.
  aplicarPreferenciaGuardada() {
    const guardado = localStorage.getItem("tema");
    if (guardado) document.documentElement.dataset.theme = guardado;
  }

  // La carita del botón: luna si está oscuro, sol si está claro.
  actualizarIcono() {
    this.icono.className = this.esOscuro() ? "fa-solid fa-moon" : "fa-solid fa-sun";
  }
}

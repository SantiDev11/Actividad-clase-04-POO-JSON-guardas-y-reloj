/* ============================================================
   Contacto.js — Clase del formulario: valida y ENVÍA el correo
   ------------------------------------------------------------
   Usa Web3Forms (gratis, sin backend propio): tú pones tu "access
   key" y ellos te reenvían el mensaje a tu correo. Ver README para
   sacar tu key y para cambiar a Formspree o EmailJS.
   ============================================================ */

export class Contacto {
  constructor(formulario, accessKey) {
    this.form = formulario;
    this.accessKey = accessKey;
    this.msg = formulario.querySelector("#form-msg");
    this.form.addEventListener("submit", (e) => this.enviar(e));
  }

  // Valida los campos. Devuelve un texto de error, o "" si todo está bien.
  validar(datos) {
    if (datos.nombre.trim() === "")            return "⚠️ Escribe tu nombre.";
    if (!datos.correo.includes("@"))           return "⚠️ El correo no es válido.";
    if (datos.mensaje.trim().length < 10)      return "⚠️ El mensaje es muy corto (mín. 10 letras).";
    if (datos.mensaje.includes("http")) return "⚠️ No se permiten enlaces";
    return "";
  }

  async enviar(evento) {
    evento.preventDefault();                    // no recargar la página

    // FormData lee todos los campos del formulario de una sola vez.
    const form = new FormData(this.form);
    const datos = {
      nombre: form.get("nombre"),
      correo: form.get("correo"),
      mensaje: form.get("mensaje")
    };

    const error = this.validar(datos);
    if (error) { this.mostrar(error, "var(--accent)"); return; }

    this.mostrar("Enviando…", "var(--muted)");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: this.accessKey, ...datos })
      });
      const r = await res.json();
      if (!r.success) throw new Error(r.message);

      this.mostrar(`✅ ¡Gracias, ${datos.nombre}! Tu mensaje fue enviado.`, "var(--link)");
      this.form.reset();
      this.celebrar();
    } catch (e) {
      this.mostrar("😕 No se pudo enviar. Revisa tu conexión o tu access key.", "var(--accent)");
    }
  }

  mostrar(texto, color) {
    this.msg.textContent = texto;
    this.msg.style.color = color;
  }

  // Confeti al enviar (import dinámico: solo baja la librería al usarla).
  async celebrar() {
    try {
      const { default: confetti } = await import(
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/+esm"
      );
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.8 } });
    } catch (e) { /* sin internet: no pasa nada */ }
  }
}

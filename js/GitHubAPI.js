/* ============================================================
   GitHubAPI.js — Clase que habla con la API real de GitHub
   ------------------------------------------------------------
   Una API es un servidor que entrega datos. Esta clase encapsula
   (esconde adentro) TODO lo de pedir datos a GitHub: quien la usa
   solo llama a .obtenerPerfil() o .obtenerRepos() sin saber cómo.
   Eso es "separación de responsabilidades": cada clase, su tema.
   ============================================================ */
export class GitHubAPI {
  constructor(usuario) {
    this.usuario = usuario;
    this.base = "https://api.github.com";   // la dirección de la API
  }

  // Trae el perfil (nombre, avatar, bio, nº de repos, seguidores...).
  // async/await = espera la respuesta de internet sin congelar la página.
  async obtenerPerfil() {
    const res = await fetch(`${this.base}/users/${this.usuario}`);
    if (!res.ok) throw new Error(`GitHub respondió ${res.status}`); // p.ej. 404
    return res.json();   // convierte la respuesta (texto) en objeto usable
  }

  // Trae los repos más recientes (por defecto 6). Devuelve un ARRAY.
  async obtenerRepos(cantidad = 6) {
    const url = `${this.base}/users/${this.usuario}/repos?sort=updated&per_page=${cantidad}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GitHub respondió ${res.status}`);
    return res.json();
  }
}

/* NOTA sobre LinkedIn:
   LinkedIn NO tiene una API pública y gratuita para leer tu perfil
   (protege los datos). Por eso, a diferencia de GitHub, NO se puede
   "traer" tu info de LinkedIn con fetch. La solución real y profesional
   es poner un enlace/botón a tu perfil (lo hacemos desde datos.json).   */

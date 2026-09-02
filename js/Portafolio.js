/* ============================================================
   Portafolio.js — Clase que LEE datos.json y pinta la página
   ------------------------------------------------------------
   La idea clave: el contenido (tu nombre, skills, proyectos, redes)
   NO está escrito en el HTML, sino en datos.json. Para actualizar tu
   portafolio, editas el JSON y listo. A esto se le llama "separar los
   datos de la presentación".
   ============================================================ */
export class Portafolio {
  constructor(rutaJson, animaciones) {
    this.rutaJson = rutaJson;
    this.animaciones = animaciones;   // reutilizamos la clase de animaciones
    this.datos = null;
  }

  // Pide el JSON, lo guarda y pinta todas las secciones. Devuelve los datos.
  async cargar() {
    const res = await fetch(this.rutaJson);
    if (!res.ok) throw new Error(`No pude leer ${this.rutaJson}`);
    this.datos = await res.json();

    this.pintarPerfil();
    this.pintarSobreMi();
    this.pintarSkills();
    this.pintarProyectos();
    this.pintarRedes();
    return this.datos;
  }

  // Atajo para escribir menos: busca un elemento por su selector.
  $(sel) { return document.querySelector(sel); }

  pintarPerfil() {
    const p = this.datos.perfil;
    this.$("#p-eyebrow").textContent = p.eyebrow;
    this.$("#p-nombre").textContent = p.nombre;
    this.$("#p-titulo").textContent = p.titulo;
    this.$("#p-resumen").textContent = p.resumen;
    this.$("#p-frase").textContent = p.frase;
    document.title = `${p.nombre} · Dev`;
  }

  pintarSobreMi() {
    const cont = this.$("#sobre-mi-texto");
    // .map() transforma cada párrafo en <p>…</p>; .join une el array en un texto.
    cont.innerHTML = this.datos.sobreMi.map((parrafo) => `<p>${parrafo}</p>`).join("");
  }

  pintarSkills() {
    const lista = this.$("#skills-lista");
    lista.innerHTML = this.datos.skills.map((s) => `
      <li class="skill">
        <span><i class="${s.icono}"></i> ${s.nombre}</span>
        <div class="bar"><i style="--pct:${s.nivel}%"></i></div>
      </li>`).join("");
  }
  pintarFrase(){
    const p=this.datos.perfil;
    this.$("#p-frase").textContent=p.frase;
  }

  pintarProyectos() {
    const cont = this.$("#proyectos-lista");
    cont.innerHTML = this.datos.proyectos.map((proy) => {
      const tags = proy.tags.map((t) => `<span class="tag">${t}</span>`).join("");
      return `
        <article class="repo reveal">
          <h3><i class="fa-solid fa-folder-open"></i> ${proy.nombre}</h3>
          <p>${proy.descripcion}</p>
          <div class="repo__tags">${tags}</div>
          <div class="repo__foot">
            <a href="${proy.repo}" target="_blank">Código →</a>
            <a href="${proy.enlace}" target="_blank">Ver demo →</a>
          </div>
        </article>`;
    }).join("");
    this.animaciones.observarReveals(cont); // que aparezcan al hacer scroll
  }

  pintarRedes() {
    const r = this.datos.redes;
    this.$("#red-github").href = `https://github.com/${r.github}`;
    this.$("#red-linkedin").href = r.linkedin;   // LinkedIn = enlace directo
    this.$("#red-correo").href = `mailto:${r.correo}`;
    this.pintarBadgeLinkedIn(r);
  }

  // Badge OFICIAL de LinkedIn: le ponemos tu usuario y su tema, y cargamos
  // el script de LinkedIn (que reemplaza el div por el badge de verdad).
  pintarBadgeLinkedIn(redes) {
    if (!redes.linkedinUsuario) return;             // sin usuario: no hacemos nada
    const badge = this.$(".LI-profile-badge");
    badge.dataset.vanity = redes.linkedinUsuario;   // tu perfil
    badge.dataset.theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    this.$("#li-link").href = redes.linkedin;       // respaldo si no carga el script

    // Cargamos el SDK de LinkedIn una sola vez (necesita internet).
    if (!document.querySelector("#li-sdk")) {
      const script = document.createElement("script");
      script.id = "li-sdk";
      script.src = "https://platform.linkedin.com/badges/js/profile.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }
}

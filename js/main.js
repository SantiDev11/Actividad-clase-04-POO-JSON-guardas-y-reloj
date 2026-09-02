/* ============================================================
   main.js — El "director de orquesta"
   ------------------------------------------------------------
   Aquí NO hay lógica complicada: solo importamos cada clase y las
   ponemos a trabajar juntas. Leer este archivo = entender la app.
   Se enlaza así en el HTML:  <script type="module" src="js/main.js">
   ============================================================ */
import { Tema }        from "./Tema.js";
import { Portafolio }  from "./Portafolio.js";
import { GitHubAPI }   from "./GitHubAPI.js";
import { Contacto }    from "./Contacto.js";
import { Animaciones } from "./Animaciones.js";
import {Reloj} from "./reloj.js"

// 🔧 Lo único que tú cambias para personalizar:
const CONFIG = {
  githubUsuarioPorDefecto: "santidev11",       // si datos.json no trae usuario
  web3formsKey: "TU_ACCESS_KEY_AQUI"        // saca la tuya gratis (ver README)
};

// Avisa al CSS que JS está activo (habilita las animaciones .reveal).
document.documentElement.classList.add("js");

async function iniciar() {
  // 1) Piezas que no dependen de datos: tema y animaciones.
  new Tema(document.querySelector("#btn-tema"));
  const animaciones = new Animaciones();
  animaciones.observarReveals();
  animaciones.entradaHero();

  // 2) Cargar el contenido desde datos.json y pintarlo.
  const portafolio = new Portafolio("datos.json", animaciones);
  const datos = await portafolio.cargar();

  // 3) Formulario de contacto (validación + envío real).
  new Contacto(document.querySelector("#form-contacto"), CONFIG.web3formsKey);

  // 4) Nav que aparece al bajar.
  const nav = document.querySelector("#nav");
  addEventListener("scroll", () => {
    nav.classList.toggle("is-visible", scrollY > innerHeight * 0.7);
  });

  // 5) Datos reales de GitHub (usa la clase GitHubAPI).
  const usuario = datos.redes.github || CONFIG.githubUsuarioPorDefecto;
  cargarGitHub(new GitHubAPI(usuario), animaciones);
}
  const btnImprimir = document.querySelector("#btn-imprimir");
  btnImprimir.addEventListener("click", () => window.print());

   const reloj=document.querySelector("#reloj");
   new Reloj(reloj);
async function cargarGitHub(api, animaciones) {
  const cont = document.querySelector("#gh-repos");
  try {
    const perfil = await api.obtenerPerfil();
    document.querySelector("#gh-avatar").src = perfil.avatar_url;
    animaciones.contador(document.querySelector("#stat-repos"), perfil.public_repos);
    animaciones.contador(document.querySelector("#stat-followers"), perfil.followers);
    animaciones.contador(document.querySelector("#stat-following"), perfil.following);

    const repos = await api.obtenerRepos(6);
    cont.innerHTML = "";
    for (const repo of repos) {
      const card = document.createElement("article");
      card.className = "repo reveal";
      card.innerHTML = `
        <h3><i class="fa-solid fa-book-bookmark"></i> ${repo.name}</h3>
        <p>${repo.description || "Sin descripción"}</p>
        <div class="repo__foot">
          <span>⭐ ${repo.stargazers_count} · ${repo.language || "—"}</span>
          <a href="${repo.html_url}" target="_blank">Ver →</a>
        </div>`;
      cont.appendChild(card);
      animaciones.observar(card);
    }
    
  } catch (error) {
    cont.innerHTML = "<p class='muted'>No pude cargar GitHub ahora (revisa el usuario o tu conexión).</p>";
  }
}

iniciar();

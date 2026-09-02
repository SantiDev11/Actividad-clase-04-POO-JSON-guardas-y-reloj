# Portafolio v3 — JavaScript modular (POO + JSON)

Este es el portafolio de la Clase 04 en su versión **profesional**: el JavaScript está
separado en **clases** (POO), cada archivo tiene **una sola responsabilidad**, y el
**contenido** vive en `datos.json` (no dentro del HTML).

## 📁 Estructura

```
codigo/
├── index.html          → solo la ESTRUCTURA (contenedores vacíos con id)
├── styles.css          → estilos (de la Clase 03, + tags de proyectos)
├── datos.json          → TU CONTENIDO: nombre, skills, proyectos, redes
└── js/
    ├── main.js         → director de orquesta (importa y arranca todo)
    ├── Tema.js         → clase: modo claro/oscuro (+ recuerda con localStorage)
    ├── Portafolio.js   → clase: lee datos.json y pinta la página
    ├── GitHubAPI.js    → clase: pide tus datos reales a la API de GitHub
    ├── Contacto.js     → clase: valida el formulario y envía el correo
    ├── Animaciones.js  → clase: reveal al scroll, contadores, anime.js
    └── tare1.js        → clase: tarea 1 
```

> **Idea clave:** para actualizar tu portafolio **no tocas el HTML ni el JS**, solo
> editas `datos.json`. Los datos están separados de la presentación.

## ▶️ Cómo abrirlo (IMPORTANTE)

Este proyecto usa **módulos** (`import`/`export`) y `fetch("datos.json")`. Por seguridad,
el navegador **NO** deja usar eso si abres el archivo con doble clic (`file://`).

**Ábrelo con Live Server:** en VS Code, clic derecho sobre `index.html` →
**"Open with Live Server"** (o el botón *Go Live* abajo a la derecha). Se abrirá en
`http://127.0.0.1:5500`, y ahí todo funciona.

## 🔧 Personalización (3 pasos)

### 1. Tu contenido → `datos.json`
Cambia nombre, resumen, skills, proyectos y tus redes. En `redes.github` pon **tu usuario**
de GitHub (así se cargan tu avatar y tus repos reales). En `redes.linkedin`, la URL de tu perfil, y
en `redes.linkedinUsuario`, el trozo final de esa URL (p. ej. `ana-perez`): con eso se dibuja el
**badge oficial de LinkedIn**. Con el placeholder `tu-usuario` solo verás el enlace de respaldo; con
tu usuario real, la tarjeta completa (necesita internet).

### 2. Tu GitHub
Ya sale de `datos.json` (`redes.github`). Si lo dejas en blanco, `main.js` usa
`githubUsuarioPorDefecto`.

### 3. El correo del formulario → Web3Forms (por defecto)
1. Entra a **https://web3forms.com**, escribe tu correo y te llega un **Access Key** gratis
   (no hay que crear cuenta).
2. Pega esa key en `js/main.js`, en `CONFIG.web3formsKey`.
3. Listo: cuando alguien te escriba, el mensaje llega a **tu correo**.

## ✉️ Otras opciones de correo (gratis)

| Herramienta | Cómo funciona | Cuándo usarla |
|-------------|---------------|---------------|
| **Web3Forms** (por defecto) | Solo un *access key*, sin cuenta. POST a su API. | La más simple. |
| **Formspree** | Creas cuenta, te dan un *endpoint* por formulario. | Si quieres un panel de mensajes. |
| **EmailJS** | *service + template + public key*; más pasos. | Si quieres plantillas de correo. |

**Para cambiar a Formspree:** en `Contacto.js`, reemplaza la URL del `fetch` por tu endpoint
`https://formspree.io/f/TU_ID` y quita `access_key` del `body`.

**Para EmailJS:** se importa su SDK y se llama `emailjs.send(service, template, datos, publicKey)`
en vez del `fetch`. Ver la guía avanzada.

## 🎬 Animaciones con librerías

`Animaciones.js` ya trae la entrada del hero con **anime.js** (import dinámico, con plan B en
CSS si no hay internet). En la guía avanzada hay ejemplos listos para **GSAP** también.

## ⚠️ Internet
`fetch` a GitHub, el envío del correo y las librerías por CDN **usan internet**. Si la red se
cae, el resto del portafolio se sigue viendo (hay `try/catch` en todo).

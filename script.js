// script.js

// Contenedor donde se insertan los posts
const postsContainer = document.getElementById('postsContainer');

// Función para formatear fecha a "8 de julio de 2025"
function formatFecha(fechaStr) {
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
                 "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const fecha = new Date(fechaStr);
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();
  return `${dia} de ${mes} de ${anio}`;
}

// Función para crear un iframe de Facebook
function crearIframe(post) {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(post.url)}&show_text=true&width=${post.width}`;
  iframe.width = post.width;
  iframe.height = post.height;
  iframe.style.border = 'none';
  iframe.style.overflow = 'hidden';
  iframe.scrolling = 'no';
  iframe.frameBorder = '0';
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  return iframe;
}

// Función para mostrar los posts (aquí sin filtro por ahora)
function mostrarPosts(posts) {
  postsContainer.innerHTML = ''; // limpiar

  posts.forEach(post => {
    const divPost = document.createElement('div');
    divPost.className = 'post-entry';

    const fechaDiv = document.createElement('div');
    fechaDiv.className = 'post-date';
    fechaDiv.textContent = formatFecha(post.fecha);

    const iframe = crearIframe(post);

    divPost.appendChild(fechaDiv);
    divPost.appendChild(iframe);

    postsContainer.appendChild(divPost);
  });
}

// Cargar posts.json y mostrar
fetch('posts.json')
  .then(response => response.json())
  .then(data => mostrarPosts(data))
  .catch(err => console.error('Error cargando posts:', err));

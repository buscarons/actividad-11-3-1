document.addEventListener("DOMContentLoaded", () => {
const btnBuscar = document.getElementById("btnBuscar");
const contenedor = document.getElementById("contenedor");

btnBuscar.addEventListener("click", function() {
    const textoBusqueda = document.getElementById("inputBuscar").value;
    const urlConsulta = `https://images-api.nasa.gov/search?q=${textoBusqueda}`;
    fetch(urlConsulta)
      .then(response => response.json())
      .then(data => {
          // Procesar la respuesta del servidor
          const items = data.collection.items;
          let contenidoHTML = '';
          // Recorrer la lista de imágenes devuelta y construir el contenido HTML
          items.forEach(item => {
            const image = item.links[0].href;
            const title = item.data[0].title;
            const description = item.data[0].description;
            const dateCreated = item.data[0].date_created;

            contenidoHTML += `
            <div class="card">
                <div class="imagen">
              <img src="${image}" alt="${title}">
              </div>
                <h3>${title}</h3>
                <div class="info">${description}</div>
                <p class="fecha">${dateCreated}</p>
            </div>
          `;
        });
        contenedor.innerHTML = contenidoHTML;    
    })
    .catch(error => {
      // Manejar cualquier error en la solicitud
      console.error(error);
    });   
})});



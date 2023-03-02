// Definimos una variable global para llevar la cuenta de los productos creados
let idProducto = 1;

// Obtenemos los elementos del formulario
const formulario = document.querySelector('form');
const inputNombre = formulario.querySelector('#nombre');
const inputPrecio = formulario.querySelector('#precio');
const inputDescripcion = formulario.querySelector('#descripcion');

// Obtenemos el elemento UL donde se mostrarán los productos
const listaArticulos = document.getElementById('lista-articulos');

// Función para crear un nuevo artículo
function crearArticulo(nombre, precio, descripcion) {
  // Creamos un nuevo elemento LI
  const nuevoArticulo = document.createElement('li');
  nuevoArticulo.classList.add('list-group-item');

  // Creamos un objeto con la información del artículo
  const producto = {
    id: idProducto++,
    nombre: nombre,
    precio: precio,
    descripcion: descripcion
  };

  // Creamos el HTML para mostrar la información del artículo
  const contenidoHTML = `
  <div class="card w-100" style="width: 18rem;">
    <div class="card-body">
      <h4 class="card-title">${producto.nombre}</h4>
      <p class="card-text">Precio: $${producto.precio}</p>
      <p class="card-text">${producto.descripcion}</p>
      <input type="number" class="form-control w-25" id="cantidad" name="cantidad"><br>
      <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip" title="Mover a deseados">Me gusta</button>
      <a href="#" class="btn btn-info btn-sm mb-2" data-mdb-toggle="tooltip" title="Agregar al carrito">Agregar</a>
    </div>
  </div>
  `;

  // Agregamos el HTML al LI
  nuevoArticulo.innerHTML = contenidoHTML;

  // Agregamos el LI a la lista de artículos
  listaArticulos.appendChild(nuevoArticulo);

  // Limpiamos el formulario
  formulario.reset();
}

// Agregamos un evento al botón "Crear artículo" para crear un nuevo artículo
document.getElementById('crear-articulo').addEventListener('click', function(evento) {
  evento.preventDefault();
  const nombre = inputNombre.value;
  const precio = inputPrecio.value;
  const descripcion = inputDescripcion.value;
  crearArticulo(nombre, precio, descripcion);
});

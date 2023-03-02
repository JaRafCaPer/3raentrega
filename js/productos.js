// Definimos una variable global para llevar la cuenta de los productos creados
let idProducto = 1;
let totalCompra = 0;

// Obtenemos los elementos del formulario
const formulario = document.querySelector('form');
const inputNombre = formulario.querySelector('#nombre');
const inputPrecio = formulario.querySelector('#precio');
const inputDescripcion = formulario.querySelector('#descripcion');
const listaProd = [];
const carrito = [];

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
    descripcion: descripcion,
    cantidad: 1 // Establecemos la cantidad en 1 por defecto
  };
  listaProd.push(producto)
  console.log(listaProd)
  // Creamos el HTML para mostrar la información del artículo
  const contenidoHTML = `
  <div class="card w-100" style="width: 18rem;">
    <div class="card-body">
      <h4 class="card-title">${producto.nombre}</h4>
      <p class="card-text">Precio: $${producto.precio}</p>
      <p class="card-text">${producto.descripcion}</p>
      <input type="number" class="form-control w-25" id="c-${producto.id}" name="cantidad"><br>
      <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip" title="Mover a deseados">Me gusta</button>
      <a href="#" id="p-${producto.id}" class="btn btn-info btn-sm mb-2" data-mdb-toggle="tooltip" title="Agregar al carrito">Agregar</a>
    </div>
  </div>
  `;

  // Agregamos el HTML al LI
  nuevoArticulo.innerHTML = contenidoHTML;

  // Agregamos el LI a la lista de artículos
  listaArticulos.appendChild(nuevoArticulo);

  // Limpiamos el formulario
  formulario.reset();

const btnAgregar = document.getElementById(`p-${producto.id}`);
btnAgregar.addEventListener("click", () => {
  agregarAlCarrito(producto.id)
  console.log(carrito)
})
}

// Agregamos un evento al botón "Crear artículo" para crear un nuevo artículo
document.getElementById('crear-articulo').addEventListener('click', function(evento) {
  evento.preventDefault();
  const nombre = inputNombre.value;
  const precio = inputPrecio.value;
  const descripcion = inputDescripcion.value;
  crearArticulo(nombre, precio, descripcion);
});

//agregamos productos al carrito
function agregarAlCarrito(id) {
  const producto = listaProd.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  const cantidad = parseInt(document.getElementById(`c-${producto.id}`).value);

  if (productoEnCarrito) {
    alert("Item duplicado")
  }
  else{
    carrito.push({...producto, cantidad: cantidad});
    totalCompra += cantidad * producto.precio;
    actualizarCarrito();
  }
}
// Mostramos el carrito
const btnRealizarCompra = document.getElementById('realizar-compra');
const divCarrito = document.getElementById('carrito');
const listaCarrito = document.getElementById('lista-carrito');

btnRealizarCompra.addEventListener('click', () => {
  // Mostrar el contenido del carrito
  divCarrito.style.display = 'block';

  // Limpiar la lista de elementos de carrito
  listaCarrito.innerHTML = '';

  // Agregar los elementos del carrito a la lista
  carrito.forEach((producto) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <span>${producto.nombre}</span>
        <span>$${producto.precio}</span>
      </div>
    `;
    listaCarrito.appendChild(li);
  });
});

//Vaciar el carrito
const btnVaciarCarrito = document.getElementById('vaciar-carrito');

btnVaciarCarrito.addEventListener('click', () => {
  // Limpiar el carrito
  carrito.length = 0;

  // Ocultar el contenido del carrito
  divCarrito.style.display = 'none';

  // Limpiar la lista de elementos de carrito
  listaCarrito.innerHTML = '';
});

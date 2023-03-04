// Definimos una variable global para llevar la cuenta de los productos creados
let idProducto = 1;
let totalCompra = 0;


// Obtenemos los elementos del formulario
const formulario = document.querySelector('form');
const inputNombre = formulario.querySelector('#nombre');
const inputPrecio = formulario.querySelector('#precio');
const inputDescripcion = formulario.querySelector('#descripcion');
const listaProd = [];

// Obtenemos el elemento UL donde se mostrarán los productos
const listaArticulos = document.getElementById('lista-articulos');

// Obtenemos la tabla donde se mostrará el carrito
const tablaCarrito = document.getElementById('tabla-carrito');

// Obtenemos el carrito guardado en el localStorage y lo cargamos en la variable carrito
const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
const carrito = carritoGuardado || [];

// Función para actualizar el carrito en el localStorage
function actualizarCarritoLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Actualizamos la tabla del carrito y cargamos el carrito guardado en el localStorage
actualizarCarrito();

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
  listaProd.push(producto);

  // Creamos el HTML para mostrar la información del artículo
  const contenidoHTML = `
    <div class="card w-100 bg-dark text-white" style="width: 18rem;">
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
    agregarAlCarrito(producto.id);
  });
}

// Agregamos un evento al botón "Crear artículo" para crear un nuevo artículo
document.getElementById('crear-articulo').addEventListener('click', function(evento) {
  evento.preventDefault();
  const nombre = inputNombre.value;
  const precio = inputPrecio.value;
  const descripcion = inputDescripcion.value;
  crearArticulo(nombre, precio, descripcion);
});

// Función para actualizar la tabla del carrito
function actualizarCarrito() {
  // Limpiamos la tabla del carrito
  tablaCarrito.innerHTML = '';

  // Creamos las filas de la tabla con la información de los productos en el carrito
  carrito.forEach(producto => {
    const fila = document.createElement('tr')
    const subtotal = parseInt(producto.cantidad) * parseInt(producto.precio);
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>${producto.cantidad}</td>
      <td>$${subtotal}</td>
    `;
    tablaCarrito.appendChild(fila);
  });

  // Actualizamos el total de la compra
  totalCompra = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  document.getElementById('total-compra').textContent = `$${totalCompra.toFixed(2)}`;

  // Actualizamos el carrito en el localStorage
  actualizarCarritoLocalStorage();
}

// Agregamos un evento al botón "Agregar al carrito" de cada producto para agregarlo al carrito
function agregarAlCarrito(idProducto) {
  const producto = listaProd.find(producto => producto.id === idProducto);
  const cantidad = parseInt(document.getElementById(`c-${idProducto}`).value);
  if (!cantidad) return; // Si la cantidad es 0 o no es un número, no hacemos nada
  
  // Buscamos si el producto ya está en el carrito
  const productoEnCarrito = carrito.find(producto => producto.id === idProducto);
  
  if (productoEnCarrito) {
    // Si el producto ya está en el carrito, actualizamos la cantidad
    productoEnCarrito.cantidad += cantidad;
  } else {
    // Si el producto no está en el carrito, lo agregamos
    producto.cantidad = cantidad;
    carrito.push(producto);
  }
  
  actualizarCarrito();
}


// Agregamos un evento al botón "Limpiar carrito" para vaciar el carrito y actualizar la tabla
document.getElementById('limpiar-carrito').addEventListener('click', function() {
  carrito.length = 0;
  actualizarCarrito();
});

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const productoContenedor = document.getElementById('producto-contenedor');
productoContenedor.addEventListener('click', (event) => {
  if (event.target.classList.contains('agregar')) {

    validarProductoCarrito(event.target.id);
  }

});


const validarProductoCarrito = (productoId) => {

  Toastify({
    text: "Producto agregado",
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #87CEEB, #00BFFF)",
      borderRadius: "2rem",
      textTransform: "uppercase"
    },
    onClick: function(){} // Callback after click
  }).showToast();


  const productoRepetido = carrito.some((producto) => producto.id == productoId);

  if (productoRepetido) {
    const producto = carrito.find((producto) => producto.id == productoId);
    producto.cantidad++;

    const cantidad = document.getElementById(`cantidad${producto.id}`);
    cantidad.textContent = `cantidad:${producto.cantidad}`;

    actualizarTotalCarrito(carrito);

  } else {
    const producto = productos.find((producto) => producto.id == productoId);
    carrito.push(producto);

    pintarProductosCarrito(producto);

    actualizarTotalCarrito(carrito);

  }
};



const pintarProductosCarrito = (producto) => {
    
  const modalBody = document.querySelector('.modal-body');
  const div = document.createElement('div');

  div.innerHTML += `
    <p>${producto.nombre}</p>
    <p>$${producto.precio}</p>
    <p id=cantidad${producto.id}>cantidad ${producto.cantidad}</p>
    <button class="botonEliminar" value="${producto.id}">Eliminar producto</button>
      `
  modalBody.appendChild(div);

};



const eliminarProductoCarrito = (productoId) => {
  
  Toastify({
    text: "Producto eliminado",
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #87CEEB, #00BFFF)",
      borderRadius: "2rem",
      textTransform: "uppercase"
    },
    onClick: function(){} // Callback after click
  }).showToast();

  const productoIndex = carrito.findIndex((producto) => producto.id == productoId);
  carrito[productoIndex].cantidad === 1
    ? carrito.splice(productoIndex, 1)
    : carrito[productoIndex].cantidad--

  pintarCarrito(carrito);
  actualizarTotalCarrito(carrito);

};



const pintarCarrito = (carrito) => {
  
  const modalBody = document.querySelector('.modal-body');

  modalBody.innerHTML = '';

  carrito.forEach(producto => {
    const div = document.createElement('div');

  div.innerHTML += `
      <p>${producto.nombre}</p>
      <p>$${producto.precio}</p>
      <p id=cantidad${producto.id}>cantidad ${producto.cantidad}</p>
      <button class="botonEliminar" value="${producto.id}">Eliminar producto</button>
        `
    modalBody.appendChild(div);

  });
  actualizarTotalCarrito(carrito);
 
};


const actualizarTotalCarrito = (carrito) => {

  const compraTotal = carrito.reduce((acc, producto) => acc + (producto.cantidad * producto.precio), 0);

  pintarTotalesCarrito(compraTotal);
  guardarCarritoStorage(carrito);

  guardarPrecioTotalStorage(compraTotal);
  
};

const pintarTotalesCarrito = (compraTotal) => {

  const precioTotal = document.getElementById('precioTotal');

  precioTotal.innerText = compraTotal;

};


//guardar carrito en storage
const guardarCarritoStorage = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

//guardar precio total storage
const guardarPrecioTotalStorage = (compraTotal) => {
   localStorage.setItem('compraTotal', JSON.stringify(compraTotal));
   };


//vaciar carrito
const vaciarCarritoBoton = document.getElementById('botonVaciar');

vaciarCarritoBoton.addEventListener("click", vaciarCarrito);


function vaciarCarrito() {

  Swal.fire({
    title: "¿Esás seguro?",
    icon: "question",
    html:`Se borrarán ${carrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Si",
    cancelButtonText:"No"
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      carrito.length = 0;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      pintarCarrito(carrito);
     
    }
  });

  actualizarTotalCarrito(carrito);
 
};

//comprar
const comprarBoton = document.getElementById('botonComprar');

comprarBoton.addEventListener("click", comprar);

function comprar() {

  Swal.fire({
    title: "¿Estas seguro?",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText:"Cancelar",
    cancelButtonColor: "#d33",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Comprar"
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      carrito.length = 0;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      
      Swal.fire({
        title: "¡Su compra se ha realizado con éxito!",
        text: "¡Gracias por confiar en Pastelería ES POR TÍ!",
        icon: "success"
      });
       
      pintarCarrito(carrito);
    }
  });

  actualizarTotalCarrito(carrito);
 
};


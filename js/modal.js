const modalCarrito = document.querySelector('.modal-content');

modalCarrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('botonEliminar')) {
        eliminarProductoCarrito(event.target.value);
    };

});


const pintarProductos = (productos) => {
    const contenedor = document.getElementById("producto-contenedor");

    productos.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML += `<div class="card" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.descripcion} ${"$"+producto.precio}</p>
          <a id=${producto.id} href="#" class="btn btn-primary agregar">Agregar al carrito</a>
        </div>
      </div>
    
      `
    
    
    
      contenedor.appendChild(div);
    });
  };

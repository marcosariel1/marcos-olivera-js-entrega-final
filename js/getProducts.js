const getProducts = () => {
    fetch ('../data/stock.json')
    .then ((response) => response.json())
    .then ((productos) => {
        pintarProductos(productos)
    })
}
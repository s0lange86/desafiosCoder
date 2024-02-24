class ProductManager {
    #products

    static #lastId = 1

    constructor(){
        this.#products = []
    }

    getProducts(){
        return console.log(this.#products)
    }

    #getLastId(){
        const id = ProductManager.#lastId;
        ProductManager.#lastId += 1;
        return id
    }

    getProductById(idNum){
        const searchId = this.#products.find(e => e.id === idNum);
        if(!searchId){
            return console.log("NOT FOUND");
        }
        return console.log(searchId)
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const product = {
            id : this.#getLastId(),
            title, 
            description,
            price, 
            thumbnail,
            code, 
            stock
        }

        const existe = this.#products.find(evt => evt.code === code);
        if(
            (title&&description&&price&&thumbnail&&code&&stock)===null || 
            (title&&description&&price&&thumbnail&&code&&stock)===undefined ||
            (title&&description&&price&&thumbnail&&code&&stock)===""
        ){
            console.log("debe ingresar todos los valores correspondientes")
        } else if (existe){
            console.log("ya existe el codigo ingresado")
        } else{
            this.#products.push(product)
        }
    }
}

// ------------->TESTING:
const pruebaProducto = new ProductManager()
pruebaProducto.getProducts()// devuelve array vacio

pruebaProducto.addProduct("mesa", "mesa blanca", 12500, "https://google.com", "1a", 12)
pruebaProducto.addProduct("silla", "silla negra", 15500, "https://google.com", "2b", 18)
pruebaProducto.getProducts()
// pruebaProducto.addProduct("sofa", "sofa gris antidesgarro", 80500, "https://google.com", "1a", 8) // ya existe el codigo ingresado
// pruebaProducto.addProduct("rack", "rack tv color marron claro", 28800, "https://google.com", "55b", 2)
// pruebaProducto.addProduct("escritorio", "escritorio de vidrio para pc", 20300) // debe ingresar todos los valores correspondientes
// pruebaProducto.getProducts() // devuelve el array de objetos con los productos ingresados

//------------->OBTENIENDO PRODUCTOS POR ID:
// pruebaProducto.getProductById(2)
// pruebaProducto.getProductById(4)
// pruebaProducto.getProductById(15) // NOT FOUND
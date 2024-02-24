const fs = require('fs')

class ProductManager {
    #products

    static #lastId = 1

    async initialize(){
        this.#products = await this.getProducts()
        
    }

    constructor(inputPath){
        this.path = inputPath
    }

    #getLastId(){
        const lastId = this.#products[this.#products.length - 1].id
        let collector  = lastId + 1
        return collector
        
    }
    
    async addProduct(title, description, price, thumbnail, code, stock){
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

        //escribimos en el archivo
        await this.#writingFile()
    }

    async #writingFile (){
        const fileContent = JSON.stringify(this.#products, null, '\t')
        await fs.promises.writeFile(this.path, fileContent)
    }


    async getProducts(){
        const fileContent = await fs.promises.readFile(this.path)
        const existingProducts = JSON.parse(fileContent)
        
        return existingProducts
    }


    async updateProduct(idNum, title, description, price, thumbnail, code, stock){
        const fileProductById = await this.getProductById(idNum)     
        
        this.#products.map(dato =>{
            if(dato.id == fileProductById.id){
                dato.title = title, dato.description = description, dato.price = price, dato.thumbnail = thumbnail, dato.code = code, dato.stock = stock
            }
        })
        await this.#writingFile()
    }

    async getProductById(idNum){
        const fileProducts = await this.getProducts()

        const searchId = fileProducts.find(e => e.id === idNum);
        if(!searchId){
            return console.log("NOT FOUND");
        }
        return searchId 
    }

    async deleteProduct(idNum){
        const fileProducts = await this.getProducts()

        //elimino el producto del id especificado
        const restProducts = fileProducts.filter(e => e.id != idNum)

        //reescribo el archivo
        const fileUpdated = JSON.stringify(restProducts, null, '\t')
        await fs.promises.writeFile(this.path, fileUpdated)
    }

}


// ------------> TESTING

const main = async()=>{
    const pruebaProducto = new ProductManager("./probando.json")
    await pruebaProducto.initialize() // cargo los productos existentes en mi archivo
    
    // cargo productos a mi archivo:
    // await pruebaProducto.addProduct("mesa", "mesa blanca", 12500, "https://google.com", "1a", 12)
    // await pruebaProducto.addProduct("silla", "silla negra", 15500, "https://google.com", "2b", 18)
    // await pruebaProducto.addProduct("rack", "rack tv color marron claro", 28800, "https://google.com", "3c", 2)    
    // console.log(await pruebaProducto.getProducts())

    // elimino producto por id y sobreescribo el archivo:
    // await pruebaProducto.deleteProduct(2)
    // console.log(await pruebaProducto.getProducts())

    // busco archivo por ID:
    // console.log(await pruebaProducto.getProductById(2))
    
    // actualizamos producto:
    // await pruebaProducto.updateProduct(2, "sofa", "sofa gris antidesgarro", 80500, "https://google.com", "3c", 8)

}

main()

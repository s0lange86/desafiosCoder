const ProductManager = require('./desafio2-fano')
const express = require('express')

const app = express()

const filename = `${__dirname}/../assets/Products.json`
const productsManager = new ProductManager(filename)

app.get('/products', async (_, res) => {
    try {
        //devuelvo el listado de productos
        const products = await productsManager.getProducts()

        res.json(products)
        return

    } catch (err) {
        res.json({
            error: "Error al obtener listado de productos"
        })
    }
})

app.get('/products/:pid', async (req, res) => {
    try {
        //devuelvo el producto solicitado por params
        const product = await productsManager.getProductById(+req.params.pid)

        if (!product) {
            res.json({ error: `Producto inexistente: ${+req.params.pid}`})
        }

        res.json(product)
        return

    } catch (err) {
        res.json({ error: `No se encuentra el producto en base: ${+req.params.pid}` })
    }
})


const main = async () => {
    await productsManager.initialize()

    app.listen(3000, () => {
        console.log('Servidor Listo!')
    })

}

main()
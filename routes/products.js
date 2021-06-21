const express = require("express");
const ProductsService = require("../services/products")
const {
    productIdSchema,
    createProductSchema,
    updateProductSchema
} = require("../utils/schemas/products.js");
const cors = require("cors");
const corsOptions = require("../index");
const validationHandler = require("../utils/middleware/validationHandler");

const {cacheResponse} = require("../utils/cacheResponse");

const {
    FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS
} = require("../utils/time");

const aeromaxApi = (app) => {
    const router = express.Router();
    app.use("/api/products", router);

    const productsService = new ProductsService;

    //Obtener todos los productos
    router.get("/",cors(corsOptions), async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { tags } = req.query;
        try {

            const products = await productsService.getProducts({ tags });
            res.status(200).json({
                data: products,
                message: "products listed"
            })
        } catch (err) {
            next(err)
        }
    });

    //Obtener un producto
    router.get("/:productId", validationHandler({ productId: productIdSchema }, "params"), async function (req, res, next) {
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);;
        const { productId } = req.params;
        try {
            const product = await productsService.getProduct({ productId })

            res.status(200).json({
                data: product,
                message: "product listed"
            })
        } catch (err) {
            next(err)
        }
    });

    //Crear un producto
    router.post("/", validationHandler(createProductSchema), async function (req, res, next) {
        const { body: product } = req;
        try {
            const createdProductsId = await productsService.createProduct({ product })

            res.status(201).json({
                data: createdProductsId,
                message: "product create"
            })
        } catch (err) {
            next(err)
        }
    });

    //Actualizar un producto
    router.put("/:productId", validationHandler({ productId: productIdSchema }, "params"), validationHandler(updateProductSchema), async function (req, res, next) {
        const { body: product } = req;
        const { productId } = req.params;
        try {
            const updatedProductId = await productsService.updateProduct({ productId, product });

            res.status(200).json({
                data: updatedProductId,
                message: "product updated"
            })
        } catch (err) {
            next(err)
        }
    });

    //Eliminar un producto
    router.delete("/:productId", validationHandler({ productId: productIdSchema }, "params"), async function (req, res, next) {
        const { productId } = req.params;
        try {
            const deletedProductId = await productsService.deleteProduct({ productId });

            res.status(200).json({
                data: deletedProductId,
                message: "product deleted"
            })
        } catch (err) {
            next(err)
        }
    })
}

module.exports = aeromaxApi;
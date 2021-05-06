const joi = require("@hapi/joi");

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productNameSchema = joi.string().max(60);
const productPriceSchema = joi.number().min(50).max(100000);
const productTypeSchema = joi.string().max(20);
const productImgSchema = joi.string();
const productPiecesSchema = joi.number().max(300);

const createProductSchema = {
    name: productNameSchema.required(),
    price: productPriceSchema.required(),
    type: productTypeSchema.required(),
    img: productImgSchema.required(),
    pieces: productPiecesSchema.required()
};

const updateProductSchema = {
    name: productNameSchema,
    price: productPriceSchema,
    type: productTypeSchema,
    img: productImgSchema,
    pieces: productPiecesSchema
};

module.exports = {
    productIdSchema,
    createProductSchema,
    updateProductSchema
}
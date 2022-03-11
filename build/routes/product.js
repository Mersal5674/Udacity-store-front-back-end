"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
var products_1 = require("../handlers/products");
var userCheck_1 = require("../middlewares/userCheck");
// products route
var productRoute = function (app) {
    app.get('/allproducts', products_1.index);
    app.post('/newproduct', userCheck_1.validation, products_1.create);
    app.get('/product/:id', products_1.show);
    app.delete('/deleteproduct/:id', userCheck_1.validation, products_1.reset);
};
exports.productRoute = productRoute;

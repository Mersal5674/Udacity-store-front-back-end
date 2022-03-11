"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
var userCheck_1 = require("../middlewares/userCheck");
var orders_1 = require("../handlers/orders");
// using the express and building the route
var orderRoutes = function (app) {
    app.get('/allorders', userCheck_1.validation, orders_1.index);
    app.get('/order/:id', userCheck_1.validation, orders_1.show);
    app.post('/neworder', userCheck_1.validation, orders_1.create);
    app.delete('/deleteorder/:id', userCheck_1.validation, orders_1.reset);
    app.post('/neworder/:id/product', userCheck_1.validation, orders_1.addProduct);
    app.get('/cart', userCheck_1.validation, orders_1.cart);
};
exports.orderRoutes = orderRoutes;

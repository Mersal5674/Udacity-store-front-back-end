"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserRoute = void 0;
var users_1 = require("../handlers/users");
var userCheck_1 = require("../middlewares/userCheck");
// index route
var newUserRoute = function (app) {
    app.get('/allusers', userCheck_1.validation, users_1.index);
    app.post('/authenticate', users_1.authenticate);
    app.get('/user/:id', userCheck_1.validation, users_1.show);
    app.post('/newuser', users_1.create);
    app.delete('/deleteuser/:id', userCheck_1.validation, users_1.reset);
};
exports.newUserRoute = newUserRoute;

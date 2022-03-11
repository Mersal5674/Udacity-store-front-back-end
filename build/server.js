"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("./routes/user");
var product_1 = require("./routes/product");
var order_1 = require("./routes/order");
// adding express so we can use it  
var app = (0, express_1.default)();
// !!!!! don't forget to use the express.json as your server can understand the data in the req, post body
app.use(express_1.default.json());
// aading the address of the local host
var address = "3000";
// add server route
(0, order_1.orderRoutes)(app);
// add products route to the server
(0, product_1.productRoute)(app);
// add user routes to the server
(0, user_1.newUserRoute)(app);
// building the main endpoint 
app.get('/', function (req, res) {
    res.send("");
});
// build the 
// adding the listen fun to the server
app.listen(3000, function () {
    console.log("app is running on localhost: http://localhost:".concat(address));
});
exports.default = app;

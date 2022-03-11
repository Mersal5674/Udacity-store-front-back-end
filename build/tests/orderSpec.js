"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../models/order");
var server_1 = __importDefault(require("../server"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var supertest_1 = __importDefault(require("supertest"));
var user_1 = require("../models/user");
var newUser = new user_1.userData();
var request = (0, supertest_1.default)(server_1.default);
var newOrder = new order_1.orderData();
var permession, token;
describe('My orders CRUD', function () {
    // test the existance of the all CRUD methodes
    it('It should have an index method', function () {
        expect(newOrder.index).toBeDefined;
    });
    it('It should have an show method', function () {
        expect(newOrder.show).toBeDefined;
    });
    it('It should have an create method', function () {
        expect(newOrder.create).toBeDefined;
    });
    it('It should have delete method', function () {
        expect(newOrder.delete).toBeDefined;
    });
    it('It should have cart', function () {
        expect(newOrder.cart).toBeDefined;
    });
});
// now the functionality
describe('My orders CRUD functionality', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('create product model', function () { return __awaiter(void 0, void 0, void 0, function () {
            var product, create;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = {
                            status: 'jo'
                        };
                        return [4 /*yield*/, newOrder.create(product)];
                    case 1:
                        create = (_a.sent());
                        expect(create.id).not.toEqual(0);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Index product model', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, newOrder.index()];
                    case 1:
                        result = _a.sent();
                        expect(result.length).toBeGreaterThan(0);
                        return [2 /*return*/];
                }
            });
        }); });
        // cart
        it('create product model', function () { return __awaiter(void 0, void 0, void 0, function () {
            var product, create;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        product = {
                            quantity: 10,
                            orderId: '',
                            productId: '',
                        };
                        return [4 /*yield*/, newOrder.create(product)];
                    case 1:
                        create = (_a.sent());
                        expect(create.id).not.toEqual(0);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
// test the end points
describe('Test endpoint responses', function () { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        user = {
            first_name: 'test',
            last_name: 'user',
            email: 'testuser@gmail.com',
            password: '$2b$10$QnUSFE9l8aklrtqZcCa1KO1Nf.R6Jyr7lxRW7zejOqJAL.cV7/zyO'
        };
        it('Index Order the api endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, newUser.createUser(user)];
                    case 1:
                        token = (_a.sent());
                        permession = jsonwebtoken_1.default.sign({ token: token }, process.env.SECRET_TOKEN);
                        return [4 /*yield*/, request
                                .get('/allorders')
                                .set('Authorization', "Bearer ".concat(permession))];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Show Order the api endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, newUser.createUser(user)];
                    case 1:
                        token = (_a.sent());
                        permession = jsonwebtoken_1.default.sign({ token: token }, process.env.SECRET_TOKEN);
                        return [4 /*yield*/, request
                                .get('/order/1')
                                .set('Authorization', "Bearer ".concat(permession))];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Create Order the api endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var user_id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, newUser.createUser(user)];
                    case 1:
                        token = (_a.sent());
                        permession = jsonwebtoken_1.default.sign({ token: token }, process.env.SECRET_TOKEN);
                        user_id = token.id;
                        return [4 /*yield*/, request
                                .post('/neworder')
                                .send({
                                status: "To buy",
                                user_id: "".concat(user_id)
                            })
                                .set('Authorization', "Bearer ".concat(permession))];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('Cart Order the api endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, newUser.createUser(user)];
                    case 1:
                        token = (_a.sent());
                        permession = jsonwebtoken_1.default.sign({ token: token }, process.env.SECRET_TOKEN);
                        return [4 /*yield*/, request
                                .get('/cart')
                                .set('Authorization', "Bearer ".concat(permession))];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });

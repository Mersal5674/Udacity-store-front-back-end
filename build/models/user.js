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
exports.userData = void 0;
var database_1 = __importDefault(require("../config/database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
// now creating the class that we shall write the CRUD in it
var userData = /** @class */ (function () {
    function userData() {
    }
    // getting a list of all items we have in database
    userData.prototype.indexUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connect_1, sql, result, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect_1 = _a.sent();
                        sql = 'SELECT * FROM users';
                        return [4 /*yield*/, connect_1.query(sql)];
                    case 2:
                        result = _a.sent();
                        user = result.rows;
                        connect_1.release();
                        return [2 /*return*/, user];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // the show method
    userData.prototype.showUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connect_2, sql, result, newId, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect_2 = _a.sent();
                        sql = 'SELECT * FROM users WHERE id=($1)';
                        return [4 /*yield*/, connect_2.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        newId = result.rows[0];
                        connect_2.release();
                        return [2 /*return*/, newId];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // writing the create fun for hashing the password
    userData.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connect_3, sql, salt, hashedPass, allresult, newInfo, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect_3 = _a.sent();
                        sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES($1,$2,$3,$4) RETURNING *';
                        return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                    case 2:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(user.password, salt)];
                    case 3:
                        hashedPass = _a.sent();
                        return [4 /*yield*/, connect_3.query(sql, [
                                user.first_name,
                                user.last_name,
                                user.email,
                                hashedPass,
                            ])];
                    case 4:
                        allresult = _a.sent();
                        newInfo = allresult.rows[0];
                        connect_3.release();
                        return [2 /*return*/, newInfo];
                    case 5:
                        err_3 = _a.sent();
                        console.log(err_3);
                        throw new Error("".concat(err_3));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // create the authentication method
    userData.prototype.authenticateUser = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var connect_4, sql, result, newInfo, isEmail, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect_4 = _a.sent();
                        sql = 'SELECT email FROM users WHERE email=($1)';
                        return [4 /*yield*/, connect_4.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        if (result.rows.length) {
                            newInfo = result.rows[0];
                            isEmail = bcrypt_1.default.compareSync("".concat(email), newInfo.email);
                            if (!isEmail) {
                                return [2 /*return*/, newInfo];
                            }
                        }
                        connect_4.release();
                        return [2 /*return*/, 'Email does not exsit!'];
                    case 3:
                        err_4 = _a.sent();
                        console.log(err_4);
                        throw new Error("".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // add the delete model
    userData.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connect_5, sql, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connect_5 = _a.sent();
                        sql = "DELETE FROM users WHERE id=($1) RETURNING first_name, last_name";
                        return [4 /*yield*/, connect_5.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connect_5.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return userData;
}());
exports.userData = userData;

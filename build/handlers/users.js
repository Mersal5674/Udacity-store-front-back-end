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
exports.reset = exports.authenticate = exports.create = exports.show = exports.index = void 0;
var user_1 = require("../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
// use dotenv
dotenv_1.default.config();
var newUser = new user_1.userData();
// adding the express handler function
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, newUser.indexUsers()];
            case 1:
                allUsers = _a.sent();
                res.json({ allUsers: allUsers, message: 'Users retreved successfully!' });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).send('Error!! try again!');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
// add the show handler
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var specificUser, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, newUser.showUser(req.params.id)];
            case 1:
                specificUser = _a.sent();
                res.json(specificUser);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).send('Error!! try again!');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.show = show;
// add the create handler
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var createdUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, newUser.createUser(req.body)];
            case 1:
                createdUser = _a.sent();
                res.json({
                    message: "New user: '".concat(req.body.first_name, "' created successfully"),
                    createdUser: createdUser,
                });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.log(err_3);
                res.status(400).send('Error!! try again!');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
// add the authentication handler
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, token, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, newUser.authenticateUser(req.body.email)];
            case 1:
                result = _a.sent();
                if (result != 'Email does not exsit!') {
                    token = jsonwebtoken_1.default.sign({ user: result }, process.env.SECRET_TOKEN);
                    res.json({
                        message: "User 'does exist' and 'authenticated successfully!'",
                        Saved_Info: result,
                        token: token,
                    });
                }
                else {
                    res.json(result);
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.log(err_4);
                res.status(401);
                res.send('Error!! try again!');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.authenticate = authenticate;
// add the delete handler
var reset = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted_user_info, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, newUser.delete(req.params.id)];
            case 1:
                deleted_user_info = _a.sent();
                console.log(deleted_user_info);
                res.json({ message: 'User Deleted', deleted_user_info: deleted_user_info });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400).send('Error!! try again!');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.reset = reset;

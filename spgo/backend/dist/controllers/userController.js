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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.listUsers = exports.ping = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UsersLogin_1 = require("../db/models/UsersLogin");
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield UsersLogin_1.User.findAll({ order: [['id', 'ASC']] });
    if (users) {
        res.json({ users });
    }
    else {
        res.json({ error: 'Sem cadastro!' });
    }
});
exports.listUsers = listUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    let password = '';
    if (req.body.password1 && req.body.password2) {
        req.body.password1 == req.body.password2 ? password = req.body.password2 : '';
        if (password == '') {
            res.json({ error: { msg: 'Erro ao cadastrar senha!' } });
            return;
        }
    }
    const user = yield UsersLogin_1.User.findOne({ where: { email: data.email } });
    if (user) {
        res.json({ error: { email: { msg: 'E-mail ' + data.email + ' ja cadastrado!' } } });
        return;
    }
    ;
    const encryptedPassword = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
    let name = data.name;
    let email = data.email;
    let newUser = yield UsersLogin_1.User.create({ name, email, password: encryptedPassword });
    res.json({ success: { msg: `Usuário ${newUser.name} cadastrado com sucesso.` } });
});
exports.createUser = createUser;

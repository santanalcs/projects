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
exports.auth = exports.logout = exports.changeLogin = exports.login = exports.ping = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UsersLogin_1 = require("../db/models/UsersLogin");
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    ;
    const data = (0, express_validator_1.matchedData)(req);
    const user = yield UsersLogin_1.User.findOne({ where: { email: data.email } });
    if (!user) {
        res.json({ error: { msg: 'E-mail ou senha inválido!' } });
        return;
    }
    ;
    const matches = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (!matches) {
        res.json({ error: { msg: 'E-mail ou senha inválido!' } });
        return;
    }
    ;
    res.json({ token: user.token });
});
exports.login = login;
const changeLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    ;
    const data = (0, express_validator_1.matchedData)(req);
    let password = '';
    if (data.password1 && data.password2) {
        password = (data.password1 == data.password2) ? data.password2 : '';
        if (password == '') {
            res.json({ error: { msg: 'Erro ao cadastrar nova senha!' } });
            return;
        }
        ;
    }
    ;
    const user = yield UsersLogin_1.User.findOne({ where: { email: req.body.email } });
    if (!user) {
        res.json({ error: { msg: "Falha ao redefinir senha." } });
        return;
    }
    ;
    if (user) {
        //const matches = await bcrypt.compare(data.password, user.password);
        //const passBory = bcrypt.hashSync(data.password,  bcrypt.genSaltSync(10));
        /*if(!matches){
            res.json({error:{msg:'Falha ao redefinir senha.'}});
            return;
        };*/
        const encryptedPassword = bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10));
        user.password = encryptedPassword;
        yield user.save();
        res.json({ success: { msg: "Senha redefinida com sucesso!" } });
    }
    ;
});
exports.changeLogin = changeLogin;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UsersLogin_1.User.findOne({ where: { token: req.body.token } });
    if (!user) {
        res.json({ error: { msg: "Falha ao realizar logout!" } });
        return;
    }
    if (user) {
        const payload = (Date.now() + Math.random()).toString();
        user.token = yield bcrypt_1.default.hash(payload, 10);
        yield user.save();
        res.json({ success: { msg: "Logout realizado com sucesso!" } });
    }
    ;
});
exports.logout = logout;
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UsersLogin_1.User.findOne({ where: { token: req.query.token } });
    if (!user) {
        res.json(null);
        return;
    }
    else {
        res.json({ user });
        return;
    }
});
exports.auth = auth;

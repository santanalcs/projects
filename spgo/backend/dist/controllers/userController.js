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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.ping = void 0;
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

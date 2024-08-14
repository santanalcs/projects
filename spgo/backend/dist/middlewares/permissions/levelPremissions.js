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
exports.permissionLevel = void 0;
const UsersLogin_1 = require("../../db/models/UsersLogin");
function permissionLevel(req, res, next, level) {
    return __awaiter(this, void 0, void 0, function* () {
        let error = {};
        const user = yield UsersLogin_1.User.findOne({ where: { token: req.query.token } });
        if (!user) {
            error = { msg: 'Login não registrado!!' };
            res.json({ error });
            return;
        }
        if (user.allowable_level < level) {
            error = { msg: `Usuário nível ${user.allowable_level} - transação não autorizada!` };
            res.json({ error });
            return;
        }
        else {
            next();
            return;
        }
    });
}
exports.permissionLevel = permissionLevel;

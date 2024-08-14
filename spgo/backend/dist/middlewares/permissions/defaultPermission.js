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
exports.permissionLevel4 = exports.permissionLevel4Step = void 0;
const levelPremissions_1 = require("./levelPremissions");
function permissionLevel4Step(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let level = 4;
        if (!req.body.step) {
            next();
            return;
        }
        (0, levelPremissions_1.permissionLevel)(req, res, next, level);
    });
}
exports.permissionLevel4Step = permissionLevel4Step;
function permissionLevel4(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let level = 4;
        (0, levelPremissions_1.permissionLevel)(req, res, next, level);
    });
}
exports.permissionLevel4 = permissionLevel4;

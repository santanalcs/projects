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
exports.permissionLevel3 = exports.permissionLevel4 = void 0;
const levelPremissions_1 = require("./levelPremissions");
const validator_1 = require("validator");
function permissionLevel4(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let level = 4;
        if (!req.body.contact || !req.body.cel_phone || !req.body.email) {
            next();
            return;
        }
        if (req.body.cel_phone != null) {
            let regex = '^([0-9]{2} ?[0-9]{5}[\-]?[0-9]{4})$';
            let cel_phone = req.body.cel_phone.match(regex);
            if (!cel_phone) {
                next();
                return;
            }
        }
        if (req.body.email != null) {
            let email = (0, validator_1.isEmail)(req.body.email);
            if (!email) {
                next();
                return;
            }
        }
        (0, levelPremissions_1.permissionLevel)(req, res, next, level);
    });
}
exports.permissionLevel4 = permissionLevel4;
function permissionLevel3(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let level = 3;
        if (!req.body.cel_phone || !req.body.email) {
            next();
            return;
        }
        if (req.body.cel_phone != null) {
            let regex = '^([0-9]{2} ?[0-9]{5}[\-]?[0-9]{4})$';
            let cel_phone = req.body.cel_phone.match(regex);
            if (!cel_phone) {
                next();
                return;
            }
        }
        if (req.body.email != null) {
            let email = (0, validator_1.isEmail)(req.body.email);
            if (!email) {
                next();
                return;
            }
        }
        (0, levelPremissions_1.permissionLevel)(req, res, next, level);
    });
}
exports.permissionLevel3 = permissionLevel3;

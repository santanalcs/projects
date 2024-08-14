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
exports.checker = exports.permissionLevel3 = exports.permissionLevel4 = void 0;
const levelPremissions_1 = require("./levelPremissions");
function permissionLevel4(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let level = 4;
        checker(req, res, next, level);
    });
}
exports.permissionLevel4 = permissionLevel4;
function permissionLevel3(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let level = 3;
        checker(req, res, next, level);
    });
}
exports.permissionLevel3 = permissionLevel3;
function checker(req, res, next, level) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.address || !req.body.district || !req.body.zip_code || !req.body.city || !req.body.uf) {
            next();
            return;
        }
        if (req.body.zip_code != null) {
            let regex = '^([0-9]{5}[\-]?[0-9]{3})$';
            let zip_code = req.body.zip_code.match(regex);
            if (!zip_code) {
                next();
                return;
            }
        }
        if (req.body.uf != null) {
            if (req.body.uf.length > 3) {
                next();
                return;
            }
            else {
                let regex = '^([A-Za-z]{1,3})$';
                let uf = req.body.uf.match(regex);
                if (!uf) {
                    next();
                    return;
                }
            }
        }
        (0, levelPremissions_1.permissionLevel)(req, res, next, level);
    });
}
exports.checker = checker;

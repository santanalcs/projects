"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeLoginValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = (0, express_validator_1.checkSchema)({
    email: {
        optional: false,
        isEmail: true,
        normalizeEmail: true,
        errorMessage: 'E-mail inválido!',
    },
    password: {
        optional: false,
        isLength: {
            options: { min: 6 },
            errorMessage: 'Senha inválida!',
        },
    },
});
exports.changeLoginValidator = (0, express_validator_1.checkSchema)({
    password1: {
        optional: false,
        isLength: {
            options: { min: 6 },
            errorMessage: 'Nova senha obrigatório, mínimo seis caracteres!',
        },
    },
    password2: {
        optional: false,
        isLength: {
            options: { min: 6 },
            errorMessage: 'Repetir senha obrigatório!',
        },
    },
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createValidator = (0, express_validator_1.checkSchema)({
    name: {
        optional: false,
        notEmpty: true,
        errorMessage: 'Nome é obrigatório!',
    },
    cpf: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'CPF, é obrigatório!',
        matches: {
            options: '^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[\-]?[0-9]{2}|[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[\-]?[0-9]{2})$',
            errorMessage: 'Formato para CPF não válido!',
        },
    },
    cel_phone: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'Número do celular é obrigatório!',
        matches: {
            options: '^([0-9]{2} ?[0-9]{5}[\-]?[0-9]{4})$',
            errorMessage: 'Formato para celular não válido!',
        },
    },
});

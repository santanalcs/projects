"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createValidator = (0, express_validator_1.checkSchema)({
    address: {
        optional: false,
        notEmpty: true,
        errorMessage: 'Endereço é obrigatório!',
    },
    district: {
        optional: false,
        notEmpty: true,
        errorMessage: 'Bairro é obrigatório!',
    },
    zip_code: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'CEP é obrigatório!',
        matches: {
            options: '^([0-9]{5}[\-]?[0-9]{3})$',
            errorMessage: 'Formato para CEP não válido!',
        },
    },
    city: {
        optional: false,
        notEmpty: true,
        errorMessage: 'Cidade é obrigatório!',
    },
    uf: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'UF é obrigatório!',
        isLength: {
            options: { max: 3 },
            errorMessage: 'UF máximo 3 caracteres!',
        },
        matches: {
            options: '^([A-Za-z]{1,3})$',
            errorMessage: 'Caracteres não permitidos!',
        },
    },
});

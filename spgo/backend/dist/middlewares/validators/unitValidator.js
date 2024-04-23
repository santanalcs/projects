"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createValidator = (0, express_validator_1.checkSchema)({
    symbol: {
        optional: false,
        trim: true,
        isLength: {
            options: { min: 1, max: 6 }
        },
        errorMessage: 'Símbolo, mínimo 1 e máximo 6 caracteres!',
    },
    description: {
        notEmpty: true,
        trim: true,
        errorMessage: 'Descrição, é obrigatório!',
    },
    id_group_criterion: {
        notEmpty: true,
        trim: true,
        errorMessage: 'Grupo, é obrigatório!',
    },
});

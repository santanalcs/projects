"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createValidator = (0, express_validator_1.checkSchema)({
    description: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'Descrição, é obrigatório!',
        matches: {
            //options: '^([a-zA-z/]+[^.]+)([0-9.]+[a-zA-Z]*[^.]+)$',
            options: '^([^.]+)$',
            errorMessage: 'Caractere (.) não permitido em sentenças numericas ou alfabéticas!',
        },
    },
    rating: {
        optional: false,
        notEmpty: true,
        errorMessage: 'Classificação é obrigatório!',
    },
    id_measure_unit: {
        optional: false,
        notEmpty: true,
        errorMessage: 'Unidade de medidas é obrigatório!',
    },
});

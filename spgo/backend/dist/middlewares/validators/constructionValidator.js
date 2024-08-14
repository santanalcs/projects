"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createValidator = (0, express_validator_1.checkSchema)({
    pattern_type: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'Tipo/Padrão é obrigatório!',
    },
    owner: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'Proprietário é obrigatório!',
    },
    owner_cpf: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'CPF do proprietário é obrigatório!',
        matches: {
            options: '^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[\-]?[0-9]{2}|[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[\-]?[0-9]{2})$',
            errorMessage: 'Formato para CPF não válido!',
        },
    },
    owner_rg: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'RG do proprietário é obrigatório!',
    },
    liable_engineer: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'Engenheiro responsável é obrigatório!',
    },
    engineer_registration: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'Registro CREA do responsável é obrigatório!',
    },
    area_m2: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'Área/m2 é obrigatório!',
        matches: {
            options: '^([0-9]{1,4}[\,][0-9]{1,3})$',
            errorMessage: 'Formato numérico não aceito!',
        },
    },
    value_m2: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'Valor/m2 é obrigatório!',
        matches: {
            options: '^([0-9]{1,4}[\,][0-9]{1,3})$',
            errorMessage: 'Formato numérico não aceito!',
        },
    },
});

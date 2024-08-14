"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createValidator = (0, express_validator_1.checkSchema)({
    step: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'Etapa é obrigatório!',
    },
});

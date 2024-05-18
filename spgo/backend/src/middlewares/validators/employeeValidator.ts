import { checkSchema } from "express-validator";

export const createValidator = checkSchema ({
    name: {
        optional: false,
        notEmpty: true,
        errorMessage:'Nome é obrigatório!',
    },
    cpf: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage:'CPF, é obrigatório!',
        matches: {
            options: '^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[\-]?[0-9]{2}|[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[\-]?[0-9]{2})$',
            errorMessage:'Formato para CPF não válido!',
        },
    },
    cel_phone: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'Número do celular é obrigatório!',
        matches: {
            options: '^([0-9]{2} ?[0-9]{5}[\-]?[0-9]{4})$',
            errorMessage:'Formato para celular não válido!',
        },
    },
})
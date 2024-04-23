import { checkSchema } from "express-validator";


export const createValidator = checkSchema ({
    symbol: {
        optional: false,
        trim: true,
        isLength: {
            options: {min: 1, max: 6}
        },
        errorMessage:'Símbolo, mínimo 1 e máximo 6 caracteres!',
    },
    description: {
        notEmpty: true,
        trim: true,
        errorMessage:'Descrição, é obrigatório!',
    },
    id_group_criterion: {
        notEmpty: true,
        trim: true,
        errorMessage:'Grupo, é obrigatório!',
    },
})
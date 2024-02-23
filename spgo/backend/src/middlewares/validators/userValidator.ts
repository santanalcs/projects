import { checkSchema } from "express-validator";

export const createValidator = checkSchema ({
    name: {
        optional: false,
        trim: true,
        isLength: {
            options: {min: 4}
        },
        errorMessage:'Nome, mínimo 4 caracteres',
    },
    email: {
        optional: false,
        isEmail: true,
        normalizeEmail: true,
        errorMessage:'E-mail inválido',
    },
    password1: {
        optional: false,
        isLength: {
            options: {min: 6},
            errorMessage: 'Senha obrigatório, mínimo 6 caracteres', 
        },
    },
    password2: {
        optional: false,
        isLength: {
            options: {min: 6},
            errorMessage:'Repetir senha obrigatório, mínimo 6 caracteres', 
        },
    },
})
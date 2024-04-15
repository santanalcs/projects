import { checkSchema } from "express-validator";

export const createValidator = checkSchema ({
    name: {
        optional: false,
        trim: true,
        isLength: {
            options: {min: 4}
        },
        errorMessage:'Nome, mínimo 4 caracteres!',
    },
    email: {
        optional: false,
        isEmail: true,
        normalizeEmail: true,
        errorMessage:'E-mail inválido!',
    },
    password1: {
        optional: false,
        isLength: {
            options: {min: 6},
            errorMessage: 'Senha obrigatório, mínimo 6 caracteres!', 
        },
    },
    password2: {
        optional: false,
        isLength: {
            options: {min: 6},
            errorMessage:'Senhas não conferem!', 
        },
    },
})

export const allowableLevelValidator = checkSchema ({
    level: {
        optional: false,
        trim: true,
        /*isLength: {
            options: {min: 4}
        },*/
        matches: {
            options: '^[0-4]{1}$',
            errorMessage:'Digite números de 0 a 4',
        },
    },
})

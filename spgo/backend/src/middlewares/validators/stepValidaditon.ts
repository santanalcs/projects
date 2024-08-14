import { checkSchema } from "express-validator";

export const createValidator = checkSchema ({
    step: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage:'Etapa é obrigatório!',
    },
})
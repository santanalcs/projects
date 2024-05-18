import { checkSchema } from "express-validator";

export const createValidator = checkSchema ({
    description: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage:'Descrição, é obrigatório!',
        matches: {
           //options: '^([a-zA-z/]+[^.]+)([0-9.]+[a-zA-Z]*[^.]+)$',
            options: '^([^.]+)$',
            errorMessage:'Caractere (.) não permitido em sentenças numericas ou alfabéticas!',
        },
    },
    rating: {
        optional: false,
        notEmpty: true,
        errorMessage:'Classificação é obrigatório!',
    },
    id_measure_unit: {
        optional: false,
        notEmpty: true,
        errorMessage: 'Unidade de medidas é obrigatório!',
    },
})
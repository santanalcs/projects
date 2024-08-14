import { checkSchema } from "express-validator";

export const createValidator = checkSchema ({
    name: {
        optional: false,
        notEmpty: true,
        errorMessage:'Nome é obrigatório!',
    },
    type_person: {
        optional: false,
        notEmpty: true,
        errorMessage:'Tipo pessoa é obrigatório!',
    },
    cpf_cnpj: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage:'CPF/CNPJ, é obrigatório!',
        matches: {
            options: '^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[\-]?[0-9]{2}|[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[\-]?[0-9]{2})$',
            errorMessage:'Formato para CPF ou CNPJ não válido!',
        },
    },
})

export const createContatctValidator = checkSchema ({
    name_contractor: {
        optional: false,
        notEmpty: true,
        errorMessage:'Empreiteiro obrigatório!',
    },
    contact: {
        optional: false,
        notEmpty: true,
        errorMessage:'Contato obrigatório!',
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
    email: {
        optional: false,
        isLength: {
            options: {min: 1},
            errorMessage: 'Email é obrigatório!', 
        },
        isEmail: true,
        normalizeEmail: true,
        errorMessage:'E-mail inválido!',
    },   
})

export const createAddressValidator = checkSchema ({
    address: {
        optional: false,
        notEmpty: true,
        errorMessage:'Endereço é obrigatório!',
    },
    district: {
        optional: false,
        notEmpty: true,
        errorMessage:'Bairro é obrigatório!',
    },
    zip_code: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'CEP é obrigatório!',
        matches: {
            options: '^([0-9]{5}[\-]?[0-9]{3})$',
            errorMessage:'Formato para CEP não válido!',
        },
    },
    city: {
        optional: false,
        notEmpty: true,
        errorMessage:'Cidade é obrigatório!',
    },
    uf: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage: 'UF é obrigatório!',
        isLength: {
            options: {max: 3},
            errorMessage: 'UF máximo 3 caracteres!', 
        },
        matches: {
            options: '^([A-Za-z]{1,3})$',
            errorMessage:'Caracteres não permitidos!',
        },  
    },
})
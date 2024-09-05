import { checkSchema } from "express-validator";

export const createValidator = checkSchema ({
    pattern_type: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage:'Tipo/Padrão é obrigatório!',
    },
    owner: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage:'Proprietário é obrigatório!',
    },
    owner_cpf: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage:'CPF do proprietário é obrigatório!',
        matches: {
            options: '^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[\-]?[0-9]{2}|[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[\-]?[0-9]{2})$',
            errorMessage:'Formato para CPF não válido!',
        },
    },
    liable_engineer: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage:'Engenheiro responsável é obrigatório!',
    },
    engineer_registration: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage:'Registro CREA do responsável é obrigatório!',
    },
    /*area_m2: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage:'Área/m2 é obrigatório!',
        matches: {
            options: '^([0-9]{1,4}[\,][0-9]{1,3})$',
            errorMessage:'Formato numérico não aceito!',
        },
    },
    value_m2: {
        optional: false,
        trim: true,
        notEmpty: true,
        errorMessage:'Valor/m2 é obrigatório!',
        matches: {
            options: '^([0-9]{1,4}[\,][0-9]{1,3})$',
            errorMessage:'Formato numérico não aceito!',
        },
    },*/    
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
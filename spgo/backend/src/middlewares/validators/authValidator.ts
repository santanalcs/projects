import { checkSchema } from "express-validator";

export const loginValidator = checkSchema ({
    email:{
        optional:false,
        isEmail:true,
        normalizeEmail:true,
        errorMessage:'E-mail inválido!',
    },
    password:{
        optional:false,
        isLength:{
            options:{min:6},
            errorMessage:'Senha inválida!', 
        },
    },
});

export const changeLoginValidator = checkSchema ({
    password1:{
        optional:false,
        isLength:{
            options:{min:6},
            errorMessage:'Nova senha obrigatório, mínimo seis caracteres!', 
        },
    },
    password2:{
        optional:false,
        isLength:{
            options:{min:6},
            errorMessage:'Repetir senha obrigatório!', 
        },
    },
});
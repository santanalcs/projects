import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";

import  bcrypt from "bcrypt";

import { User } from "../db/models/UsersLogin";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
};

export const listUsers = async (req: Request, res: Response) => {
    let users = await User.findAll({order:[['id', 'ASC']]});

    if(users) {
        res.json({users});
    } else {
        res.json({ error: 'Sem cadastro!' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);
    let password = '';

    if(req.body.password1 && req.body.password2){
        req.body.password1 == req.body.password2? password = req.body.password2: '';
        if(password == ''){
            res.json({error:{msg:'Erro ao cadastrar senha!'}});
            return;
        }
    }

    const user = await User.findOne({where:{email:data.email}});
        
    if(user){
        res.json({error:{email:{msg:'E-mail ' + data.email + ' ja cadastrado!'}}});
        return;
    };

    const encryptedPassword = bcrypt.hashSync(password,  bcrypt.genSaltSync(10));

    let name = data.name;
    let email = data.email;
    
    let newUser = await User.create({ name, email, password:encryptedPassword});
    
    res.json({success:{msg:`Usuário ${newUser.name} cadastrado com sucesso.`}});
}
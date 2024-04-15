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
        res.json({ error:{msg:'Sem cadastro!'}});
    }
};

export const createUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);
    let password: string = '';
    
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
    const payload = (Date.now() + Math.random()).toString();
        

    let name: string = data.name.toUpperCase();
    let email: string = data.email;
    let token: string = await bcrypt.hash(payload, 10);
    
    let newUser = await User.create({ name, email, password:encryptedPassword, token});
    
    res.json({success:{msg:`Usuário ${newUser.name} cadastrado com sucesso.`}});
}

export const editAllowableLevel = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);
    //console.log("Matched " + data.level);
    
    let id: number = parseInt(req.params.id);

    let user = await User.findByPk(id);
    
    if(!user){
        res.json({error:{msg:'Usuário não encontrado!'}})
        return
    } 
    if(user){
        user.allowable_level = data.level;
        await user.save();
        res.json({success:{msg:"Dados alterados com sucesso!"}});
    };
    
}

export const deleteUser = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id);

    let user = await User.findByPk(id);

    if(!user){
        res.json({error:{msg:'Usuário não encontrado!'}});
    } else {
        User.destroy({where:{id}});
        res.json({success:{msg:`Usuário ${user.name} excluido com sucesso!`}})
    }
}
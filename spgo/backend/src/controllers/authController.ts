import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

import bcrypt from "bcrypt";

import { User } from "../db/models/UsersLogin";
import { error } from "console";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
};

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){

        res.json({error: errors.mapped()});
        return;
    };

    const data = matchedData(req);
    
    const user = await User.findOne({where:{email:data.email}});
    
        if(!user){
            res.json({error:{msg:'E-mail ou senha inválido!'}});
            return;
        };

    const matches = await bcrypt.compare(req.body.password, user.password);

    if(!matches){
        res.json({error:{msg:'E-mail ou senha inválido!'}});
        return;
    };

    res.json({token:user.token});
};

export const changeLogin = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       res.json({error: errors.mapped()});
        return;
    };

    const data = matchedData(req);
    let password = '';

    if(data.password1 && data.password2){
        password = (data.password1 == data.password2)? data.password2:'';
        if(password == ''){
            res.json({error:{msg:'Erro ao cadastrar nova senha!'}});
            return;
        };
    };
    
    const user = await User.findOne({where:{email: req.body.email}});

    if(!user){
        res.json({error:{msg:"Falha ao redefinir senha."}});
        return;
    };

    if(user){
        //const matches = await bcrypt.compare(data.password, user.password);
        //const passBory = bcrypt.hashSync(data.password,  bcrypt.genSaltSync(10));
    
        /*if(!matches){
            res.json({error:{msg:'Falha ao redefinir senha.'}});
            return;
        };*/

        const encryptedPassword = bcrypt.hashSync(password,  bcrypt.genSaltSync(10));
        user.password = encryptedPassword;
        await user.save();
        res.json({success:{msg:"Senha redefinida com sucesso!"}});
    };
};

export const logout = async (req: Request, res: Response) => {
    const user = await User.findOne({where:{token:req.body.token}});

    if(!user){
        res.json({error:{msg:"Falha ao realizar logout!"}});
        return;
    }

    if(user){
        const payload = (Date.now() + Math.random()).toString();
        user.token = await bcrypt.hash(payload, 10);
        await user.save();
        res.json({success:{msg:"Logout realizado com sucesso!"}});
    };
};

export const auth = async (req: Request, res: Response) => {
    const user = await User.findOne({where:{token:req.query.token}});

    if(!user){
        res.json(null);
        return;
    } else {
        res.json({user});
        return;
    }
    
}
import {Response, Request, NextFunction, query } from "express";
import { User } from "../db/models/UsersLogin";

export async function permissionLevel4 (req:Request, res:Response, next:any ) {
    let error:any = {};
    if(!req.body.name || !req.body.cpf || !req.body.cel_phone){
        next();
        return;
    } else if(req.body.cel_phone != null){
        let regex = '^([0-9]{2} ?[0-9]{5}[\-]?[0-9]{4})$';
        let cel_phone = req.body.cel_phone.match(regex);
        if(!cel_phone){
            next();
            return
        }
    } else{
        next();
        return;
    }
    const user = await User.findOne({where:{token:req.query.token}});
    if(!user){
        error = {msg:'Login não registrado!!'}
        res.json({error});
        return;
    } 
    if(user.allowable_level < 4){
        error = {msg: `Usuário nível ${user.allowable_level} - Inclusão não autorizada!`}
        res.json({error});
        return;
    } else {
        next();
        return;
    }   
}
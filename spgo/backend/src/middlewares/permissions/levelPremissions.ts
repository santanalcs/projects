import {Response, Request } from "express";
import { User } from "../../db/models/UsersLogin";

export async function permissionLevel (req: Request, res: Response, next:any, level: number) {
    let error:any = {};
    const user = await User.findOne({where:{token:req.query.token}});
    if(!user){
        error = {msg:'Login não registrado!!'}
        res.json({error});
        return;
    }
    if(user.allowable_level < level){
        error = {msg: `Usuário nível ${user.allowable_level} - transação não autorizada!`}
        res.json({error});
        return;
    } else {
        next();
        return;
    } 
}
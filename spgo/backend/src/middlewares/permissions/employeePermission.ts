import {Response, Request } from "express";
import { User } from "../../db/models/UsersLogin";
import { permissionLevel } from "./levelPremissions";

export async function permissionLevel4 (req:Request, res:Response, next:any ) {
    let level: number = 4;
    if(!req.body.name || !req.body.cpf || !req.body.cel_phone){
        next();
        return;
    } 
    if(req.body.cpf != null){
        let regex = '^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[\-]?[0-9]{2}|[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[\-]?[0-9]{2})$';
        let cpf_cnpj = req.body.cpf.match(regex);
        if(!cpf_cnpj){
            next();
            return
        }
    }
    if(req.body.cel_phone != null){
        let regex = '^([0-9]{2} ?[0-9]{5}[\-]?[0-9]{4})$';
        let cel_phone = req.body.cel_phone.match(regex);
        if(!cel_phone){
            next();
            return
        }
    }
    permissionLevel(req, res, next, level);  
}
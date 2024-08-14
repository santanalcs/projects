import {Response, Request } from "express";
import { permissionLevel } from "./levelPremissions";

export async function permissionLevel4 (req:Request, res:Response, next:any ) {
    let level: number = 4;
    if(!req.body.name || !req.body.type_person || !req.body.cpf_cnpj){
        next();
        return;
    } 
    if(req.body.cpf_cnpj != null){
        let regex = '^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[\-]?[0-9]{2}|[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[\-]?[0-9]{2})$';
        let cpf_cnpj = req.body.cpf_cnpj.match(regex);
        if(!cpf_cnpj){
            next();
            return
        }
    }
    permissionLevel(req, res, next, level);
}

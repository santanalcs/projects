import {Response, Request } from "express";
import { permissionLevel } from "./levelPremissions";
import { isEmail } from "validator";

export async function permissionLevel4 (req:Request, res:Response, next:any ) {
    let level: number = 4;
    checker(req, res, next, level);
}

export async function permissionLevel3 (req:Request, res:Response, next:any ) {
    let level: number = 4;
    checker(req, res, next, level);
}

export async function checker (req:Request, res:Response, next:any, level:number) {
    if(!req.body.contact || !req.body.cel_phone || !req.body.email){
        next();
        return;
    }
    if(req.body.cel_phone != null){
        let regex = '^([0-9]{2} ?[0-9]{5}[\-]?[0-9]{4})$';
        let cel_phone = req.body.cel_phone.match(regex);
        if(!cel_phone){
            next();
            return
        }
    }
    if(req.body.email != null){
        let email = isEmail(req.body.email);
        if(!email){
            next();
            return
        }
    } 
    permissionLevel(req, res, next, level);
}

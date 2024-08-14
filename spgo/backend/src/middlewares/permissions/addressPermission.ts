import {Response, Request } from "express";
import { permissionLevel } from "./levelPremissions";
import { isEmail, isLength } from "validator";

export async function permissionLevel4 (req:Request, res:Response, next:any ) {
    let level: number = 4;
    checker(req, res, next, level);
}

export async function permissionLevel3 (req:Request, res:Response, next:any ) {
    let level: number = 3;
    checker(req, res, next, level);
}

export async function checker (req:Request, res:Response, next:any, level:number ) {
    if(!req.body.address || !req.body.district || !req.body.zip_code || !req.body.city || !req.body.uf){
        next();
        return;
    }
    if(req.body.zip_code != null){
        let regex = '^([0-9]{5}[\-]?[0-9]{3})$';
        let zip_code = req.body.zip_code.match(regex);
        if(!zip_code){
            next();
            return
        }
    }
    if(req.body.uf != null){
        if(req.body.uf.length > 3){
            next();
            return
        }else {
            let regex = '^([A-Za-z]{1,3})$';
            let uf = req.body.uf.match(regex);
            if(!uf){
                next();
                return
            }
        }
    }
    permissionLevel(req, res, next, level);
}

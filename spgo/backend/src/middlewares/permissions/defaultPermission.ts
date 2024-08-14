import {Response, Request } from "express";
import { permissionLevel } from "./levelPremissions";


export async function permissionLevel4Step (req:Request, res:Response, next:any ) {
    let level: number = 4;

    if(!req.body.step){
        next();
        return;
    }
    
    permissionLevel(req, res, next, level);
}

export async function permissionLevel4 (req:Request, res:Response, next:any ) {
    let level: number = 4;
    permissionLevel(req, res, next, level);
}


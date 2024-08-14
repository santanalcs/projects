import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

import { Construction } from "../db/models/Constructions";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true})
}

export const createConstruction = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    /*const construction = await Contractor.findOne({where:{cpf_cnpj:data.cpf_cnpj}});
        
    if(contractor){
        res.json({error:{msg:'CPF/CNPJ ' + data.cpf_cnpj + ' ja cadastrado!'}});
        return;
    };*/

    let pattern_type: string = data.pattern_type.toUpperCase();
    let owner: string = data.owner.toUpperCase();
    let owner_cpf: string = data.owner_cpf;
    let owner_rg: string = data.owner_rg.toUpperCase();
    let liable_engineer: string = data.liable_engineer.toUpperCase();
    let engineer_registration: string = data.engineer_registration.toUpperCase();
    let area_m2: number = data.area_m2.replace(",", ".");
    let value_m2: number = data.value_m2.replace(",", ".");
    //let newConstruction = await Construction.create({ pattern_type, owner, owner_cpf, owner_rg, liable_engineer, engineer_registration, area_m2, value_m2});
    
    res.json({success:{msg:`${(area_m2*value_m2).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})} Obra cadastrada com sucesso.`}});
}
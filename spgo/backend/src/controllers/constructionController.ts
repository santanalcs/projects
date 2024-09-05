import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

import { Construction } from "../db/models/Constructions";
import { ConstructionAddress } from "../db/models/ConstructionsAddresses";

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
    let liable_engineer: string = data.liable_engineer.toUpperCase();
    let engineer_registration: string = data.engineer_registration.toUpperCase();
    //let area_m2: number = data.area_m2.replace(",", ".");
    //let value_m2: number = data.value_m2.replace(",", ".");
    //let newConstruction = await Construction.create({ pattern_type, owner, owner_cpf, owner_rg, liable_engineer, engineer_registration, area_m2, value_m2});
    
    //res.json({success:{msg:`${(area_m2*value_m2).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})} Obra cadastrada com sucesso.`}});

    res.json({success:{msg:`Obra cadastrada com sucesso.`}});
}

export const getConstruction = async (req: Request, res: Response) => {
    //let construction = await Construction.findOne({where:{owner_cpf:req.query.owner_cpf}});
    let owner_cpf = req.query.owner_cpf
    //res.json({construction})
    res.json({construction:{id:owner_cpf}})
}

export const createAddress = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    let id_construction = parseInt(req.body.id_contractor);
    let address: string = data.address.toUpperCase();
    let district: string = data.district.toUpperCase();
    let zip_code: string = data.zip_code;
    let city: string = data.city.toUpperCase();
    let uf: string = data.uf.toUpperCase();
   // let newAddress = await ConstructionAddress.create({id_construction, address, district, zip_code, city, uf});
    
    //res.json({success:{msg:`Endereço ${newAddress.address} cadastrado com sucesso.`}});
   res.json({success:{msg:`Endereço ${address} cadastrado com sucesso.`}});
}
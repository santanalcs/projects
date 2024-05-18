import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { Feedstock, Feedstocks, assMeasuresUnit } from "../db/models/Feedstocks";

export const listFeedstocks = async (req: Request, res: Response) => {
    let feedstocks = await Feedstock.findAll({include: assMeasuresUnit, order:[['description', 'ASC']]});

    feedstocks?res.json({feedstocks}):res.json({ error:{msg:'Sem cadastro!'}});
}

export const createFeedstock = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        console.log(errors.mapped())
        return;
    }

    const data = matchedData(req);

    let description: string = data.description.toUpperCase();
    let rating: string = data.rating.toUpperCase();
    let id_measure_unit: number = data.id_measure_unit;
    
    let newFeedstock = await Feedstock.create({ description, rating, id_measure_unit});
    
    res.json({success:{msg:`Insumo ${newFeedstock.description} cadastrado com sucesso.`}});
    //res.json({success:{msg:`Insumo ${description} cadastrado com sucesso.`}});
}

export const editFeedstock = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);
    //console.log("Matched " + data.level);
    
    let id: number = parseInt(req.params.id);

    let feedstock = await Feedstock.findByPk(id);
    
    if(!feedstock){
        res.json({error:{msg:'Registro não encontrado!'}})
        return
    } 
    if(feedstock){
        feedstock.description = data.description.toUpperCase();
        feedstock.rating = data.rating.toUpperCase();
        feedstock.id_measure_unit = data.id_measure_unit;
        await feedstock.save();
        res.json({success:{msg:"Dados alterados com sucesso!"}});
    };
    
}
import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";

import { Measure } from "../db/models/MeasuresUnit";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
};

export const createMeasureUnit = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    const measure = await Measure.findOne({where:{description:data.description}});
        
    if(measure){
        res.json({error:{description:{msg:`Unidade de medida ${measure.description} ja cadastrada!`}}});
        return;
    };
    
    let symbol: string = data.symbol.toUpperCase();
    let description: string = data.description.toUpperCase();
    let id_group_criterion: number = data.id_group_criterion;
    
    let newUnit = await Measure.create({ symbol, description, id_group_criterion});
    
    res.json({success:{msg:`Unidade de medida ${newUnit.description} cadastrado com sucesso.`}});
}

export const listMeasuresUnit = async (req: Request, res: Response) => {
    let units = await Measure.findAll({order:[['id', 'ASC']]});

    if(units) {
        res.json({units});
    } else {
        res.json({ error:{msg:'Sem cadastro!'}});
    }
}

export const deleteMeasureUnit = async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id);

    let unit = await Measure.findByPk(id);

    if(!unit){
        res.json({error:{msg:'Unidade de Medida não encontrada!'}});
    } else {
        Measure.destroy({where:{id}});
        res.json({success:{msg:`Unidade de Medida ${unit.description} excluida com sucesso!`}})
    }
}
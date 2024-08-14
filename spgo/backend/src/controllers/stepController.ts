import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { Step } from "../db/models/Steps";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const getStep = async (req: Request, res: Response) => {
    let id: any = req.query.id;

    const step = await Step.findByPk(id);

    if(!step){
        res.json({error:{msg:'Etapa não encontrada!'}})
        return
    }
    if(step){
        res.json({step});
    }
}

export const listSteps = async (req: Request, res: Response) => {
    const step = await Step.findAll();

    step?res.json({step}):res.json({error:{msg:'Sem cadastro!'}})
}

export const createStep = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    let step: string = data.step.toUpperCase();
    let newStep = await Step.create({step})
    res.json({success:{msg:`Etapa ${step} cadastrado com sucesso.`}})
}

export const editStep = async (req: Request, res: Response) => {
    let id: any = req.query.id;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    const step = await Step.findByPk(id);

    if(!step){
        res.json({error:{msg:'Etapa não encontrada!'}})
        return
    }
    if(step){
        step.step = data.step.toUpperCase();
        await step.save();
        res.json({success:{msg:"Dados alterados com sucesso!"}});
    }
}

export const deleteStep = async (req: Request, res: Response) => {
    let id: any = req.query.id;

    let step = await Step.findByPk(id);

    if(!step){
        res.json({error:{msg:'Etapa não encontrada!'}});
    } else {
        Step.destroy({where:{id}});
       // res.json({success:{msg:`Etapa ${step.id} excluida com sucesso!`}})
        res.json(step.step)
    }
}
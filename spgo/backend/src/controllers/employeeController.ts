import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { Employee } from "../db/models/Employees";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
};

export const createEmployee = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    let name: string = data.name.toUpperCase();
    let cpf: string = data.cpf;
    let cel_phone: string = data.cel_phone
    let newEmployee = await Employee.create({ name, cpf, cel_phone});
    
    res.json({success:{msg:`Colaborador ${newEmployee.name} cadastrado com sucesso.`}});
    //res.json({success:{msg:`Insumo ${description} cadastrado com sucesso.`}});
}

export const listEmployees = async (req: Request, res: Response) => {
    let employees = await Employee.findAll({order:[['name', 'ASC']]});

    employees?res.json({employees}):res.json({ error:{msg:'Sem cadastro!'}});
}
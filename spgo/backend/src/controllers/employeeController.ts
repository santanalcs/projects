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

    const employee = await Employee.findOne({where:{cpf:data.cpf}});
        
    if(employee){
        res.json({error:{cpf:{msg:'CPF ' + data.cpf + ' ja cadastrado!'}}});
        return;
    };

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

export const editEmployee = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);
    //console.log("Matched " + data.level);
    
    let id: number = parseInt(req.params.id);

    /*const user = await Employee.findOne({where:{cpf:data.cpf}});
        
    if(user){
        res.json({error:{cpf:{msg:'CPF ' + data.cpf + ' ja cadastrado!'}}});
        return;
    };*/

    const employee = await Employee.findByPk(id);
    
    if(!employee){
        res.json({error:{msg:'Colaborador não encontrado!'}})
        return
    } 
    if(employee){
        //em.allowable_level = data.level;
        employee.name = data.name.toUpperCase();
        employee.cpf = data.cpf;
        employee.cel_phone = data.cel_phone;
        await employee.save();
        res.json({success:{msg:"Dados alterados com sucesso!"}});
    };
    
}
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { Contractor } from "../db/models/Contractors";
import { ContractorContact, assContractorsContacts } from "../db/models/ContractorsContacts";
import { ContractorAddress, assContractorsAddresses } from "../db/models/ContractorsAddresses";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const createContractor = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    const contractor = await Contractor.findOne({where:{cpf_cnpj:data.cpf_cnpj}});
        
    if(contractor){
        res.json({error:{msg:'CPF/CNPJ ' + data.cpf_cnpj + ' ja cadastrado!'}});
        return;
    };

    let name: string = data.name.toUpperCase();
    let type_person: string = data.type_person.toUpperCase();
    let cpf_cnpj: string = data.cpf_cnpj;
    let newContractor = await Contractor.create({ name, type_person, cpf_cnpj});
    
    res.json({success:{msg:`Empreitero ${newContractor.name} cadastrado com sucesso.`}});
}

export const listContractors = async (req: Request, res: Response) => {
    let contractores = await Contractor.findAll({
        include: [assContractorsContacts, assContractorsAddresses],
        order:[['name', 'ASC']]
    });

    contractores?res.json({contractores}):res.json({ error:{msg:'Sem cadastro!'}});
}

export const getContractor = async (req: Request, res: Response) => {
    let contractor = await Contractor.findOne({where:{cpf_cnpj:req.query.cpf_cnpj}});

    res.json({contractor})
}

export const createContact = async (req: Request, res: Response) => {
    console.log(req)
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    //const contractor = await Contractor.findOne({where:{cpf_cnpj:data.cpf_cnpj}});
        
    /*if(contractor){
        res.json({error:{cpf:{msg:'CPF/CNPJ ' + data.cpf_cnpj + ' ja cadastrado!'}}});
        return;
    };*/
    let id_contractor = parseInt(req.body.id_contractor);
    let contact: string = data.contact.toUpperCase();
    let cel_phone: string = data.cel_phone;
    let email: string = data.email;
    let newContact = await ContractorContact.create({ id_contractor, contact, cel_phone, email});
    
    res.json({success:{msg:`Contato ${newContact.contact} cadastrado com sucesso.`}});
   //res.json({success:{msg:`Contato ${contact} cadastrado com sucesso.`}});
}

export const createAddress = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);

    //const contractor = await Contractor.findOne({where:{cpf_cnpj:data.cpf_cnpj}});
        
    /*if(contractor){
        res.json({error:{cpf:{msg:'CPF/CNPJ ' + data.cpf_cnpj + ' ja cadastrado!'}}});
        return;
    };*/

    let id_contractor = parseInt(req.body.id_contractor);
    let address: string = data.address.toUpperCase();
    let district: string = data.district.toUpperCase();
    let zip_code: string = data.zip_code;
    let city: string = data.city.toUpperCase();
    let uf: string = data.uf.toUpperCase();
    let newAddress = await ContractorAddress.create({id_contractor, address, district, zip_code, city, uf});
    
    res.json({success:{msg:`Endereço ${newAddress.address} cadastrado com sucesso.`}});
   //res.json({success:{msg:`Endereço ${address} cadastrado com sucesso.`}});
}

export const editContractor = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);
    
    let id: any = req.query.id;

    let contractor = await Contractor.findByPk(id);
    
    if(!contractor){
        res.json({error:{msg:'Empreiteiro não encontrado!'}})
        return
    } 
    if(contractor){
        contractor.name = data.name.toUpperCase();
        contractor.cpf_cnpj = data.cpf_cnpj;
        await contractor.save();
        res.json({success:{msg:"Dados alterados com sucesso!"}});
    }    
}

export const editContact = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);
    
    let id: any = req.query.id;

    let contact = await ContractorContact.findByPk(id);
    
    if(!contact){
        res.json({error:{msg:'Contato não encontrado!'}})
        return
    } 
    if(contact){
        contact.cel_phone = data.cel_phone;
        contact.email = data.email;
        await contact.save();
        res.json({success:{msg:"Dados alterados com sucesso!"}});
    }    
}

export const editAddress = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.mapped()});
        return;
    }

    const data = matchedData(req);
    
    let id: any = req.query.id;

    let address = await ContractorAddress.findByPk(id);
    
    if(!address){
        res.json({error:{msg:'Endereço não encontrado!'}})
        return
    } 
    if(address){
        address.address = data.address.toUpperCase();
        address.district = data.district.toUpperCase();
        address.zip_code = data.zip_code;
        address.city = data.city.toUpperCase();
        address.uf = data.uf.toUpperCase();
        await address.save();
        res.json({success:{msg:"Dados alterados com sucesso!"}});
    }    
}

export const deleteContractor = async (req: Request, res: Response) => {
    let id: any = req.query.id;

    let contractor = await Contractor.findByPk(id);

    if(!contractor){
        res.json({error:{msg:'Empreiteiro não encontrado!'}});
    } else {
        Contractor.destroy({where:{id}});
        res.json({success:{msg:`Empreiteiro ${contractor.name} excluido com sucesso!`}})
        //res.json(contact)
    }
}

export const deleteContact = async (req: Request, res: Response) => {
    let id: any = req.query.id;

    let contact = await ContractorContact.findByPk(id);

    if(!contact){
        res.json({error:{msg:'Contato não encontrado!'}});
    } else {
        ContractorContact.destroy({where:{id}});
        res.json({success:{msg:`Contato ${contact.contact} excluido com sucesso!`}})
        //res.json(contact)
    }
}

export const deleteAddress = async (req: Request, res: Response) => {
    let id: any = req.query.id;

    let address = await ContractorAddress.findByPk(id);

    if(!address){
        res.json({error:{msg:'Endereço não encontrado!'}});
    } else {
        ContractorAddress.destroy({where:{id}});
        res.json({success:{msg:`Endereço ${address.address} excluido com sucesso!`}})
        //res.json(contact)
    }
}
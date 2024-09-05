"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddress = exports.getConstruction = exports.createConstruction = exports.ping = void 0;
const express_validator_1 = require("express-validator");
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
const createConstruction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    /*const construction = await Contractor.findOne({where:{cpf_cnpj:data.cpf_cnpj}});
        
    if(contractor){
        res.json({error:{msg:'CPF/CNPJ ' + data.cpf_cnpj + ' ja cadastrado!'}});
        return;
    };*/
    let pattern_type = data.pattern_type.toUpperCase();
    let owner = data.owner.toUpperCase();
    let owner_cpf = data.owner_cpf;
    let liable_engineer = data.liable_engineer.toUpperCase();
    let engineer_registration = data.engineer_registration.toUpperCase();
    //let area_m2: number = data.area_m2.replace(",", ".");
    //let value_m2: number = data.value_m2.replace(",", ".");
    //let newConstruction = await Construction.create({ pattern_type, owner, owner_cpf, owner_rg, liable_engineer, engineer_registration, area_m2, value_m2});
    //res.json({success:{msg:`${(area_m2*value_m2).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})} Obra cadastrada com sucesso.`}});
    res.json({ success: { msg: `Obra cadastrada com sucesso.` } });
});
exports.createConstruction = createConstruction;
const getConstruction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //let construction = await Construction.findOne({where:{owner_cpf:req.query.owner_cpf}});
    let owner_cpf = req.query.owner_cpf;
    //res.json({construction})
    res.json({ construction: { id: owner_cpf } });
});
exports.getConstruction = getConstruction;
const createAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    let id_construction = parseInt(req.body.id_contractor);
    let address = data.address.toUpperCase();
    let district = data.district.toUpperCase();
    let zip_code = data.zip_code;
    let city = data.city.toUpperCase();
    let uf = data.uf.toUpperCase();
    // let newAddress = await ConstructionAddress.create({id_construction, address, district, zip_code, city, uf});
    //res.json({success:{msg:`Endereço ${newAddress.address} cadastrado com sucesso.`}});
    res.json({ success: { msg: `Endereço ${address} cadastrado com sucesso.` } });
});
exports.createAddress = createAddress;

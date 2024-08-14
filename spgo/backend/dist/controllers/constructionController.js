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
exports.createConstruction = exports.ping = void 0;
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
    let owner_rg = data.owner_rg.toUpperCase();
    let liable_engineer = data.liable_engineer.toUpperCase();
    let engineer_registration = data.engineer_registration.toUpperCase();
    let area_m2 = data.area_m2.replace(",", ".");
    let value_m2 = data.value_m2.replace(",", ".");
    //let newConstruction = await Construction.create({ pattern_type, owner, owner_cpf, owner_rg, liable_engineer, engineer_registration, area_m2, value_m2});
    res.json({ success: { msg: `${(area_m2 * value_m2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} Obra cadastrada com sucesso.` } });
});
exports.createConstruction = createConstruction;

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
exports.deleteAddress = exports.deleteContact = exports.deleteContractor = exports.editAddress = exports.editContact = exports.editContractor = exports.createAddress = exports.createContact = exports.getContractor = exports.listContractors = exports.createContractor = exports.ping = void 0;
const express_validator_1 = require("express-validator");
const Contractors_1 = require("../db/models/Contractors");
const ContractorsContacts_1 = require("../db/models/ContractorsContacts");
const ContractorsAddresses_1 = require("../db/models/ContractorsAddresses");
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
const createContractor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    const contractor = yield Contractors_1.Contractor.findOne({ where: { cpf_cnpj: data.cpf_cnpj } });
    if (contractor) {
        res.json({ error: { msg: 'CPF/CNPJ ' + data.cpf_cnpj + ' ja cadastrado!' } });
        return;
    }
    ;
    let name = data.name.toUpperCase();
    let type_person = data.type_person.toUpperCase();
    let cpf_cnpj = data.cpf_cnpj;
    let newContractor = yield Contractors_1.Contractor.create({ name, type_person, cpf_cnpj });
    res.json({ success: { msg: `Empreitero ${newContractor.name} cadastrado com sucesso.` } });
    //res.json({success:{msg:`Empreitero ${name} cadastrado com sucesso.`}});
});
exports.createContractor = createContractor;
const listContractors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let contractores = yield Contractors_1.Contractor.findAll({
        include: [ContractorsContacts_1.assContractorsContacts, ContractorsAddresses_1.assContractorsAddresses],
        order: [['name', 'ASC']]
    });
    contractores ? res.json({ contractores }) : res.json({ error: { msg: 'Sem cadastro!' } });
});
exports.listContractors = listContractors;
const getContractor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let contractor = yield Contractors_1.Contractor.findOne({ where: { cpf_cnpj: req.query.cpf_cnpj } });
    //let cpf_cnpj = req.query.cpf_cnpj
    res.json({ contractor });
    // res.json({contractor: {cpf_cnpj}})
});
exports.getContractor = getContractor;
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    //const contractor = await Contractor.findOne({where:{cpf_cnpj:data.cpf_cnpj}});
    /*if(contractor){
        res.json({error:{cpf:{msg:'CPF/CNPJ ' + data.cpf_cnpj + ' ja cadastrado!'}}});
        return;
    };*/
    let id_contractor = parseInt(req.body.id_contractor);
    let contact = data.contact.toUpperCase();
    let cel_phone = data.cel_phone;
    let email = data.email;
    let newContact = yield ContractorsContacts_1.ContractorContact.create({ id_contractor, contact, cel_phone, email });
    res.json({ success: { msg: `Contato ${newContact.contact} cadastrado com sucesso.` } });
    //res.json({success:{msg:`Contato ${contact} cadastrado com sucesso.`}});
});
exports.createContact = createContact;
const createAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    //const contractor = await Contractor.findOne({where:{cpf_cnpj:data.cpf_cnpj}});
    /*if(contractor){
        res.json({error:{cpf:{msg:'CPF/CNPJ ' + data.cpf_cnpj + ' ja cadastrado!'}}});
        return;
    };*/
    let id_contractor = parseInt(req.body.id_contractor);
    let address = data.address.toUpperCase();
    let district = data.district.toUpperCase();
    let zip_code = data.zip_code;
    let city = data.city.toUpperCase();
    let uf = data.uf.toUpperCase();
    let newAddress = yield ContractorsAddresses_1.ContractorAddress.create({ id_contractor, address, district, zip_code, city, uf });
    res.json({ success: { msg: `Endereço ${newAddress.address} cadastrado com sucesso.` } });
    //res.json({success:{msg:`Endereço ${address} cadastrado com sucesso.`}});
});
exports.createAddress = createAddress;
const editContractor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    let id = req.query.id;
    let contractor = yield Contractors_1.Contractor.findByPk(id);
    if (!contractor) {
        res.json({ error: { msg: 'Empreiteiro não encontrado!' } });
        return;
    }
    if (contractor) {
        contractor.name = data.name.toUpperCase();
        contractor.cpf_cnpj = data.cpf_cnpj;
        yield contractor.save();
        res.json({ success: { msg: "Dados alterados com sucesso!" } });
    }
});
exports.editContractor = editContractor;
const editContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    let id = req.query.id;
    let contact = yield ContractorsContacts_1.ContractorContact.findByPk(id);
    if (!contact) {
        res.json({ error: { msg: 'Contato não encontrado!' } });
        return;
    }
    if (contact) {
        contact.cel_phone = data.cel_phone;
        contact.email = data.email;
        yield contact.save();
        res.json({ success: { msg: "Dados alterados com sucesso!" } });
    }
});
exports.editContact = editContact;
const editAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    let id = req.query.id;
    let address = yield ContractorsAddresses_1.ContractorAddress.findByPk(id);
    if (!address) {
        res.json({ error: { msg: 'Endereço não encontrado!' } });
        return;
    }
    if (address) {
        address.address = data.address.toUpperCase();
        address.district = data.district.toUpperCase();
        address.zip_code = data.zip_code;
        address.city = data.city.toUpperCase();
        address.uf = data.uf.toUpperCase();
        yield address.save();
        res.json({ success: { msg: "Dados alterados com sucesso!" } });
    }
});
exports.editAddress = editAddress;
const deleteContractor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.query.id;
    let contractor = yield Contractors_1.Contractor.findByPk(id);
    if (!contractor) {
        res.json({ error: { msg: 'Empreiteiro não encontrado!' } });
    }
    else {
        Contractors_1.Contractor.destroy({ where: { id } });
        res.json({ success: { msg: `Empreiteiro ${contractor.name} excluido com sucesso!` } });
        //res.json(contact)
    }
});
exports.deleteContractor = deleteContractor;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.query.id;
    let contact = yield ContractorsContacts_1.ContractorContact.findByPk(id);
    if (!contact) {
        res.json({ error: { msg: 'Contato não encontrado!' } });
    }
    else {
        ContractorsContacts_1.ContractorContact.destroy({ where: { id } });
        res.json({ success: { msg: `Contato ${contact.contact} excluido com sucesso!` } });
        //res.json(contact)
    }
});
exports.deleteContact = deleteContact;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.query.id;
    let address = yield ContractorsAddresses_1.ContractorAddress.findByPk(id);
    if (!address) {
        res.json({ error: { msg: 'Endereço não encontrado!' } });
    }
    else {
        ContractorsAddresses_1.ContractorAddress.destroy({ where: { id } });
        res.json({ success: { msg: `Endereço ${address.address} excluido com sucesso!` } });
        //res.json(contact)
    }
});
exports.deleteAddress = deleteAddress;

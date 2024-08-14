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
exports.editEmployee = exports.listEmployees = exports.createEmployee = exports.ping = void 0;
const express_validator_1 = require("express-validator");
const Employees_1 = require("../db/models/Employees");
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    const employee = yield Employees_1.Employee.findOne({ where: { cpf: data.cpf } });
    if (employee) {
        res.json({ error: { cpf: { msg: 'CPF ' + data.cpf + ' ja cadastrado!' } } });
        return;
    }
    ;
    let name = data.name.toUpperCase();
    let cpf = data.cpf;
    let cel_phone = data.cel_phone;
    let newEmployee = yield Employees_1.Employee.create({ name, cpf, cel_phone });
    res.json({ success: { msg: `Colaborador ${newEmployee.name} cadastrado com sucesso.` } });
    //res.json({success:{msg:`Insumo ${description} cadastrado com sucesso.`}});
});
exports.createEmployee = createEmployee;
const listEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let employees = yield Employees_1.Employee.findAll({ order: [['name', 'ASC']] });
    employees ? res.json({ employees }) : res.json({ error: { msg: 'Sem cadastro!' } });
});
exports.listEmployees = listEmployees;
const editEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    //console.log("Matched " + data.level);
    let id = parseInt(req.params.id);
    /*const user = await Employee.findOne({where:{cpf:data.cpf}});
        
    if(user){
        res.json({error:{cpf:{msg:'CPF ' + data.cpf + ' ja cadastrado!'}}});
        return;
    };*/
    const employee = yield Employees_1.Employee.findByPk(id);
    if (!employee) {
        res.json({ error: { msg: 'Colaborador não encontrado!' } });
        return;
    }
    if (employee) {
        //em.allowable_level = data.level;
        employee.name = data.name.toUpperCase();
        employee.cpf = data.cpf;
        employee.cel_phone = data.cel_phone;
        yield employee.save();
        res.json({ success: { msg: "Dados alterados com sucesso!" } });
    }
    ;
});
exports.editEmployee = editEmployee;

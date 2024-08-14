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
exports.deleteStep = exports.editStep = exports.createStep = exports.listSteps = exports.getStep = exports.ping = void 0;
const express_validator_1 = require("express-validator");
const Steps_1 = require("../db/models/Steps");
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
const getStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.query.id;
    const step = yield Steps_1.Step.findByPk(id);
    if (!step) {
        res.json({ error: { msg: 'Etapa não encontrada!' } });
        return;
    }
    if (step) {
        res.json({ step });
    }
});
exports.getStep = getStep;
const listSteps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const step = yield Steps_1.Step.findAll();
    step ? res.json({ step }) : res.json({ error: { msg: 'Sem cadastro!' } });
});
exports.listSteps = listSteps;
const createStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    let step = data.step.toUpperCase();
    let newStep = yield Steps_1.Step.create({ step });
    res.json({ success: { msg: `Etapa ${step} cadastrado com sucesso.` } });
});
exports.createStep = createStep;
const editStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.query.id;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    const step = yield Steps_1.Step.findByPk(id);
    if (!step) {
        res.json({ error: { msg: 'Etapa não encontrada!' } });
        return;
    }
    if (step) {
        step.step = data.step.toUpperCase();
        yield step.save();
        res.json({ success: { msg: "Dados alterados com sucesso!" } });
    }
});
exports.editStep = editStep;
const deleteStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.query.id;
    let step = yield Steps_1.Step.findByPk(id);
    if (!step) {
        res.json({ error: { msg: 'Etapa não encontrada!' } });
    }
    else {
        Steps_1.Step.destroy({ where: { id } });
        // res.json({success:{msg:`Etapa ${step.id} excluida com sucesso!`}})
        res.json(step.step);
    }
});
exports.deleteStep = deleteStep;

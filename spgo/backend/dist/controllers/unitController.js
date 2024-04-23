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
exports.deleteMeasureUnit = exports.listMeasuresUnit = exports.createMeasureUnit = exports.ping = void 0;
const express_validator_1 = require("express-validator");
const MeasuresUnit_1 = require("../db/models/MeasuresUnit");
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
const createMeasureUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    const measure = yield MeasuresUnit_1.Measure.findOne({ where: { description: data.description } });
    if (measure) {
        res.json({ error: { description: { msg: `Unidade de medida ${measure.description} ja cadastrada!` } } });
        return;
    }
    ;
    let symbol = data.symbol.toUpperCase();
    let description = data.description.toUpperCase();
    let id_group_criterion = data.id_group_criterion;
    let newUnit = yield MeasuresUnit_1.Measure.create({ symbol, description, id_group_criterion });
    res.json({ success: { msg: `Unidade de medida ${newUnit.description} cadastrado com sucesso.` } });
});
exports.createMeasureUnit = createMeasureUnit;
const listMeasuresUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let units = yield MeasuresUnit_1.Measure.findAll({ order: [['id', 'ASC']] });
    if (units) {
        res.json({ units });
    }
    else {
        res.json({ error: { msg: 'Sem cadastro!' } });
    }
});
exports.listMeasuresUnit = listMeasuresUnit;
const deleteMeasureUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(req.params.id);
    let unit = yield MeasuresUnit_1.Measure.findByPk(id);
    if (!unit) {
        res.json({ error: { msg: 'Unidade de Medida não encontrada!' } });
    }
    else {
        MeasuresUnit_1.Measure.destroy({ where: { id } });
        res.json({ success: { msg: `Unidade de Medida ${unit.description} excluida com sucesso!` } });
    }
});
exports.deleteMeasureUnit = deleteMeasureUnit;

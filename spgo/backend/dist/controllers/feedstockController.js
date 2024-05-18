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
exports.editFeedstock = exports.createFeedstock = exports.listFeedstocks = void 0;
const express_validator_1 = require("express-validator");
const Feedstocks_1 = require("../db/models/Feedstocks");
const listFeedstocks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let feedstocks = yield Feedstocks_1.Feedstock.findAll({ include: Feedstocks_1.assMeasuresUnit, order: [['description', 'ASC']] });
    feedstocks ? res.json({ feedstocks }) : res.json({ error: { msg: 'Sem cadastro!' } });
});
exports.listFeedstocks = listFeedstocks;
const createFeedstock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        console.log(errors.mapped());
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    let description = data.description.toUpperCase();
    let rating = data.rating.toUpperCase();
    let id_measure_unit = data.id_measure_unit;
    let newFeedstock = yield Feedstocks_1.Feedstock.create({ description, rating, id_measure_unit });
    res.json({ success: { msg: `Insumo ${newFeedstock.description} cadastrado com sucesso.` } });
    //res.json({success:{msg:`Insumo ${description} cadastrado com sucesso.`}});
});
exports.createFeedstock = createFeedstock;
const editFeedstock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.json({ error: errors.mapped() });
        return;
    }
    const data = (0, express_validator_1.matchedData)(req);
    //console.log("Matched " + data.level);
    let id = parseInt(req.params.id);
    let feedstock = yield Feedstocks_1.Feedstock.findByPk(id);
    if (!feedstock) {
        res.json({ error: { msg: 'Registro não encontrado!' } });
        return;
    }
    if (feedstock) {
        feedstock.description = data.description.toUpperCase();
        feedstock.rating = data.rating.toUpperCase();
        feedstock.id_measure_unit = data.id_measure_unit;
        yield feedstock.save();
        res.json({ success: { msg: "Dados alterados com sucesso!" } });
    }
    ;
});
exports.editFeedstock = editFeedstock;

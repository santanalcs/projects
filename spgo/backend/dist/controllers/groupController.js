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
exports.listGroupsCriterion = void 0;
const GroupsCriterions_1 = require("../db/models/GroupsCriterions");
const listGroupsCriterion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let groups = yield GroupsCriterions_1.Group.findAll({ order: [['id', 'ASC']] });
    if (groups) {
        res.json({ groups });
    }
    else {
        res.json({ error: { msg: 'Sem cadastro!' } });
    }
});
exports.listGroupsCriterion = listGroupsCriterion;

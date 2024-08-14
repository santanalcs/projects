"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stepValidaditon_1 = require("../middlewares/validators/stepValidaditon");
const stepController = __importStar(require("../controllers/stepController"));
const defaultPermission = __importStar(require("../middlewares/permissions/defaultPermission"));
const router = (0, express_1.Router)();
router.get('/ping/step', stepController.ping);
router.get('/etapas', stepController.listSteps);
router.post('/etapa', defaultPermission.permissionLevel4, stepValidaditon_1.createValidator, stepController.createStep);
router.patch('/etapa?', defaultPermission.permissionLevel4Step, stepValidaditon_1.createValidator, stepController.editStep);
router.delete('/etapa?', defaultPermission.permissionLevel4, stepController.deleteStep);
exports.default = router;

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
const contractorValidatior_1 = require("../middlewares/validators/contractorValidatior");
const contractorPermission = __importStar(require("../middlewares/permissions/contractorPermission"));
const contactPermission = __importStar(require("../middlewares/permissions/contactPermission"));
const addressPermission = __importStar(require("../middlewares/permissions//addressPermission"));
const defaultPermission = __importStar(require("../middlewares/permissions/defaultPermission"));
const contractorController = __importStar(require("../controllers/contractorController"));
const router = (0, express_1.Router)();
router.get('/ping/contractor', contractorController.ping);
router.get('/contratador?', contractorController.getContractor);
router.get('/contratadores', contractorController.listContractors);
router.post('/contratador?', contractorPermission.permissionLevel4, contractorValidatior_1.createValidator, contractorController.createContractor);
router.post('/contratador/contato?', contactPermission.permissionLevel4, contractorValidatior_1.createContatctValidator, contractorController.createContact);
router.post('/contratador/endereco?', addressPermission.permissionLevel4, contractorValidatior_1.createAddressValidator, contractorController.createAddress);
router.patch('/contratador?', contractorPermission.permissionLevel4, contractorValidatior_1.createValidator, contractorController.editContractor);
router.patch('/contratador/contato?', contactPermission.permissionLevel3, contractorValidatior_1.createContatctValidator, contractorController.editContact);
router.patch('/contratador/endereco?', addressPermission.permissionLevel3, contractorValidatior_1.createAddressValidator, contractorController.editAddress);
router.delete('/contratador?', defaultPermission.permissionLevel4, contractorController.deleteContractor);
router.delete('/contratador/contato?', defaultPermission.permissionLevel4, contractorController.deleteContact);
router.delete('/contratador/endereco?', defaultPermission.permissionLevel4, contractorController.deleteAddress);
exports.default = router;

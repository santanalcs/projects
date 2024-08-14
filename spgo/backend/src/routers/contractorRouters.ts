import { Router } from "express";
import { createValidator, createContatctValidator, createAddressValidator } from '../middlewares/validators/contractorValidatior'

import * as contractorPermission from '../middlewares/permissions/contractorPermission';
import * as contactPermission from '../middlewares/permissions/contactPermission';
import * as addressPermission from '../middlewares/permissions//addressPermission';
import * as defaultPermission from '../middlewares/permissions/defaultPermission';

import * as contractorController from '../controllers/contractorController';

const router = Router();

router.get('/ping/contractor', contractorController.ping);
router.get('/contratador?', contractorController.getContractor);
router.get('/contratadores', contractorController.listContractors);
router.post('/contratador?', contractorPermission.permissionLevel4, createValidator, contractorController.createContractor);
router.post('/contratador/contato?', contactPermission.permissionLevel4, createContatctValidator, contractorController.createContact);
router.post('/contratador/endereco?', addressPermission.permissionLevel4, createAddressValidator, contractorController.createAddress);
router.patch('/contratador?', contractorPermission.permissionLevel4, createValidator, contractorController.editContractor);
router.patch('/contratador/contato?', contactPermission.permissionLevel3, createContatctValidator, contractorController.editContact);
router.patch('/contratador/endereco?', addressPermission.permissionLevel3, createAddressValidator, contractorController.editAddress);
router.delete('/contratador?', defaultPermission.permissionLevel4, contractorController.deleteContractor);
router.delete('/contratador/contato?', defaultPermission.permissionLevel4, contractorController.deleteContact);
router.delete('/contratador/endereco?', defaultPermission.permissionLevel4, contractorController.deleteAddress);

export default router;
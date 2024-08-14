import { Router } from "express";

import { createValidator } from "../middlewares/validators/stepValidaditon";
import * as stepController from '../controllers/stepController';
import * as defaultPermission from '../middlewares/permissions/defaultPermission';

const router = Router();

router.get('/ping/step', stepController.ping);
router.get('/etapas', stepController.listSteps)
router.post('/etapa', defaultPermission.permissionLevel4, createValidator, stepController.createStep);
router.patch('/etapa?', defaultPermission.permissionLevel4Step, createValidator, stepController.editStep);
router.delete('/etapa?', defaultPermission.permissionLevel4, stepController.deleteStep)

export default router
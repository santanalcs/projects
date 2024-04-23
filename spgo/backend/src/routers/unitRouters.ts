import { Router } from "express";

import * as unitController from "../controllers/unitController";
import  * as groupController from "../controllers/groupController"
import { createValidator } from "../middlewares/validators/unitValidator";

const router = Router();

router.get('/ping/unit', unitController.ping);
router.get('/unidade/criterios', groupController.listGroupsCriterion);
router.get('/unidades/medidas', unitController.listMeasuresUnit);
router.post('/unidade/medida', createValidator, unitController.createMeasureUnit);
router.delete('/unidade/medida', unitController.deleteMeasureUnit);

export default router;
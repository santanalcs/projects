import { Router } from "express";

import { createValidator } from "../middlewares/validators/feedstockValidator";
import * as feedstockController from "../controllers/feedstockController";


const router = Router();
router.get('/insumos', feedstockController.listFeedstocks);
router.post('/insumo', createValidator, feedstockController.createFeedstock);
router.patch('/insumo/:id', createValidator, feedstockController.editFeedstock)

export default router;
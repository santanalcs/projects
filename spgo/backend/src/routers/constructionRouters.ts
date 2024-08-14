import { Router } from "express";

import { createValidator } from "../middlewares/validators/constructionValidator";
import * as constructionController from "../controllers/constructionController"

const router = Router();

router.get('/ping/constructor', constructionController.ping);
router.post('/obra', createValidator, constructionController.createConstruction);

export default router;
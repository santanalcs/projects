import { Router } from "express";

import { createValidator, createAddressValidator } from "../middlewares/validators/constructionValidator";
import * as constructionController from "../controllers/constructionController"

const router = Router();

router.get('/ping/constructor', constructionController.ping);
router.get('/obra?', constructionController.getConstruction);
router.post('/obra', createValidator, constructionController.createConstruction);
router.post('/obra/endereco?', createAddressValidator, constructionController.createAddress);

export default router;
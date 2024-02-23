import { Router } from "express";

import { createValidator } from "../middlewares/validators/userValidator";
import * as userController from "../controllers/userController";

const router = Router();

router.get('/ping', userController.ping);
router.get('/usuarios', userController.listUsers);
router.post('/usuario', createValidator, userController.createUser);

export default router;


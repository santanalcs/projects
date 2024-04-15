import { Router } from "express";

import { createValidator, allowableLevelValidator } from "../middlewares/validators/userValidator";
import * as userController from "../controllers/userController";

const router = Router();

router.get('/ping/:id', userController.ping);
router.get('/usuarios', userController.listUsers);
router.post('/usuario', createValidator, userController.createUser);
router.patch('/usuario/:id', allowableLevelValidator, userController.editAllowableLevel);
router.delete('/usuario/:id', userController.deleteUser);

export default router;


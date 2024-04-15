import { Router } from "express";

import { changeLoginValidator, loginValidator } from "../middlewares/validators/authValidator";
import * as authController from "../controllers/authController";

const router = Router();

router.get('/ping', authController.ping);
router.get('/auth/?', authController.auth);
router.post('/login', loginValidator, authController.login);
router.patch('/login', changeLoginValidator, authController.changeLogin);
router.patch('/logout', loginValidator, authController.logout);

export default router;
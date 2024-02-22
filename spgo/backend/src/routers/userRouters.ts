import { Router } from "express";
import * as userController from "../controllers/userController"

const router = Router();

router.get('/ping', userController.ping);
router.get('/usuarios', userController.listUsers);

export default router;


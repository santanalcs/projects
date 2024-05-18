import { Router } from "express";

import * as employeeController from '../controllers/employeeController';
import * as permissionLevel from '..//middlewares/permisionLevel';
import { createValidator } from '../middlewares/validators/employeeValidator'



const router = Router();

router.get('/ping/emloyee', employeeController.ping);
router.get('/colaboradores', employeeController.listEmployees);
router.post('/colaborador/?', permissionLevel.permissionLevel4, createValidator, employeeController.createEmployee);

export default router;
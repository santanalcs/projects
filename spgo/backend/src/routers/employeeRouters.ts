import { Router } from "express";

import * as employeeController from '../controllers/employeeController';
import * as employeePermission from '../middlewares/permissions/employeePermission';
import { createValidator } from '../middlewares/validators/employeeValidator'



const router = Router();

router.get('/ping/emloyee', employeeController.ping);
router.get('/colaboradores', employeeController.listEmployees);
router.post('/colaborador/?', employeePermission.permissionLevel4, createValidator, employeeController.createEmployee);
router.patch('/colaborador/?', employeePermission.permissionLevel4, createValidator, employeeController.editEmployee);

export default router;
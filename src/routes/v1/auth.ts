import { Router } from 'express';
import { changePassword, login, register } from '../../controller/auth';

// TODO import and install jwt
// TODO import checkRole
// TODO import validator

const router = Router();

// input routes
router.post('/changePassword', changePassword); // add middleware

router.post('/login', login); // add middleware

router.post('/', register); // add middleware

export default router;
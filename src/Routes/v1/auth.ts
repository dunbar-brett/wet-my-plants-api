import { Router } from 'express';
import { changePassword, login, register } from '../../controller/auth/';

// TODO import and install jwt
// TODO import checkRole
// TODO import validator

const router = Router();

// input routes
router.post('/changePassword', changePassword); // replace null with middleware

router.post('/login', login); // replace null with middleware

router.post('/register', register); // replace null with middleware

export default router;
import { Router } from 'express';
import { body, param } from 'express-validator';
import { all, one, save, remove } from '../controller/users';

// import and install jwt
// import checkRole
// import and create user validators

const router = Router();

// TODO: add checkrole('ADMIN') for all routes
// input routes (route, middleware, action)
router.get('/', [], all);

router.get('/:id([0-9]+)', [], one);

// change this to register action and move to auth
router.post(
    '/', 
    [
        body('name').isString(),
        body('email').isString(),
        body('email').isEmail(),
        body('password').isString()
    ],
    save);

router.delete('/:id([0-9]+)', [], remove);

export default router;
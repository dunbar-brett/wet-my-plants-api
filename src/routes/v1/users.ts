import { Router } from 'express';
import { body, param } from 'express-validator';
import { list, one, remove, update } from '../../controller/users/';

// import and install jwt
// import checkRole
// import and create user validators

const router = Router();

// TODO: add checkrole('ADMIN') for all routes
// input routes (route, middleware, action)
router.get('/', [], list);

router.get('/:id([0-9]+)', [], one);

// change this to register action and move to auth
router.patch(
    '/', 
    [
        body('name').isString(),
        body('email').isString(),
        body('email').isEmail(),
        body('role').isString() // todo add validation for role type
    ],
    update);

router.delete('/:id([0-9]+)', [], remove);

export default router;
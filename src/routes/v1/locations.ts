import { Router } from 'express';
import { body } from 'express-validator';

import { list, listById, one, register, update } from '../../controller/locations/';

const router = Router();

// needs admin guard
router.get('/', list);

router.get('/all/:id([0-9]+)', listById);

router.get('/:id([0-9]+)', one);

router.post('/:id([0-9]+)', [body('name').isString()], register);

router.patch('/:id([0-9]+)',
    [], 
    update
);

export default router;
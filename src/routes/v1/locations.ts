import { Router } from 'express';
import { body } from 'express-validator';

import { list, register } from '../../controller/locations/';

const router = Router();

// needs admin guard
router.get('/', list);

router.post('/:id([0-9]+)', [body('name').isString()], register);

export default router;
import { Router } from 'express';
import { body, param } from 'express-validator';
// just need to update this
// import { list, register, update, remove } from '../../controller/plants';
import { list, listById, register, update, remove } from '../../controller/plants/';

// import and install jwt
// import checkRole
// import/create plant validators

const router = Router();

// TODO needs admin guard
router.get('/', [], list);

router.get('/all:id([0-9]+)', listById);

router.get('/:id([0-9]+');

router.post('/', [], register);

router.patch('/:id([0-9]+)', // should this be put?
    [], 
    update);

router.delete('/:id([0-9]+)', [], remove);

export default router;
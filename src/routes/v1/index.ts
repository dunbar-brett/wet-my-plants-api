import { Router } from 'express';

import auth from './auth';
import users from './users';
import plants from './plants';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/plants', plants);

export default router;
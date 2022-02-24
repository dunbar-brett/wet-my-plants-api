import { Router } from 'express';

import auth from './auth';
import locations from './locations';
import plants from './plants';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/locations', locations);
router.use('/users', users);
router.use('/plants', plants);

export default router;
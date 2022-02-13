import { Router } from 'express';

import auth from './auth';
import users from './users';
import plants from './plants';

const router = Router();
const apiPrefix = 'api/v1';

router.use(`${apiPrefix}/users`, users);
router.use(`${apiPrefix}/plants`, plants);

export default router;
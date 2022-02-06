import { Router } from 'express';

export * from './auth';
export * from './users';
export * from './plants';

const router = Router();

export default router;
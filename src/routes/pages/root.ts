import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).header('Content-Type', 'text/html').send(`<h4>REST API for Wet My Plants</h4>`);
});

export default router;
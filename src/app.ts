import { Request, Response, NextFunction, Errback } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import { Routes } from './Routes/routes';
import { validationResult } from 'express-validator';

// TODO: give error a type
function handleError(err, _req: Request, res: Response, _next: NextFunction) {
    res.status(err.statusCode || 500).send(err.message)
}
  
const app = express();
app.use(bodyParser.json());

Routes.forEach(route => {
    (app as any)[route.method](route.route,
        ...route.middleware,
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                const result = await (new (route.controller as any))[route.action](req, res, next);
                res.json(result);
            } catch(err) {
                next(err);
            }
        }
    );
});

app.use(handleError);

export default app;
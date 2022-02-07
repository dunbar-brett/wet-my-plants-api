import { Request, Response, NextFunction } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import  { dbConnection } from './db/dbConnection';
import routes from './Routes';

// TODO: give error a type
function handleError(err: any, _req: Request, res: Response, _next: NextFunction) {
    res.status(err.statusCode || 500).send(err.message)
}

export const app = express();
app.use(bodyParser.json());

app.use('/', routes);

app.use(handleError);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


// Connect to DB
(async () => {
    await dbConnection();
})();
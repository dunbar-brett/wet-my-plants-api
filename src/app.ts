import { Request, Response, NextFunction } from 'express';
import express from 'express';
import bodyParser from 'body-parser';

// import  { dbConnection } from './db/dbConnection';
import routes from './Routes';
import './utils/customSuccess';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(bodyParser.json());

app.use("/", routes);

app.use(errorHandler);

// TODO Try to add this back in later
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Listening on port ${port}!!`);
// });

export default app;

// Connect to DB
// (async () => {
//     await dbConnection();
// })();
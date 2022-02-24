import express from 'express';
import bodyParser from 'body-parser';

import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import './utils/customSuccess';

const app = express();
app.use(bodyParser.json());

app.use('/', routes);

app.use(errorHandler);

export default app;

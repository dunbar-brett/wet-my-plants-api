import express from 'express';
import bodyParser from 'body-parser';

import routes from './Routes/v1';
import './utils/customSuccess';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(bodyParser.json());

app.use('/', routes);

app.use(errorHandler);

export default app;

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { config } from './config';
import app from './app';
const port = config.port;

createConnection().then(async connection => {
    app.listen(port, () => {
        return console.log(
            `\nExpress is listening at http://localhost:${port}\n`
        );
    });
}).catch(error => console.log(error));
import express, { application } from 'express';
import 'reflect-metadata';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hey buddy! Nodemon installed!!');
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${3000}`);
});
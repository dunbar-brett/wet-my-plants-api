import 'reflect-metadata';
// import {Request, Response} from "express"; // do i need these?
import express from 'express';
import bodyParser from 'body-parser';

// TODO: refactor create connection into index.ts
const app = express();
app.use(bodyParser.json);

app.get('/', (req, res) => {
    res.send('Hey buddy! Nodemon installed!!');
});



export default app;
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import chadRouter from './routes/chad.routes.js';
import userRouter from './routes/user.routes.js';

dotenv.config();
const PORT = process.env.PORT;
const DATA_LIMIT = process.env.DATA_LIMIT;
const DB_URI = process.env.DB_URI;

const app = express();

const bodyParserSettings = { limit: DATA_LIMIT, extended: true };
app.use(bodyParser.json(bodyParserSettings));
app.use(bodyParser.urlencoded(bodyParserSettings));
app.use(express.json());

app.use(cors());

app.use(helmet());

app.use('/chads', chadRouter);
app.use('/users', userRouter);


mongoose.connect(DB_URI, () => {
    app.listen(PORT, () => {
        console.log(`GIGACHAD SERVER RUNNING ON PORT::${PORT}`);
    });
});
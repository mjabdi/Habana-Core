import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRouter from './routes/api-router';
import mongodb from './utils/mongodb'
import {startJob as startIncomingTransactions} from "./jobs/update-in-transactions"
import {startJob as startIncomingTokens} from "./jobs/update-in-tokens"
import {startJob as processIncomingTransactions} from "./jobs/process-in-transactions"
import {startJob as processIncomingTokens} from "./jobs/process-in-tokens"

import cors from "cors";
import { initalizeContract } from './utils/HabanaContract';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

const allowedOrigins = ['http://localhost:3000', '*'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter)

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
mongodb().then(() => { console.info('Connected to MongoDB...') }).catch((err) => {console.error(err); process.exit(1)});

initalizeContract();

/// start Jobs here ....
startIncomingTransactions();

setTimeout(() => {
  processIncomingTransactions();  
}, 1000);

setTimeout(() => {
  startIncomingTokens();  
}, 2000);

setTimeout(() => {
  processIncomingTokens();  
}, 3000);



//-------------------------

import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRouter from './routes/api-router';
import mongodb from './utils/mongodb'
// import {startJob as startIncomingTransactions} from "./jobs/update-in-transactions"
// import {startJob as startIncomingTokens} from "./jobs/update-in-tokens"
// import {startJob as processIncomingTransactions} from "./jobs/process-in-transactions"
// import {startJob as processIncomingTokens} from "./jobs/process-in-tokens"

import {startJob as startSendAirDropEmails} from "./jobs/send-airdrop-emails"

import path from 'path'

import cors from "cors";
// import { initalizeContract } from './utils/HabanaContract';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

const allowedOrigins = ['*', 'https://www.habanatoken.com'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

// Then pass these options to cors:



app.use(cors(options));

// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter)

app.use(
  "/",
  express.static(path.join(__dirname, "..", "public_habana"))
);
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "public_habana", "index.html"));
});


app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
mongodb().then(() => { console.info('Connected to MongoDB...') }).catch((err) => {console.error(err); process.exit(1)});


startSendAirDropEmails();

// initalizeContract();

// /// start Jobs here ....
// startIncomingTransactions();

// setTimeout(() => {
//   processIncomingTransactions();  
// }, 1000);

// setTimeout(() => {
//   startIncomingTokens();  
// }, 2000);

// setTimeout(() => {
//   processIncomingTokens();  
// }, 3000);



//-------------------------

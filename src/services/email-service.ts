import express, { Express, Request, Response } from 'express';
import IncomingEmail from '../models/IncomingEmail'
const router = express.Router();

router.post('/sendemail', async (req: Request, res: Response) => {
    try{
        const {name, email, phone, subject, message} = req.body;
        const incomingEmail = new IncomingEmail(
            {
                timeStamp: new Date(),                
                name,
                email,
                phone,
                subject,
                message
            }
        )

        await incomingEmail.save();

        res.status(200).send({status: "OK"});
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send({status: "FAILED", error: err})
    }
})




export default router;

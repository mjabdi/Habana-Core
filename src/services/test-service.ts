import express, { Express, Request, Response } from 'express';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try{
        res.status(200).send({status: "OK"});
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send({status: "FAILED", error: err})
    }
})




export default router;

import express, { Express, Request, Response } from 'express';
import { totalSupply, name , symbol, mintHabanaToAddress } from '../utils/HabanaContract';
import { getHabanRouterBNBBalance, 
         get_BNB_USD,
         getHabanaTreasuryBNBValue,
         getHabanaAssetsBNB,
         getHabanaAssetsUSD,
         getHabanaPriceBNB,
         getHabanaPriceUSD, 
        } from '../utils/PriceOracle';

const router = express.Router();

router.get('/totalsupply', async (req: Request, res: Response) => {
    try{
        const result = await totalSupply();
        res.status(200).send({status: "OK", result: result});
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send({status: "FAILED", error: err})
    }
})

router.get('/name', async (req: Request, res: Response) => {
    try{
        const result = await name();
        res.status(200).send({status: "OK", result: result});
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send({status: "FAILED", error: err})
    }
})

router.get('/symbol', async (req: Request, res: Response) => {
    try{
        const result = await symbol();
        res.status(200).send({status: "OK", result: result});
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send({status: "FAILED", error: err})
    }
})


router.get('/routerbalance', async (req: Request, res: Response) => {
    try{
        const result = await getHabanRouterBNBBalance();
        res.status(200).send({status: "OK", result: result});
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send({status: "FAILED", error: err})
    }
})

router.get('/treasurybnbvalue', async (req: Request, res: Response) => {
    try{
        const result = await getHabanaTreasuryBNBValue();
        res.status(200).send({status: "OK", result: result});
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send({status: "FAILED", error: err})
    }
})

router.get('/habanaassetsbnb', async (req: Request, res: Response) => {
    try{
        const result = await getHabanaAssetsBNB();
        res.status(200).send({status: "OK", result: result});
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send({status: "FAILED", error: err})
    }
})


router.get('/habanaassetsusd', async (req: Request, res: Response) => {
    try{
        const result = await getHabanaAssetsUSD();
        res.status(200).send({status: "OK", result: result});
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send({status: "FAILED", error: err})
    }
})


router.get('/habanabnb', async (req: Request, res: Response) => {
    try{
        const result = await getHabanaPriceBNB();
        res.status(200).send({status: "OK", result: result});
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send({status: "FAILED", error: err})
    }
})

router.get('/habanausd', async (req: Request, res: Response) => {
    try{
        const result = await getHabanaPriceUSD();
        res.status(200).send({status: "OK", result: result});
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send({status: "FAILED", error: err})
    }
})

// router.post('/mintinitialtokens', async (req: Request, res: Response) => {
//     try{
//         await mintHabanaToAddress("0x46eA9eCc0ad4fCCec8c8182b39d7A53A7CB6a48d", 5000);
//         res.status(200).send({status: "OK"});
//     }
//     catch(err)
//     {
//         console.error(err)
//         res.status(500).send({status: "FAILED", error: err})
//     }
// })





export default router;

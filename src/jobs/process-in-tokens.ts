import IncomingTransaction from "../models/IncomingTransaction"
import { burnTokens, transferBNBtoAddress } from "../utils/HabanaContract";
import { getHabanRouterBNBBalance, 
    get_BNB_USD,
    getHabanaTreasuryBNBValue,
    getHabanaAssetsBNB,
    getHabanaAssetsUSD,
    getHabanaPriceBNB,
    getHabanaPriceUSD, 
   } from '../utils/PriceOracle';

export async function startJob(){
    const INTERVAL = parseInt(process.env.UpdateRatesIntervalSeconds || "10") * 1000; // each 10 seconds
    setInterval(async () => {
        await processTokens()
    }, INTERVAL)
} 


async function processTokens(){
    try{
        // console.log("processing incoming HBA tokens ...")
        const tx = await IncomingTransaction.findOne({token: "HBA", status: "new"}).sort({timeStamp:1})
        if (tx){

            tx.status = "pending"
            await tx.save()

            const BNBValue = await calculateHBAtoBNB(tx.value)
            const txHash = await sendBNBtoAddress(tx.fromAddress, BNBValue)

            tx.status = "processing"
            await tx.save()

            setTimeout(async () => {
                await burnHBATokens(tx.value)
                tx.status = "done"
                await tx.save()
            }, 10000);
           
            
            tx.transferTxHash = txHash
            tx.BNBTransfered = BNBValue
            await tx.save()
        }
    
    }catch(err)
    {
        console.error(err)
    }
}

async function calculateHBAtoBNB(value : number) {
    const hba_bnb = await getHabanaPriceBNB()
    return value * hba_bnb;
}

async function sendBNBtoAddress(address: string, value : number) {
    const txHash =  await transferBNBtoAddress(address, value)
    console.log(`${value} BNB sent to ${address} : txHash: ${txHash}`)
    return txHash
}

async function burnHBATokens(value : number) {
    const txHash = await burnTokens(value);
    console.log(`${value} HBA Tokens burned. txHash : ${txHash}`)
}
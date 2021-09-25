import { getTokenSymbol } from "../utils/registered-tokens";
import {callRestAPI_GET, callRestAPI_POST} from "../utils/rest-api-call"
import IncomingTransaction from "../models/IncomingTransaction"


export async function startJob(){
    const INTERVAL = parseInt(process.env.UpdateRatesIntervalSeconds || "10") * 1000; // each 10 seconds
    setInterval(async () => {
        await updateTransactions()
    }, INTERVAL)
} 


async function updateTransactions(){
    try{
        // console.log("updating incoming transactions ...")
        const url = `api?module=account&action=txlist&page=1&offset=${process.env.offset}&sort=desc&address=${process.env.HABANA_ROUTER_ADDRESS}&apikey=${process.env.BSC_API_KEY}`
        const res = await callRestAPI_GET(url)
        const data = res?.data;
        if (data && data.result && data.result.length > 0)
        {
            const result = data.result.filter((e : any) => e.to.toLowerCase() === process.env.HABANA_ROUTER_ADDRESS?.toLowerCase() && e.value !== "0" && e.isError === "0");

            if (result && result.length > 0)
            {
                for (var i = 0; i < result.length ; i++)
                {
                        const tx = {
                            timeStamp: new Date(parseInt(result[i].timeStamp) * 1000),
                            txHash: result[i].hash,
                            token: "BNB",
                            value: result[i].value / Math.pow(10, 18),
                            fromAddress: result[i].from,
                            status: "new"
                        }

                        const oldRecord = await IncomingTransaction.findOne({txHash: tx.txHash});
                        if (!oldRecord)
                        {
                            const newTransaction = new IncomingTransaction(
                                {
                                    ...tx
                                }
                            )
                            await newTransaction.save()
                            console.log("New BNB Recieced: ")
                            console.log(newTransaction)
                        }                    
                }
            }
        }


        // console.log("incoming transactions updated.")
    }catch(err)
    {
        console.error(err)
    }
}
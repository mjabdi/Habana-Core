// import { getTokenSymbol } from "../utils/registered-tokens";
// import {callRestAPI_GET, callRestAPI_POST} from "../utils/rest-api-call"
// import IncomingTransaction from "../models/IncomingTransaction"


// export async function startJob(){
//     const INTERVAL = parseInt(process.env.UpdateRatesIntervalSeconds || "10") * 1000; // each 10 seconds
//     setInterval(async () => {
//         await updateTokens()
//     }, INTERVAL)
// } 


// async function updateTokens(){
//     try{
//         // console.log("updating incoming tokens ...")
//         const url = `api?module=account&action=tokentx&page=1&offset=${process.env.offset}&sort=desc&address=${process.env.HABANA_ROUTER_ADDRESS}&apikey=${process.env.BSC_API_KEY}`
//         const res = await callRestAPI_GET(url)
//         const data = res?.data;
//         if (data && data.result && data.result.length > 0)
//         {
//             const result = data.result.filter((e : any) => e.to.toLowerCase() === process.env.HABANA_ROUTER_ADDRESS?.toLowerCase());

//             if (result && result.length > 0)
//             {
//                 for (var i = 0; i < result.length ; i++)
//                 {
//                     if (getTokenSymbol(result[i].contractAddress))
//                     {
//                         const tx = {
//                             timeStamp: new Date(parseInt(result[i].timeStamp) * 1000),
//                             txHash: result[i].hash,
//                             token: getTokenSymbol(result[i].contractAddress),
//                             value: result[i].value / Math.pow(10, parseInt(result[i].tokenDecimal)),
//                             fromAddress: result[i].from,
//                             status: "new"
//                         }

//                         const oldRecord = await IncomingTransaction.findOne({txHash: tx.txHash});
//                         if (!oldRecord)
//                         {
//                             const newTransaction = new IncomingTransaction(
//                                 {
//                                     ...tx
//                                 }
//                             )
//                             await newTransaction.save()
//                             console.log("New HBA Recieced: ")
//                             console.log(newTransaction)
//                         }
//                     }
//                 }

//             }
//         }


//         // console.log("incoming tokens updated.")
//     }catch(err)
//     {
//         console.error(err)
//     }
// }
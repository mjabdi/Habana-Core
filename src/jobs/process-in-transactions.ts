// import IncomingTransaction from "../models/IncomingTransaction"
// import { mintHabanaToAddress } from "../utils/HabanaContract";
// import { getHabanRouterBNBBalance, 
//     get_BNB_USD,
//     getHabanaTreasuryBNBValue,
//     getHabanaAssetsBNB,
//     getHabanaAssetsUSD,
//     getHabanaPriceBNB,
//     getHabanaPriceUSD, 
//    } from '../utils/PriceOracle';



// export async function startJob(){
//     const INTERVAL = parseInt(process.env.UpdateRatesIntervalSeconds || "10") * 1000; // each 10 seconds
//     setInterval(async () => {
//         await processTransactions()
//     }, INTERVAL)
// } 


// async function processTransactions(){
//     try{
//         // console.log("processing incoming transactions ...")
//         const tx = await IncomingTransaction.findOne({token: "BNB", status: "new"}).sort({timeStamp:1})
//         if (tx){
//             tx.status = "processing"
//             await tx.save()
//             const HBAValue = await calculateBNBtoHBA(tx.value)
//             const mintTxHash = await mintHBAtoAddress(tx.fromAddress, HBAValue);
//             tx.status = "done"
//             tx.mintTxHash = mintTxHash
//             tx.HBAMinted = HBAValue
//             await tx.save()
//         }
    
//     }catch(err)
//     {
//         console.error(err)
//     }
// }

// async function calculateBNBtoHBA(value : number) {
//     const hba_bnb = await getHabanaPriceBNB()

//     return value / hba_bnb;
// }

// async function mintHBAtoAddress(address: string, value : number) {
//     const txhash = await mintHabanaToAddress(address, value) 
//     console.log(`${value} HBA Token minted to ${address} : txhash : ${txhash}`)
//     return txhash;
// }
import {callRestAPI_GET, callRestAPI_POST} from "../utils/rest-api-call"
import { totalSupply } from "./HabanaContract";
import IncomingTransaction from "../models/IncomingTransaction"



export async function get_BNB_USD ()
{
    const url = `api?module=stats&action=bnbprice&apikey=${process.env.BSC_API_KEY}`
    const res = await callRestAPI_GET(url)
    if (res && res.data && res.data.result && res.data.status === "1")
    {
        return res.data.result.ethusd;
    }
} 

export async function get_HBA_USD ()
{
    const url = `api?module=stats&action=bnbprice&apikey=${process.env.BSC_API_KEY}`
    const res = await callRestAPI_GET(url)
    if (res && res.data && res.data.result && res.data.status === "1")
    {
        return res.data.result.ethusd;
    }
} 

export async function get_HBA_BNB ()
{
    const url = `api?module=stats&action=bnbprice&apikey=${process.env.BSC_API_KEY}`
    const res = await callRestAPI_GET(url)
    if (res && res.data && res.data.result && res.data.status === "1")
    {
        return res.data.result.ethusd;
    }
} 

export async function getHabanRouterBNBBalance() : Promise<number> {
    const url = `https://api.bscscan.com/api?module=account&action=balance&address=${process.env.HABANA_ROUTER_ADDRESS}&apikey=${process.env.BSC_API_KEY}`
    const res = await callRestAPI_GET(url)
    if (res && res.data && res.data.result && res.data.status === "1")
    {
        return res.data.result / Math.pow(10,18);
    }else{
        return 0;
    }
}

export async function getHabanaTreasuryBNBValue() {
    const url = `https://api.bscscan.com/api?module=account&action=balance&address=${process.env.HABANA_TREASURY_ADDRESS}&apikey=${process.env.BSC_API_KEY}`
    const res = await callRestAPI_GET(url)
    let bnbValue = 0
    if (res && res.data && res.data.result && res.data.status === "1")
    {
        bnbValue += res.data.result / Math.pow(10,18);
    }

    // TODO: bnbValue should be added by the BNB value of the other BEP-20 Assetes

    return bnbValue;
}

export async function getHabanaAssetsBNB() {
    const routerBNBBalance = await getHabanRouterBNBBalance();
    const treasuryBNBValue = await getHabanaTreasuryBNBValue();

    const pendingTxs = await IncomingTransaction.find({token:"BNB", status: "processing"})
    let pendingBNB = 0
    if (pendingTxs)
    {
        for (var i = 0; i < pendingTxs.length ; i++)
        {
            pendingBNB += pendingTxs[i].value;
        }
    }

    return routerBNBBalance + treasuryBNBValue - pendingBNB;
}

export async function getHabanaAssetsUSD() {
    const assetsBNB = await getHabanaAssetsBNB();
    const bnbPrice = await get_BNB_USD();
    return assetsBNB * bnbPrice;
}

export async function getHabanaPriceBNB() {
    const _totalSupply = await totalSupply();
    const assetsBNB = await getHabanaAssetsBNB();

    if (_totalSupply > 0)
    {
        return assetsBNB / _totalSupply;
    }else
    {
        const bnbprice = await get_BNB_USD()
        return 1 / bnbprice;
    }

}

export async function getHabanaPriceUSD() {
    const bnbprice = await get_BNB_USD()
    const habanaBNB = await getHabanaPriceBNB();
    return habanaBNB * bnbprice;
}


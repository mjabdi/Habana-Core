import { ethers } from 'ethers';

import { PancakeswapPair, BNB,  TradeContext, PancakeswapPairSettings } from 'simple-pancakeswap-sdk';

const BSCTradeExample = async () => {

    const MYACCOUNT1_BSC_PRIVATE_KEY = "66c655e74e70e6700248b922b28e929230af55eccd99d00342c866b9fd3d812f"

    const pancakeswapPair = new PancakeswapPair({
        // the contract address of the token you want to convert FROM
        fromTokenContractAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        // the contract address of the token you want to convert TO // BUSD
        toTokenContractAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        // the ethereum address of the user using this part of the dApp
        ethereumAddress: '0x0b1Ad3725Bb807A53b086C44F412b75521AE3C5B',

        settings: new PancakeswapPairSettings({
            // if not supplied it will use `0.005` which is 0.5%
            // please pass it in as a full number decimal so 0.7%
            // would be 0.007
            slippage: 0.005,
            // if not supplied it will use 20 a deadline minutes
            deadlineMinutes: 20,
            // if not supplied it will try to use multihops
            // if this is true it will require swaps to direct
            // pairs
            disableMultihops: true,
          }),
    });

    // now to create the factory you just do
    const pancakeswapPairFactory = await pancakeswapPair.createFactory();

    // the amount is the proper entered amount
    // so if they enter 10 pass in 10 and
    // it will work it all out for you
    const trade = await pancakeswapPairFactory.trade('0.05');

    // subscribe to quote changes
    trade.quoteChanged$.subscribe((value: TradeContext) => {
        // value will hold the same info as below but obviously with
        // the new trade info.
    });

    console.log(trade);

    if (!trade.fromBalance.hasEnough) {
        throw new Error('You do not have enough from balance to execute this swap');
    }

    const provider = new ethers.providers.JsonRpcProvider(
        "https://bsc-dataseed.binance.org/"
    );

    const wallet = new ethers.Wallet(MYACCOUNT1_BSC_PRIVATE_KEY, provider);

    if (trade.approvalTransaction) {
        const approved = await wallet.sendTransaction(trade.approvalTransaction);
        console.log('approved txHash', approved.hash);
        const approvedReceipt = await approved.wait();
        console.log('approved receipt', approvedReceipt);
    }

    const tradeTransaction = await wallet.sendTransaction(trade.transaction);
    console.log('trade txHash', tradeTransaction.hash);
    const tradeReceipt = await tradeTransaction.wait();
    console.log('trade receipt', tradeReceipt);




    trade.destroy();
};

BSCTradeExample();

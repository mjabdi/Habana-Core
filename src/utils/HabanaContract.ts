// import Web3 from "web3"
// import { AbiItem} from 'web3-utils'
// import {Transaction} from 'ethereumjs-tx';
// import Common from 'ethereumjs-common';
// import IncomingTransaction from "../models/IncomingTransaction"

// const web3 = new Web3("https://bsc-dataseed1.defibit.io/")

// const contractAbi =  [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

// let contract = new web3.eth.Contract(contractAbi as AbiItem[], '');

// let pendingTransaction = false;

// let pendingTransactionRouter = false;

// const gasPrice = 15;


// export function initalizeContract() {
//     const contractAddress = `${process.env.HABANA_CONTRACT_ADDRESS}`
//     contract = new web3.eth.Contract(contractAbi as AbiItem[], contractAddress)
// }

// export async function name() {
//     const name = await contract.methods.name().call()
//     return name;    
//  }

//  export async function symbol() {
//     const symbol = await contract.methods.symbol().call()
//     return symbol;    
//  }

// export async function totalSupply() : Promise<number> {
//    const _totalSupply = await contract.methods.totalSupply().call()
//    const totalSupply =  _totalSupply / Math.pow(10,18);    
//    const pendingTxs = await IncomingTransaction.find({token:"HBA", status: "processing"})
//    let pendingHBA = 0
//    if (pendingTxs)
//    {
//        for (var i = 0; i < pendingTxs.length ; i++)
//        {
//            pendingHBA += pendingTxs[i].value;
//        }
//    }

//    return totalSupply - pendingHBA;

// }


// export async function mintHabanaToAddress(address: string, value: number) {

//     while (pendingTransaction)
//     {
//         await sleep(1000)
//     }

//     pendingTransaction = true;

//     const myAddress = `${process.env.OWNER_ADDRESS}`
//     const privateKey = Buffer.from(`${process.env.OWNER_PRIVATE_KEY}`, 'hex')
//     const contractAddress = `${process.env.HABANA_CONTRACT_ADDRESS}`

//     const nonce = await web3.eth.getTransactionCount(myAddress)
//     // const amount = web3.utils.toHex((value * Math.pow(10,18)).toFixed(0));
//     const tokens = web3.utils.toWei(value.toString(), 'ether')
//     const amount = web3.utils.toBN(tokens)
//     var rawTransaction = {"from":myAddress, "gasPrice":web3.utils.toHex(gasPrice * 1e9),"gasLimit":web3.utils.toHex(210000),"to":contractAddress,"value":"0x0","data":contract.methods.mint(address, amount).encodeABI(),"nonce":web3.utils.toHex(nonce)}
//     // console.log(rawTransaction);

//     var BSC_FORK = Common.forCustomChain(
//         'mainnet',
//         {
//             name: 'Binance Smart Chain Mainnet',
//             networkId: 56,
//             chainId: 56,
//         },
//         'istanbul',
//     );
    

//     var transaction = new Transaction(rawTransaction,  { 'common': BSC_FORK });
    
//     //signing transaction with private key
//     transaction.sign(privateKey);
    
//     //sending transacton via web3js module
//     const receipt = await web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'));

//     pendingTransaction = false;

//     return receipt.transactionHash;
    
// }

// export async function burnTokens(value: number) {

//     while (pendingTransactionRouter)
//     {
//         await sleep(1000)
//     }

//     pendingTransactionRouter = true;

//     const myAddress = `${process.env.HABANA_ROUTER_ADDRESS}`
//     const privateKey = Buffer.from(`${process.env.HABANA_ROUTER_PRIVATE_KEY}`, 'hex')
//     const contractAddress = `${process.env.HABANA_CONTRACT_ADDRESS}`

//     // const nonce =  '0x' + (await web3.eth.getTransactionCount(myAddress) + 1).toString(16)
//     const nonce = await web3.eth.getTransactionCount(myAddress) 


//     const tokens = web3.utils.toWei(value.toString(), 'ether')
//     const amount = web3.utils.toBN(tokens)


//     var rawTransaction = {"from":myAddress, "gasPrice":web3.utils.toHex(gasPrice * 1e9),"gasLimit":web3.utils.toHex(210000),"to":contractAddress,"value":"0x0","data":contract.methods.burn(amount).encodeABI(),"nonce":web3.utils.toHex(nonce)}
//     // console.log(rawTransaction);

//     var BSC_FORK = Common.forCustomChain(
//         'mainnet',
//         {
//             name: 'Binance Smart Chain Mainnet',
//             networkId: 56,
//             chainId: 56,
//         },
//         'istanbul',
//     );
    

//     var transaction = new Transaction(rawTransaction,  { 'common': BSC_FORK });
    
//     //signing transaction with private key
//     transaction.sign(privateKey);
    
//     //sending transacton via web3js module

//     const receipt = await web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex')).on('error', console.error);

//     pendingTransactionRouter = false;

//     return receipt.transactionHash;
    
// }


// export async function transferBNBtoAddress(address: string, value: number) {

//     while (pendingTransactionRouter)
//     {
//         await sleep(1000)
//     }

//     pendingTransactionRouter = true;

//     const myAddress = `${process.env.HABANA_ROUTER_ADDRESS}`
//     const privateKey = Buffer.from(`${process.env.HABANA_ROUTER_PRIVATE_KEY}`, 'hex')

//     // const nonce =  '0x' + (await web3.eth.getTransactionCount(myAddress) + 1).toString(16)
//     const nonce = await web3.eth.getTransactionCount(myAddress)


//     const tokens = web3.utils.toWei(value.toString(), 'ether')
//     const amount = web3.utils.toBN(tokens)


//     var rawTransaction = {"from":myAddress, "gasPrice":web3.utils.toHex(gasPrice * 1e9),"gasLimit":web3.utils.toHex(210000),"to":address,"value":amount,"nonce":web3.utils.toHex(nonce)}
//     // console.log(rawTransaction);

//     var BSC_FORK = Common.forCustomChain(
//         'mainnet',
//         {
//             name: 'Binance Smart Chain Mainnet',
//             networkId: 56,
//             chainId: 56,
//         },
//         'istanbul',
//     );
    

//     var transaction = new Transaction(rawTransaction,  { 'common': BSC_FORK });
    
//     //signing transaction with private key
//     transaction.sign(privateKey);
    
//     //sending transacton via web3js module
//     const receipt = await web3.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'));

//     pendingTransactionRouter = false;

//     return receipt.transactionHash;
    
// }


// function sleep(ms : number) {
//     return new Promise((resolve) => {
//       setTimeout(resolve, ms);
//     });
//   }




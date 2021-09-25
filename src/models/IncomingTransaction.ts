import { Schema, model} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
 interface IncomingTransaction{
  timeStamp: Date; 
  txHash: string;
  token: string;
  value: number;
  fromAddress: string;
  status: string;
  mintTxHash: string;
  HBAMinted: number;
  transferTxHash: string;
  BNBTransfered: number;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IncomingTransaction>({
  timeStamp: { type: Date, required: true },
  txHash: { type: String, required: true },
  token: { type: String, required: true },
  value: { type: Number, required: true },
  fromAddress: {type: String, required: true},
  status: {type: String, required: true},
  mintTxHash: {type: String, required: false},
  HBAMinted : {type: Number, required: false},
  transferTxHash: {type: String, required: false},
  BNBTransfered : {type: Number, required: false}


});

// 3. Create a Model.
const IncomingTransactionModel = model<IncomingTransaction>('IncomingTransaction', schema);

export default IncomingTransactionModel;
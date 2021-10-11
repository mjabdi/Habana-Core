import { Schema, model} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
 interface AirDropList{
  timeStamp: Date; 
  name: string;
  email: string;
  address: string;
  status: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<AirDropList>({
  timeStamp: { type: Date, required: true },
  name: { type: String, required: false },
  email: { type: String, required: false },
  address: { type: String, required: false },
  status: { type: String, default: "new" },

});

// 3. Create a Model.
const AirDropListModel = model<AirDropList>('AirDropList', schema);

export default AirDropListModel;
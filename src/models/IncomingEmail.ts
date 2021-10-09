import { Schema, model} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
 interface IncomingEmail{
  timeStamp: Date; 
  name: string;
  email: string;
  phone: number;
  subject: string;
  message: string;
  read: boolean;
  sent: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IncomingEmail>({
  timeStamp: { type: Date, required: true },
  name: { type: String, required: false },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  subject: { type: String, required: false },
  message: { type: String, required: false },
  read: {type: Boolean, default: false},
  sent: {type: Boolean, default: false}
});

// 3. Create a Model.
const IncomingEmailModel = model<IncomingEmail>('IncomingEmail', schema);

export default IncomingEmailModel;
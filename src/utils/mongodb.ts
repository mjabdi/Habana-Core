import {connect,connection} from 'mongoose';

export default function()
{
    return new Promise( (resolve, reject) =>
    {
        connect(process.env.MongodbUrl || '', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => {
        })
        .catch(err => {
            reject(`could not connect to mongodb : ${err}`);
        });

        connection.on('error', (err) =>  {
            throw new Error(`An Error Ocuured in MongoDB: ${err}`);
          });

          connection.once('open', () =>  {
            resolve(true);
          });
    } ); 
}
import airdropList from "../models/AirDropList"
import {sendMail} from "../utils/mail-sender"
import fs from "fs"
import path from 'path'


let html = ""

export async function startJob(){
    const INTERVAL = 10 * 1000;
    setInterval(async () => {
        html = fs.readFileSync(path.join(__dirname,"..","..","src","templates","airdrop-email.html")).toString();
        await sendEmails()
    }, INTERVAL)
} 

async function sendEmails(){
    try{
        const person = await airdropList.findOne({status: "new"}).sort({timeStamp:1});
        if (!person)
        {
            return
        }

        person.status = "emailSending";
        await person.save();

        const {email, name, address} = person;

        const customHtml = html.replace("MOHAMMAD", name.toUpperCase()).replace("0xe4E1400eE12337ba28e0Fc25f98Af8f96DC68425", address)


       const result = await sendMail("m.jafarabdi@gmail.com","Your Airdrop Request Accepted",customHtml);

        if (result && result.response.startsWith("250"))
        {
            person.status = "emailSent"   
            await person.save();         
            console.log(`airdrop email sent to ${email}`);
        }


    }catch(err)
    {
        console.log(err)
    }
}
import nodemailer from 'nodemailer';

export const sendMail = async (to : string, subject: string, content: string) =>
{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MailAccount,
          pass: process.env.MailPassword// naturally, replace both with your real credentials or an application-specific password
        }
      });
      
      const mailOptions = {
        from: `HABANA TEAM ${process.env.MailAccount}`,
        to: to,
        subject: subject,
        html : content,    
      };
      
      const result =  await transporter.sendMail(mailOptions);

      return result;

}



import jwt from 'jsonwebtoken'
const nodemailer = require("nodemailer");

export async function checkCookie(token,role){
    try{
        if (token && token!=null || token !=undefined || token.length>1 ) {
            const verify =  jwt.verify(token,process.env.JWT_SECRET)
            if (verify.role==role) {
                return {
                    verified:true,
                    data:verify
                }
            }else{
                return {
                    verified:false,
                    data:''
                }
            }
        }else if (!token) {
            return {
                verified:false,
                data:''
            }
        }
    }
    catch(err){
        return {
            verified:false,
            data:err.message
        }
    }
}

export function splitToken(header){
    if (header==null || header==undefined || header=='' || !header.includes('authtoken')) {
        return false
    }
    return header.split("authtoken=")[1]
}
export function checkDate(start,end){
    return new Date(start) > new Date(end)
}

export async function sendMailTo(email,mailmessage){
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass,
    },
  });

  let message = {
    from: '"Fred Foo 👻" <foo@example.com>',
    to: email,  
    subject: "Hello ✔",
    text: mailmessage.toString(),
    html: `<b>This is ${mailmessage.toString()}</b>`,
  };
     transporter.sendMail(message).then((info)=>{
        console.log(nodemailer.getTestMessageUrl(info));
     })
}

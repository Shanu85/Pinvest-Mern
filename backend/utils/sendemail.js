// send email to a particular address we will specify
const nodemailer=require('nodemailer')

const sendEmail=async(subject,message,send_to,send_from,reply_to)=>{
    // transporter which carries email from one point to another
    const transporter=nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:587,
        auth:
        {
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        },
        tls:
        {
            rejectUnauthorized:false // to avoid email not sending issue
        }
    });

    //options for sending email 
    const options={
        from:send_from,
        to:send_to,
        replyTo:reply_to,
        subject:subject,
        html:message   
    };

    // check if email is send successfully
    transporter.sendMail(options,function(err,info){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(info)
        }
    });
};

module.exports=sendEmail;
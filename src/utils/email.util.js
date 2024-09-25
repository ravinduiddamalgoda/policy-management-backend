if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const smtp = require("../configs/email.config");

const send = async (receivers, subject, html, text) => {
    try {
        const info = await smtp.sendMail({
          from: `"CodeZentra" <${process.env.SMTP_USER}>`,
          to: receivers.join(', '),
          subject: subject, 
          text: text, 
          html: html,
        });

        return info;
    }catch(error){
        console.log(error);
    }
}

module.exports = {send};
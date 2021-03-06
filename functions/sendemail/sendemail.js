const nodemailer = require('nodemailer');


exports.handler = async function(event, context, callback) {

    const data = JSON.parse(event.body)

 
    let transporter = await nodemailer.createTransport({
        host: 'smtp.zoho.in',
        port: 465,
        secure: true,
        auth: {
            user:  process.env.REACT_APP_MAIL_USERNAME,
            pass:  process.env.REACT_APP_MAIL_PASSWORD
        }
    });
    
    const message = `${data.message} \n  Event Link: ${data.event_url}  \n \n Event date:  ${data.event_date}`

    transporter.sendMail({
        from: "pratik15@zohomail.in",
        to: data.inviteList,
        subject: data.subject,
        text: message 
    }, function(error, info) {
    	if (error) {
            console.log(error, info)
    		callback(error, info);
    	} else {
    		callback(null, {
			    statusCode: 200,
			    body: JSON.stringify({
                    'result': 'success'
                 })
	    	});
    	}
    });
}
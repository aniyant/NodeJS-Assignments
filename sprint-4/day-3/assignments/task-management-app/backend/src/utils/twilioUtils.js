const twilio = require('twilio');
const config = require('../config/config');

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

exports.makeCall = (to, message) => {
    return client.calls.create({
        url: 'http://twimlets.com/message?Message[0]=' + encodeURIComponent(message),
        to,
        from: config.twilio.fromPhone
    });
};

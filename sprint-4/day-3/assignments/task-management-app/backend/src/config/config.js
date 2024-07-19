module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        fromPhone: process.env.TWILIO_PHONE_NUMBER
    }
};

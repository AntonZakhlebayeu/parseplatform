const twilio = require('twilio');

const config = require('../configs/config');


async function sendVerificationCode(phoneNumber, verificationCode) {
  const accountSid = config.getVariable('accountTwilioSsid');
  const authToken = config.getVariable('twilioAuthToken');
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: `Your verification code is: ${verificationCode}`,
      from: config.getVariable('twilioPhoneNumber'),
      to: phoneNumber,
    });

    console.log('Verification code sent:', message.sid);
  } catch (error) {
    console.error('Error sending verification code:', error);
    throw error;
  }
}

module.exports = sendVerificationCode;

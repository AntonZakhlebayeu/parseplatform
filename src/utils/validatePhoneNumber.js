const { PhoneNumberUtil, PhoneNumberFormat } = require("google-libphonenumber");
const phoneUtil = PhoneNumberUtil.getInstance();

function validatePhoneNumber(phoneNumber) {
  let formattedPhoneNumber;
  try {
    const phoneNumberObj = phoneUtil.parseAndKeepRawInput(phoneNumber);
    const country = phoneUtil.getRegionCodeForNumber(phoneNumberObj);
    if (!phoneUtil.isValidNumber(phoneNumberObj)) {
      throw new Error("Invalid phone number");
    }
    formattedPhoneNumber = phoneUtil.format(
      phoneNumberObj,
      PhoneNumberFormat.E164
    );
  } catch (error) {
    const validationError = new Error("Invalid phone number");
    validationError.statusCode = 400;
    throw validationError;
  }

  return formattedPhoneNumber;
}

module.exports = validatePhoneNumber;

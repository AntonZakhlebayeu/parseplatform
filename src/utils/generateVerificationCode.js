function generateVerificationCode() {
  const codeLength = 6;
  const min = Math.pow(10, codeLength - 1);
  const max = Math.pow(10, codeLength) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = generateVerificationCode;

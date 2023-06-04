const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const config = require('../configs/config');
const validatePhoneNumber = require('../utils/validatePhoneNumber');
const generateVerificationCode = require('../utils/generateVerificationCode');
const sendVerificationCode = require('../utils/sendVerificationCode');


const authController = {
  register: async (req, res, next) => {
    try {
      const { username, phoneNumber, password } = req.body;
  
      validatePhoneNumber(phoneNumber);
  
      if (password.length < 8) {
        const error = new Error('Password must be at least 8 characters');
        error.statusCode = 400;
        throw error;
      }
  
      const existingUser = await User.findOne({
        $or: [{ username }, { phoneNumber }],
      });
  
      if (existingUser) {
        const error = new Error('User already exists');
        error.statusCode = 409;
        throw error;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const verificationCode = generateVerificationCode();

      const hashedVerificationCode = await bcrypt.hash(verificationCode.toString(), 10);
  
      const newUser = new User({
        username,
        password: hashedPassword,
        phoneNumber,
        verificationCode: hashedVerificationCode,
      });
  
      await newUser.save();
  
      await sendVerificationCode(phoneNumber, verificationCode);
  
      res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
      console.error('Error sending verification code:', error);
      if (!error.statusCode) {
        error.statusCode = 400;
        error.message = 'Failed to send verification code';
      }
      next(error);
    }
  },
  completeRegistration: async (req, res, next) => {
    try {
      const { phoneNumber, verificationCode } = req.body;
  
      validatePhoneNumber(phoneNumber);
  
      const user = await User.findOne({ phoneNumber });
  
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      
      const verificationCodeMatch = await bcrypt.compare(verificationCode, user.verificationCode);
      if (!verificationCodeMatch) {
        const error = new Error('Invalid verification code');
        error.statusCode = 400;
        throw error;
      }

      user.verificationCode = null;
      user.isVerified = true;
  
      await user.save();
  
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error completing registration:', error);
      if (!error.statusCode) {
        error.statusCode = 400;
        error.message = 'Failed to complete registration';
      }
      next(error);
    }
  },
  loginInitiate: async (req, res, next) => {
    try {
      const { phoneNumber, password } = req.body;

      validatePhoneNumber(phoneNumber);

      const user = await User.findOne({ phoneNumber });

      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
      }

      if (!user.isVerified) {
        const error = new Error('Registration is not completed');
        error.statusCode = 401;
        throw error;
      }


    const verificationCode = generateVerificationCode();

    const hashedVerificationCode = await bcrypt.hash(verificationCode.toString(), 10);

    user.verificationCode = hashedVerificationCode;
    await user.save();

    await sendVerificationCode(phoneNumber, verificationCode);

    res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
      console.error('Error logging in user:', error);
      if (!error.statusCode) {
        error.statusCode = 400;
        error.message = 'User login failed';
      }
      next(error);
    }
  },
  loginVerify: async (req, res, next) => {
    try {
      const { phoneNumber, verificationCode, rememberMe } = req.body;
  
      validatePhoneNumber(phoneNumber);
  
      const user = await User.findOne({ phoneNumber });
  
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
  
      const verificationCodeMatch = await bcrypt.compare(verificationCode, user.verificationCode);
      if (!verificationCodeMatch) {
        const error = new Error('Invalid verification code');
        error.statusCode = 400;
        throw error;
      }
  
      user.verificationCode = null;
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, config.getVariable('secretKey'), { expiresIn: rememberMe ? config.getVariable('expiresInRememberMe') : config.getVariable('expiresIn') });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error verifying verification code:', error);
      if (!error.statusCode) {
        error.statusCode = 400;
        error.message = 'Failed to verify verification code';
      }
      next(error);
    }
  }
}

module.exports = authController;

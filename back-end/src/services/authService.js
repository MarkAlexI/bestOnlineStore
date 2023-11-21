import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';
import generateToken from '../utils/token.js';
import sendEmail from '../utils/email.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES,
  TOKEN_DURATIONS
} from '../utils/constants.js';

class AuthService {
  static async signInUser(email, password) {
    try {console.log(email);
      const user = await User.findOne({ email });

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user, TOKEN_DURATIONS.USER);

        return {
          status: HTTP_STATUS_CODES.OK,
          message: 'User signed in successfully.',
          data: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            isAnonymous: user.isAnonymous,
            token,
          },
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.UNAUTHORIZED,
          message: MESSAGES.INVALID_CREDENTIALS,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: 'Error while signing in user.',
        data: error,
      };
    }
  }

  static async initRestorePassword(email) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.USER_NOT_FOUND,
          data: null,
        };
      }

      const token = generateToken(user, TOKEN_DURATIONS.RESET);

      const resetLink = `https://volodumurgruv.github.io/bestOnlineStore/login?token=${token}`;

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000/12;
      await user.save();

      sendEmail(email, 'Password restore', resetLink);

      return {
        status: HTTP_STATUS_CODES.OK,
        message: 'Посилання для відновлення паролю надіслано на ваш email.',
        data: null,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  }

  static async restorePassword(token, newPassword) {
    if (!token || !newPassword) {
      return {
        status: HTTP_STATUS_CODES.BAD_REQUEST,
        message: MESSAGES.INVALID_CREDENTIALS,
        data: null,
      };
    }

    try {
      const user = await User.findOne({ resetPasswordToken: token });

      if (!user || user.resetPasswordExpires < Date.now()) {
        return {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          message: 'Your token has expired.',
          data: null,
        };
      }

      if (newPassword) {
        user.password = bcrypt.hashSync(newPassword, 12);
      }

      const updatedUser = await user.save();
      const newToken = generateToken(updatedUser, TOKEN_DURATIONS.USER);

      return {
        status: HTTP_STATUS_CODES.OK,
        message: 'New password created.',
        data: newToken,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  }
}

export default AuthService;

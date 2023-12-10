import User from '../models/userSchema.js';
import Order from '../models/orderSchema.js';
import Product from '../models/productSchema.js';
import ShippingAddress from '../models/shippingAddressSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/token.js';
import sendEmail from '../utils/email.js';
import {
  HTTP_STATUS_CODES,
  MESSAGES,
  TOKEN_DURATIONS
} from '../utils/constants.js';
import userNameRegex from '../utils/userNameRegex.js';

class UserService {
  static async getAllUsers() {
    try {
      const users = await User.find({}, '-password -resetPasswordToken -resetPasswordExpires');
      return {
        status: HTTP_STATUS_CODES.OK,
        message: MESSAGES.ALL_USERS_FETCHED,
        data: users,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_FETCHING_USERS,
        data: error,
      };
    }
  }

  static async registerUser(firstName, lastName, password, email, phone, anonymous, authorization) {
    try {
      const isExist = await User.findOne({ email: email });

      if (isExist) throw new Error('User with this email is existing!.');

      const hashedPassword = bcrypt.hashSync(password, 12);

      let user;

      if (authorization) {
        try {
          const decodedToken = jwt.verify(authorization, `${process.env.JWT_SECRET}`);
          const userId = decodedToken._id;

          user = await User
            .findById(userId)
            .select('-password -resetPasswordToken -resetPasswordExpires');

          if (user) {
            user.firstName = firstName;
            user.lastName = lastName;
            user.password = hashedPassword;
            user.email = email;
            user.phone = phone || user.phone;
            user.isAnonymous = false;
          }
        } catch (error) {
          return {
            status: HTTP_STATUS_CODES.NOT_FOUND,
            message: MESSAGES.USER_NOT_FOUND,
            data: error,
          };
        }
      } else {
        user = new User({
          firstName,
          lastName,
          password: hashedPassword,
          email,
          phone: phone || null,
          isAnonymous: !!anonymous,
        });
      }

      const createdUser = await user.save();

      const token = generateToken(createdUser, TOKEN_DURATIONS.USER);

      const newUser = {
        _id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        phone: createdUser.phone,
        isAdmin: createdUser.isAdmin,
        isAnonymous: createdUser.isAnonymous,
        token
      };

      anonymous ? void(0) : sendEmail(email);

      return {
        status: HTTP_STATUS_CODES.CREATED,
        message: MESSAGES.NEW_USER_CREATED,
        data: newUser,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error.message,
      };
    }
  }

  static async registerUserByGoogle(body) {
    const { gtoken } = body;

    try {
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          'Authorization': `Bearer ${gtoken}`
        }
      });

      if (!userInfoResponse.ok) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.GOOGLE_FETCH_FAILURE,
          data: null
        };
      }

      const userJSON = await userInfoResponse.json();

      const existingUser = await User.findOne({ email: userJSON.email });

      if (existingUser) {
        const token = generateToken(existingUser, TOKEN_DURATIONS.USER);

        const userPayload = {
          _id: existingUser._id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          phone: existingUser.phone,
          isAdmin: existingUser.isAdmin,
          isAnonymous: existingUser.isAnonymous,
          token
        };

        return {
          status: HTTP_STATUS_CODES.OK,
          message: MESSAGES.GOOGLE_ACCESS_VERIFIED,
          data: userPayload
        };
      } else {
        const user = new User({
          googleId: userJSON.sub,
          firstName: userJSON.given_name || '',
          lastName: userJSON.family_name || '',
          email: userJSON.email,
          isAnonymous: false
        });

        const createdUser = await user.save();

        const token = generateToken(createdUser, TOKEN_DURATIONS.USER);

        const newUser = {
          _id: createdUser._id,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          email: createdUser.email,
          phone: createdUser.phone,
          isAdmin: createdUser.isAdmin,
          isAnonymous: createdUser.isAnonymous,
          token
        };

        sendEmail(createdUser.email);

        return {
          status: HTTP_STATUS_CODES.CREATED,
          message: MESSAGES.NEW_USER_CREATED,
          data: newUser
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error
      };
    }
  }

  static async getUserById(userId) {
    try {
      const user = await User.findById(userId)
        .populate('shippingAddress')
        .populate('wishList')
        .select('-password -resetPasswordToken -resetPasswordExpires');

      const reviewIds = user.reviews;

      const productsWithReviews = await Product.find({ 'reviews._id': { $in: reviewIds } });

      const reviews = productsWithReviews.reduce((acc, product) => {
        const matchingReviews = product.reviews.filter(review => reviewIds.includes(review._id));
        return acc.concat(matchingReviews);
      }, []);
      const updatedUser = { ...user._doc, reviews };

      const orders = await Order.find({ user: userId });

      const userData = {
        user: updatedUser,
        orders
      };

      if (user) {
        return {
          status: HTTP_STATUS_CODES.OK,
          message: MESSAGES.USER_WAS_FOUND,
          data: userData,
        };
      } else {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.USER_NOT_FOUND,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_FETCHING_USER,
        data: error,
      };
    }
  }

  static async updateProfile(userId, requestBody) {
    try {
      if (requestBody.firstName && !userNameRegex.test(requestBody.firstName) ||
        requestBody.lastName && !userNameRegex.test(requestBody.lastName)) {
        return {
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          message: 'User name should be string.',
          data: null,
        };
      }

      const user = await User.findById(userId);

      if (user) {
        user.firstName = requestBody.firstName || user.firstName;
        user.lastName = requestBody.lastName || user.lastName;
        user.email = requestBody.email || user.email;
        user.phone = requestBody.phone || user.phone;

        if (
          !user.isAnonymous === true &&
          !user.googleId &&
          !bcrypt.compareSync(requestBody.password, user.password)
        ) {
          return {
            status: HTTP_STATUS_CODES.BAD_REQUEST,
            message: MESSAGES.INVALID_CREDENTIALS,
            data: null,
          };
        }

        let address = await ShippingAddress.findOne({ user: userId });

        if (address) {
          address.deliveryMethod = requestBody.deliveryMethod || address.deliveryMethod;
          address.address = requestBody.address || address.address;
          address.city = requestBody.city || address.city;
          address.country = requestBody.country || address.country;
          address.postalCode = requestBody.postalCode || address.postalCode;
          address.novaPoshtaAddress = requestBody.novaPoshtaAddress || address.novaPoshtaAddress;
        } else {
          address = new ShippingAddress({
            user: userId,
            deliveryMethod: requestBody.deliveryMethod,
            address: requestBody.address,
            city: requestBody.city,
            country: requestBody.country,
            postalCode: requestBody.postalCode,
            novaPoshtaAddress: requestBody.novaPoshtaAddress,
          });
        }

        const updatedAddress = await address.save();
        user.shippingAddress = updatedAddress._id;

        const updatedUser = await user.save();

        const populatedUser = await User.findById(updatedUser._id)
          .select('-password -isAdmin -resetPasswordToken -resetPasswordExpires')
          .populate('shippingAddress');

        return {
          status: HTTP_STATUS_CODES.OK,
          message: MESSAGES.USER_WAS_UPDATED,
          data: {
            user: populatedUser,
          },
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.ERROR_USER_PROFILE,
        data: error,
      };
    }
  }

  static async deleteUser(userId) {
    try {
      const user = await User.findById(userId);

      if (user) {
        if (this.isAdmin(user)) {
          return {
            status: HTTP_STATUS_CODES.BAD_REQUEST,
            message: MESSAGES.CANNOT_DELETE_ADMIN,
            data: null,
          };
        } else {
          const deletedUser = await user.deleteOne();
          return {
            status: HTTP_STATUS_CODES.OK,
            message: MESSAGES.USER_DELETED,
            data: {
              user: deletedUser
            },
          };
        }
      } else {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.USER_NOT_FOUND,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  }

  static async updateUser(userId, requestBody) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return {
          status: HTTP_STATUS_CODES.NOT_FOUND,
          message: MESSAGES.USER_NOT_FOUND,
          data: null,
        };
      }

      user.firstName = requestBody.firstName || user.firstName;
      user.lastName = requestBody.lastName || user.lastName;
      user.email = requestBody.email || user.email;
      user.phone = requestBody.phone || user.phone;
      user.isAdmin = requestBody.isAdmin || user.isAdmin;
      user.isAnonymous = requestBody.isAnonymous || user.isAnonymous;

      const updatedUser = await user.save();

      return {
        status: HTTP_STATUS_CODES.OK,
        message: MESSAGES.USER_WAS_UPDATED,
        data: updatedUser,
      };
    } catch (error) {
      return {
        status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: MESSAGES.INTERNAL_SERVER_ERROR,
        data: error,
      };
    }
  }

  static isAdmin(user) {
    return user.email === process.env.ADMIN_EMAIL;
  }
}

export default UserService;

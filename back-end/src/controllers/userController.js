import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/token.js';
import data from '../data.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      message: 'success',
      text: 'All users in payload.',
      payload: users
    });
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'Some error occurred on DB.',
      payload: error
    });
  }
};

const seedUsers = async (req, res) => {
  try {
    const createdUsers = await User.insertMany(data.users);
    res.json({
      message: 'success',
      text: 'New user(s) added to DB.',
      payload: createdUsers
    });
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'An error occurred.',
      payload: error
    });
  }
};

const registerUser = async (req, res) => {
  const { name, password, email, phone } = req.body;
  
  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    
    const user = new User({
      name,
      password: hashedPassword,
      email,
      phone
    });

    const createdUser = await user.save();
    const token = generateToken(createdUser);

    res.status(201).json({
      message: 'success',
      text: 'New user created.',
      payload: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        phone: createdUser.phone,
        isAdmin: createdUser.isAdmin,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'User registration failed.',
      payload: error
    });
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.json({
        message: 'success',
        text: 'Correct credentials.',
        payload: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin,
          token
        }
      });
    } else {
      res.status(401).json({
        message: 'falt',
        text: 'Wrong email or password.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'falt',
      text: 'Internal Server Error.'
    });
  }
};

const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json({
          message: 'success',
          text: 'User was found.',
          payload: user
        });
      } else {
        res.status(404).json({
          message: 'falt',
          text: 'User not found.'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'falt',
        text: 'Internal Server Error.'
      });
    }
  };
  
const updateProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
  
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }
  
        const updatedUser = await user.save();
        const token = generateToken(updatedUser);
  
        res.json({
          message: 'success',
          text: 'User was updated.',
          payload: {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            isAdmin: updatedUser.isAdmin,
            token
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'falt',
        text: 'Error on server.'
      });
    }
  };
  
const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (user) {
        if (user.email === 'markovalekdandr108@gmail.com') {
          res.status(400).json({
            message: 'falt',
            text: 'Cannot delete admin.'
          });
        } else {
          const deletedUser = await user.remove();
          res.json({
            message: 'success',
            text: 'User deleted.',
            payload: {
              user: deletedUser
            }
          });
        }
      } else {
        res.status(404).json({
          message: 'message',
          text: 'User not found.'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'falt',
        text: 'Error on server.'
      });
    }
  };
  
const updateUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
  
        const updatedUser = await user.save();
        
        res.json({
          message: 'success',
          text: 'User updated.',
          payload: {
            user: updatedUser
          }
        });
      } else {
        res.status(404).json({
          message: 'falt',
          text: 'User not found.'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'falt',
        text: 'Error on server.'
      });
    }
  };

export { getAllUsers, seedUsers, registerUser, signInUser, getUserById, updateProfile, deleteUser, updateUser };

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const createToken = (_id) => {

    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });

}

const getAllUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};
const updateUserPermission = async (req, res) => {
  const { permission, userName } = req.body;

  try {
      // Find the user by username
      const user = await User.findOne({ userName });

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Update the user's permission
      user.permission = permission;

      // Save the updated user
      await user.save();

      return res.status(200).json({ message: 'Permission updated successfully', user });
  } catch (error) {
      console.error('Error updating user permission:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};
const getUserByUserName = async (req, res) => {
  const { userName } = req.params;

  try {
    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({ error: 'No such user' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateBalance = async (req, res) => {
  const { userName, newBalance } = req.body;

  try {
    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.balance = newBalance;
    await user.save();

    res.status(200).json({ message: 'Balance updated successfully', newBalance: user.balance });
  } catch (error) {
    console.error('Error updating balance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const signupUser = async (req, res) => {
    const { userName, password ,balance,permission} = req.body;
    try {
      const user = await User.signup(userName, password, balance,permission); 
      // Create token
      const token = createToken(user._id);
      res.status(200).json({ userName, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const loginUser = async (req,res) => {
    const {userName , password} = req.body
    try {
        const user = await User.login(userName , password)
        //create token
        const token = createToken(user._id)
        res.status(200).json({userName,token})
        }
        catch (error) {
            res.status(400).json({error: error.message})
        }
}

module.exports = {signupUser , loginUser, getUserByUserName,updateBalance,getAllUsers,updateUserPermission }

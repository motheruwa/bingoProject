const jwt = require('jsonwebtoken');
const db = require('../config/db');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' });
};

const getAllUsers = async (req, res) => {
    try {
      const query = `SELECT * FROM user`;
      db.query(query, (error, results) => {
        if (error) {
          console.error('Error fetching users:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const updateUserPermission = async (req, res) => {
    const { permission, userName } = req.body;
    
    try {
      const userQuery = `SELECT * FROM user WHERE userName = ?`;
      db.query(userQuery, [userName], (error, results) => {
        if (error) {
          console.error('Error updating user permission:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0) {
          res.status(404).json({ error: 'User not found' });
        } else {
          const updateQuery = `UPDATE user SET permission = ? WHERE userName = ?`;
          db.query(updateQuery, [permission, userName], (error) => {
            if (error) {
              console.error('Error updating user permission:', error);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              res.status(200).json({ message: 'Permission updated successfully' });
            }
          });
        }
      });
    } catch (error) {
      console.error('Error updating user permission:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getUserByUserName = async (req, res) => {
    const { userName } = req.params;
  
    try {
      const query = `SELECT * FROM user WHERE userName = ?`;
      db.query(query, [userName], (error, results) => {
        if (error) {
          console.error('Error fetching user:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0) {
          res.status(404).json({ error: 'No such user' });
        } else {
          res.status(200).json(results[0]);
        }
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const updateBalance = async (req, res) => {
    const { userName, newBalance } = req.body;
  
    try {
      const userQuery = `SELECT * FROM user WHERE userName = ?`;
      db.query(userQuery, [userName], (error, results) => {
        if (error) {
          console.error('Error updating balance:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0) {
          res.status(404).json({ error: 'User not found' });
        } else {
          const updateQuery = `UPDATE user SET balance = ? WHERE userName = ?`;
          db.query(updateQuery, [newBalance, userName], (error) => {
            if (error) {
              console.error('Error updating balance:', error);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              res.status(200).json({ message: 'Balance updated successfully', newBalance });
            }
          });
        }
      });
    } catch (error) {
      console.error('Error updating balance:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const signupUser = async (req, res) => {
  const { userName, password, permission, balance, playType } = req.body;

  if (!userName || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const query = `
    INSERT INTO \`user\` (\`userName\`, \`password\`, \`permission\`, \`balance\`, \`playType\`)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userName, password, permission, balance ?? 0, playType],
    (error, results) => {
      if (error) {
        console.error("SIGNUP ERROR:", error);
        return res.status(500).json({ error: error.sqlMessage || "Signup failed" });
      }

      const token = createToken(results.insertId);
      res.status(200).json({ userName, token });
    }
  );
};


  const loginUser = async (req, res) => {
  const { userName, password } = req.body;

  const query = `SELECT * FROM \`user\` WHERE userName = ? AND password = ?`;

  db.query(query, [userName, password], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = createToken(results[0].id);
    res.status(200).json({ userName, token });
  });
};


  const updatePlayType = async (req, res) => {
    const { userName, playType } = req.body;
  
    try {
      const userQuery = `SELECT * FROM user WHERE userName = ?`;
      db.query(userQuery, [userName], (error, results) => {
        if (error) {
          console.error('Error updating playType:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else if (results.length === 0) {
          res.status(404).json({ error: 'User not found' });
        } else {
          const updateQuery = `UPDATE user SET playType = ? WHERE userName = ?`;
          db.query(updateQuery, [playType, userName], (error) => {
            if (error) {
              console.error('Error updating playType:', error);
              res.status(500).json({ error: 'Internal server error' });
            } else {
              res.status(200).json({ message: 'playType updated successfully', playType });
            }
          });
        }
      });
    } catch (error) {
      console.error('Error updating playType:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const deleteUser = async (req, res) => {
    const { userName } = req.params;

    try {
        const deleteQuery = `DELETE FROM user WHERE userName = ?`;
        db.query(deleteQuery, [userName], (error, results) => {
            if (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.status(200).json({ message: 'User deleted successfully' });
            }
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {deleteUser, getAllUsers, updateUserPermission, getUserByUserName, updateBalance, signupUser, loginUser,updatePlayType };
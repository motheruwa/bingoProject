require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const { PrismaClient } = require('@prisma/client');
const userRouters = require('./routes/user');
const reportRouters = require('./routes/report');
const multer = require('multer');
const db = require('./config/db');


// const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Attempt to get a database connection

db.connect(error => {
  if(error) {
    console.error('Error connecting to MySQL: ', error);
    return;
  }

  console.log('MySQL connected!');
});

db.on('error', error => {
  console.error('MySQL error: ', error);
});


const upload = multer();
app.use('/api/user', upload.none(), userRouters);
app.use('/api/report', upload.none(),reportRouters);


// No need to connect to the database manually with Prisma

// Listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});

// Function to reconnect database
function reconnectDatabase() {
    db.getConnection((err, connection) => {
      if (err) {
        console.error('Database reconnection failed:', err);
        setTimeout(reconnectDatabase, 5000); // Retry connection after 5 seconds
      } else {
        console.log('Reconnected to MySQL');
        connection.release();
      }
    });
  }
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const userRouters = require('./routes/user');
const reportRouters = require('./routes/report');
const multer = require('multer');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

const upload = multer();
app.use('/api/user', upload.none(), userRouters);
app.use('/api/report', upload.none(),reportRouters);


// No need to connect to the database manually with Prisma

// Listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});
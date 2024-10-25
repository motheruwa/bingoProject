require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const userRouters = require('./routes/user');
const multer = require('multer');

const app = express()

app.use(express.json());
app.use(cors()); //enable cors
app.use((req,res,next) => {
    console.log(req.path , req.method);
    next();
});

const upload = multer();
app.use('/api/user',upload.none(), userRouters);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
        console.log("connect to bingo database , listening on port",process.env.PORT)
    })
})
.catch((error) => {
    console.log(error);
})
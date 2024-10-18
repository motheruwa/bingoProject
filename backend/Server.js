require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const reportRouters = require('./routes/report');


const app = express()

app.use(express.json());
app.use(cors()); //enable cors
app.use((req,res,next) => {
    console.log(req.path , req.method);
    next();
});


app.use('/api/report', reportRouters)


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
        console.log("connect to database, listening on port",process.env.PORT)
    })
})
.catch((error) => {
    console.log(error);
})
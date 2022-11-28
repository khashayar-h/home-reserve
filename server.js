var express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const loginRouter = require('./routes/login.js');

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());

app.use('/login', loginRouter);

let uri = "mongodb://localhost:27017/HomeReservation";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (!err) {
        console.log("Connection to database successful!");
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app;
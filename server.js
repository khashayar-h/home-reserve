var express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout.js');
const citiesRouter = require('./routes/cities.js');
const homeRouter = require('./routes/home.js');
const periodRouter = require('./routes/period.js');

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + '/views/dashboard'));

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/cities', citiesRouter);
app.use('/home', homeRouter);
app.use('/period', periodRouter);


let uri = "mongodb+srv://xerxes2000a:WH8pA6It7wFrhRzV@cluster0.54ypm4g.mongodb.net/?retryWrites=true&w=majority";

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
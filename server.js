const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');

const port = process.env.PORT || 8080;
const app = express();

// Cors
const cors = require('cors');
// app.use(cors({
//   origin: 'http://localhost:4200'
// }));

app.use(cors());


// Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bondhuta', (req, res) => {
  console.log('Server connected');
});

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(port, function() {
    console.log('Server started on port '+port);
});

module.exports = app;


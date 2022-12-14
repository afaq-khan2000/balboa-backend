var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var dotenv = require("dotenv");
var cors = require('cors');

require("dotenv").config();

var indexRouter = require('./routes/index');
var mailsRouter = require('./routes/mails');
var shippingFulfillmentsRouter = require('./routes/shippingFulfillments');
var tradeFinancesRouter = require('./routes/tradeFinances');

var app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.static('public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mails',cors(corsOptions),mailsRouter);
app.use('/shipping-fulfillments',cors(corsOptions), shippingFulfillmentsRouter);
app.use('/trade-finance',cors(corsOptions),tradeFinancesRouter);

// MongoDb Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("💻 MongoDb Connected"))
  .catch((err) => console.error(err));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

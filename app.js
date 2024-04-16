const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
const createError = require('http-errors');

const indexRouter = require('./routes/index.js');
const cartItemsRouter = require('./routes/cartItemsRouter.js')
const ordersRouter = require('./routes/ordersRouter.js')
const productsRouter = require('./routes/productsRouter.js')
const usersRouter = require('./routes/usersRouter.js')
const categoriesRouter = require('./routes/categoriesRouter.js')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cart_items', cartItemsRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

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
  res.json({ error: 'error' });
});

module.exports = app;

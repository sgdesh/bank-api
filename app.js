const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const { specs, swaggerUi } = require('./config/swagger');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/health', async (req, res, next) => {
  res.send({ message: 'Server is Up' });
});

app.use('/api', require('./routes/api.route'));
// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/customers',  require('./controllers/customerController'));
const bankAccountController = require('./controllers/bankAccountController');
app.use('/bank-accounts', bankAccountController);
const transactionController = require('./controllers/transactionController');
app.use('/transactions', transactionController);
const loanController = require('./controllers/loanController');
app.use('/loans', loanController);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

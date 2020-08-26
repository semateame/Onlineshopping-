const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bcrypt = require('bcryptjs')
const cors = require('cors')
const mongoose = require('mongoose')
const customerRouter = require('./routes/customer');
const farmerRouter = require('./routes/farmer');
const orderRouter = require('./routes/order');
const authRouter = require('./routes/auth')
const adminRouter = require("./routes/admin")
const config = require('config')
const morgan = require("morgan")
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const fs = require ("fs")
const app = express();
const auth = require('./middleware/auth')
const authAdmin = require('./middleware/admin')
const awsrouter = require('./routes/aws');
const { version } = require('os');
const swagerDocs = require('./swagger.json')
    // view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// set ups
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())



// create a write stream (in append mode)
 
// setup the logger

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
//routes 
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swagerDocs))

app.use(awsrouter)
app.use('/auth', authRouter);
//
app.use('/admin',authAdmin,adminRouter)

app.use(morgan('combined', { stream: accessLogStream }))

app.use('/farmers', auth, farmerRouter);

app.use(customerRouter);
// app.use('/orders', orderRouter)
// authCustomer

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// connecting to data base 
const dbUri = config.get('mongoUri')


mongoose.connect(dbUri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("connected to Db");
    })
    .catch(err => {
        console.log(err);
    })

// setting env 
const PORT = process.env.PORT || 3000



app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})



module.exports = app;
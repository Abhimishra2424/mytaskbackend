'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// CORS
app.use(cors())
// Morgan
app.use(morgan('dev'))
// Company
const companyRoutes = require('./routes/company');
const employeeRoutes = require('./routes/employee');
const taskRoutes = require('./routes/task');

app.use('/api', companyRoutes);
app.use('/api', employeeRoutes);
app.use('/api', taskRoutes);

app.use('/', (req, res) => {
    res.send('Hello World');
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.status(err.status || 500).json({
        message: res.locals.message
    });
});

const  PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


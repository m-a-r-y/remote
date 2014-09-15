var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var restaurant = require('./routes/restaurant');

var apiRouter = require('./routes/api');

// mongoose 
mongoose = require("mongoose");
var app = express();



// var logSchema = new mongoose.Schema({
//     code: String,
//     responseTime: Number ,
//     endpoint: String ,
//     keys: []
// });

// var Log = mongoose.model('Log', logSchema);
// app.use(function(req, res, next){
    
//     var start = Date.now();
//     res.on("finish", function(){
//         var duration = Date.now() - start;
//         var log = new Log ( { responseTime: duration, endpoint: req.originalUrl , keys: Object.keys(req) } );
//         console.log(req.form());
//         log.save();
//     });
//     next();
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/restaurant', restaurant);
app.use('/users', users);

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;

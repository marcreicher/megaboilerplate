var express = require('express');
var async = require('async');
var app = express();
var config = require('config');
var mongoose = require('mongoose');

var mainRouter = require('./www/routes/mainApp');
var loginRouter = require('./www/routes/login');

app.use(express.static('assets'));
app.set('view engine', 'pug');

// app.get('/about', function (req, res) {
//   // res.render('index', { title: 'Hey', message: 'Hello there!'});
//   res.render('index.html')
// });
// app.get('*', function (req, res) {
  // res.render('mainApp', { title: 'Hey', message: 'Hello there!'});
  // res.sendFile(__dirname + '/bin/index.html')
// });

app.use('/main', mainRouter);
app.use('/login', loginRouter);

async.series([
    function connectToDatabase(callback) {
        mongoose.connect('mongodb://localhost/boilerplatedev');
        mongoose.connection.on('open', function() {
            console.log('connected to database');
            callback(null);
        });
        mongoose.connection.on('error', function(err) {
            console.log('error connecting to database');
            callback(err);
        })
    },
    function loadModels(callback) {
        console.log('loading models');
        require('./server/database/schema');
        callback(null);
    }
], function finishedSeries(err) {
    if(err) {
        console.log(err);
        return;
    }
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });
})
var express = require('express');
var app = express();

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


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
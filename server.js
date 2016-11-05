var express = require('express');
var app = express();

app.use(express.static('bin'));
// app.set('view engine', 'pug');

// app.get('/about', function (req, res) {
//   // res.render('index', { title: 'Hey', message: 'Hello there!'});
//   res.render('index.html')
// });
app.get('*', function (req, res) {
  // res.render('index', { title: 'Hey', message: 'Hello there!'});
  res.sendFile(__dirname + '/bin/index.html')
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
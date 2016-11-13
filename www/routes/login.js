var express = require('express');
var router = express.Router();

router.get(['/', '/about'], function (req, res) {
    res.render('login', { title: 'Hey', message: 'Hello there!'});
});

module.exports = router;
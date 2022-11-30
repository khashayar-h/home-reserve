var router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', (req, res) => {
    res.clearCookie('auth');
    return res.render('pages/index', {error: ""});
})

module.exports = router;
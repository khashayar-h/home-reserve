var router = require('express').Router();
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const Period = require('../models/period');


router.get('/', [auth, admin] , async (req, res) => {

    let periods = await fetchPeriods();
    return res.render('dashboard/addPeriod', {isAdmin: req.user.isAdmin, added: "", deleted: "", periods: periods});
})


let fetchPeriods = async () => {
    return await Period.find();
}

module.exports = router;
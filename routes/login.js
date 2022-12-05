var router = require('express').Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
    res.render('pages/index', {error: ""});
})

router.get("/dashboard", [auth], async (req, res)=> {

	console.log(req.cookies.auth);
	return res.render('dashboard/starter',{isAdmin : req.user.isAdmin});
})

router.route("/dashboard").post(async (req, res) => {	

	try {

		const username = req.body.username;

		// Password entered by the user
		const plainTextPassword = req.body.password;

		const user = await User.findOne({
			username: username,
			password: plainTextPassword,
		});

		if (user === null) {
			return res.render('pages/index', {error: "نام کاربری یا رمز عبور اشتباه است"});
		}

		// User found, return the token to the client side
		const token = user.generateAuthToken();

		const isAdmin = user.isAdmin;

		const name = encodeURI(user.name);

        const userId = user._id;

		res.cookie('auth', token);

		res.cookie('name', name);

		return res.render('dashboard/starter',{isAdmin : isAdmin});

	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
});

module.exports = router;
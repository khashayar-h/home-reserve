var router = require('express').Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/', (req, res) => {
    res.render('pages/index', {error: ""});
})

router.route("/").post(async (req, res) => {
	try {

		const username = req.body.username;

		// Password entered by the user
		const plainTextPassword = req.body.password;

		const user = await User.findOne({
			username: username,
			password: plainTextPassword,
		});

		//console.log(user);

		if (user === null) {
			return res.render('pages/index', {error: "Wrong Username/Password"});
		}

		// User found, return the token to the client side
		const token = user.generateAuthToken();

		const isAdmin = user.isAdmin;


        const userId = user._id;
        console.log(userId);

		res.cookie('auth', token);


		return res.render('pages/dashboard',{isAdmin : isAdmin});

	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
});

module.exports = router;
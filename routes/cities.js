var router = require('express').Router();
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const City = require('../models/cities');

router.post('/add', [auth, admin], async (req, res) => {

    let city = new City({name: req.body.name});
    city = await city.save();
    console.log('city added');
    let cities = await fetchCities();
    return res.render('dashboard/addCity', {isAdmin: req.user.isAdmin, added: "true", deleted: "", cities: cities});
})

router.post('/', [auth, admin] , async (req, res) => {

    let cities = await fetchCities();
    return res.render('dashboard/addCity', {isAdmin: req.user.isAdmin, added: "", deleted: "", cities: cities});
})

router.post('/get', [auth, admin] , async (req, res) => {

    let cities = await fetchCities();
    return res.json(cities).status(200);
})

router.get('/delete/:id', [auth, admin] , async (req, res) => {
    const city = await City.deleteOne({_id : req.params.id});
    if(!city) return res.status(404).send('The city with the given ID was not found.');
    console.log('city deleted');
    let cities = await fetchCities();
    return res.render('dashboard/addCity', {isAdmin: req.user.isAdmin, added: "", deleted: "true", cities: cities});
})

let fetchCities = async () => {
    return await City.find();
}

module.exports = router;
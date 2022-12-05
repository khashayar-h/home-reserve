var router = require('express').Router();
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const Home = require('../models/home');
const Cities = require('../models/cities');

router.post('/add', [auth, admin], async (req, res) => {

    const locationName = await Cities.findById(req.body.locationId, function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
            console.log(docs.name);
        }
    });

    let home = new Home({name: req.body.name,
                        locationId: req.body.locationId,
                        locationName: locationName.name,
                        type: req.body.type,
                        qty: req.body.qty,
                        size: req.body.size});
    home = await home.save();
    console.log('home added');
    let homes = await fetchHomes();
    return res.render('dashboard/addHome', {isAdmin: req.user.isAdmin, added: "true", deleted: "", homes: homes});
})

router.get('/', [auth, admin] , async (req, res) => {

    let homes = await fetchHomes();
    return res.render('dashboard/addHome', {isAdmin: req.user.isAdmin, added: "", deleted: "", homes: homes});
})

router.get('/delete/:id', [auth, admin] , async (req, res) => {
    const home = await Home.findByIdAndDelete(req.params.id);
    if(!home) return res.status(404).render('pages/404');
    console.log('home deleted');
    let homes = await fetchHomes();
    return res.render('dashboard/addHome', {isAdmin: req.user.isAdmin, added: "", deleted: "true", homes: homes});
})

let fetchHomes = async () => {
    return await Home.find();
}

module.exports = router;
var router = require('express').Router();
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const Reservation = require('../models/reservation');

router.get('/', [auth], async(req, res) => {
    const reservations = await fetchReservations();
    return res.render('dashboard/addReservation', {isAdmin: req.user.isAdmin, added: "", deleted: "", reservations: reservations});
})

router.post('/add', [auth], async(req, res) => {

    let newReservation = new Reservation({
        userId: req.user._id,
        cityId: req.body.cityId,
        homeId: req.body.homeId   
    })

    newReservation = await newReservation.save();
    console.log("reservation successfully");
    const reservations = await fetchReservations();
    return res.render('dashboard/addReservation', {isAdmin: req.user.isAdmin, added: "true", deleted: "", reservations: reservations});
})

router.get('/delete/:id', [auth] , async (req, res) => {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if(!reservation) return res.status(404).render('pages/404');
    console.log('reservation deleted');
    let reservations = await fetchReservations();
    return res.render('dashboard/addReservation', {isAdmin: req.user.isAdmin, added: "", deleted: "true", reservations: reservations});
})

let fetchReservations = async () => {
    return await Reservation.find().populate('cityId').populate('homeId');
}

module.exports = router;
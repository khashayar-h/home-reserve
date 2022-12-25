var router = require('express').Router();
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const Reservation = require('../models/reservation');
const Period = require('../models/period');
const City = require('../models/cities');
const Home = require('../models/home');

router.get('/', [auth], async(req, res) => {
    let activePeriod = await Period.find({isActive: true});
    let decodedStartDate = activePeriod[0].startDate.split('/');
    let decodedEndDate = activePeriod[0].endDate.split('/');
    let decodedStartTime = activePeriod[0].startTime.split(':');
    let decodedEndTime = activePeriod[0].endTime.split(':');
    let startTime = new Date(decodedStartDate[0], decodedStartDate[1], decodedStartDate[2], decodedStartTime[0], decodedStartTime[1], decodedStartTime[2]);
    let endTime = new Date(decodedEndDate[0], decodedEndDate[1], decodedEndDate[2], decodedEndTime[0], decodedEndTime[1], decodedEndTime[2]); 
    const date = new Date();
    const dateNow = date.toLocaleDateString('fa-IR-u-nu-latn').split('/');
    let timeNow = new Date(dateNow[0], dateNow[1], dateNow[2], date.getHours(), date.getMinutes(), date.getSeconds());

    if(timeNow.getTime() > startTime.getTime() && timeNow.getTime() < endTime.getTime()){
        const reservations = await fetchReservations();
        return res.render('dashboard/addReservation', {isAdmin: req.user.isAdmin, added: "", deleted: "", reservations: reservations});
    }
    return res.render('dashboard/starter',{isAdmin: req.user.isAdmin, error : "بازه زمانی رزرو به اتمام رسیده است !" });
})

router.post('/add', [auth], async(req, res) => {

    let activePeriod = await Period.find({isActive: true});
    let decodedStartDate = activePeriod[0].startDate.split('/');
    let decodedEndDate = activePeriod[0].endDate.split('/');
    let decodedStartTime = activePeriod[0].startTime.split(':');
    let decodedEndTime = activePeriod[0].endTime.split(':');
    let startTime = new Date(decodedStartDate[0], decodedStartDate[1], decodedStartDate[2], decodedStartTime[0], decodedStartTime[1], decodedStartTime[2]);
    let endTime = new Date(decodedEndDate[0], decodedEndDate[1], decodedEndDate[2], decodedEndTime[0], decodedEndTime[1], decodedEndTime[2]); 
    const date = new Date();
    const dateNow = date.toLocaleDateString('fa-IR-u-nu-latn').split('/');
    let timeNow = new Date(dateNow[0], dateNow[1], dateNow[2], date.getHours(), date.getMinutes(), date.getSeconds());

    const cityId = req.body.cityId;
    const homeId = req.body.homeId;

    if(!cityId || !homeId){
        return res.status(404).render('pages/404');
    }

    
    let foundedCity = City.findById(cityId);
    let foundedHome = Home.findById(homeId);

    if(!foundedCity || !foundedHome){
        return res.render('/pages/404');
    }

    if(timeNow.getTime() > startTime.getTime() && timeNow.getTime() < endTime.getTime()){
        let newReservation = new Reservation({
            userId: req.user._id,
            cityId: req.body.cityId,
            homeId: req.body.homeId   
        })
    
        newReservation = await newReservation.save();
        console.log("reservation was successful");
        const reservations = await fetchReservations();
        return res.render('dashboard/addReservation', {isAdmin: req.user.isAdmin, added: "true", deleted: "", reservations: reservations});  
      }

      return res.send('بازه رزرو به اتمام رسیده است');
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
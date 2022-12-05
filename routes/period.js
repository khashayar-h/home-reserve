var router = require('express').Router();
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const Period = require('../models/period');


// add period button in the sidebar

router.get('/', [auth, admin] , async (req, res) => {

    let periods = await fetchPeriods();
    return res.render('dashboard/addPeriod', {isAdmin: req.user.isAdmin, added: "", deleted: "", periods: periods});
})

// to add a period

router.post('/add', [auth, admin], async (req, res) => {

    let newPeriod = new Period({startTime: req.body.startTime,
                                endTime: req.body.endTime,
                                startDate: req.body.startDate,
                                endDate: req.body.endDate})
                                
    newPeriod = await newPeriod.save();
    console.log('Period added');
    periods = await fetchPeriods();
    return res.render('dashboard/addPeriod', {isAdmin: req.user.isAdmin, added: "true", deleted: "", periods: periods});

})

// to delete a period by ID

router.get('/delete/:id', [auth, admin] , async (req, res) => {
    const period = await Period.findByIdAndDelete(req.params.id);
    if(!period) return res.status(404).render('pages/404');
    console.log('period deleted');
    let periods = await fetchPeriods();
    return res.render('dashboard/addPeriod', {isAdmin: req.user.isAdmin, added: "", deleted: "true", periods: periods});
})

//to activate a period by ID

router.get('/active/:id', [auth, admin] , async (req, res) => {
    const deactivated = await Period.updateMany({isActive : true}, {$set: {isActive: false}});
    if(deactivated){
        const period = await Period.findByIdAndUpdate(req.params.id, {isActive: true});
        if(!period) return res.status(404).render('pages/404');
        console.log('period activated');
        let periods = await fetchPeriods();
        return res.render('dashboard/activePeriod', {isAdmin: req.user.isAdmin, added: "true", deleted: "", periods: periods});
    }
    return res.status(402);
})

// active period button in the sidebar

router.get('/get', [auth, admin], async (req, res) => {

    periods = await fetchPeriods();
    return res.render('dashboard/activePeriod', {isAdmin: req.user.isAdmin, added: "", deleted: "", periods: periods});
    
})

let fetchPeriods = async () => {
    return await Period.find();
}

module.exports = router;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const reservationSchema = new Schema({
    userId:{
        type:  mongoose.Schema.Types.ObjectId, ref: 'Users',
        required: true
    },
    homeId:{
        type:  mongoose.Schema.Types.ObjectId, ref: 'Home',
        required: true
    },
    cityId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Cities',
        required:true
    }
})

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
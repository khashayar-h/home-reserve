const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const periodSchema = new Schema({
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required : true
    },
    startTime:{
        type: String,
        required : true
    },
    endTime: {
        type: String,
        required : true
    },
    isActive: {
        type: Boolean,
        required : true,
        default: false
    }

});

const Period = mongoose.model('Period', periodSchema);

module.exports = Period;
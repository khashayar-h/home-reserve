const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const homeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    locationId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Cities',
        required : true
    },
    locationName:{
        type: String
    },
    type: {
        type: String
    },
    qty: {
        type: Number
    },
    size: {
        type: String
    }

});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
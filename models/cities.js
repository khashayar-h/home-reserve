const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const citiesSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Cities = mongoose.model('Cities', citiesSchema);

module.exports = Cities;
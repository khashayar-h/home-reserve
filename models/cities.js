const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const Home = require('./home')

const citiesSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

citiesSchema.pre('deleteOne', async function(next) {
    const cityId = this.getQuery()["_id"];
    const deleted = await Home.deleteMany({locationId : mongoose.Types.ObjectId(cityId)});
    next();
  });

const Cities = mongoose.model('Cities', citiesSchema);

module.exports = Cities;
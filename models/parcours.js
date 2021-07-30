let mongoose = require('mongoose');

let parcoursSchema = mongoose.Schema({
    latitude: Number,
    longitude: Number,
    name: String, 
})

let parcoursModel = mongoose.model('parcours', parcoursSchema);
module.exports= parcoursModel;
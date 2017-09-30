var mongoose = require('mongoose');

var countrySchema = mongoose.Schema({
    country_path : {
        country_name : String,
        hos : String,
        hog : String}
}, {collection: 'newdata'});

module.exports = mongoose.model('Countries', countrySchema);

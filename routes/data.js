var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/countries');
var router = express.Router();

router.get('/data', function(req, res) {
    models.find({}, function(err, countries) {
     
        res.send(countries);
        console.log("Database includes " + countries.length + " countries")
    })
});

module.exports = router;
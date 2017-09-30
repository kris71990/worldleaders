var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/countries');
var bodyParser = require('body-parser');
var router = express.Router();

var db = mongoose.connection;

router.get('/country/:country', function(req, res) {
    var country = req.params.country;
    
    models.find({[country] : {$exists:true}}, function(err, doc) {
        
        var doc_to_obj = doc[0].toObject();
        var obj_keys = Object.keys(doc_to_obj);
        var country_json = doc_to_obj[obj_keys[1]];
        
        res.render('country', {
            json : doc,
            country_name : JSON.stringify(country_json.country_name),
            hos : JSON.stringify(country_json.hos),
            hog : JSON.stringify(country_json.hog),
            hos_pic : JSON.stringify(country_json.hos_pic),
            hog_pic : JSON.stringify(country_json.hog_pic)
            
        });
    });
});

module.exports = router;
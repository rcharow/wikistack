var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET home page. */

router.get('/', function(req, res, next) {
  models.Page.find(function(err, docs){
    res.render('index', { title: 'WIKISTACK', docs: docs })
  })
})

router.get('/wiki/:url', function(req, res){
  var url = req.params.url;
  models.Page.findOne({"url_name": url}, "title body", function(err, page){
    res.render("viewPage", {title: page.title, body: page.body})
  });
})

module.exports = router;

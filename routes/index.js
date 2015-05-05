var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET home page. */

router.get('/', function(req, res, next) {
  models.Page.find(function(err, docs){
    res.render('index', { title: 'WIKISTACK', docs: docs })
  })
})

router.get('/wiki/:url', function(req, res, next){
  var url = req.params.url;
  models.Page.findOne({"url_name": url}, "title body tags", function(err, page){
  	if(err){
  		return next(err)
  	}
  	if(!page) return res.sendStatus(404)
    
    var tags;
	if(page.tags) 
		tags = page.tags;
	else
		tags = [];
	
    res.render("viewPage", {title: page.title, body: page.body, tags: tags})
  });
});

router.get('/search',function(req,res){
	var tag = req.query.pageTag;
	console.log("TAG: ", tag);
	models.Page.findByTag(tag, function(err, pages){
		res.render('searchResults', {tag: tag, pages: pages});
	});
})

module.exports = router;

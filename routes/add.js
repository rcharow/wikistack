var express = require('express');
var router = express.Router();
var models = require('../models/');

/* GET users listing. */
router.get('/',function(req,res){
  res.render('addPage',{title: 'Add Page'});
});

router.post('/submit', function(req, res) {

  // STUDENT ASSIGNMENT:
  // add definitions of the `title`, `body` and `url_name` variables here
  
  var title = req.body.pageTitle;
  var body = req.body.pageContent; 
  var tags = req.body.pageTags;
  var generateUrlName = function(name) {
  if (typeof name != "undefined" && name !== "") {
    // Removes all non-alphanumeric characters from name
    // And make spaces underscore
    return name.replace(/\s/ig, '_').replace(/\W/ig,'');
    } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2,7);
    }

  };
  var url_name = generateUrlName(title);
  if(tags)
    tags = tags.trim().split(", ");
  else
    tags = [];


  var page = new models.Page({ 'title': title, 'body': body, 'url_name': url_name, 'tags': tags });
  page.save();
  res.redirect('/');
});

module.exports = router;

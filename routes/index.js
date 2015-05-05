var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WIKISTACK' });
});

router.get('/addpage',function(req,res){
	res.render('addPage',{title: 'Add Page'});
});

module.exports = router;

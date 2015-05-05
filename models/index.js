var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new mongoose.Schema({
  title:    String,
  url_name: String,
  owner_id: String,
  body:     String,
  date:     { type: Date, default: Date.now },
  status:   Number
});

//implementing virtual for .full_route
pageSchema.virtual("full_route").get(function(){
	return "/wiki/" + this.url_name;
});



var userSchema = new mongoose.Schema({
  name:  { first: String, last: String },
  email: String
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};
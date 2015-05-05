// Setting custom filters on Swig
var marked = require('marked');
module.exports = function(swig) {
  var page_link = function (doc) {
    var link_name;
    if (typeof doc.title !== "undefined" && doc.title !== "") {
      link_name = doc.title
    } else {
      link_name = "Page "+doc.url_name;
    }
    return "<a href='"+doc.full_route+"'>"+link_name+"</a>";
  };
  page_link.safe = true;

  swig.setFilter('page_link', page_link);

  var markedFilter = function(doc){
    return marked(doc);
  }

  markedFilter.safe = true;
  swig.setFilter('marked',markedFilter);

  var tag_link = function(tag){
    return "<a href='/search?pageTag="+tag+"'>"+tag+"</a>";
  }
  tag_link.safe = true;
  swig.setFilter('tag_link',tag_link);
};

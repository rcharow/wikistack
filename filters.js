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

  var similar_link = function(titleTags){
    console.log("title tags: ", titleTags.tags);
    if(!titleTags.tags.length){
      return"<a class='disabled'>Find Similar</a>";
    }
    return "<a href='/findsimilar?pageTags="+titleTags.tags+"&pageTitle="+titleTags.title+"'>Find Similar</a>";
  }
  similar_link.safe = true;
  swig.setFilter('similar_link',similar_link);

  var editbuttons_link = function(title){
      return  "<div class='btn-group' id='editDel'>" + 
      "<a href='/edit/"+title+"'' class='btn btn-warning'>Edit</a>" +
      "<a href='/delete/"+title+"' class='btn btn-danger'>Delete</a></div>";
  }
  editbuttons_link.safe = true;
  swig.setFilter('editbuttons_link',editbuttons_link);
};

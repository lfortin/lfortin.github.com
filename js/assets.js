
// assets collection
define(['underscore', 'backbone'], function(_, Backbone) {

  // define asset model
  var Asset = Backbone.Model.extend({
    defaults: {
      link: "JavaScript:;"
    }
  });
    
  // return assets collection
  return new Backbone.Collection(_.shuffle([
    {id: 1, item: "jQuery", link: "http://www.jquery.com"},
    {id: 2, item: "jQuery UI", link: "http://www.jqueryui.com"},
    {id: 3, item: "Underscore.js", link: "http://www.underscorejs.org"},
    {id: 4, item: "Backbone.js", link: "http://www.backbonejs.org"},
    {id: 5, item: "AngularJS", link: "http://angularjs.org"},
    {id: 6, item: "RequireJS", link: "http://requirejs.org"},
    {id: 7, item: "Node.js", link: "http://nodejs.org"},
    {id: 8, item: "Express", link: "http://expressjs.com"},
    {id: 9, item: "Sugar.js", link: "http://sugarjs.com"}
  ]), {model: Asset});

});

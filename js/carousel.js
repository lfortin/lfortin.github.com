
// assets collection
define(['jquery', 'assets'], function($, assets) {
    
  var length   = assets.length,
      cursor   = 0;
    
  return {
    start: function(container, delay) {
      var cycle = function() {
        var link = $('<a target="_blank" />').html(assets.at(cursor % length).get('item'))
                                             .attr('href', assets.at(cursor % length).get('link'));
        $(container).html(link);
        cursor++;
      };
      cycle();
      setInterval(cycle, delay);
    }
  };

});

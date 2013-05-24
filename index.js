// Quick and dirty. Needs cleanup.

module.exports = {

  'generate': function(input, depth) {

    var _ = require('underscore'),
        a = 0,
        b = [],
        output = [JSON.stringify(input)],
        endpoints = 0;

    var getObjectPaths = function(obj, currentPosition){

      var c;

      if ( !currentPosition ) {
        c = '';
      } else {
        c = currentPosition + '.';
      }

      for (var i in obj) {
        b.push(c + i);
        if ( typeof obj[i] === 'boolean' || typeof obj[i] === 'number' || typeof obj[i] === 'string' ) {
          endpoints++;
        }
        if ( typeof obj[i] === 'object' ) {
          getObjectPaths(obj[i], c + i);
        }
      }
    }

    getObjectPaths(input);

    var deleteValue = function(obj, path) {

      var path = path.split('.'),
          parent = obj;

      for (var i = 0; i < path.length - 1; i += 1) {
        parent = parent[path[i]];
      }

      if (_.isArray(parent)) {
        parent.splice(path[path.length-1], 1);
      } else {
        parent[path[path.length-1]] = undefined;
      }
    }

    var iterateOverArray = function(inputs) {
      for ( var x in inputs ) {

        for ( var i in b ) {
          var clone = JSON.parse(inputs[x]);

          try{
            deleteValue(clone, b[i]);
          } catch(e) {
            continue;
          }

          var newVal = JSON.stringify(clone);

          if ( output.indexOf(newVal) < 0 ) {
            output.push(newVal);
          }
        }
      }
    }

    _(_.min([depth, endpoints])).times(function(i){
      iterateOverArray(output);
    })

    for ( var i in output ) {
      output[i] = JSON.parse(output[i]);
    }

    return output;
  }

}
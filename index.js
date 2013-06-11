// Quick and dirty. Needs cleanup.

module.exports = {

  'generate': function(input, depth, typeCheck) {

    var _ = require('underscore'),
        a = 0,
        b = [],
        output = [JSON.stringify(input)],
        endpoints = 0,
        dummyElements;

    dummyElements = {
      'string': 'foo',
      'number': 123,
      'boolean': true,
      'boolean-false': false,
      'array': [1],
      'object': {
        'foo': 'a'
      }
    };

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
    };

    getObjectPaths(input);

    var deleteValue = function(obj, path) {

      path = path.split('.');

      for (var i = 0; i < path.length - 1; i += 1) {
        obj = obj[path[i]];
      }

      if (_.isArray(obj)) {
        obj.splice(path[path.length-1], 1);
      } else {
        obj[path[path.length-1]] = undefined;
      }
    };

    var setValue = function(obj, path, toWhat) {

      path = path.split('.');

      for (var i = 0; i < path.length - 1; i += 1) {
        obj = obj[path[i]];
      }

      if ( typeof obj[path[path.length-1]] === typeof toWhat ) {
        return false;
      }

      obj[path[path.length-1]] = toWhat;

      return true;
    };

    var iterateOverArray = function(inputs) {

      var clone;

      for ( var x in inputs ) {

        for ( var i in b ) {

          clone = JSON.parse(inputs[x]);

          try {
            deleteValue(clone, b[i]);
          } catch(e) {
            continue;
          }

          clone = JSON.stringify(clone);

          if ( output.indexOf(clone) < 0 ) {
            output.push(clone);
          }
        }

        // Substitute the current value with other types of data.

        if ( typeCheck ) {

          for ( var j in b ) {

            for ( var k in dummyElements ) {

              clone = JSON.parse(inputs[x]);

              try {
                setValue(clone, b[j], dummyElements[k]);
              } catch(e) {
                continue;
              }

              clone = JSON.stringify(clone);

              if ( output.indexOf(clone) < 0 ) {
                output.push(clone);
              }
            }
          }
        }

      }
    };

    _(_.min([depth, endpoints])).times(function(i){
      iterateOverArray(output);
    });

    for ( var i in output ) {
      output[i] = JSON.parse(output[i]);
    }

    return output;
  }

};
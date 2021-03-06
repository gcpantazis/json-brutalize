#JSON Brutalize [![Build Status](https://api.travis-ci.org/gcpantazis/json-brutalize.png?branch=master)](http://travis-ci.org/gcpantazis/json-brutalize)

Provided a fully-populated JSON object, Brutalize will generate an array of possible variations to that object. Useful for hardening your templates against potentially volitile API data.

Usage
-----

**Install:**

      npm install json-brutalize

**Methods:**

* `generate(JSON, depth, typeCheck)`
  * `JSON`: The fully-populated JSON object to generate variations against.
  * `depth`: *(optional)* The maximum number of decendents `generate` will attempt to delete. If omitted, will attempt the maximum number of variations (equal to the number of endpoints in `JSON`).
  * `typeCheck`: *(optional)* generates clones where elements are replaced by different types of [valid JSON objects](http://www.json.org/).

**Example:**

      var fixture = {
        "foo": "bar",
        "baz": {
          "a": 1,
          "b": 2
        }
      };

      var Brutalize = require('json-brutalize');

      var output = Brutalize.generate(fixture, 1); // Returns array of length 5.
      var output2 = Brutalize.generate(fixture, 2); // Returns array of length 9.
      var output3 = Brutalize.generate(fixture); // All possible variations of `fixture`. Returns array of length 10.
      var output4 = Brutalize.generate(fixture, 2, true); // Returns array of length 179.


**TODO:**

* It's easy for the process to max out RAM, particulary for very complicated JSON files with a depth > 1. In lieu of a "real" solution for this, I should at least let the generator close down if it becomes sufficiently slow, and perhaps randomize the output between depths so that you can at least get a random sampling.
* Per the above, it might make more sense to set a "max tests" option.

License
-------
Copyright (c) 2013 George Pantazis
Licensed under the MIT license.

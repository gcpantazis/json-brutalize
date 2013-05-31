var Brutalize = require('../index');

var fixture = {
  "foo": "bar",
  "baz": {
    "a": 1,
    "b": 2
  }
};

exports.test = {

  outputLengthTest: function(test) {

    test.expect(5);

    var output = Brutalize.generate(fixture, 1);

    test.equal(output.length, 5, 'Length of basic fixture at a set depth of one.');

    var output = Brutalize.generate(fixture, 2);

    test.equal(output.length, 9, 'Length of basic fixture at a set depth of two.');

    var output = Brutalize.generate(fixture, 3);

    test.equal(output.length, 10, 'Length of basic fixture at a set depth of three.');

    var output = Brutalize.generate(fixture);

    test.equal(output.length, 10, 'Length of basic fixture at its maximum depth / number of endpoints.');

    var output = Brutalize.generate(fixture, 100);

    test.equal(output.length, 10, 'Length of basic fixture at a depth much larger than its maximum.');

    test.done();
  }
};
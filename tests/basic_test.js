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

    test.equal(Brutalize.generate(fixture, 1).length, 5, 'Length of basic fixture at a set depth of one.');
    test.equal(Brutalize.generate(fixture, 2).length, 9, 'Length of basic fixture at a set depth of two.');
    test.equal(Brutalize.generate(fixture, 3).length, 10, 'Length of basic fixture at a set depth of three.');
    test.equal(Brutalize.generate(fixture).length, 10, 'Length of basic fixture at its maximum depth / number of endpoints.');
    test.equal(Brutalize.generate(fixture, 100).length, 10, 'Length of basic fixture at a depth much larger than its maximum.');

    test.done();
  }
};
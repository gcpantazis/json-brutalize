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

    test.expect(8);

    test.equal(Brutalize.generate(fixture, 1).length, 5, 'Length of basic fixture at a set depth of one.');
    test.equal(Brutalize.generate(fixture, 2).length, 9, 'Length of basic fixture at a set depth of two.');
    test.equal(Brutalize.generate(fixture, 3).length, 10, 'Length of basic fixture at a set depth of three.');
    test.equal(Brutalize.generate(fixture).length, 10, 'Length of basic fixture at its maximum depth / number of endpoints.');
    test.equal(Brutalize.generate(fixture, 100).length, 10, 'Length of basic fixture at a depth much larger than its maximum.');

    test.equal(Brutalize.generate(fixture, 1, true).length, 24, 'Length of basic fixture at a set depth of one, with typeCheck true.');
    test.equal(Brutalize.generate(fixture, 2, true).length, 179, 'Length of basic fixture at a set depth of two, with typeCheck true.');
    test.equal(Brutalize.generate(fixture, 3, true).length, 623, 'Length of basic fixture at a set depth of three, with typeCheck true.');

    test.done();
  }
};
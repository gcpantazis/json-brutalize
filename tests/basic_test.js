var Brutalize = require('../index');

var fixture = {
  'foo': 'bar',
  'baz': {
    'a': 1,
    'b': 2
  }
};

exports.test = {

  outputLengthTest: function(test) {

    test.expect(1);

    var output = Brutalize.generate(fixture, 1);

    test.ok(true, output.length === 5);

    test.done();
  }
};

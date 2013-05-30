module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'index.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      test: ['tmp']
    },

    // Unit tests.
    nodeunit: {
      tests: ['tests/basic_test.js']
    }

  });

  // Default task.
  grunt.registerTask('test', ['clean', 'jshint', 'nodeunit']);
  grunt.registerTask('default', ['test']);

  // load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
};
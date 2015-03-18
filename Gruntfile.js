module.exports = function(grunt) {
  grunt.initConfig({
    nodemon: {
      dev: {
        script: './bin/www'
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['nodemon']);
}
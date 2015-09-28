module.exports = function (grunt) {

//    grunt.loadNpmTasks('grunt-cordovacli');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('jenkins',
        [
            'clean:www',
            'copy:www'
        ]);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            options: {
                force: true
            },
            www: ['<%= pkg.projectDir.www %>']
        },

        copy: {
            www: {
                expand: true,
                cwd: '<%= pkg.rootDir.app %>',
                src: '**',
                dest: '<%= pkg.rootDir.www %>'
            }

        }

    });

};
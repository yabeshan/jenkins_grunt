module.exports = function (grunt) {

//    grunt.loadNpmTasks('grunt-cordovacli');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('clean1',
        [
            'clean:www1'
        ]);
    grunt.registerTask('clean2',
        [
            'clean:www2'
        ]);
    grunt.registerTask('clean3',
        [
            'clean:www3'
        ]);



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
            www1: ['<%= pkg.projectDir.www %>'],
            www2: ['<%= pkg.rootDir.www %>'],
            www3: ['<%= pkg.packDir.www %>']
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
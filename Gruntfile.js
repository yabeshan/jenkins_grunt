module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-cordovacli');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('cleaner',
        [
            'clean:www'
        ]);

    grunt.registerTask('jenkins',
        [
            'clean:www',
            'copy:www',
            'cordovacli:prepare',
            'cordovacli:build'
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

        },

        cordovacli: {

            options: {
                path: '<%= pkg.projectDir.name %>',
                cli: 'cordova'  // cca or cordova
            },

            pluginsList: {
                options: {
                    command: 'plugin',
                    action: 'ls'
                }
            },

            addPlugins: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'network-information',
                        'device',
                        'camera',
                        'file'
                    ]
                }
            },

            addPluginCrosswalk: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'cordova-plugin-crosswalk-webview'
                    ]
                }
            },

            delCustomPlugins: {
                options: {
                    command: 'plugin',
                    action: 'rm',
                    plugins: [

                        /* Custom plugins */

                        'custom-appmanager',
                        'custom-barcodescanner',
                        'custom-filemanager',
                        'custom-keyboard',
                        'custom-mediamanager',
                        'custom-share',
                        'custom-sqlite'

                    ]
                    //args: ['--force']
                }
            },

            addCustomPlugins: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: (function () {

                        /* Custom Plugins paste here folder name. */
                        var customPluginsName = [
                                'custom-appmanager',
                                'custom-barcodescanner',
                                'custom-filemanager',
                                'custom-keyboard',
                                'custom-mediamanager',
                                'custom-share',
                                'custom-sqlite'
                            ],

                        //----------------------------------------------//
                            root = __dirname;
                        return customPluginsName.map(function (item) {
                            return root + ('<%= pkg.rootDir.customPlugins %>') + item;
                        })
                    }).call(this)
                }
            },

            create: {
                options: {
                    command: 'create',
                    id: '<%= pkg.id %>',
                    name: '<%= pkg.appName %>'
                }
            },

            addPlatform: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: ['android'] // ios, blackberry10, wp8 ...
                }
            },

            prepare: {
                options: {
                    command: 'prepare'
                }
            },

            build: {
                options: {
                    command: 'build'
                }
            },

            run: {
                options: {
                    command: 'run'

                }
            },

            buildRelease: {
                options: {
                    command: 'build',
                    platforms: ['android'],
                    args: ['--release', '--buildConfig', '../releaseFiles.json']
                }

            },

            emulate: {
                options: {
                    command: 'emulate',
                    platforms: ['android'],
                    args: ['--target', '<%= pkg.myEmulator %>']
                }
            }
        }


    });

};
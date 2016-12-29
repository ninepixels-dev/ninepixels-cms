module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var vendor = {
        js: [
            'bower_components/angular/angular.js',
            'bower_components/angular-cookies/angular-cookies.min.js',
            'bower_components/angular-aria/angular-aria.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-material/angular-material.min.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/angular-translate/angular-translate.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/angular-file-upload/dist/angular-file-upload.min.js',
            'bower_components/angular-file-saver/dist/angular-file-saver.bundle.min.js',
            'bower_components/angular-loading-bar/build/loading-bar.min.js',
            'bower_components/underscore/underscore-min.js',
            'bower_components/moment/min/moment.min.js',
            'bower_components/fullcalendar/dist/fullcalendar.min.js',
            'bower_components/fullcalendar/dist/locale/sr.js',
            'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
            'bower_components/intl-tel-input/build/js/intlTelInput.min.js',
            'bower_components/medium-editor/dist/js/medium-editor.min.js',
            'bower_components/medium-editor-tables/dist/js/medium-editor-tables.min.js'
        ],
        css: [
            'bower_components/angular-material/angular-material.min.css',
            'bower_components/angular-loading-bar/build/loading-bar.min.css',
            'bower_components/fullcalendar/dist/fullcalendar.min.css',
            'bower_components/font-awesome/css/font-awesome.min.css',
            'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
            'bower_components/medium-editor/dist/css/medium-editor.min.css',
            'bower_components/medium-editor/dist/css/themes/flat.min.css',
            'bower_components/medium-editor-tables/dist/css/medium-editor-tables.min.css'
        ],
        controller: [
            'app/np-controller/config.js',
            'app/np-controller/apps/toolbar/toolbar.directive.js',
            'app/np-controller/apps/toolbar/user.controller.js',
            'app/np-controller/apps/toolbar/page.controller.js',
            'app/np-controller/apps/toolbar/asset.service.js',
            'app/np-controller/apps/toolbar/asset.controller.js',
            'app/np-controller/apps/editor/editor.directive.js',
            'app/np-controller/apps/editor/editor.controller.js',
            'app/np-controller/apps/editor/pickimage.directive.js',

            'app/np-controller/core/auth/auth.js',
            'app/np-controller/core/api/api.js',
            'app/np-controller/core/api/token_service.js',
            'app/np-controller/core/login/login.js',
            'app/np-controller/core/notify/notify.js',
            'app/np-controller/core/calendar/calendar.js',
            'app/np-controller/core/ui/ui.js',
            'app/np-controller/core/ui/modal-dialog.js',
            'app/np-controller/core/ui/html-editor.js',
            'app/np-controller/core/ui/typeahead.js',
            'app/np-controller/core/ui/uploader.js'
        ]
    };

    var app = {
        js: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ],
        css: [
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            '.tmp/app.css'
        ]
    };

    grunt.config.init({
        clean: {
            options: {force: true},
            structure: ['.tmp', 'dist'],
            controller: ['dist/np-controller/templates'],
            templates: ['dist/np-assets/templates'],
            images: ['dist/np-assets/images'],
            server: ['dist/np-controller/server']
        },

        less: {
            options: {
                paths: 'app/np-assets/styles',
                rootpath: '../np-assets',
                compress: true,
                cleancss: true
            },
            dist: {
                files: {
                    '.tmp/app.css': ['app/**/*.less']
                }
            }
        },

        cssmin: {
            options: {
                banner: '/*! Nine Pixels Seed 0.0.1 | Nemanja Pavlovic @ Nine Pixels | MIT Licensed */',
                livereload: true
            },
            vendor: {
                files: {
                    'dist/np-assets/css/vendor.min.css': vendor.css
                }
            },
            app: {
                files: {
                    'dist/np-assets/css/app.min.css': app.css
                }
            }
        },

        uglify: {
            options: {
                beautify: true,
                mangle: false,
                livereload: true,
                sourceMap: true,
                sourceMapIncludeSources: true,
                banner: '/*! Nine Pixels Seed 0.0.1 | Nemanja Pavlovic @ Nine Pixels | MIT Licensed */'
            },
            vendor: {
                files: {
                    'dist/np-assets/js/vendor.min.js': vendor.js
                }
            },
            controller: {
                files: {
                    'dist/np-assets/js/controller.min.js': vendor.controller
                }
            },
            app: {
                files: {
                    'dist/np-assets/js/app.min.js': app.js
                }
            }
        },

        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            templates: {
                files: [{
                        expand: true,
                        flatten: true,
                        src: ['app/np-controller/**/*.html'],
                        dest: 'dist/np-controller/templates/'
                    }]
            }
        },

        imagemin: {
            options: {
                optimizationLevel: 5
            },
            dist: {
                files: [{
                        expand: true,
                        cwd: 'app/np-assets/images',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'dist/np-assets/images/'
                    }]
            }
        },

        copy: {
            html: {
                src: 'app/index.php',
                dest: 'dist/index.php'
            },
            fontAwesome: {
                expand: true,
                src: 'bower_components/font-awesome/fonts/*',
                dest: 'dist/np-assets/fonts/',
                flatten: true
            },
            templates: {
                expand: true,
                src: 'app/np-templates/**/*',
                dest: 'dist/np-templates/',
                flatten: true
            },
            server: {
                expand: true,
                src: 'app/np-controller/server/**/*',
                dest: 'dist/np-controller/server/',
                flatten: true
            }
        },

        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            rebuild: {
                files: ['Gruntfile.js'],
                tasks: ['clean:structure', 'build']
            },
            index: {
                files: ['app/index.php'],
                tasks: ['copy:html']
            },
            less: {
                files: ['app/np-assets/styles/*.less'],
                tasks: ['less', 'cssmin:app']
            },
            vendorjs: {
                files: vendor.js,
                tasks: ['uglify:vendor']
            },
            controlllerjs: {
                files: vendor.controller,
                tasks: ['uglify:controller']
            },
            appjs: {
                files: app.js,
                tasks: ['uglify:app']
            },
            html: {
                files: ['app/np-controller/**/*.html'],
                tasks: ['htmlmin']
            },
            images: {
                files: ['app/np-assets/images/**/*'],
                tasks: ['imagemin']
            },
            templates: {
                files: ['app/np-templates/**/*'],
                tasks: ['copy:templates']
            },
            server: {
                files: ['app/np-controller/server/*'],
                tasks: ['clean:server', 'copy:server']
            }
        },

        php: {
            dist: {
                options: {
                    hostname: 'localhost',
                    port: 8100,
                    base: 'dist',
                    open: true
                }
            }
        }
    });

    // Generate grunt tasks
    grunt.registerTask('build', [
        'clean:structure',
        'less',
        'cssmin',
        'uglify',
        'htmlmin',
        'imagemin',
        'copy'
    ]);

    grunt.registerTask('develop', [
        'build',
        'php',
        'watch'
    ]);
};
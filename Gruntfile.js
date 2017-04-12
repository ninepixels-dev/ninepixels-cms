module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    var vendor = {
        js: [
            'node_modules/angular/angular.js',
            'node_modules/angular-cookies/angular-cookies.min.js',
            'node_modules/angular-aria/angular-aria.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-material/angular-material.min.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js',
            'node_modules/angular-translate/angular-translate.min.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'node_modules/angular-file-upload/dist/angular-file-upload.min.js',
            'node_modules/angular-file-saver/dist/angular-file-saver.bundle.min.js',
            'node_modules/angular-loading-bar/build/loading-bar.min.js',
            'node_modules/underscore/underscore-min.js',
            'node_modules/fullcalendar/dist/fullcalendar.min.js',
            'node_modules/fullcalendar/dist/locale/sr.js',
            'node_modules/intl-tel-input/build/js/intlTelInput.min.js',
            'node_modules/medium-editor/dist/js/medium-editor.min.js',
            'node_modules/medium-editor-tables/dist/js/medium-editor-tables.min.js'
        ],
        css: [
            'node_modules/angular-material/angular-material.min.css',
            'node_modules/angular-loading-bar/build/loading-bar.min.css',
            'node_modules/fullcalendar/dist/fullcalendar.min.css',
            'node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/medium-editor/dist/css/medium-editor.min.css',
            'node_modules/medium-editor/dist/css/themes/flat.min.css',
            'node_modules/medium-editor-tables/dist/css/medium-editor-tables.min.css'
        ],
        controller: [
            'app/np-controller/config.js',

            'app/np-controller/apps/controller/controller.directive.js',
            'app/np-controller/apps/controller/user.controller.js',
            'app/np-controller/apps/controller/asset.service.js',
            'app/np-controller/apps/controller/asset.controller.js',
            'app/np-controller/apps/pages/page.controller.js',
            'app/np-controller/apps/toolbar/toolbar.directive.js',
            'app/np-controller/apps/toolbar/toolbar.controller.js',
            'app/np-controller/apps/toolbar/pickimage.directive.js',
            'app/np-controller/apps/blog/blog.controller.js',
            'app/np-controller/apps/products/products.controller.js',
            'app/np-controller/apps/settings/settings.controller.js',

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
            'node_modules/jquery/dist/jquery.js',
            'node_modules/moment/min/moment.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
            'node_modules/owl.carousel/dist/owl.carousel.min.js',
            'node_modules/fancybox/dist/js/jquery.fancybox.js',

            'app/np-assets/scripts/**/*.js'
        ],
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/fancybox/dist/css/jquery.fancybox.css',
            'node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
            'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
            'node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
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
                livereload: true,
                report: 'gzip'
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
                mangle: false,
                livereload: true,
                sourceMap: true,
                sourceMapIncludeSources: true
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
            },
            production: {
                options: {
                    banner: '/*! Nine Pixels Seed 0.0.1 | Nemanja Pavlovic @ Nine Pixels | MIT Licensed */',
                    sourceMap: false,
                    preserveComments: false,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'dist/np-assets/js/vendor.min.js': vendor.js,
                    'dist/np-assets/js/controller.min.js': vendor.controller,
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
                        src: ['**/*.{png,jpg,gif,svg}'],
                        dest: 'dist/np-assets/images/'
                    }]
            },
            server: {
                files: [{
                        expand: true,
                        cwd: 'api/web/uploads',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'api/web/uploads'
                    }]
            }
        },

        copy: {
            php: {
                expand: true,
                src: 'app/*.php',
                dest: 'dist/',
                flatten: true
            },
            fontAwesome: {
                expand: true,
                src: 'node_modules/font-awesome/fonts/*',
                dest: 'dist/np-assets/fonts/',
                flatten: true
            },
            fontBootstrap: {
                expand: true,
                src: 'node_modules/bootstrap/fonts/*',
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
                files: ['app/index.php', 'app/debug.php'],
                tasks: ['copy:php']
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
        },

        ftp_push: {
            prod: {
                options: {
                    authKey: "server",
                    host: "te-cooling.rs",
                    dest: "/",
                    port: 21,
                    incrementalUpdates: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: [
                            "**/*"
                        ]
                    }
                ]
            }
        }
    });

    // Generate grunt tasks
    grunt.registerTask('build', [
        'clean:structure',
        'less',
        'cssmin',
        'uglify:vendor',
        'uglify:controller',
        'uglify:app',
        'htmlmin',
        'imagemin:dist',
        'copy'
    ]);

    grunt.registerTask('production', [
        'clean:structure',
        'less',
        'cssmin',
        'uglify:production',
        'htmlmin',
        'imagemin:dist',
        'copy'
    ]);

    grunt.registerTask('server', [
        'build',
        'php',
        'watch'
    ]);

    grunt.registerTask('production-server', [
        'production',
        'php',
        'watch'
    ]);

    grunt.registerTask('production-deploy', [
        'production',
        'ftp_push'
    ]);
};
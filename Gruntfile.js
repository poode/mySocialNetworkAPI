/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * Gruntfile.js
 */

'use strict';
module.exports = function(grunt) {
    /** loading grunt packages **/
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsvalidate');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /** TASK 01 : Copy tasks **/
        copy: {
            vendor: {
                files: [{
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: ['jquery.js'],
                        dest: 'public/vendor/js/'
                    }, //0
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/js/',
                        src: ['bootstrap.js'],
                        dest: 'public/vendor/js/'
                    }, //1
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/css/',
                        src: ['bootstrap.css'],
                        dest: 'public/vendor/css/'
                    }, //2
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/fonts/',
                        src: ['**', '!**.txt'],
                        dest: 'public/fonts/'
                    }, //3
                    {
                        expand: true,
                        cwd: 'bower_components/components-font-awesome/css/',
                        src: ['font-awesome.css'],
                        dest: 'public/vendor/css/'
                    }, { //4
                        expand: true,
                        cwd: 'bower_components/components-font-awesome/fonts/',
                        src: ['**', '!**.txt'],
                        dest: 'public/fonts/'
                    }, { //5
                        expand: true,
                        cwd: 'bower_components/semantic/dist/',
                        src: ['semantic.js'],
                        dest: 'public/vendor/js/'
                    }, { //6
                        expand: true,
                        cwd: 'bower_components/semantic/dist/',
                        src: ['semantic.css'],
                        dest: 'public/vendor/css/'
                    }, { //7
                        expand: true,
                        cwd: 'bower_components/jquery-ui/',
                        src: ['jquery-ui.js'],
                        dest: 'public/vendor/js/'
                    }, { //8
                        expand: true,
                        cwd: 'bower_components/jquery-ui/themes/base/',
                        src: ['jquery-ui.css'],
                        dest: 'public/vendor/css/'
                    }
                ]
            }
        },
        /** TASK 02 : uglify JS **/
        uglify: {
            options: {
                sourceMap: true,
                sourceMapName: function(filePath) {
                    return filePath + '.map';
                }
            },
            vendor: {
                files: {
                    'public/vendor/main.min.js': [
                        'public/vendor/js/jquery.js',
                        'public/vendor/js/jquery-ui.js',
                        'public/vendor/js/bootstrap.js',
                        'public/vendor/js/semantic.js'
                    ]
                }
            }

        },
        /** TASK 03 : JSLint **/
        jshint: {
            client: {
                options: {
                    jshintrc: 'configuration/jslint/.jshintrc-client',
                    ignores: [
                        'public/vendor/*.min.js'
                    ],
                    reporter: 'node_modules/jshint-stylish'
                },
                src: [
                    'public/vendor/*.js'
                ]
            },
            server: {
                options: {
                    jshintrc: 'configuration/jslint/.jshintrc-server',
                    reporter: 'node_modules/jshint-stylish'
                },
                src: [
                    '*.js',
                    'controllers/*.js',
                    'models/*.js',
                    'tools/*.js'
                ]
            }
        },
        /** TASK 04 : Clean for rebuilding **/
        clean: {
            //01
            map: {
                src: [
                    'public/vendor/*.min.css.map'
                ]
            },
            //02
            uglifiedJS: {
                src: [
                    'public/vendor/*.min.js'
                ]
            },
            //03
            minifiedCSS: {
                src: [
                    'public/vendor/*.min.css'
                ]
            },
            //04
            vendorJS: {
                src: ['public/vendor/js/**']
            },
            //05
            vendorCSS: {
                src: ['public/vendor/css/**']
            },
            //06
            vendorFONTS: {
                src: ['public/fonts/**']
            },
            //07
            vendor: {
                src: ['public/vendor/']
            }
        },
        /** TASK 05 : CSS minified **/
        cssmin: {
            //01
            vendor: {
                files: {
                    'public/vendor/main.min.css': [
                        'public/vendor/css/bootstrap.css',
                        'public/vendor/css/font-awesome.css',
                        'public/vendor/css/semantic.css',
                        'public/vendor/css/jquery-ui.css'
                    ]
                }
            }
        },
        /** TASK 06 : JS Validate **/
        jsvalidate: {
            options: {
                globals: {},
                esprimaOptions: {},
                verbose: false
            },
            targetName: {
                files: {
                    src: [
                        '*.js',
                        'controllers/*.js',
                        'models/*.js',
                        'tools/*.js'
                    ]
                }
            }
        }
    });

    /** Register keywords to some combination of tasks **/
    grunt.registerTask('dropConnections', function() {
        var done = this.async();
        var MongoClient = require('mongodb').MongoClient
        var url = require('./tools/database').connectionString4Database;

        MongoClient.connect(url, function(err, db) {
            console.log("Connected correctly to MongoDB via grunt");
            db.collection('connections').drop(function(err, reply) {
                if (reply === false) {
                    console.log(err);
                } else {
                    db.close(done);
                    console.log('Connections mongodb collections have been dropped and Closing MongoDB Client connection');
                }
            });
        });
    });
    grunt.registerTask('dropFriends', function() {
        var done = this.async();
        var MongoClient = require('mongodb').MongoClient
        var url = require('./tools/database').connectionString4Database;

        MongoClient.connect(url, function(err, db) {
            console.log("Connected correctly to MongoDB via grunt");
            db.collection('friends').drop(function(err, reply) {
                if (reply === false) {
                    console.log(err);
                } else {
                    db.close(done);
                    console.log('Friends mongodb collections have been dropped and Closing MongoDB Client connection');
                }
            });
        });
    });
    grunt.registerTask('dropUpdates', function() {
        var done = this.async();
        var MongoClient = require('mongodb').MongoClient
        var url = require('./tools/database').connectionString4Database;

        MongoClient.connect(url, function(err, db) {
            console.log("Connected correctly to MongoDB via grunt");
            db.collection('updates').drop(function(err, reply) {
                if (reply === false) {
                    console.log(err);
                } else {
                    db.close(done);
                    console.log('Updates mongodb collections have been dropped and Closing MongoDB Client connection');
                }
            });
        });
    });
    grunt.registerTask('build', ['copy', 'uglify', 'cssmin', 'clean:map', 'clean:vendorJS', 'clean:vendorCSS']);
    grunt.registerTask('unbuild', ['clean', 'dropConnections', 'dropFriends', 'dropUpdates']);
    grunt.registerTask('lint', ['jshint', 'jsvalidate']);


};
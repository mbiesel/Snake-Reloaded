module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['src/js/lib/*', 'src/js/*.js'],
                dest: 'public/js/<%= pkg.name %>.min.js'
            }
        },
        // build apps for all distribution
        nodewebkit: {
            options: {
                build_dir: './app', // Where the build version of my node-webkit app is saved
                mac: true, // We want to build it for mac
                win: true, // We want to build it for win
                linux32: true, // We don't need linux32
                linux64: true // We don't need linux64
            },
            src: ['./public/**/*'] // Your node-webkit app
        },
        // make a zipfile
        compress: {
            linux32: {
                options: {
                    archive: 'app/archive/<%= pkg.name %>_linux32.tgz',
                    mode: 'tgz'
                },
                files: [
                    {expand: true, cwd: 'app/releases/Snake-Reloaded/linux32/', src: ['**'], dest: '<%= pkg.name %>_linux32'}
                ]
            },
            linux64: {
                options: {
                    archive: 'app/archive/<%= pkg.name %>_linux64.tgz',
                    mode: 'tgz'
                },
                files: [
                    {expand: true, cwd: 'app/releases/Snake-Reloaded/linux64/', src: ['**'], dest: '<%= pkg.name %>_linux64'}
                ]
            },
            mac: {
                options: {
                    archive: 'app/archive/<%= pkg.name %>_mac.tgz',
                    mode: 'tgz'
                },
                files: [
                    {expand: true, cwd: 'app/releases/Snake-Reloaded/mac/', src: ['**'], dest: '<%= pkg.name %>mac'}
                ]
            },
            win: {
                options: {
                    archive: 'app/archive/<%= pkg.name %>_win.zip'
                },
                files: [
                    {expand: true, cwd: 'app/releases/Snake-Reloaded/win/', src: ['**'], dest: '<%= pkg.name %>_win'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.loadNpmTasks('grunt-node-webkit-builder');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'nodewebkit', 'compress']);
    grunt.registerTask('app', ['nodewebkit']);
    grunt.registerTask('min', ['uglify']);
    grunt.registerTask('zip', ['compress']);

};
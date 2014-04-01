// 'use strict';

// module.exports = function (grunt) {
//   // Load grunt tasks automatically
//   require('load-grunt-tasks')(grunt);

//   // Time how long tasks take. Can help when optimizing build times
//   require('time-grunt')(grunt);

//   // Define the configuration for all the tasks
//   grunt.initConfig({
//     // Project settings
//     paths: {
//       publ: 'public',
//       dist: 'dist',
//       server: 'server'
//     },

//     // Empties folders to start fresh
//     clean: {
//       dist: {
//         files: [{
//           dot: true,
//           src: [
//             '.tmp',
//             '<%= paths.dist %>/*',
//             '!<%= paths.dist %>/.git*'
//           ]
//         }]
//       }
//     },

//     imagemin: {
//       dist: {
//         files: [{
//           expand: true,
//           cwd: '<%= paths.public %>/img',
//           src: '{,*/}*.{png,jpg,jpeg,gif}',
//           dest: '<%= paths.dist %>/public/img'
//         }]
//       }
//     },
//     svgmin: {
//       dist: {
//         files: [{
//           expand: true,
//           cwd: '<%= paths.public %>/img',
//           src: '{,*/}*.svg',
//           dest: '<%= paths.dist %>/public/img'
//         }]
//       }
//     },
//     ngmin: {
//       dist: {
//         files: [{
//           expand: true,
//           cwd: '.tmp/concat/scripts',
//           src: '*.js',
//           dest: '.tmp/concat/scripts'
//         }]
//       }
//     },
//     cssmin: {
//       dist: {
//         files: {
//           '<%= paths.dist %>/public//main.css': [
//             '.tmp/styles/{,*/}*.css',
//             '<%= paths.app %>/styles/{,*/}*.css'
//           ]
//         }
//       }
//     }




//   });
// }

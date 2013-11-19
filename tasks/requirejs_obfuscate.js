/*
 * grunt-requirejs-obfuscate
 * https://github.com/stevensacks/grunt-requirejs-obfuscate
 *
 * Copyright (c) 2013 Steven Sacks
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('requirejs_obfuscate', 'Obfuscate requirejs package names', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      salt: 'salt'
    });

    grunt.log.writeln('Hashing requirejs packages in ' + options.dir);

    grunt.file.recurse(options.dir, function(abspath, rootdir, subdir, filename)
    {
      if (options.exclude.indexOf(abspath.substr(rootdir.length + 1)) == -1)
      {
        var src = grunt.file.read(abspath);
        var paths = {};
        setPaths(src, options, 'define', paths);
        setPaths(src, options, 'require', paths);
        var hashed = false;
        for (var p in paths)
        {
          src = src.split("'" + p + "'").join("'" + paths[p] + "'");
          if (options.output) grunt.log.writeln("'" + p + "' > '" + paths[p] + "'");
          hashed = true;
        }
        if (hashed)
        {
          grunt.file.write(abspath, src, 'utf8');
          grunt.log.writeln('File ' + abspath + ' hashed');
        }
      }
    });
  });
  var setPaths = function(src, options, type, obj) 
  {
    var crypto = require('crypto');
    var endIndex = 0;
    while (endIndex > -1)
    {
      var startIndex = src.indexOf("'" + options.root + "/", endIndex);
      if (startIndex > -1)
      {
        endIndex = src.indexOf("'", startIndex + 1);
        var path = src.substring(startIndex + 1, endIndex);
        if (path.match(/.*\/.*/)) 
        {
          var parts = path.split(/\//);
          var cleanPath = '';
          var hashPath = '';
          for (var j = 0; j < parts.length; j++) 
          {
            var shasum = crypto.createHash('sha1');
            shasum.update(parts[j] + options.salt, 'utf8');
            var hash = shasum.digest('hex');
            var c;
            for (c = 0; c < hash.length; c++)
            {
              var code = hash.charCodeAt(c);
              if (code > 96 && code < 103) break;
            }
            cleanPath += parts[j] + '/';
            hashPath += hash.substr(c, 6) + '/';
          }
          cleanPath = cleanPath.substr(0, cleanPath.length - 1);
          hashPath = hashPath.substr(0, hashPath.length - 1);
          obj[cleanPath] = hashPath;
        }
      }
      else endIndex = -1;
    }
    return obj;
  };
};
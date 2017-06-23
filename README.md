# grunt-requirejs-obfuscate

> Obfuscate requirejs package names

## Getting Started
This plugin requires Grunt `~0.4.5

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-requirejs-obfuscate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-requirejs-obfuscate');
```

## The "requirejs_obfuscate" task

### Overview
This plugin will obfuscate your package path names consistently, even across multiple files (if you're using a multi-file requirejs site, for instance).

It uses a salted SHA1 hash, truncated to 6 characters, and ensures the first character in any hash to be a letter.

This plugin is meant to be run on compiled requirejs code. I recommend cleaning up the compile directory of unnecessary files before running this task using grunt-contrib-clean.

In your project's Gruntfile, add a section named `requirejs_obfuscate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  requirejs_obfuscate: {
    options: {
        dir: 'www/js',
        salt: 'salt',
        root: 'com',
        length: 6,
        quotes: 'any',
        exclude: [
            'lib/require.js',
            'lib/jquery-2.0.3.js'
        ],
        output: false
    }
  },
})
```

### Options

#### options.dir
Type: `String`

This must be set to the folder where your compiled requirejs files are. From your require.js options.js file, combine dir and baseUrl without a trailing slash.

#### options.salt
Type: `String`
Default value: `'salt'`

This is the salt that will be used to hash each of your package paths and classes.

#### options.root
Type: `String`

This is required. It must be set to the root folder where your packages reside. This does not currently support multiple root packages.

#### options.length
Type: `Integer`
Default value: `6`

The length of each hash. Allows a range of 3-16 characters. Higher numbers reduce chance of duplicates. The default value of 6 seems like a safe length for most projects.

#### options.quotes
Type: `String`
Default value: `'any'`

Set this to whatever your package paths are wrapped with (single or double quotes) if it is consistent. You can also set this to "'" or '"'. For example, uglify converts single quotes into double quotes, so if you are not uglifying your code, you might set this to "single" and if you are, you would leave this out or set it to "double".

#### options.exclude
Type: `Array`
Default value: `[]`

This is an array of files to exclude from hashing. Most of the time you won't need to set this to anything, but you never know.

#### options.output
Type: `Boolean`
Default value: `false`

Set to true if you want to see each package path and their respective hashes output into the terminal.


### Usage Examples

#### Default Options
In this example, your compiled files are in the "src/js" directory and your package root is "app".

```js
grunt.initConfig({
  options: {
      dir: 'src/js',
      root: 'app'
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

This code does not currently have any unit tests. It could probably also use some better methodology to find and replace hashes, such as more advanced regex.

I have tested this on a real project with multiple files and it works perfectly.

TODO: Prevent duplicate hashes for the filename part (just in case).

## Release History
0.1.0 - Initial Release

0.1.2 - Added some extra options

0.1.3 - Remove package debug logging

0.2.0 - Add compatibility with Grunt 1.x

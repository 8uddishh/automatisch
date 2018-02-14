'use strict';
const PLUGIN_NAME = 'gulp-register'

var through = require('through2'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    PluginError = gutil.PluginError,
    path = require('path')

var registerHbs = function(hbs) {
    return through.obj(function (file, enc, callback) {
        let hbsContent = fs.readFileSync(file.path, 'utf8')
        let partials = path.basename(file.path).replace(".hbs", "").split("-")
        for(var i = 1; i< partials.length; i++) {
            partials[i] = `${partials[i].charAt(0).toUpperCase()}${partials[i].slice(1)}`
        }
        hbs.registerPartial(partials.join(""), hbsContent)
        return callback()
    })
}

module.exports = registerHbs
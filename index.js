var shader = require('gl-shader')
var glslify = require('glslify')
var _ = require('lodash')

module.exports = Material

function Material (opts) {
  if (!(this instanceof Material)) return new Material(opts)
  opts = opts || {}
  if (!opts.gl) throw Error ("Must provide a weblgl context")
  if (!opts.fragment) throw Error ("Must provide a fragment shader")
  var self = this

  var fragment = opts.fragment
  _.forEach(opts.constants, function (value, key) {
    var re = new RegExp('{{ ' + key + ' }}', 'g')
    fragment = fragment.replace(re, value)
  })

  self.shader = shader(opts.gl, glslify('./vertex.glsl'), fragment)
  self.uniforms = opts.uniforms
}
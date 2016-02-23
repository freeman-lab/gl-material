var shader = require('gl-shader')
var glslify = require('glslify')
var _ = require('lodash')

module.exports = Material

function Material (gl, data, constants) {
  if (!(this instanceof Material)) return new Material(gl, data, constants)
  if (!gl) throw Error ("Must provide a weblgl context")  
  if (!data.fragment) throw Error ("Must provide a fragment shader")
  var self = this

  var fragment = data.fragment

  _.forEach(constants, function (value, key) {
    var re = new RegExp(key, 'g')
    fragment = fragment.replace(re, value)
  })

  self.shader = shader(gl, glslify('./vertex.glsl'), fragment)
  self.defaults = _.mapValues(data.uniforms, 'default')
}
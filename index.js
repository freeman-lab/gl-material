var shader = require('gl-shader')
var glslify = require('glslify')
var foreach = require('lodash.foreach')
var mapvalues = require('lodash.mapvalues')

module.exports = function material (gl, data, constants) {
  if (!gl) throw Error('Must provide a weblgl context')
  if (!data) throw Error('Must provide material data shader')
  if (!data.fragment) throw Error('Must provide fragment shader')

  foreach(constants, function (value, key) {
    var re = new RegExp(key, 'g')
    data.fragment = data.fragment.replace(re, value)
  })

  return {
    shader: shader(gl, glslify('./vertex.glsl'), data.fragment),
    defaults: mapvalues(data.styles, 'default')
  }
}

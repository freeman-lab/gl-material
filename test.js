var context = require('gl-context')
var test = require('tape')
var material = require('./index')

var canvas = document.body.appendChild(document.createElement('canvas'))
var gl = context(canvas)

test('construction', function (t) {
  var flat = {
    fragment: 'precision highp float; struct Style {vec3 color;};uniform Style style;void main() {gl_FragColor = vec4(style.color, 1.0);}',
    style: {
      color: {type: 'vec3', default: [0, 100, 0]}
    },
    name: 'my-flat-material'
  }
  var result = material(gl, flat)
  t.ok(result.shader, 'shader defined')
  t.deepEqual(result.defaults.color, [0, 100, 0])
  t.end()
})


test('replacement', function (t) {
  var flat = {
    fragment: 'precision highp float; uniform vec3 test[COUNT]; struct Style {vec3 color;};uniform Style style;void main() {gl_FragColor = vec4(style.color, 1.0);}',
    style: {
      color: {type: 'vec3', default: [0, 100, 0]}
    },
    name: 'my-flat-material'
  }
  var result = material(gl, flat, {'COUNT': 10})
  t.ok(result.shader, 'shader defined')
  t.equal(result.shader._fref.src.indexOf('test[10]'), 36)
  t.deepEqual(result.defaults.color, [0, 100, 0])
  t.end()
})
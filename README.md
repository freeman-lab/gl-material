# gl-material

Standard format and constructor for reusable 3d materials.

A **material** is defined as an object with three properties:
- `fragment` a fragment shader
- `styles` a object describing all parameters that can vary, grouped into a single struct in the shader
- `name` a string

**Why is this useful?** By using a common format, we can publish and share materials as npm modules! It's slightly higher level than publishing raw shader code, and lets us specify shaders alongside their parameters. 

This module exposes a single function that takes an object in the standard format and generates a compiled shader program using [`gl-shader`](https://github.com/stackgl/gl-shader) and [`glslify`](https://github.com/stackgl/glslify), by adding a generic vertex shader (see below), and optionally performing string replacement for constants.

## install

Add to your project with
```
npm install gl-material
```

## modules

The following modules can help you work with materials:
- [`gl-demo-material`](http://github.com/freeman-lab/gl-demo-material) demo your material with an interactive style panel
- [`gl-test-material`](http://github.com/freeman-lab/gl-test-material) validate your material with predefined tests

And the following materials are published as npm modules:
- [`gl-material-lambert`](https://github.com/freeman-lab/gl-material-lambert)
- [`gl-material-normal`](https://github.com/freeman-lab/gl-material-normal)

If you make one, publish it to npm as `gl-material-x`, and submit a PR to this repo to add it to the list!


## example

Here's the definition of a flat material determined by a color:

```javascript
var flat = {
	fragment: `precision highp float;\ 
		struct Style {\
			vec3 color;\
		};\
		uniform Style style;\
		void main() {\
			gl_FragColor = vec4(style.color, 1.0);\
		}`
	styles: {
		color: {type: 'vec3', default: [0, 100, 0]}
	},
	name: 'my-flat-material'
}
```

and we can construct a compiled shader program from this object

```javascript
var material = require('gl-material')(gl, flat)
```

## usage

#### `material = require('gl-material')(gl, data, [constants])`

Generate a compiled shader program for your material by providing these arguments
- `gl` webgl context
- `data` object with material data
- `constants` optional mapping from string keys to values with which to replace them, e.g `{LIGHTCOUNT: 1}`

The result has two properties
- `material.shader` compiled shader program
- `material.defaults` default value for each style

## vertex shader

The included **vertex shader** is generic, and has the following properties, which should cover a variety of use cases:

*attributes*
- `position` vec3
- `normal` vec3
- `uv` vec2

*uniforms*
- `projection` mat4
- `view` mat4
- `model` mat4
- `modelNormal` mat3

*varying* properties provided to the **fragment shader**
- `vposition` vec3
- `vnormal` vec3
- `vuv` vec3
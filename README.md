# gl-material

Standard definition for reusable 3d materials! A `material` is an object with three properties:
- a `style` definition
- a `fragment` shader
- a `name`

The `style` corresponds to a single struct in the shader, passed as a uniform, that contains all adjustable parameters. We specify in our material definition all accepted styles, their types, and their default values.

**Why is this useful?** By using a common format, we can publish materials as modules to npm! It's slightly higher level than publishing raw shader code, and lets us specify shaders alongside their parameters. 

This module takes an object in the standard format and generates a compiled shader program using `gl-shader` and `glslify`, by adding a generic vertex shader (see below), and optionally performing string replacement for constants.

You can also use `gl-demo-material` to demo your material with an interactive panel for setting its parameters.

## list of materials

These materials are published as npm modules:
- [gl-lambert-material](https://github.com/freeman-lab/gl-lambert-material)
- [gl-normal-material](https://github.com/freeman-lab/gl-normal-material)

If you make one, publish it to npm as `gl-x-material`, and submit a PR to this repo to add it to the list!

## install

Add to your project with
```
npm install gl-scene-material
```

## example

Here's the definition of a flat material determined by a color:

```javascript
var flat = {
	fragment: 'precision highp float;\ 
		struct Style {\
			vec3 color;\
		};\
		uniform Style style;\
		void main() {\
			gl_FragColor = vec4(style.color, 1.0);\
		}'
	style: {
		color: {type: 'vec3', default: [0, 100, 0]}
	},
	name: 'my-flat-material'
}
```

and we can construct a compiled shader program from this object

```javascript
var material = require('gl-scene-material')(gl, flat)
```

## usage

#### `material = require('gl-scene-material')(gl, data, [constants])`

Generate a compiled shader program for your material by providing these arguments
- `gl` webgl context
- `data` object with material data
- `constants` optional mapping from string keys to values with which to replace them, e.g `{LIGHTCOUNT: 1}`

The result has two properties
- `material.shader` compiled shader program
- `material.defaults` default value for each style

## vertex shader

The included **vertex shader** is fairly generic, and should cover most use cases in basic scene rendering:

attributes
- `position` vec3
- `normal` vec3
- `uv` vec3

uniforms
- `projection` mat4
- `view` mat4
- `model` mat4
- `modelNormal` mat3

varying properties provided to the **fragment shader**
- `vposition` vec3
- `vnormal` vec3
- `vuv` vec3
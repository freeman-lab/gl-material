# gl-scene-material

Reusable materials for 3d scenes for use with [`stack.gl`](http://stack.gl). Works well with [`gl-scene`](https://github.com/freeman-lab/gl-scene) but can also be used on its own.

A `material` is defined simply as an object with two properties, a set of `uniforms` and a `fragment` shader, where the uniforms are grouped together into a struct in the shader. This module takes one of these objects and generates a compiled shader program, by adding a generic vertex shader, and optionally performing string replacement on the fragment shader for any constants.

Here's a simple example of a material

```javascript
{
	fragment: `
		precision highp float;
		struct Style {
			vec3 color;
		}
		uniform Style style
		void main() {
	  		gl_FragColor = vec4(style.color, 0.5);
		}`,
	uniforms: {
		color: {type: 'vec3', default: [0, 0, 0]}
	}
}
```

Here are example materials:
- [lambert](https://github.com/freeman-lab/gl-scene-lambert-material)
- [normal](https://github.com/freeman-lab/gl-scene-normal-material)

If you make a new one just publish it as `gl-scene-x-material`, and submit a pull request to this repo to add it to the list.

## install

Add to your project with
```
npm install gl-scene-material
```

## example 

Generate a `normal` material 

```javascript
var normal = require('gl-scene-normal-material')
var material = require('gl-scene-material')(gl, normal)
```

Generate a `lambert` material, additionally specifying the number of lights as 1

```javascript
var lambert = require('gl-scene-lambert-material')
var material = require('gl-scene-material')(gl, lambert, {LIGHTCOUNT: 1})
```

## usage

##### var material = require('gl-scene-material')(gl, data, [constants])

Generate a compiled shader for your material 

Inputs
- `gl` webgl context
- `data` object with material data
- `constants` optional mapping from keys to values to replace

Ouput
- `material.shader` compiled shader program
- `material.defaults` default value for each uniform
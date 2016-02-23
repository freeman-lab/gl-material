# gl-scene-material

Reusable materials for 3d scenes for use with [`stack.gl`](http://stack.gl). A `material` is defined simply as an object with two properties, a list of uniforms and a fragment shader, where the uniforms are grouped together into a struct in the shader.

This module takes one of these objects and generates a compiled shader program, by adding a vertex shader, and optionally performing string replacement on the fragment shader for any constants.

Here are example materials:


If you make a new one just publish it as `gl-scene-x-material`!

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

Generate a `lambert` material, additionally specifying the number of lights

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
- `constants` optional

Ouput
- `material.shader` compiled shader
- `material.defaults` default value for each uniform
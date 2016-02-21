precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec3 uv;

uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;
uniform mat3 modelNormal;

varying vec3 vposition;
varying vec3 vnormal;
varying vec3 vuv;

void main() {
  vposition = (model * vec4(position, 1.0)).xyz;
  vnormal = normalize(modelNormal * normal);
  gl_Position = projection * view * vec4(vposition, 1.0);
}

#pragma glslify: export(main)
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

const float PI = 3.14159265358979323846;

vec2 fixAspect(vec2 _uv) {
  _uv -= 0.5;
  _uv.y /= resolution.x / resolution.y;
  _uv += 0.5;
  return _uv;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  uv = fixAspect(uv);

  vec2 m = mouse;
  m = fixAspect(m);

  float d = 0.05 / length(uv - m);

  vec3 color = vec3(d, uv);
  gl_FragColor = vec4(color, 1.0);
}
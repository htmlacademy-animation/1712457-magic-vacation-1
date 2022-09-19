precision mediump float;

uniform sampler2D map;
uniform float delta;

varying vec2 vUv;

// source: https://gist.github.com/mairod/a75e7b44f68110e1576d77419d608786?permalink_comment_id=2987780
vec3 applyHue(vec3 aColor, float aHue)
{
  float angle = radians(aHue);
  vec3 k = vec3(0.57735, 0.57735, 0.57735);
  float cosAngle = cos(angle);
  return aColor * cosAngle + k * aColor * sin(angle) + k * dot(k, aColor) * (1.0 - cosAngle);
}

void main() {
  vec4 texel = texture2D(map, vUv);

  vec4 outputColor = texel;
  outputColor.rgb = applyHue(outputColor.rgb, delta);

  gl_FragColor = outputColor;
}

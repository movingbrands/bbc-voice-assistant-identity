precision mediump float;

attribute vec2 aGridPosition;

attribute vec3 aPosition;  
attribute float aOffset;  

uniform mat4 uProjectionMatrix;
uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uHotspot;
uniform float uMovement;
uniform float uSpeed;
uniform float uSize;
uniform float uWave;
uniform float uPulse;

// smooth edge for sdf
float smoothedge(float v) {
  return smoothstep(0., 1. / uResolution.x, v);
}

float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}
// blurred edge for sdf
float blurEdge(float v, float amount) {
  return smoothstep(0., (amount) / uResolution.x, v);
}

  // ring sdf
float ring(vec2 p, float radius, float width, float blur) {
  return 1.0 - blurEdge(abs(length(p) - radius * 0.5) - width, blur);
}

// maps value from one range to another
float mapRange(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

// applies a cheap 3d effect based top-down camera
vec2 mapZ(float amount, vec2 extent) {
  return vec2(
    mapRange(aGridPosition.x, 0.0, 1.0, -extent.x, extent.x),
    0.0
  ) * amount;
}

float random (in float x) {
    return fract(sin(x)*1e4);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec3 p) {
    const vec3 step = vec3(110.0, 241.0, 171.0);

    vec3 i = floor(p);
    vec3 f = fract(p);

    // For performance, compute the base input to a
    // 1D random from the integer part of the
    // argument and the incremental change to the
    // 1D based on the 3D -> 1D wrapping
    float n = dot(i, step);

    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix( mix(mix(random(n + dot(step, vec3(0,0,0))),
                        random(n + dot(step, vec3(1,0,0))),
                        u.x),
                    mix(random(n + dot(step, vec3(0,1,0))),
                        random(n + dot(step, vec3(1,1,0))),
                        u.x),
                u.y),
                mix(mix(random(n + dot(step, vec3(0,0,1))),
                        random(n + dot(step, vec3(1,0,1))),
                        u.x),
                    mix(random(n + dot(step, vec3(0,1,1))),
                        random(n + dot(step, vec3(1,1,1))),
                        u.x),
                u.y),
            u.z);
}

float pulse() {
  float invAr = (uResolution.y / uResolution.x);
  vec2 uv = aGridPosition.xy * 0.3;
	vec2 center = vec2(0.0,0.0);
  float speed = 0.035;

	vec3 col = vec4(uv,0.5+0.5*sin(uTime),1.0).xyz;
   
     vec3 texcol;
			
	float x = (center.x-uv.x);
	float y = (center.y-uv.y) *invAr;
		
	//float r = -sqrt(x*x + y*y); //uncoment this line to symmetric ripples
	float r = -(x*x + y*y);
	float z = 1.0 + 0.5*sin((r+uTime*uSpeed)/0.013);
  return mix(1.0, z, uPulse);
}

float smoothen(float d1, float d2) {
    float k = 1.396;
    return -log(exp(-k * d1) + exp(-k * d2)) / k;
}

  void main(){
  
    vec2 origin = aGridPosition.xy;
    vec2 grid = vec2(1.0);
    float t0 = sin(uTime * 3.9) * (.25 * uMovement);
    float t1 = sin(uTime * 1.4) * (.29 * uMovement);
    float t2 = cos(uTime * 3.336) * (.37 * uMovement);
  
    vec2 p0 = vec2(t1,t0) + (uHotspot * grid);
    vec2 p1 = vec2(t2,t0) + (uHotspot * grid);
    vec2 p2 = vec2(t0,t1) + (uHotspot * grid);

    float d = smoothen(distance(origin, p0) * 10.0, distance(origin, p1) * uSize);
    d = smoothen(d, distance(origin, p2) * uSize);
    d *= pulse();

    float yPos = 0.0;

    vec3 pos = vec3(origin*1.0,uTime*0.5);
  
    yPos = noise(pos);
  
    gl_PointSize = uSize - d;
    gl_Position = vec4(aPosition, 1.0);
    gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4( aGridPosition, yPos * 0.6 * uWave, 0.91);
  }

export const goldenThreadFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorStart;
  uniform vec3 uColorMid;
  uniform vec3 uColorEnd;
  uniform float uOpacity;
  
  varying vec2 vUv;
  varying float vProgress;
  varying vec3 vPosition;
  
  void main() {
    // Triple gradient
    vec3 color1 = mix(uColorStart, uColorMid, smoothstep(0.0, 0.5, vProgress));
    vec3 color2 = mix(uColorMid, uColorEnd, smoothstep(0.5, 1.0, vProgress));
    vec3 color = mix(color1, color2, step(0.5, vProgress));
    
    // Flowing light
    float flow = sin(vProgress * 10.0 - uTime * 3.0) * 0.5 + 0.5;
    float glow = pow(flow, 3.0);
    
    // Core brightness
    float core = smoothstep(0.3, 0.7, vUv.x) * smoothstep(0.7, 0.3, vUv.x);
    
    // Final color
    vec3 finalColor = color * (1.0 + glow * 2.0) * (0.5 + core * 1.5);
    
    // Edge fade
    float edgeFade = smoothstep(0.0, 0.1, vProgress) * smoothstep(1.0, 0.9, vProgress);
    
    gl_FragColor = vec4(finalColor, uOpacity * edgeFade * (0.7 + core * 0.3));
  }
`;

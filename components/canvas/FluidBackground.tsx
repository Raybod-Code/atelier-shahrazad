'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uBase;     // charcoal
uniform vec3 uNoise;    // dark warm
uniform vec3 uGold;     // highlight gold
varying vec2 vUv;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  float t = uTime * 0.22;

  // Base noise field
  float n1 = snoise(vUv * 2.6 + vec2(t));
  float m1 = clamp(n1 * 0.5 + 0.5, 0.0, 1.0);
  m1 = smoothstep(0.25, 0.85, m1);

  // Base blend (charcoal -> warm dark)
  vec3 color = mix(uBase, uNoise, m1);

  // ---- Gold shimmer (fake specular / shine) ----
  // 1) high-frequency noise for sparkly areas
  float n2 = snoise(vUv * 9.0 + vec2(t * 1.4, -t * 1.1));
  float sparkleMask = smoothstep(0.62, 0.92, n2 * 0.5 + 0.5);

  // 2) moving band to feel like "shining sweep"
  float band = sin((vUv.x * 1.2 + vUv.y * 0.8 + t) * 6.2831);
  band = smoothstep(0.55, 0.95, band);

  // 3) tighten highlight (smaller = shinier)
  float shine = pow(sparkleMask * band, 3.0);

  // Add highlight last so it pops [web:252]
  color += uGold * shine * 0.55;

  // Soft vignette
  float d = distance(vUv, vec2(0.5));
  color *= smoothstep(0.95, 0.30, d);

  gl_FragColor = vec4(color, 1.0);

  // Correct output colorspace for ShaderMaterial [web:179][web:184]
  #include <colorspace_fragment>
}
`;

function GradientPlane() {
  const mesh = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBase: { value: new THREE.Color('#0B0B0C') },   // charcoal
      uNoise:{ value: new THREE.Color('#1F1C15') },   // muted dark gold (یا '#1A1A1E')
      uGold: { value: new THREE.Color('#C7A56A') },   // سایت: gold
    }),
    []
  );

  useFrame((state) => {
    (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
      state.clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function FluidBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="w-full h-full">
      {mounted ? (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          onCreated={({ gl }) => {
            gl.setClearColor('#0B0B0C', 1);
          }}
        >
          <GradientPlane />
        </Canvas>
      ) : null}
    </div>
  );
}

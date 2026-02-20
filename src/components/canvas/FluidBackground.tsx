'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// ─────────────────────────────────────────────
// Shaders — بدون تغییر (خودته)
// ─────────────────────────────────────────────

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uNoise;
uniform vec3 uGold;
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
  g.x  = a0.x * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  float t = uTime * 0.22;

  float n1  = snoise(vUv * 2.6 + vec2(t));
  float m1  = clamp(n1 * 0.5 + 0.5, 0.0, 1.0);
  m1 = smoothstep(0.25, 0.85, m1);

  vec3 color = mix(uBase, uNoise, m1);

  float n2          = snoise(vUv * 9.0 + vec2(t * 1.4, -t * 1.1));
  float sparkleMask = smoothstep(0.62, 0.92, n2 * 0.5 + 0.5);
  float band        = sin((vUv.x * 1.2 + vUv.y * 0.8 + t) * 6.2831);
  band = smoothstep(0.55, 0.95, band);
  float shine = pow(sparkleMask * band, 3.0);

  color += uGold * shine * 0.55;

  float d = distance(vUv, vec2(0.5));
  color *= smoothstep(0.95, 0.30, d);

  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
`;

// ─────────────────────────────────────────────
// Gradient Plane
// ─────────────────────────────────────────────

function GradientPlane() {
  const mesh    = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  // ✅ فقط یه بار ساخته می‌شه
  const uniforms = useMemo(() => ({
    uTime:  { value: 0 },
    uBase:  { value: new THREE.Color('#0B0B0C') },
    uNoise: { value: new THREE.Color('#1F1C15') },
    uGold:  { value: new THREE.Color('#C7A56A') },
  }), []);

  // ✅ فقط uTime آپدیت می‌شه — بقیه ثابتن
  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
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

// ─────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────

export default function FluidBackground() {
  const [mounted, setMounted] = useState(false);

  // ✅ فقط بعد از mount نشون بده — جلوگیری از SSR مشکل
  useEffect(() => { setMounted(true); }, []);

  // ✅ موبایل → canvas نداریم، فقط gradient ساده CSS
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  if (!mounted) return null;

  // ─── موبایل: CSS fallback ──────────────────
  if (isTouch) {
    return (
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(199,165,106,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(199,165,106,0.04) 0%, transparent 50%), #0B0B0C',
        }}
      />
    );
  }

  // ─── Desktop: WebGL ────────────────────────
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      // ✅ dpr حداکثر 1.5 — قبلاً 2 بود
      dpr={[1, 1.5]}
      // ✅ antialias: false روی background لازم نیست
      gl={{
        antialias:        false,
        alpha:            false,
        powerPreference:  'high-performance',
        // ✅ وقتی تب فعال نیست، render متوقف می‌شه
      }}
      frameloop="always"
      style={{
        position: 'absolute',
        inset:     0,
        width:    '100%',
        height:   '100%',
        zIndex:   -1,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#0B0B0C', 1);
      }}
    >
      <GradientPlane />
    </Canvas>
  );
}

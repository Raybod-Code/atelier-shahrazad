"use client";

import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import type { ThreeElement } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Stars,
  Sparkles,
  Float,
  shaderMaterial,
} from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import {
  Vector3,
  Vector2,
  CatmullRomCurve3,
  TubeGeometry,
  AdditiveBlending,
  Color,
  DoubleSide,
  MathUtils,
  Mesh,
} from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// 1. شیدرهای نخ طلایی
// ─────────────────────────────────────────────
const VignetteEffect = Vignette as any;
const goldenThreadVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  varying vec2 vUv;
  varying float vProgress;
  varying vec3 vPosition;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0,i1.y,1.0)) + i.x + vec3(0.0,i1.x,1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vPosition = position;
    vProgress = uv.x;
    vec3 pos = position;
    float wave = snoise(vec2(position.z * 0.1, uTime * 0.3)) * 0.3;
    pos.x += wave;
    pos.y += snoise(vec2(position.z * 0.15, uTime * 0.2 + 100.0)) * 0.3;
    float pulse = sin(position.z * 0.5 - uTime * uSpeed) * 0.1;
    pos += normal * pulse;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const goldenThreadFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorStart;
  uniform vec3 uColorMid;
  uniform vec3 uColorEnd;
  uniform float uOpacity;
  varying vec2 vUv;
  varying float vProgress;
  varying vec3 vPosition;

  void main() {
    vec3 color1 = mix(uColorStart, uColorMid, smoothstep(0.0, 0.5, vProgress));
    vec3 color2 = mix(uColorMid, uColorEnd, smoothstep(0.5, 1.0, vProgress));
    vec3 color = mix(color1, color2, step(0.5, vProgress));
    float flow = sin(vProgress * 10.0 - uTime * 3.0) * 0.5 + 0.5;
    float glow = pow(flow, 3.0);
    float core = smoothstep(0.3, 0.7, vUv.y) * smoothstep(0.7, 0.3, vUv.y);
    vec3 finalColor = color * (1.0 + glow * 2.0) * (0.5 + core * 1.5);
    float edgeFade = smoothstep(0.0, 0.1, vProgress) * smoothstep(1.0, 0.9, vProgress);
    gl_FragColor = vec4(finalColor, uOpacity * edgeFade * (0.7 + core * 0.3));
  }
`;

// ─────────────────────────────────────────────
// 2. Custom Shader Material
// ─────────────────────────────────────────────

const GoldenMaterial = shaderMaterial(
  {
    uTime: 0,
    uSpeed: 2.0,
    uColorStart: new Color("#8B7355"),
    uColorMid: new Color("#C7A56A"),
    uColorEnd: new Color("#FFD700"),
    uOpacity: 1.0,
  },
  goldenThreadVertex,
  goldenThreadFragment
);

extend({ GoldenMaterial });

// ✅ R3F v9 + React 19 روش صحیح type declaration
declare module "@react-three/fiber" {
  interface ThreeElements {
    goldenMaterial: ThreeElement<typeof GoldenMaterial>;
  }
}

// ─────────────────────────────────────────────
// 3. تنظیمات منحنی دوربین
// ─────────────────────────────────────────────

const CURVE_POINTS = [
  new Vector3(0, 0, 5),
  new Vector3(0, 0, -10),
  new Vector3(3, 2, -30),
  new Vector3(-3, -2, -60),
  new Vector3(0, 0, -90),
  new Vector3(0, 0, -120),
];

// ─────────────────────────────────────────────
// 4. نخ طلایی
// ─────────────────────────────────────────────

function GoldenThread() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<InstanceType<typeof GoldenMaterial>>(null);

  const curve = useMemo(
    () => new CatmullRomCurve3(CURVE_POINTS, false, "catmullrom", 0.5),
    []
  );

  const tubeGeometry = useMemo(
    () => new TubeGeometry(curve, 400, 0.05, 20, false),
    [curve]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} geometry={tubeGeometry}>
        <goldenMaterial
          ref={materialRef}
          transparent
          side={DoubleSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

// ─────────────────────────────────────────────
// 5. کنترل دوربین با اسکرول
// ─────────────────────────────────────────────

function CameraController() {
  const { camera, pointer } = useThree();
  const progress = useRef({ value: 0 });

  const curve = useMemo(
    () => new CatmullRomCurve3(CURVE_POINTS, false, "catmullrom", 0.5),
    []
  );

  // ✅ useEffect به جای useLayoutEffect — بدون SSR warning
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progress.current, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.5,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  useFrame(() => {
    const p = progress.current.value;
    const point = curve.getPointAt(p);
    const lookAtPoint = curve.getPointAt(Math.min(p + 0.04, 1));

    const targetPos = point.clone();
    targetPos.x += 1.2 + pointer.x * 0.5;
    targetPos.y += 0.6 + pointer.y * 0.5;

    camera.position.lerp(targetPos, 0.05);
    camera.lookAt(lookAtPoint);

    const tangent = curve.getTangentAt(p);
    const targetRotZ = tangent.x * -0.3 + pointer.x * 0.05;
    camera.rotation.z = MathUtils.lerp(camera.rotation.z, targetRotZ, 0.05);
  });

  return null;
}

// ─────────────────────────────────────────────
// 6. محتوای صحنه
// ─────────────────────────────────────────────

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
      <CameraController />

      <ambientLight intensity={0.1} />

      <GoldenThread />

      <Sparkles
        count={400}
        scale={20}
        size={2}
        speed={0.3}
        opacity={0.4}
        color="#FFD700"
      />
      <Sparkles
        count={200}
        scale={10}
        size={4}
        speed={0.2}
        opacity={0.6}
        color="#FFFFFF"
      />
      <Stars
        radius={120}
        depth={60}
        count={6000}
        factor={5}
        saturation={0}
        fade
        speed={0.5}
      />

<EffectComposer disableNormalPass multisampling={0}>
        <Bloom
          luminanceThreshold={0.4}
          mipmapBlur
          intensity={2.0}
          radius={0.6}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.0004, 0.0004)}
        />
        
        {/* از همون متغیر جدیدی که ساختیم بدون هیچ براکتی استفاده می‌کنیم */}
        <VignetteEffect eskil={false} offset={0.1} darkness={1.3} />
        
      </EffectComposer>
    </>
  );
}

// ─────────────────────────────────────────────
// 7. اکسپورت نهایی
// ─────────────────────────────────────────────

export default function Scene() {
  return (
    // ✅ بدون wrapper div اضافه — SceneWrapper مدیریت positioning رو داره
    <Canvas
      style={{ width: "100%", height: "100%" }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: true, // ✅ transparent — پس‌زمینه از CSS میاد
        stencil: false,
        depth: true,
      }}
      dpr={[1, 1.5]}
    >
      <SceneContent />
    </Canvas>
  );
}

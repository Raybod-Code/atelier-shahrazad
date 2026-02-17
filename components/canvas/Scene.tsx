"use client";

import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { 
  Environment, 
  PerspectiveCamera,
  Stars,
  Sparkles,
  Float
} from "@react-three/drei";
import { useRef, useMemo, useLayoutEffect } from "react";
import { 
  Vector3, 
  CatmullRomCurve3,
  TubeGeometry,
  AdditiveBlending,
  Color,
  DoubleSide,
  MathUtils
} from "three";
import { shaderMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------------------------------
// 1. شیدرها (بدون تغییر - چون عالی بودن)
// -----------------------------------------------------------------------------

const goldenThreadVertex = `
  uniform float uTime;
  uniform float uSpeed;
  varying vec2 vUv;
  varying float vProgress;
  varying vec3 vPosition;
  
  // Noise functions...
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ; m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
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

const goldenThreadFragment = `
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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      goldenMaterial: any;
    }
  }
}

// -----------------------------------------------------------------------------
// 2. تنظیمات صحنه حرفه‌ای
// -----------------------------------------------------------------------------

const CURVE_POINTS = [
  new Vector3(0, 0, 5),
  new Vector3(0, 0, -10),
  new Vector3(3, 2, -30),
  new Vector3(-3, -2, -60),
  new Vector3(0, 0, -90),
  new Vector3(0, 0, -120),
];

function GoldenThreadPro() {
  const meshRef = useRef<any>();
  const materialRef = useRef<any>();
  
  const curve = useMemo(() => {
    return new CatmullRomCurve3(CURVE_POINTS, false, "catmullrom", 0.5);
  }, []);

  const tubeGeometry = useMemo(() => {
    return new TubeGeometry(curve, 400, 0.05, 20, false); // ظریف‌تر و گردتر (20)
  }, [curve]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
    // پالسِ زنده‌ی فیزیکی
    if (meshRef.current) {
       meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
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

// ✅ CameraController: اضافه شدن حرکت موس (Parallax) و نرمی بیشتر
function CameraController() {
  const { camera, pointer } = useThree(); // pointer اضافه شد
  const progress = useRef({ value: 0 });
  
  const curve = useMemo(() => {
    return new CatmullRomCurve3(CURVE_POINTS, false, "catmullrom", 0.5);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.to(progress.current, {
            value: 1,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 2.5, // 👈 افزایش اینرسی برای حس لوکس و سنگین
            }
        });
    });
    return () => ctx.revert();
  }, []);

  useFrame((state, delta) => {
    const p = progress.current.value;
    const point = curve.getPointAt(p);
    const lookAtPoint = curve.getPointAt(Math.min(p + 0.04, 1)); // نگاه نرم‌تر (0.04)
    
    // پوزیشن پایه روی منحنی
    const targetPos = point.clone();
    targetPos.x += 1.2;
    targetPos.y += 0.6;

    // 👈 اضافه شدن اثر موس (Parallax)
    // وقتی موس رو تکون میدی، دوربین کمی منحرف میشه
    targetPos.x += (pointer.x * 0.5); 
    targetPos.y += (pointer.y * 0.5);

    // حرکت بسیار نرم (Damping)
    // lerp factor رو کم کردم (0.05) تا حرکت شبیه دوربین فیلمبرداری بشه
    camera.position.lerp(targetPos, 0.05);
    camera.lookAt(lookAtPoint);
    
    // Banking (چرخش در پیچ)
    const tangent = curve.getTangentAt(p);
    
    // ترکیب چرخش پیچ جاده + چرخش موس
    const targetRotZ = (tangent.x * -0.3) + (pointer.x * 0.05);
    camera.rotation.z = MathUtils.lerp(camera.rotation.z, targetRotZ, 0.05);
  });

  return null;
}

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
      <CameraController />
      
      <ambientLight intensity={0.1} />
      
      <GoldenThreadPro />
      
      {/* 👈 ذرات بیشتر و با کیفیت‌تر برای عمق */}
      <Sparkles count={400} scale={20} size={2} speed={0.3} opacity={0.4} color="#FFD700" />
      <Sparkles count={200} scale={10} size={4} speed={0.2} opacity={0.6} color="#FFFFFF" />
      <Stars radius={120} depth={60} count={6000} factor={5} saturation={0} fade speed={0.5} />
      
      <Environment preset="city" />
      
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.8} radius={0.6} /> {/* بلوم بیشتر */}
        <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0004, 0.0004]} 
        />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.2} />
      </EffectComposer>
    </>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-transparent">
      <Canvas
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true
        }}
        dpr={[1, 1.5]}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
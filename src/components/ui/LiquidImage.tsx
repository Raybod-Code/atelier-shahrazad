"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { useInView } from "framer-motion"; // 👈 ایمپورت هوش ناظرِ فریم‌ورک

// ─────────────────────────────────────────────
// شیدر مایع
// ─────────────────────────────────────────────
const LiquidShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHover: 0, 
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float wave = sin(uv.y * 5.0 + uTime * 0.5) * 0.02 * uHover;
      pos.z += wave;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float dist = distance(uv, uMouse);
      float decay = smoothstep(0.8, 0.0, dist);
      
      vec2 distortion = (uMouse - uv) * decay * 0.1 * uHover;
      vec2 finalUV = uv + distortion;
      vec4 color = texture2D(uTexture, finalUV);

      color.rgb += 0.1 * uHover * decay;
      gl_FragColor = color;
    }
  `
);

extend({ LiquidShaderMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      liquidShaderMaterial: any;
    }
  }
}

// ─────────────────────────────────────────────
// صفحه تصویر
// ─────────────────────────────────────────────
function ImagePlane({ src }: { src: string }) {
  const materialRef = useRef<any>(null);
  const texture = useTexture(src);
  const { viewport } = useThree(); 
  
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter; 
  texture.magFilter = THREE.LinearFilter;
  
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        hovered ? 1 : 0,
        0.05 
      );

      const mouse = state.pointer; 
      const targetX = (mouse.x * 0.5) + 0.5;
      const targetY = (mouse.y * 0.5) + 0.5;
      
      materialRef.current.uMouse.x = THREE.MathUtils.lerp(materialRef.current.uMouse.x, targetX, 0.1);
      materialRef.current.uMouse.y = THREE.MathUtils.lerp(materialRef.current.uMouse.y, targetY, 0.1);
    }
  });

  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[viewport.width, viewport.height, 32, 32]} /> 
      <liquidShaderMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────
// کامپوننت اصلی (مجهز به سیستم خواب هوشمند)
// ─────────────────────────────────────────────
export default function LiquidImage({ src, className = "" }: { src: string; alt?: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 👈 این هوک چک می‌کنه آیا این دیو تو مانیتور کاربر دیده می‌شه یا نه؟
  // margin: "100px" یعنی ۱۰۰ پیکسل مونده به اینکه وارد تصویر بشه، شروع به لود شدن کن
  const isInView = useInView(containerRef, { margin: "100px" });

  return (
    <div ref={containerRef} className={`relative overflow-hidden w-full h-full block bg-[#0A0A0B] ${className}`}>
      {/* فقط در صورتی Canvas رو بساز که کاربر در حال دیدنش باشه */}
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: false }} // antialias رو برای پرفورمنس خاموش کردیم (تصویر خودش باکیفیته)
          dpr={[1, 1.5]} 
          className="w-full h-full pointer-events-auto block"
        >
          <Suspense fallback={null}>
            <ImagePlane src={src} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

// تعریف شیدر "مایع خالص" (بدون گلیچ)
const LiquidShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHover: 0, 
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader: فقط هندسه رو کمی موج میده (برای عمق)
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHover;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // موج سینوسی بسیار نرم (مثل پارچه ابریشم)
      float wave = sin(uv.y * 5.0 + uTime * 0.5) * 0.02 * uHover;
      pos.z += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader: تصویر رو مثل آب زلال نشون میده
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // محاسبه فاصله موس برای ایجاد موج نرم
      // به جای نویز رندوم، از یک موج تمیز استفاده میکنیم
      float dist = distance(uv, uMouse);
      float decay = smoothstep(0.8, 0.0, dist);
      
      // اعوجاج خیلی نرم (مثل لنز)
      vec2 distortion = (uMouse - uv) * decay * 0.1 * uHover;
      
      // اعمال اعوجاج به تصویر
      vec2 finalUV = uv + distortion;

      // خواندن رنگ تصویر (بدون جدا کردن کانال‌های رنگی = بدون گلیچ)
      vec4 color = texture2D(uTexture, finalUV);

      // اضافه کردن کمی درخشش (Brightness) موقع هاور برای حس لوکس بودن
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

function ImagePlane({ src }: { src: string }) {
  const meshRef = useRef<any>(null);
  const materialRef = useRef<any>(null);
  const texture = useTexture(src);
  
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearFilter; // کیفیت بالا
  texture.magFilter = THREE.LinearFilter;
  
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      
      // انیمیشن بسیار نرم (Damping)
      materialRef.current.uHover = THREE.MathUtils.lerp(
        materialRef.current.uHover,
        hovered ? 1 : 0,
        0.05 // عدد کمتر = حرکت نرم‌تر و سنگین‌تر
      );

      // نرم کردن حرکت موس
      const mouse = state.pointer; 
      // تبدیل مختصات موس (-1 تا 1) به (0 تا 1) برای UV
      const targetX = (mouse.x * 0.5) + 0.5;
      const targetY = (mouse.y * 0.5) + 0.5;
      
      materialRef.current.uMouse.x = THREE.MathUtils.lerp(materialRef.current.uMouse.x, targetX, 0.1);
      materialRef.current.uMouse.y = THREE.MathUtils.lerp(materialRef.current.uMouse.y, targetY, 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[2, 3, 40, 40]} /> {/* سگمنت بالا برای نرمی موج */}
      <liquidShaderMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}

export default function LiquidImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
        dpr={[1, 2]} // کیفیت رتینا
      >
        <ImagePlane src={src} />
      </Canvas>
    </div>
  );
}
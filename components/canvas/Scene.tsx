"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef, useLayoutEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { Float, Environment, PerspectiveCamera, Sparkles, Stars, Cloud } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";

gsap.registerPlugin(ScrollTrigger);

// --- مسیر سفر (پیچیده‌تر و فضایی‌تر) ---
const CURVE_POINTS = [
  new THREE.Vector3(0, 0, 5),       // شروع
  new THREE.Vector3(0, 0, -20),     // ورود به تونل
  new THREE.Vector3(5, 3, -40),     // اوج گرفتن (Works)
  new THREE.Vector3(-6, -4, -70),   // شیرجه زدن (Process)
  new THREE.Vector3(0, 0, -100),    // پایان در نور (Contact)
];

function ParticleStream({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const points = useMemo(() => curve.getPoints(400), [curve]); // 400 نقطه روی مسیر
  
  return (
    <group>
      {/* 1. مسیر اصلی با ذرات متراکم (نخ نامرئی) */}
      {points.map((point, i) => (
        <group key={i} position={point}>
             {/* هر نقطه از مسیر یک خوشه ستاره است */}
            <Sparkles 
                count={5} 
                scale={2} // پراکندگی کم (متمرکز روی خط)
                size={3} 
                speed={0.2} 
                opacity={0.8}
                color={i % 2 === 0 ? "#FFD700" : "#FFFFFF"} // ترکیب طلا و سفید
            />
        </group>
      ))}

      {/* 2. غبار محیطی (Ambient Dust) */}
      <Sparkles count={500} scale={60} size={5} speed={0.5} opacity={0.3} color="#C7A56A" />
      
      {/* 3. ستاره‌های دوردست */}
      <Stars radius={150} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

function CameraRig({ curve }: { curve: THREE.CatmullRomCurve3 }) {
  const { camera } = useThree();
  const progress = useRef({ value: 0 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 2, // عدد بالاتر = تاخیر و نرمی بیشتر (مثل شنا کردن)
        },
      });

      tl.to(progress.current, {
        value: 1,
        ease: "power1.inOut", // شروع و پایان نرم
      });
    });
    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    const p = progress.current.value;
    
    // موقعیت روی منحنی
    const currentPoint = curve.getPoint(p);
    const lookAtPoint = curve.getPoint(Math.min(p + 0.05, 1)); // نگاه به فاصله نزدیکتر

    // حرکت نرم دوربین
    camera.position.lerp(currentPoint, 0.02); // 0.02 یعنی خیلی نرم (Lagg)
    camera.lookAt(lookAtPoint);

    // اضافه کردن کمی "لرزش دست" (Handheld Feel) برای طبیعی شدن
    const time = state.clock.getElapsedTime();
    camera.position.x += Math.sin(time * 0.5) * 0.2;
    camera.position.y += Math.cos(time * 0.3) * 0.2;
    
    // چرخش ملایم دوربین (Banking) در پیچ‌ها
    camera.rotation.z = Math.sin(time * 0.2) * 0.1; 
  });

  return null;
}

export default function Scene() {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(CURVE_POINTS, false, "catmullrom", 0.5), []);

  return (
    <div className="fixed inset-0 z-[-1] bg-[#050505] pointer-events-none">
      <Canvas gl={{ antialias: false, powerPreference: "high-performance" }}>
        
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
        
        {/* نورپردازی دراماتیک */}
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, -50]} intensity={5} color="#C7A56A" />
        <Environment preset="night" />

        {/* جریان ذرات (جایگزین نخ) */}
        <ParticleStream curve={curve} />
        
        {/* ابرها برای عمق دادن */}
        <Float speed={1}>
            <Cloud position={[-10, -5, -40]} opacity={0.1} color="#C7A56A" />
            <Cloud position={[10, 5, -80]} opacity={0.1} color="#FFFFFF" />
        </Float>

        <CameraRig curve={curve} />

        {/* افکت‌های سینمایی */}
        <EffectComposer disableNormalPass>
          {/* بلوم برای درخشش ذرات طلایی */}
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.6} />
          <Noise opacity={0.08} />
          <Vignette eskil={false} offset={0.1} darkness={1.2} />
        </EffectComposer>

      </Canvas>
    </div>
  );
}
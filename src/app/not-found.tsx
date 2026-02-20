"use client";

import Link from "next/link";
import { motion } from "framer-motion";
// ایمپورت کامپوننت بک‌گراند ما
import FluidBackground from "@/components/canvas/FluidBackground";
import { Playfair_Display, Inter } from "next/font/google";

const serif = Playfair_Display({ subsets: ["latin"] });
const sans = Inter({ subsets: ["latin"] });

export default function NotFound() {
  return (
    <html lang="en">
      <body
        className={`${sans.className} bg-[#050505] text-[#E0E0E0] h-screen overflow-hidden flex flex-col items-center justify-center relative`}
      >
        {/* استفاده از همون بک‌گراند اصلی سایت */}
        <FluidBackground />

        <div className="relative z-10 text-center space-y-8 p-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${serif.className} text-9xl md:text-[12rem] text-gold opacity-30 font-bold select-none mix-blend-overlay`}
          >
            404
          </motion.h1>

          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`${serif.className} text-3xl md:text-5xl text-paper`}
            >
              Lost in the Void?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gold border-b border-gold/30 hover:border-gold pb-1 transition-all uppercase tracking-widest text-xs font-bold mt-8"
              >
                <span>Return to Light</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  );
}

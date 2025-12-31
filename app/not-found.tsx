'use client';

import Link from 'next/link'; // از next/link استفاده کن چون خارج از اینتل هستیم
import { motion } from 'framer-motion';

// فونت‌ها رو اینجا دستی میاریم چون خارج از لی‌اوت اصلیه
import { Playfair_Display, Inter } from "next/font/google";
const serif = Playfair_Display({ subsets: ["latin"] });
const sans = Inter({ subsets: ["latin"] });

export default function NotFound() {
  return (
    <html lang="en">
      <body className={`${sans.className} bg-[#050505] text-[#E0E0E0] h-screen overflow-hidden flex flex-col items-center justify-center relative`}>
        
        {/* Background Noise */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        
        {/* Content */}
        <div className="relative z-10 text-center space-y-8 p-6">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${serif.className} text-9xl md:text-[12rem] text-[#C7A56A] opacity-20 font-bold select-none`}
            >
                404
            </motion.h1>

            <div className="space-y-4">
                <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`${serif.className} text-3xl md:text-5xl`}
                >
                    Lost in the Void?
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/40 max-w-md mx-auto"
                >
                    The page you are looking for does not exist within our atelier.
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 text-[#C7A56A] border-b border-[#C7A56A]/30 hover:border-[#C7A56A] pb-1 transition-all uppercase tracking-widest text-xs font-bold"
                >
                    <span>Return to Light</span>
                </Link>
            </motion.div>
        </div>

      </body>
    </html>
  );
}
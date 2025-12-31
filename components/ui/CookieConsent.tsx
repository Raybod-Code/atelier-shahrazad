'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // چک کردن اینکه قبلا قبول کرده یا نه
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
        // کمی تاخیر بده تا اول سایت لود شه
        setTimeout(() => setShow(true), 3000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="fixed bottom-6 right-6 z-[100] max-w-sm w-full"
        >
            <div className="bg-[#0F0F11]/80 backdrop-blur-xl border border-white/10 p-6 rounded-lg shadow-2xl flex flex-col gap-4">
                <div className="space-y-2">
                    <h4 className="font-serif text-paper text-lg">Digital Privacy</h4>
                    <p className="font-sans text-xs text-paper/60 leading-relaxed">
                        We use cookies to enhance your journey through our atelier. No personal data is sold, ever.
                    </p>
                </div>
                <div className="flex gap-3 pt-2">
                    <button 
                        onClick={handleAccept}
                        className="flex-1 bg-gold text-charcoal text-xs font-bold uppercase tracking-wider py-3 hover:bg-white transition-colors"
                    >
                        Accept
                    </button>
                    <button 
                        onClick={() => setShow(false)}
                        className="flex-1 border border-white/10 text-paper/50 text-xs font-bold uppercase tracking-wider py-3 hover:text-paper hover:border-white/30 transition-colors"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
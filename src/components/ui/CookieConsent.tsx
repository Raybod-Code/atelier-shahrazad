'use client';

import { useState, useEffect }    from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setShow(true), 3000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "false");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{ y: 100,    opacity: 0 }}
          transition={{ duration: 0.5, ease: "backOut" }}
          // ✅ role + aria-label برای screen reader
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-[100] w-full max-w-sm"
        >
          <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-[#0F0F11]/80 p-6 shadow-2xl backdrop-blur-xl">
            <div className="space-y-2">
              <h4 className="font-serif text-lg text-paper">
                Digital Privacy
              </h4>
              <p className="font-sans text-xs leading-relaxed text-paper/60">
                We use cookies to enhance your journey through our atelier.
                No personal data is sold, ever.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAccept}
                // ✅ aria-label واضح
                aria-label="Accept cookies"
                className="flex-1 bg-gold py-3 font-sans text-xs font-bold uppercase tracking-wider text-charcoal transition-colors hover:bg-paper"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                aria-label="Decline cookies"
                className="flex-1 border border-white/10 py-3 font-sans text-xs font-bold uppercase tracking-wider text-paper/50 transition-colors hover:border-white/30 hover:text-paper"
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

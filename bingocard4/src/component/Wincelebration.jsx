import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion,AnimatePresence } from "framer-motion";

function WinCelebration() {
    const [showConfetti, setShowConfetti] = useState(true);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
    useEffect(() => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 30000); // Show celebration for 5 seconds
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
  
        <AnimatePresence>
          {showConfetti && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute text-white font-bold text-[20px]"
            >
            </motion.div>
          )}
        </AnimatePresence>
  
        
      </div>
    );
  }
  export default WinCelebration;  
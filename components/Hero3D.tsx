import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX / width) - 0.5;
    const y = (clientY / height) - 0.5;
    setMousePosition({ x, y });
  };

  // Timecode logic
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 43); // ~24fps update
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-[#F4F4F4] cursor-crosshair"
    >
      {/* 
        Background Video 
        Removed grayscale to allow color. Added a colorful gradient overlay.
      */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-80 contrast-125"
        >
          {/* Placeholder for abstract fluid/ink footage */}
          <source src="https://videos.pexels.com/video-files/5069903/5069903-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Mesh Overlay for the "Festival" Vibe */}
        <div className="absolute inset-0 bg-gradient-to-tr from-hyper-blue/20 via-transparent to-signal-orange/20 mix-blend-overlay pointer-events-none"></div>

        {/* Grain Overlay for texture */}
        <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* 
        Main Typography Layer 
        Changed to mix-blend-difference for sharp contrast against color.
      */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none select-none mix-blend-difference text-[#F4F4F4]">
        
        {/* Top Data Line */}
        <div className="absolute top-24 left-6 right-6 flex justify-between font-mono text-[10px] uppercase tracking-widest border-b border-signal-orange/50 pb-2 text-signal-orange">
           <span>Sys.Ref: 001.99.X</span>
           <span className="text-white">{time.toISOString()}</span>
           <span>M.POS: [{mousePosition.x.toFixed(2)}, {mousePosition.y.toFixed(2)}]</span>
        </div>

        {/* Center Kinetic Type */}
        <div className="relative flex flex-col items-center leading-none">
           <motion.h1 
             className="text-[15vw] font-bold tracking-tighter text-white"
             animate={{ x: mousePosition.x * -40, y: mousePosition.y * -20 }}
             transition={{ type: 'spring', stiffness: 75, damping: 20 }}
           >
             SKY
           </motion.h1>
           <motion.h1 
             className="text-[15vw] font-bold tracking-tighter -mt-[4vw] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400"
             animate={{ x: mousePosition.x * 40, y: mousePosition.y * 20 }}
             transition={{ type: 'spring', stiffness: 75, damping: 20 }}
           >
             EVENTS
           </motion.h1>
        </div>

        {/* Floating Sub-labels */}
        <motion.div 
            className="absolute bottom-32 left-1/4 font-mono text-xs max-w-xs text-acid-green"
            animate={{ x: mousePosition.x * -20 }}
        >
            <p>[STRUCTURAL AUDIO]</p>
            <p>[KINETIC ARCHITECTURE]</p>
        </motion.div>

        <motion.div 
            className="absolute top-1/3 right-1/4 font-mono text-xs text-right text-hyper-blue"
            animate={{ x: mousePosition.x * 30 }}
        >
             <p>TOKYO / SEOUL</p>
             <p>EST. 2024</p>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-6 font-mono text-xs z-20 text-signal-orange animate-pulse">
         SCROLL TO EXPLORE ↓
      </div>
    </div>
  );
};

export default Hero3D;
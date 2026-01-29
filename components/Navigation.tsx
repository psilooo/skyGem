import React from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  onMenuClick: () => void;
  isOpen: boolean;
  currentView: string;
  onBack: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onMenuClick, isOpen, currentView, onBack }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 mix-diff pointer-events-none">
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col gap-1">
          {currentView === 'PROJECT' ? (
             <button 
             onClick={onBack}
             className="font-mono text-sm tracking-tighter hover:text-signal-orange transition-colors text-left"
           >
             [BACK]
           </button>
          ) : (
            <button 
              onClick={onMenuClick}
              className="font-mono text-sm tracking-tighter hover:text-signal-orange transition-colors text-left"
            >
              [{isOpen ? 'CLOSE' : 'MENU'}]
            </button>
          )}
         
          <div className="h-4" />
          
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
            className="overflow-hidden flex flex-col gap-2 font-mono text-xs"
          >
            <a href="#" className="hover:text-hyper-blue hover:underline decoration-signal-orange">INDEX</a>
            <a href="#" className="hover:text-hyper-blue hover:underline decoration-signal-orange">ABOUT</a>
            <a href="#" className="hover:text-hyper-blue hover:underline decoration-signal-orange">CONTACT</a>
          </motion.div>
        </div>

        <div className="font-mono text-xs text-right text-white">
          <p>SKY EVENTS ASIA</p>
          <p className="text-signal-orange">EST. 2024</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
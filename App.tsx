import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero3D from './components/Hero3D';
import WorkGrid from './components/WorkGrid';
import ProjectDetail from './components/ProjectDetail';
import { PROJECTS } from './constants';
import { Project, ViewState } from './types';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
    setViewState(ViewState.PROJECT);
    setIsMenuOpen(false);
  };

  const handleBack = () => {
    setViewState(ViewState.HOME);
    // Keep activeProject for a moment during transition if needed, 
    // but clearing it triggers the exit animation correctly in some setups.
    // For shared layout ID, we want the Grid to exist.
    setTimeout(() => setActiveProject(null), 500); 
  };

  return (
    <main className="w-full min-h-screen bg-[#F4F4F4] text-carbon selection:bg-signal-orange selection:text-white">
      <Navigation 
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)} 
        isOpen={isMenuOpen}
        currentView={viewState}
        onBack={handleBack}
      />

      {/* 
        We use AnimatePresence to handle page transitions. 
        However, for the 'Hero Image Expansion' (FLIP), the elements need to be 
        in the DOM simultaneously or managed via layoutId.
      */}

      {viewState === ViewState.HOME && (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="w-full"
        >
          <Hero3D />
          
          <div className="px-6 py-12 flex justify-between items-end border-b border-gray-300 mx-6 mb-12">
            <h2 className="font-mono text-xs text-gray-500 max-w-[200px]">
              ENGINEERING DIGITAL EXPERIENCES THROUGH KINETIC TYPOGRAPHY AND STRUCTURAL AUDIO.
            </h2>
          </div>

          <WorkGrid 
            projects={PROJECTS} 
            onProjectClick={handleProjectClick} 
          />
          
          <footer className="px-6 py-24 border-t border-gray-200 mx-6 flex justify-between font-mono text-xs text-gray-500">
             <span>© SKY EVENTS 2024</span>
             <span className="text-signal-orange">TOKYO — SEOUL — SHANGHAI</span>
          </footer>
        </motion.div>
      )}

      {viewState === ViewState.PROJECT && activeProject && (
         <ProjectDetail project={activeProject} />
      )}
      
      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#F4F4F4]/95 backdrop-blur-md z-40 flex items-center justify-center"
          >
            <div className="flex flex-col gap-6 text-center">
              {['WORK', 'AGENCY', 'CAREERS', 'CONTACT'].map((item, i) => (
                <motion.a 
                  href="#"
                  key={item}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-6xl font-light hover:italic transition-all cursor-pointer tracking-tighter hover:text-acid-green hover:tracking-normal"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;
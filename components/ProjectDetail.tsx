import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowLeft } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F4F4F4] relative z-30">
      {/* Hero Image with Shared Layout ID */}
      <motion.div 
        className="w-full h-[70vh] relative overflow-hidden"
        layoutId={`image-${project.id}`}
        transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.9] }}
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-24"
      >
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3 font-mono text-xs sticky top-24 space-y-8 text-gray-500">
             <div>
                <p className="mb-1 text-signal-orange">CLIENT</p>
                <p>Sky Events Asia</p>
             </div>
             <div>
                <p className="mb-1 text-signal-orange">YEAR</p>
                <p>{project.year}</p>
             </div>
             <div>
                <p className="mb-1 text-signal-orange">CATEGORY</p>
                <p>{project.category}</p>
             </div>
             <div>
                <p className="mb-1 text-signal-orange">TECH</p>
                <p>Laser mapping, Spatial Audio, WebGL</p>
             </div>
          </div>
          
          <div className="md:w-2/3">
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-12 text-carbon">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl font-sans leading-relaxed text-gray-800 mb-12 border-l-2 border-signal-orange pl-6">
              {project.description}
            </p>
            
            <div className="grid grid-cols-1 gap-6">
                <div className="aspect-video bg-gray-200 w-full overflow-hidden relative group cursor-pointer">
                    <img src={`https://picsum.photos/seed/${project.id}a/800/450?grayscale`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-hyper-blue/20 mix-blend-multiply">
                        <span className="font-mono text-white bg-black px-4 py-2 text-xs hover:bg-signal-orange transition-colors">[PLAY REEL]</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative group">
                        <img src={`https://picsum.photos/seed/${project.id}b/400/600?grayscale`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-acid-green mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative group">
                        <img src={`https://picsum.photos/seed/${project.id}c/400/600?grayscale`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-signal-orange mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetail;
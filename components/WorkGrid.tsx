import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface WorkGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const WorkGrid: React.FC<WorkGridProps> = ({ projects, onProjectClick }) => {
  return (
    <div className="w-full px-6 pb-20 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 border-t border-gray-200">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="relative group aspect-[4/3] bg-[#F4F4F4] overflow-hidden cursor-pointer"
            onClick={() => onProjectClick(project)}
          >
            {/* Hover Reveal Image */}
            <motion.div 
              className="absolute inset-0 w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            >
                {/* 
                  Using layoutId here is key for the FLIP transition. 
                */}
                <motion.img 
                  layoutId={`image-${project.id}`}
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
            </motion.div>

            {/* Overlay Info */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-diff">
               <div className="flex justify-between items-start">
                  <span className="font-mono text-xs tracking-tight text-signal-orange">0{project.id}</span>
                  <span className="font-mono text-xs tracking-tight text-signal-orange">{project.year}</span>
               </div>
               <div>
                  <h3 className="text-4xl font-sans font-light tracking-tighter mb-2 text-white">{project.title}</h3>
                  <p className="font-mono text-xs uppercase tracking-wide text-acid-green">{project.category}</p>
               </div>
            </div>
            
            {/* Default State Info (Visible when not hovered) */}
            <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-300">
               <h3 className="font-sans text-lg tracking-tight text-carbon group-hover:text-hyper-blue transition-colors">
                  <span className="text-signal-orange font-mono text-xs mr-2">0{project.id}</span>
                  {project.title}
               </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkGrid;
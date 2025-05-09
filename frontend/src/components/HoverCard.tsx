import { motion, type MotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface HoverCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

const HoverCard = ({ children, className = '', ...props }: HoverCardProps) => {
  return (
    <motion.div
      className={`group relative overflow-hidden ${className}`}
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 } 
      }}
      {...props}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/20 backdrop-blur-sm"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default HoverCard;

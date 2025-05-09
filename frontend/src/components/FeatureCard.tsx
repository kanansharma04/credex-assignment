import { motion, type MotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface FeatureCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

const FeatureCard = ({ children, className = '', ...props }: FeatureCardProps) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-violet-500/20 backdrop-blur-3xl"></div>
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default FeatureCard;

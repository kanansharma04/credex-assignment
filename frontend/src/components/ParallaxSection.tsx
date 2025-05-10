import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

interface ParallaxSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const ParallaxSection = ({ id, children, className = '' }: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id={id} ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        style={{ opacity, y }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
      </motion.div>
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default ParallaxSection;

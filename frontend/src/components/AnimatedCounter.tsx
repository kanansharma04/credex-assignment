import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '' 
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const countUp = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        const easeProgress = easeOutCubic(percentage);
        
        setCount(Math.floor(easeProgress * end));

        if (progress < duration * 1000) {
          animationFrame = requestAnimationFrame(countUp);
        } else {
          setCount(end);
        }
      };

      // Start animation
      animationFrame = requestAnimationFrame(countUp);

      // Cleanup
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [inView, end, duration]);

  // Easing function for smoother counting
  const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="font-bold text-4xl text-primary-600 dark:text-primary-400"
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.div>
  );
};

export default AnimatedCounter;

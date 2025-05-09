import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
}

const FloatingElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const shapes = ['circle', 'square', 'triangle'];
    const colors = [
      'rgba(139, 92, 246, 0.2)', // purple
      'rgba(167, 139, 250, 0.2)', // violet
      'rgba(196, 181, 253, 0.2)', // lavender
      'rgba(124, 58, 237, 0.2)', // deep purple
      'rgba(217, 70, 239, 0.2)', // fuchsia
    ];
    
    const newElements: FloatingElement[] = [];
    
    for (let i = 0; i < 20; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 80 + 20,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)] as 'circle' | 'square' | 'triangle',
      });
    }
    
    setElements(newElements);
  }, []);

  const renderShape = (element: FloatingElement) => {
    switch(element.shape) {
      case 'circle':
        return (
          <div 
            className="rounded-full" 
            style={{ 
              width: element.size, 
              height: element.size, 
              backgroundColor: element.color 
            }}
          />
        );
      case 'square':
        return (
          <div 
            className="rounded-lg" 
            style={{ 
              width: element.size, 
              height: element.size, 
              backgroundColor: element.color,
              transform: 'rotate(45deg)'
            }}
          />
        );
      case 'triangle':
        return (
          <div 
            style={{ 
              width: 0,
              height: 0,
              borderLeft: `${element.size/2}px solid transparent`,
              borderRight: `${element.size/2}px solid transparent`,
              borderBottom: `${element.size}px solid ${element.color}`
            }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute opacity-30"
          initial={{ 
            x: `${element.x}vw`, 
            y: `${element.y}vh`,
            opacity: 0 
          }}
          animate={{ 
            x: [`${element.x}vw`, `${(element.x + 20) % 100}vw`, `${(element.x - 10) % 100}vw`, `${element.x}vw`],
            y: [`${element.y}vh`, `${(element.y - 20) % 100}vh`, `${(element.y + 10) % 100}vh`, `${element.y}vh`],
            opacity: [0, 0.7, 0.3, 0]
          }}
          transition={{ 
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {renderShape(element)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;

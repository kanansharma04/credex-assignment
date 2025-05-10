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
      'rgba(34, 197, 94, 0.2)',  // green-500
      'rgba(22, 163, 74, 0.2)',  // green-600
      'rgba(21, 128, 61, 0.2)',  // green-700
      'rgba(74, 222, 128, 0.2)', // green-400
      'rgba(16, 185, 129, 0.2)', // emerald-500
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

import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800" />
      
      <motion.div 
        className="absolute w-[40rem] h-[40rem] bg-primary-100 dark:bg-primary-900/20 rounded-full -top-[20rem] -left-[20rem] blur-3xl opacity-50"
        animate={{ 
          x: [0, 30, 0],
          y: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute w-[35rem] h-[35rem] bg-secondary-100 dark:bg-primary-800/30 rounded-full top-1/3 right-1/4 blur-3xl opacity-40"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute w-[30rem] h-[30rem] bg-accent-light/30 dark:bg-accent-dark/20 rounded-full -bottom-[10rem] -right-[10rem] blur-3xl opacity-30"
        animate={{ 
          x: [0, -30, 0],
          y: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary-500 rounded-full opacity-70"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-accent-light rounded-full opacity-60"></div>
      <div className="absolute bottom-1/4 left-1/5 w-2 h-2 bg-secondary-400 rounded-full opacity-70"></div>
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwTDYwIDB2NjB6Ii8+PC9nPjwvc3ZnPg==')] bg-top opacity-[0.03] dark:opacity-[0.02]" />
    </div>
  );
};

export default AnimatedBackground;

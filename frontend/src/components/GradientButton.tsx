import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface GradientButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
}

const GradientButton = ({
  children,
  size = 'md',
  variant = 'solid',
  icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  className = '',
  gradientFrom = 'from-green-500',
  gradientTo = 'to-green-600',
  ...props
}: GradientButtonProps) => {
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  const variantClasses = {
    solid: `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white hover:opacity-90`,
    outline: `border-2 border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20`,
    ghost: `text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20`,
  };

  return (
    <motion.button
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
        ${className}
      `}
      disabled={isLoading}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !isLoading && (
        <span className="mr-2">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {icon && iconPosition === 'right' && !isLoading && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
};

export default GradientButton;

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps>, MotionProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none';
  
  const variantClasses = {
    primary: 'gradient-bg text-white shadow-glow hover:shadow-glow-lg',
    secondary: 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/50 dark:text-green-300',
    outline: 'border-2 border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400',
    ghost: 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30',
  };
  
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '',
    className
  );
  
  return (
    <motion.button
      className={classes}
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
      disabled={disabled || isLoading}
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
      
      {children}
      
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </motion.button>
  );
};

export default Button;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ isDarkMode, toggleDarkMode }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <span className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-gradient-to-r from-green-500 to-green-700">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
                <path
                  d="M20.5 6.5L12 2L3.5 6.5M20.5 6.5L12 11M20.5 6.5V17.5L12 22M12 11L3.5 6.5M12 11V22M3.5 6.5V17.5L12 22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent dark:from-green-400 dark:to-green-600">
                SoftShell
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-300">License Exchange</span>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          </div>

          <div className="flex items-center md:hidden">
            <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <button
              className="ml-2 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-5 space-y-4">
              <NavLinks mobile onClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLinks = ({ mobile = false, onClick = () => {} }: { mobile?: boolean; onClick?: () => void }) => {
  const links = [
    { name: 'Home', href: '#' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <div className={mobile ? 'flex flex-col space-y-3' : 'flex space-x-6'}>
      {links.map((link) => (
        <motion.a
          key={link.name}
          href={link.href}
          className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
        >
          {link.name}
        </motion.a>
      ))}
    </div>
  );
};

const ThemeToggle = ({ isDarkMode, toggleDarkMode }: { isDarkMode: boolean; toggleDarkMode: () => void }) => {
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative rounded-full w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {isDarkMode ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <SunIcon className="h-5 w-5 text-amber-500" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.3 }}
          >
            <MoonIcon className="h-5 w-5 text-green-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default Navbar;

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Auto-advance carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(1);
      setCurrent((prevCurrent) => (prevCurrent + 1) % testimonials.length);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [current, testimonials.length]);
  
  const navigate = (dir: number) => {
    setDirection(dir);
    if (dir === 1) {
      setCurrent((prevCurrent) => (prevCurrent + 1) % testimonials.length);
    } else {
      setCurrent((prevCurrent) => (prevCurrent - 1 + testimonials.length) % testimonials.length);
    }
  };
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl">
        <div className="relative h-full">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, type: 'spring', bounce: 0.25 }}
              className="p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3">
                  <div className="relative w-28 h-28 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 blur-sm" />
                    <img 
                      src={testimonials[current].image} 
                      alt={testimonials[current].author}
                      className="absolute inset-1 rounded-full object-cover" 
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-green-400" />
                      ))}
                    </div>
                    <h4 className="font-bold text-lg">{testimonials[current].author}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonials[current].role}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonials[current].company}</p>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <div className="relative">
                    <svg 
                      className="absolute -top-6 -left-6 h-12 w-12 text-green-200 dark:text-green-700 opacity-50" 
                      fill="currentColor" 
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                    </svg>
                    <p className="relative text-lg md:text-xl italic text-gray-700 dark:text-gray-200 leading-relaxed">
                      {testimonials[current].quote}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === current 
                    ? 'bg-green-600 w-6' 
                    : 'bg-green-300 dark:bg-green-700'
                }`}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <button
        onClick={() => navigate(-1)}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeftIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
      </button>
      
      <button
        onClick={() => navigate(1)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRightIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
      </button>
    </div>
  );
};

export default TestimonialCarousel;

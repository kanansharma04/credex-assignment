import { motion, useScroll, AnimatePresence, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { 
  ShieldCheckIcon, CurrencyDollarIcon, 
  ClockIcon, UserGroupIcon, ChartBarIcon,
  CloudArrowUpIcon, ChartPieIcon, DocumentTextIcon,
  ArrowRightIcon, ArrowDownIcon, SparklesIcon, 
   RocketLaunchIcon, PresentationChartLineIcon
} from '@heroicons/react/24/outline';


import Navbar from './components/Navbar';
import AnimatedBackground from './components/AnimatedBackground';
import Button from './components/Button';
import ChatWidget from './components/ChatWidget';
import AnimatedCounter from './components/AnimatedCounter';
import Confetti from 'react-confetti';
import FloatingElements from './components/FloatingElements';
import ParallaxSection from './components/ParallaxSection';
import GradientButton from './components/GradientButton';
import FeatureCard from './components/FeatureCard';
import TestimonialCarousel from './components/TestimonialCarousel';
import PricingTable from './components/PricingTable';
import HoverCard from './components/HoverCard';

type FormData = {
  name: string;
  email: string;
  company: string;
  licenseType: string;
  message: string;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef<HTMLDivElement>(null);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      
      setSubmitSuccess(true);
      setShowConfetti(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowConfetti(false);
      }, 5000);
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div ref={scrollRef} className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-green-500 z-50"
        style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
      />

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Confetti 
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={500}
              gravity={0.2}
              colors={['#22c55e', '#4ade80', '#16a34a', '#15803d', '#059669']}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingElements />

      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
        <AnimatedBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="flex items-center justify-center w-24 h-24 mx-auto p-3 bg-green-100 dark:bg-green-900/50 rounded-full mb-4 shadow-glow">
                <ChartBarIcon className="h-14 w-14 text-green-600 dark:text-green-400" />
              </span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Transform Your Unused Software into
              </motion.span><br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-300"
              > Revenue
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-10"
            >
              SoftShell helps businesses maximize their IT investments by safely and efficiently
              reselling unused software licenses.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <GradientButton 
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="text-lg font-semibold rounded-full px-8 py-4"
                gradientFrom="from-green-600"
                gradientTo="to-emerald-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: ["0 0 0 rgba(34, 197, 94, 0)", "0 0 20px rgba(34, 197, 94, 0.5)", "0 0 0 rgba(34, 197, 94, 0)"]
                }}
                transition={{ 
                  boxShadow: { 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "loop" 
                  }
                }}
              >
                Get Your License Valuation
              </GradientButton>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('how-it-works')}
                className="text-lg font-semibold rounded-full"
                icon={<ArrowRightIcon className="h-5 w-5" />}
                iconPosition="right"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span 
            className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Scroll Down
          </motion.span>
          <motion.div 
            whileHover={{ scale: 1.2 }}
            className="p-2 rounded-full bg-green-100 dark:bg-green-900/50"
          >
            <ArrowDownIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </motion.div>
        </motion.div>
      </section>

      <ParallaxSection id="stats" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute right-0 top-0 w-64 h-64 bg-green-100 dark:bg-green-800/40 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute left-0 bottom-0 w-64 h-64 bg-emerald-300/30 dark:bg-emerald-600/30 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold mb-4">Our Impact</span>
            <h2 className="text-4xl font-bold mb-4">Proven Results</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">We've helped hundreds of companies unlock the value of their unused software assets</p>
          </motion.div>

          <div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { value: 5000000, prefix: "$", label: "Recovered Value", icon: CurrencyDollarIcon },
              { value: 500, suffix: "+", label: "Software Licenses Sold", icon: DocumentTextIcon },
              { value: 98, suffix: "%", label: "Customer Satisfaction", icon: ChartPieIcon }
            ].map((stat, index) => (
              <HoverCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="p-4 bg-green-100 dark:bg-green-900/50 rounded-full mb-5"
                  >
                    <stat.icon className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <AnimatedCounter 
                    end={stat.value} 
                    prefix={stat.prefix || ''} 
                    suffix={stat.suffix || ''} 
                  />
                  <h3 className="text-2xl font-semibold mt-3">{stat.label}</h3>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>
      </ParallaxSection>

      <section id="how-it-works" className="py-24 relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold mb-4">Simple Process</span>
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Three simple steps to turn your unused licenses into cash</p>
          </motion.div>

          <div className="relative">
            {/* Connecting lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform -translate-y-1/2 z-10" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-16 relative z-20">
              {[
                {
                  title: "Upload License",
                  description: "Share your software license details through our secure platform",
                  icon: CloudArrowUpIcon,
                  bgColor: "bg-green-50 dark:bg-green-900/30",
                  iconColor: "text-green-600 dark:text-green-400",
                  animation: { y: [0, -15, 0], transition: { duration: 3, repeat: Infinity, delay: 0.5 } }
                },
                {
                  title: "Get Valuation",
                  description: "Receive an instant market-based valuation for your licenses",
                  icon: SparklesIcon,
                  bgColor: "bg-emerald-100 dark:bg-emerald-800/40",
                  iconColor: "text-emerald-600 dark:text-emerald-400",
                  animation: { scale: [1, 1.1, 1], transition: { duration: 3, repeat: Infinity } }
                },
                {
                  title: "Get Paid",
                  description: "Accept the offer and receive payment within 48 hours",
                  icon: RocketLaunchIcon,
                  bgColor: "bg-lavender-100 dark:bg-lavender-800/30",
                  iconColor: "text-lavender-600 dark:text-lavender-400",
                  animation: { rotate: [0, 10, 0, -10, 0], transition: { duration: 5, repeat: Infinity } }
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.5, // Stagger each card by 0.5 seconds
                    ease: "easeOut"
                  }}
                  className="w-full"
                >
                  <FeatureCard
                    initial={{ scale: 0.9, opacity: 0, rotateY: 45 }}
                    whileInView={{ 
                      scale: 1, 
                      opacity: 1, 
                      rotateY: 0,
                      transition: {
                        type: "spring",
                        damping: 15,
                        stiffness: 100,
                        delay: index * 0.5 + 0.3
                      }
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -15,
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    className="md:w-80 bg-white dark:bg-gray-700 rounded-2xl shadow-xl 
                             hover:shadow-2xl transition-all duration-300 z-20
                             backdrop-blur-sm border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex flex-col items-center text-center p-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          type: "spring",
                          damping: 8,
                          stiffness: 100,
                          delay: index * 0.5 + 0.5
                        }}
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          transition: { duration: 0.5 }
                        }}
                        className={`${step.bgColor} rounded-2xl mb-6 w-40 h-40 
                                  flex items-center justify-center shadow-lg 
                                  transform transition-all duration-300
                                  hover:shadow-xl`}
                      >
                        <motion.div
                          animate={step.animation}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <step.icon className={`h-24 w-24 ${step.iconColor}`} />
                        </motion.div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.5 + 0.7 }}
                        className="relative"
                      >
                        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold mb-4">
                          {index + 1}
                        </div>
                      </motion.div>
                      <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-lg text-gray-700 dark:text-gray-300">{step.description}</p>
                    </div>
                  </FeatureCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-1/4 w-72 h-72 bg-green-100 dark:bg-green-800/40 rounded-full -translate-x-1/2 blur-3xl"></div>
          <div className="absolute right-0 bottom-1/4 w-72 h-72 bg-emerald-300/30 dark:bg-emerald-600/30 rounded-full translate-x-1/2 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold mb-4">Our Advantages</span>
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Industry-leading solutions for software license resale</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Secure Transactions",
                description: "Bank-grade security protocols and verified buyers ensure safe transactions",
                icon: ShieldCheckIcon,
                color: "from-green-500 to-emerald-600"
              },
              {
                title: "Best Market Value",
                description: "Get the highest value for your licenses with our market-driven pricing",
                icon: PresentationChartLineIcon,
                color: "from-emerald-500 to-green-600"
              },
              {
                title: "Quick Process",
                description: "Complete transactions within 48 hours of acceptance",
                icon: ClockIcon, 
                color: "from-fuchsia-500 to-green-600"
              },
              {
                title: "Expert Support",
                description: "Dedicated team of licensing experts to guide you through the process",
                icon: UserGroupIcon,
                color: "from-emerald-500 to-emerald-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
                rounded-full aspect-square p-8 shadow-lg hover:shadow-2xl transition-all duration-300
                border border-gray-100 dark:border-gray-700 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="flex flex-col items-center text-center max-w-[80%]">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    viewport={{ once: true }}
                    whileHover={{ rotate: 5 }}
                    className={`p-4 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 
                    shadow-lg transform transition-all duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 
                  dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold mb-4">Testimonials</span>
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Trusted by companies worldwide</p>
          </motion.div>

          <TestimonialCarousel
            testimonials={[
              {
                quote: "SoftSell helped us recover over $50,000 from unused software licenses. Their process was seamless and secure.",
                author: "Sarah Chen",
                role: "CTO",
                company: "TechFlow Solutions",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                quote: "The team at SoftSell made the entire process incredibly easy. Their valuation was spot-on and we received payment quickly.",
                author: "Michael Rodriguez",
                role: "IT Director",
                company: "Global Innovations Inc.",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                quote: "We were skeptical at first, but SoftSell delivered beyond our expectations. The ROI was impressive!",
                author: "Emily Johnson",
                role: "Finance Manager",
                company: "Elevate Enterprises",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              },
              {
                quote: "Their expertise in software licensing made the whole process smooth and compliant. Highly recommended.",
                author: "David Wilson",
                role: "Compliance Officer",
                company: "Nexus Technologies",
                image: "https://randomuser.me/api/portraits/men/75.jpg"
              }
            ]}
          />
        </div>
      </section>

      <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute right-0 top-0 w-72 h-72 bg-green-100 dark:bg-green-800/40 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute left-0 bottom-0 w-72 h-72 bg-emerald-300/30 dark:bg-emerald-600/30 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold mb-4">Pricing Plans</span>
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Choose the plan that works best for your business</p>
          </motion.div>

          <PricingTable />
        </div>
      </section>

      <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 dark:bg-green-800/40 rounded-full translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300/30 dark:bg-emerald-600/30 rounded-full -translate-y-1/2 -translate-x-1/3 blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold mb-4">Contact Us</span>
            <h2 className="text-4xl font-bold mb-4">Get Started Today</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Fill out the form below and we'll get back to you within 24 hours</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 items-stretch"
          >
            {/* Left side - Contact Image */}
            <div className="md:w-1/2 relative rounded-2xl overflow-hidden h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=100&w=1200" 
                alt="Customer Support Team" 
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div className="text-white">
                    <h4 className="font-semibold text-lg">24/7 Support</h4>
                    <p className="text-gray-100">We're here to help anytime</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Contact Form */}
            <div className="md:w-1/2 bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 dark:bg-green-800/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">Get in Touch</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      className="form-input focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.name && (
                      <p className="form-error">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className="form-input focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.email && (
                      <p className="form-error">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="form-label">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      {...register("company", { required: "Company name is required" })}
                      className="form-input focus:ring-green-500 focus:border-green-500"
                    />
                    {errors.company && (
                      <p className="form-error">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="licenseType" className="form-label">
                      License Type
                    </label>
                    <select
                      id="licenseType"
                      {...register("licenseType", { required: "License type is required" })}
                      className="form-select focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select a license type</option>
                      <option value="Microsoft">Microsoft</option>
                      <option value="Adobe">Adobe</option>
                      <option value="Oracle">Oracle</option>
                      <option value="SAP">SAP</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.licenseType && (
                      <p className="form-error">{errors.licenseType.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      {...register("message")}
                      className="form-input focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <GradientButton
                    type="submit"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                    className="mt-8 text-lg font-semibold rounded-xl"
                    gradientFrom="from-green-600"
                    gradientTo="to-emerald-600"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </GradientButton>

                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md"
                      >
                        Thank you for your submission! We'll be in touch shortly.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-16 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <span className="flex items-center justify-center w-10 h-10 mr-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-700">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  SoftShell
                </span>
              </div>
              <p className="text-gray-400 mb-4">Maximizing the value of your unused software licenses.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><a href="#home" className="text-gray-400 hover:text-green-400 transition-colors">Home</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-green-400 transition-colors">How It Works</a></li>
                <li><a href="#why-us" className="text-gray-400 hover:text-green-400 transition-colors">Why Choose Us</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-green-400 transition-colors">Testimonials</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-green-400 transition-colors">Pricing</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-green-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">hello@credex.com</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">123 Tech Plaza, San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} SoftShell. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}

export default App;
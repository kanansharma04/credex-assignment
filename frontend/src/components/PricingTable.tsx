import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/solid';
import GradientButton from './GradientButton';

const PricingTable = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  
  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for small businesses with a few unused licenses',
      priceMonthly: 99,
      priceAnnual: 79,
      features: [
        { name: 'Up to 5 license valuations per month', included: true },
        { name: 'Standard valuation time (48 hours)', included: true },
        { name: 'Email support', included: true },
        { name: 'License transfer assistance', included: true },
        { name: 'Market insights reports', included: false },
        { name: 'Dedicated account manager', included: false },
        { name: 'Priority processing', included: false },
      ],
      buttonText: 'Get Started',
      popular: false,
      gradientFrom: 'from-green-500',
      gradientTo: 'to-emerald-500',
    },
    {
      name: 'Professional',
      description: 'Ideal for mid-sized organizations with regular license turnover',
      priceMonthly: 199,
      priceAnnual: 149,
      features: [
        { name: 'Up to 15 license valuations per month', included: true },
        { name: 'Expedited valuation time (24 hours)', included: true },
        { name: 'Priority email & phone support', included: true },
        { name: 'License transfer assistance', included: true },
        { name: 'Quarterly market insights reports', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Priority processing', included: false },
      ],
      buttonText: 'Get Started',
      popular: true,
      gradientFrom: 'from-green-600',
      gradientTo: 'to-emerald-600',
    },
    {
      name: 'Enterprise',
      description: 'Comprehensive solution for large enterprises with complex licensing',
      priceMonthly: 399,
      priceAnnual: 299,
      features: [
        { name: 'Unlimited license valuations', included: true },
        { name: 'Instant valuation (AI-powered)', included: true },
        { name: '24/7 dedicated support', included: true },
        { name: 'Full-service license transfer handling', included: true },
        { name: 'Monthly market insights reports', included: true },
        { name: 'Senior account executive', included: true },
        { name: 'Priority processing with SLA', included: true },
      ],
      buttonText: 'Contact Sales',
      popular: false,
      gradientFrom: 'from-emerald-600',
      gradientTo: 'to-green-600',
    },
  ];
  
  return (
    <div>
      <div className="flex justify-center mb-10">
        <div className="bg-white dark:bg-gray-700 p-1 rounded-full shadow-md inline-flex">
          <button
            onClick={() => setIsAnnual(false)}
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              !isAnnual 
                ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' 
                : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              isAnnual 
                ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' 
                : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
            }`}
          >
            Annual <span className="text-xs text-green-500 dark:text-green-400 ml-1">Save 25%</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative bg-white dark:bg-gray-700 rounded-2xl shadow-xl overflow-hidden ${
              plan.popular ? 'ring-2 ring-purple-500 dark:ring-purple-400' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="text-xs font-semibold bg-gradient-to-r from-purple-600 to-violet-600 text-white py-1 px-4 rounded-bl-lg">
                  Most Popular
                </div>
              </div>
            )}
            
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 h-12">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${isAnnual ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /mo{isAnnual && ', billed annually'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature.name} className="flex items-center">
                    {feature.included ? (
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    ) : (
                      <MinusIcon className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                    )}
                    <span className={feature.included 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-gray-500 dark:text-gray-400'
                    }>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <GradientButton
                fullWidth
                size="lg"
                gradientFrom={plan.gradientFrom}
                gradientTo={plan.gradientTo}
                className="font-medium"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {plan.buttonText}
              </GradientButton>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;

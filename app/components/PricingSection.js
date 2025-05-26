"use client";
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PricingSection = () => {
  const [activePlan, setActivePlan] = useState('monthly');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.2 });
  
  const plans = {
    monthly: {
      title: "Monthly",
      price: "₹1,200",
      period: "/ month",
      // features: [
      //   "Full gym access",
      //   "1 Free personal training session",
      //   "Access to group classes",
      //   "Locker access",
      //   "No commitment"
      // ],
      popular: false
    },
    quarterly: {
      title: "Quarterly",
      price: "₹3,000",
      period: "/ 3 months",
      // features: [
      //   "Full gym access",
      //   "3 Free personal training sessions",
      //   "Access to all group classes",
      //   "Locker access",
      //   "Nutrition consultation"
      // ],
      popular: true
    },
    halfYearly: {
      title: "Half Yearly",
      price: "₹5,500",
      period: "/ 6 months",
      // features: [
      //   "Full gym access",
      //   "6 Free personal training sessions",
      //   "Access to all group classes",
      //   "Premium locker access",
      //   "Monthly body composition analysis",
      //   "Nutrition plan"
      // ],
      popular: false
    },
    annually: {
      title: "Annually",
      price: "₹10,000",
      period: "/ year",
      // features: [
      //   "Full gym access",
      //   "12 Free personal training sessions",
      //   "Access to all group classes",
      //   "Premium locker access",
      //   "Monthly body composition analysis",
      //   "Personalized nutrition plan",
      //   "Free gym merchandise"
      // ],
      popular: false
    }
  };

  const handlePlanChange = (plan) => {
    setActivePlan(plan);
  };

  // Card stack animation variants
  const cardVariants = {
    hidden: (custom) => ({
      rotateY: custom.rotateY,
      scale: custom.scale,
      opacity: custom.opacity,
      z: custom.z,
    }),
    visible: {
      rotateY: 0,
      scale: 1,
      opacity: 1,
      z: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Get plan keys in order
  const planKeys = ['monthly', 'quarterly', 'halfYearly', 'annually'];
  
  // Calculate positions for stacked cards
  const getCardStyles = (planKey) => {
    const currentIndex = planKeys.indexOf(activePlan);
    const planIndex = planKeys.indexOf(planKey);
    const diff = planIndex - currentIndex;
    
    // Card is active
    if (diff === 0) {
      return { rotateY: 0, scale: 1, opacity: 1, z: 0 };
    }
    // Card is behind active card
    else if (diff < 0) {
      return { rotateY: -45, scale: 0.8 - (Math.abs(diff) * 0.05), opacity: 0.6 - (Math.abs(diff) * 0.2), z: -100 * Math.abs(diff) };
    }
    // Card is ahead of active card
    else {
      return { rotateY: 45, scale: 0.8 - (diff * 0.05), opacity: 0.6 - (diff * 0.2), z: -100 * diff };
    }
  };

  return (
    <section id="pricing" className="py-20 bg-[#222222]" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Membership <span className="text-[#ff4500]">Pricing</span></h2>
          <p className="text-center text-gray-300 mb-5 max-w-2xl text-xl mx-auto">
            Choose the plan that fits your <span className="text-[#ff4500]">fitness goals</span> and budget. All plans include access to our state-of-the-art <span className="text-[#ff4500]">facilities</span>.
          </p>
          <p className="text-center text-gray-300 mb-12 max-w-2xl text-xl mx-auto">
            Join us with a small registration fees of <span className="text-[#ff4500] text-2xl font-bold">₹300</span> and start your journey to a healthier you.
          </p>
        </motion.div>

        {/* Plan selector */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-[#2a2a2a] rounded-full p-1">
            {planKeys.map((plan) => (
              <button
                key={plan}
                onClick={() => handlePlanChange(plan)}
                className={`px-4 py-2 rounded-full text-sm md:text-lg transition-colors ${
                  activePlan === plan
                    ? 'bg-[#ff4500] text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {plans[plan].title}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Card Stack */}
        <div className="relative h-[400px] perspective-1000 flex justify-center items-center">
          <div className="relative w-full max-w-md mx-auto h-full preserve-3d">
            {planKeys.map((planKey) => {
              const plan = plans[planKey];
              const cardStyle = getCardStyles(planKey);
              
              return (
                <motion.div
                  key={planKey}
                  className="absolute inset-0 backface-hidden text-2xl"
                  custom={cardStyle}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.5 }}
                  style={{
                    zIndex: planKey === activePlan ? 10 : 5 - Math.abs(planKeys.indexOf(planKey) - planKeys.indexOf(activePlan))
                  }}
                >
                  <div className={`pricing-card h-full flex flex-col ${plan.popular ? 'border-[#ff4500] border-2' : ''}`}>
                    {plan.popular && (
                      <div className="bg-[#ff4500] text-white text-center py-1 px-4 rounded-lg font-semibold">
                        Most Popular
                      </div>
                    )}
                    <div className="p-4 flex-grow flex flex-col justify-center items-center text-center">
                      <div>
                        <h3 className="text-3xl font-bold mb-1">{plan.title}</h3>
                        <div className="mb-1">
                          <span className="text-4xl font-bold text-[#ff6b35]">{plan.price}</span>
                          <span className="text-gray-300 ml-2">{plan.period}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 w-full">
                        <button 
                          onClick={() => {
                            document.getElementById('trial').scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="btn-primary w-full py-2 text-base mt-8 font-bold"
                        >
                          Choose Plan
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Navigation arrows for mobile */}
        <div className="flex justify-center mt-8 md:hidden">
          <button 
            onClick={() => {
              const currentIndex = planKeys.indexOf(activePlan);
              const prevIndex = (currentIndex - 1 + planKeys.length) % planKeys.length;
              handlePlanChange(planKeys[prevIndex]);
            }}
            className="mx-2 p-2 bg-[#2a2a2a] rounded-full"
            aria-label="Previous plan"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => {
              const currentIndex = planKeys.indexOf(activePlan);
              const nextIndex = (currentIndex + 1) % planKeys.length;
              handlePlanChange(planKeys[nextIndex]);
            }}
            className="mx-2 p-2 bg-[#2a2a2a] rounded-full"
            aria-label="Next plan"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

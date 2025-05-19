"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroSection = () => {
  // Sample images - these will be replaced by the user
  const images = [
    '/hero1.jpg',
    '/hero2.jpg',
    '/hero3.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-change image every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 w-full">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`h-screen relative transition-opacity duration-1000 ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div className="relative h-full">
              <Image
                src={image}
                alt={`Gym hero image ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
                quality={90}
              />
            </div>
          </div>
        ))}
        
        {/* Image indicators/dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentImageIndex === index ? 'bg-[#ff4500] w-6' : 'bg-white/60 hover:bg-white'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 h-full flex items-center relative z-20">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transform Your Body, <span className="text-[#ff4500]">Transform Your Life</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join our state-of-the-art fitness center and start your journey to a healthier, stronger you.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href="#trial" 
              className="btn-primary text-center py-3 px-8 text-lg font-semibold"
            >
              Start Free Trial
            </a>
            <a 
              href="#pricing" 
              className="border border-white text-white hover:bg-white hover:text-[#1e1e1e] transition-colors duration-300 text-center py-3 px-8 rounded-full text-lg font-semibold"
            >
              View Pricing
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

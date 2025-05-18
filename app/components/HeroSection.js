"use client";
import { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

const HeroSection = () => {
  // Sample images - these will be replaced by the user
  const images = [
    '/hero1.jpg',
    '/hero2.jpg',
    '/hero3.jpg',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 w-full">
        <Slider {...settings} className="h-full">
          {images.map((image, index) => (
            <div key={index} className="h-screen relative">
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
        </Slider>
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

"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedScrollSection = () => {
  // Sample images for the flipbook effect - these will be replaced by the user
  const images = [
    '/pose1.jpg',
    '/pose2.jpg',
    '/pose3.jpg',
    '/pose4.jpg',
    '/pose5.jpg',
    '/pose6.jpg',
  ];

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Current image index based on scroll position
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Update image index based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      // Make the images change more quickly by multiplying the progress value
      // This will cause all images to cycle through in the first 40% of the scroll
      const acceleratedValue = Math.min(value * 2.5, 1);
      
      // Map scroll progress to image index
      const index = Math.min(
        Math.floor(acceleratedValue * images.length),
        images.length - 1
      );
      setCurrentImageIndex(index);
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, images.length]);

  // Animation for the text sections
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section ref={containerRef} className="py-20 bg-[#1e1e1e]" id="about">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your <span className="text-[#ff4500]">Fitness Journey</span> Visualized
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Flipbook animation */}
          <div className="relative h-[500px] flex justify-center items-center">
            <div className="relative w-full h-full max-w-[350px] mx-auto">
              {images.map((src, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  animate={{
                    opacity: currentImageIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={src}
                      alt={`Fitness pose ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Text content */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-[#ff6b35]">Transform Your Body</h3>
              <p className="text-gray-300">
                Our expert trainers will guide you through personalized workout routines 
                designed to help you achieve your fitness goals. Whether you are looking to 
                build muscle, lose weight, or improve your overall health, we have the 
                expertise and equipment to help you succeed.
              </p>
              
              <h3 className="text-2xl font-bold text-[#ff6b35] pt-4">State-of-the-Art Facilities</h3>
              <p className="text-gray-300">
                Our gym is equipped with the latest fitness technology and equipment to 
                ensure you get the most effective workout possible. From cardio machines 
                to free weights, we have everything you need to push your limits and 
                achieve your personal best.
              </p>
              
              <h3 className="text-2xl font-bold text-[#ff6b35] pt-4">Supportive Community</h3>
              <p className="text-gray-300">
                Join a community of like-minded individuals who are committed to their 
                fitness journey. Our members support and motivate each other, creating 
                an environment where everyone can thrive and reach their full potential.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedScrollSection;

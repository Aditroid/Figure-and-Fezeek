"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed w-full z-50 py-4 transition-all duration-300 ${scrolled ? 'bg-[#1e1e1e] shadow-lg' : 'bg-transparent'}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 overflow-hidden">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#ff4500]">FitForge</span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none relative z-50"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-[#ff6b35] transition-colors">Home</Link>
            <Link href="#about" className="text-white hover:text-[#ff6b35] transition-colors">About</Link>
            <Link href="#pricing" className="text-white hover:text-[#ff6b35] transition-colors">Pricing</Link>
            <Link href="#trial" className="text-white hover:text-[#ff6b35] transition-colors">Free Trial</Link>
            <Link href="#contact" className="text-white hover:text-[#ff6b35] transition-colors">Contact</Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div 
            className="md:hidden mt-4 bg-[#2a2a2a] rounded-lg shadow-lg p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-[#ff6b35] transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="#about" className="text-white hover:text-[#ff6b35] transition-colors" onClick={() => setIsOpen(false)}>About</Link>
              <Link href="#pricing" className="text-white hover:text-[#ff6b35] transition-colors" onClick={() => setIsOpen(false)}>Pricing</Link>
              <Link href="#trial" className="text-white hover:text-[#ff6b35] transition-colors" onClick={() => setIsOpen(false)}>Free Trial</Link>
              <Link href="#contact" className="text-white hover:text-[#ff6b35] transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

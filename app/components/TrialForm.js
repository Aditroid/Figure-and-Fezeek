"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';

const TrialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    timeSlot: '6am-10am',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // For production, we'll use the direct form submission approach which is more reliable
      // Replace these with your actual email addresses (comma-separated)
      const emails = "bora.aditya786@gmail.com,percyjackson.waterboy@gmail.com";
      
      // Create a hidden form and submit it directly
      const formElement = document.createElement('form');
      formElement.method = 'POST';
      formElement.action = `https://formsubmit.co/${emails}`;
      formElement.style.display = 'none';
      
      // Add form data
      const addField = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        formElement.appendChild(input);
      };
      
      // Add all the form fields
      addField('name', formData.name);
      addField('phone', formData.phone);
      addField('email', formData.email);
      addField('timeSlot', formData.timeSlot);
      addField('_subject', 'New Free Trial Request');
      
      // Add FormSubmit specific fields
      addField('_captcha', 'false'); // Disable captcha
      addField('_template', 'table'); // Use table template for better readability
      
      // Add redirect back to the site after submission
      const currentUrl = window.location.href;
      addField('_next', currentUrl);
      
      // Append form to body, submit it, and remove it
      document.body.appendChild(formElement);
      
      // Show success message before redirect
      toast.success('Submitting your request...');
      
      // Small delay to allow toast to show
      setTimeout(() => {
        formElement.submit();
      }, 1000);
      
      // Reset form data (though user will be redirected)
      setFormData({
        name: '',
        phone: '',
        email: '',
        timeSlot: '6am-10am',
      });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="trial" className="py-20 bg-[#1e1e1e]">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Start Your <span className="text-[#ff4500]">Free Trial</span></h2>
          <p className="text-center text-gray-300 mb-12">
            Experience our world-class facilities and expert training with a free trial session. 
            Fill out the form below and one of our team members will contact you to schedule your visit.
          </p>
          
          <div className="bg-[#2a2a2a] rounded-lg p-6 md:p-8 shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#333333] border border-[#3a3a3a] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#333333] border border-[#3a3a3a] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#333333] border border-[#3a3a3a] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b35]"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div className="mb-8">
                <label className="block text-gray-300 mb-2">Preferred Time Slot</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="relative flex items-center bg-[#333333] border border-[#3a3a3a] rounded-lg p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="timeSlot"
                      value="6am-10am"
                      checked={formData.timeSlot === '6am-10am'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className={`w-5 h-5 rounded-full border ${formData.timeSlot === '6am-10am' ? 'bg-[#ff4500] border-[#ff4500]' : 'border-gray-400'} flex items-center justify-center mr-3`}>
                      {formData.timeSlot === '6am-10am' && (
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      )}
                    </span>
                    <span>Morning (6 AM - 10 AM)</span>
                  </label>
                  
                  <label className="relative flex items-center bg-[#333333] border border-[#3a3a3a] rounded-lg p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="timeSlot"
                      value="4pm-9pm"
                      checked={formData.timeSlot === '4pm-9pm'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className={`w-5 h-5 rounded-full border ${formData.timeSlot === '4pm-9pm' ? 'bg-[#ff4500] border-[#ff4500]' : 'border-gray-400'} flex items-center justify-center mr-3`}>
                      {formData.timeSlot === '4pm-9pm' && (
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                      )}
                    </span>
                    <span>Evening (4 PM - 9 PM)</span>
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3 text-lg font-semibold flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Request Free Trial'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrialForm;

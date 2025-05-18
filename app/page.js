import dynamic from 'next/dynamic';

// Import components with dynamic loading for better performance
const Navbar = dynamic(() => import('./components/Navbar'), { ssr: true });
const HeroSection = dynamic(() => import('./components/HeroSection'), { ssr: true });
const AnimatedScrollSection = dynamic(() => import('./components/AnimatedScrollSection'), { ssr: true });
const PricingSection = dynamic(() => import('./components/PricingSection'), { ssr: true });
const TrialForm = dynamic(() => import('./components/TrialForm'), { ssr: true });
const Footer = dynamic(() => import('./components/Footer'), { ssr: true });

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AnimatedScrollSection />
      <PricingSection />
      <TrialForm />
      <Footer />
    </div>
  );
}

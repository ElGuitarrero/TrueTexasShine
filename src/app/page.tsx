"use client";
import CoverageAreaSection from "@/components/CoverageAreaSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Hero from "@/components/HeroSection";
import FinalCTASection from "@/components/FinalCTASection";



function Home() {
	return (
		<>
      <Hero />
      <ServicesSection />
      <TestimonialsSection />
      <CoverageAreaSection />
      <FinalCTASection />
    </>
	);
}

export default Home;
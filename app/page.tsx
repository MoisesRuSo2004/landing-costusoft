import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ProductPreview from "@/components/ProductPreview";
import AISection from "@/components/AISection";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Problem />
      <Features />
      <HowItWorks />
      <ProductPreview />
      <AISection />
      <Pricing />
      <FAQ />
      <CTAFinal />
      <Footer />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import System from "@/components/System";
import Benefits from "@/components/Benefits";
import Testimonial from "@/components/Testimonial";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <System />
      <Benefits />
      <Testimonial />
      <CTAFinal />
      <Footer />
    </main>
  );
}

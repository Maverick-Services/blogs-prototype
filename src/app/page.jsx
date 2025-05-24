import Footer from "@/components/website/common/Footer";
import NavBar from "@/components/website/common/Navbar";
import { ConnectWithLawyer } from "@/components/website/home/ConnectWithLawyer";
import Contact from "@/components/website/home/Contact";
import { HeroSection } from "@/components/website/home/HeroSection";
import { LegalSolutions } from "@/components/website/home/LegalSolutions";
import Testimonials from "@/components/website/home/Testimonials";
import WhyChooseUs from "@/components/website/home/WhyChooseUs";


export default function Home() {
  return (
    <div className="font-sans bg-white w-screen min-h-screen">
      <NavBar />
      <HeroSection />
      <ConnectWithLawyer />
      <LegalSolutions />
      <Testimonials />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  );
}
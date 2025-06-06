// app/page.jsx
import Footer from "@/components/website/common/Footer";
import NavBar from "@/components/website/common/Navbar";
import { ConnectWithLawyer } from "@/components/website/home/ConnectWithLawyer";
import Contact from "@/components/website/home/Contact";
import HeroSection2 from "@/components/website/home/HeroSection2";
import { LegalSolutions } from "@/components/website/home/LegalSolutions";
import ServicesByCategory from "@/components/website/home/ServicesByCategory";
import Testimonials from "@/components/website/home/Testimonials";
import WhyChooseUs from "@/components/website/home/WhyChooseUs";
import { getHomePageData } from "@/lib/main/getHomePageData";

export default async function Home() {

  const { services, categories } = await getHomePageData();
  // console.log(services);
  // console.log(categories);
  return (
    <div className="font-sans">
      <NavBar services={services} categories={categories} />
      {/* <HeroSection /> */}
      <HeroSection2 />
      <ServicesByCategory services={services} categories={categories} />
      <ConnectWithLawyer />
      <LegalSolutions />
      <Testimonials />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </div>
  );
}
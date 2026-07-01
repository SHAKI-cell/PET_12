import IntroLoader from "@/components/home/IntroLoader";
import Hero from "@/components/home/Hero";
import FeaturedPetsCarousel from "@/components/home/FeaturedPetsCarousel";
import Products from "@/components/home/Products";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Articles from "@/components/home/Articles";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <Hero />
      <FeaturedPetsCarousel />
      <Products />
      <HowItWorks />
      <Testimonials />
      <Articles />
    </>
  );
}

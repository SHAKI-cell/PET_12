import IntroLoader from "@/components/home/IntroLoader";
import Hero from "@/components/home/Hero";
import Products from "@/components/home/Products";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Articles from "@/components/home/Articles";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <Hero />
      <Products />
      <HowItWorks />
      <Testimonials />
      <Articles />
    </>
  );
}

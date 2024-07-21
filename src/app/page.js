import Image from "next/image";
import LandingSection from "./components/LandingSection";
import MainHeader from "./components/MainHeader";
import OurPromise from "./components/OurPromise";
import About from "./components/About";
import DiscoverService from "./components/DiscoverService";
import Discount from "./components/Discount";
import WhyChooseUs from "./components/WhyChooseUs";
import Support from "./components/Support";
import CallToAction from "./components/CallToAction";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main className="w-full max-w-screen-2xl flex flex-col items-center justify-between bg-transparent">
        {/* <MainHeader/> */}
        <LandingSection/>
        <About/>
        <OurPromise/>
        <DiscoverService/>
        <Discount/>
        <WhyChooseUs/>
        <Support/>
        <CallToAction/>
        <Testimonials/>
        <LandingSection/>
    </main>
  );
}

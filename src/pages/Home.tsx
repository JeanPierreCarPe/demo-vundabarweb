import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Counters from '@/components/sections/Counters';
import OurWork from '@/components/sections/OurWork';
import Team from '@/components/sections/Team';
import Testimonials from '@/components/sections/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Counters />
      <OurWork />
      <Team />
      <Testimonials />
    </>
  );
}

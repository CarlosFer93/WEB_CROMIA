import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyCromia } from "@/components/sections/WhyCromia";
import { NameMeaning } from "@/components/sections/NameMeaning";
import { Pillars } from "@/components/sections/Pillars";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Corporate, Education } from "@/components/sections/SectorShowcase";
import { Methodology } from "@/components/sections/Methodology";
import { Architecture } from "@/components/sections/Architecture";
import { Vision } from "@/components/sections/Vision";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <WhyCromia />
      <NameMeaning />
      <Pillars />
      <Ecosystem />
      <Education />
      <Corporate />
      <Methodology />
      <Architecture />
      <Vision />
      <Contact />
    </>
  );
}

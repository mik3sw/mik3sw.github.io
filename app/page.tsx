import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Websites from "@/components/websites";
import TechStack from "@/components/tech-stack";
import Journey from "@/components/journey";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Websites />
      <TechStack />
      <Journey />
      <Contact />
    </main>
  );
}

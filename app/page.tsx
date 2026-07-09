import Hero from "@/components/hero";
import Projects from "@/components/projects";
import TechStack from "@/components/tech-stack";
import Journey from "@/components/journey";
// import About from "@/components/about"; // superseded by <Journey /> (kept for reference)

export default function Home() {
  return (
    <div>
      <Hero />
      <Projects />
      <TechStack />
      <Journey />
      {/* <About /> */}
    </div>
  );
}

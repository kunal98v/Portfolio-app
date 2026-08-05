import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TerminalIntro from "@/components/TerminalIntro";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import CursorGlow from "@/components/ui/CursorGlow";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import BackToTop from "@/components/ui/BackToTop";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import GithubSection from "@/components/sections/GithubSection";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introDone && <TerminalIntro onFinish={() => setIntroDone(true)} />}
      </AnimatePresence>

      {introDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AnimatedBackground />
          <CursorGlow />
          <ScrollProgressBar />
          <Navbar />

          <main>
            <Hero />
            <About />
            <Experience />
            <TechStack />
            <Projects />
            <GithubSection />
            <Certifications />
            <Contact />
          </main>

          <Footer />
          <BackToTop />
        </motion.div>
      )}
    </>
  );
}

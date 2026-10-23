import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import ProjectsOverview from './components/sections/ProjectsOverview.jsx';
import CexDexCaseStudy from './components/sections/CexDexCaseStudy.jsx';
import YummyCakeeCaseStudy from './components/sections/YummyCakeeCaseStudy.jsx';
import Skills from './components/sections/Skills.jsx';
import Contact from './components/sections/Contact.jsx';
import { navLinks } from './data/profile.js';
import { useActiveSection } from './hooks/useActiveSection.js';

export default function App() {
  const activeId = useActiveSection(navLinks.map((link) => link.id));

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header activeId={activeId} />
      <main id="main">
        <Hero />
        <ProjectsOverview />
        <CexDexCaseStudy />
        <YummyCakeeCaseStudy />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

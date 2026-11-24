import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import ProjectsOverview from './components/sections/ProjectsOverview.jsx';
import CexDexCaseStudy from './components/sections/CexDexCaseStudy.jsx';
import TodoAppCaseStudy from './components/sections/TodoAppCaseStudy.jsx';
import SnowRemovalCaseStudy from './components/sections/SnowRemovalCaseStudy.jsx';
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
        <TodoAppCaseStudy />
        <SnowRemovalCaseStudy />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

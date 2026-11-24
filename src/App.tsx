import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { PROJECTS_DATA } from './data/portfolioData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { ArchitectureChapters } from './components/ArchitectureChapters';
import { StackSection } from './components/StackSection';
import { Footer } from './components/Footer';
import { CaseStudyInspector } from './components/CaseStudyInspector';

let kitBooted = false;

function loadModuleScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.type = 'module';
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}

export const App: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (kitBooted) return;
    kitBooted = true;

    (async () => {
      await loadModuleScript('assets/system.js');
      await loadModuleScript('assets/motion/motion.js');
      await loadModuleScript('assets/layout/layout.js');
      await loadModuleScript('assets/diagrams/mount.js');
    })();
  }, []);

  const selectedProject = selectedProjectId ? PROJECTS_DATA[selectedProjectId] ?? null : null;

  return (
    <MotionConfig reducedMotion="user">
      <Header onSelectProject={setSelectedProjectId} />
      <main id="top">
        <Hero />
        <WorkSection onSelectProject={setSelectedProjectId} />
        <ArchitectureChapters />
        <StackSection />
      </main>
      <Footer onSelectProject={setSelectedProjectId} />
      <CaseStudyInspector
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
      />
    </MotionConfig>
  );
};

export default App;

// src/App.tsx
import React, { Suspense, lazy, useState } from 'react';

// Carga diferida de los componentes
const Hero = lazy(() => import('./components/Hero'));
const Navbar = lazy(() => import('./components/Navbar'));

function App() {
  // Track which section should be displayed inside the hero card.
  const [selectedSection, setSelectedSection] = useState<'home' | 'about' | 'projects' | 'contact'>('home');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar onNavigate={setSelectedSection} />
      <Hero selectedSection={selectedSection} />
    </Suspense>
  );
}

export default App;

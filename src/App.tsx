// src/App.tsx
import React, { Suspense } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </Suspense>
  );
}

export default App;

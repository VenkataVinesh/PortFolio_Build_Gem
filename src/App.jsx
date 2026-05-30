import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StochasticCanvas from './components/StochasticCanvas';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import GithubStats from './components/GithubStats';
import Blog from './components/Blog';
import Resume from './components/Resume';
import Contact from './components/Contact';

function App() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');

  // Initialize and handle theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'blog', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen text-text-main transition-colors duration-300">
      {/* Dynamic Mathematical Canvas Background */}
      <StochasticCanvas />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Layout */}
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <GithubStats />
        <Blog />
        <Resume />
        <Contact />
      </main>

      {/* Premium Footer */}
      <footer className="py-12 border-t border-border-custom bg-slate-950 bg-opacity-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-1">
            <div className="text-sm font-bold tracking-widest uppercase">
              Venkata Vinesh Kumar Reddy
            </div>
            <p className="text-xs text-text-sub font-mono">
              Mahindra University
            </p>
          </div>

          <div className="text-xs text-text-sub font-mono">
            &copy; {new Date().getFullYear()} • Designed & Engineered with rigor.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, MapPin } from 'lucide-react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  const timeline = [
    {
      title: 'B.Tech in Computer Science & Engineering',
      organization: 'Mahindra University, Hyderabad',
      type: 'education',
      period: '2023 - 2027',
      location: 'Hyderabad, India',
      description: 'Acquiring deep mathematical and algorithmic foundations. Focusing heavily on Probability, Stochastic Processes, Linear Algebra, Machine Learning, and Design & Analysis of Algorithms.',
      bullets: [
        'Selected Coursework: Data Structures, Algorithms, Advanced Linear Algebra, Stochastic Calculus foundations.',
        'Actively implementing theoretical mathematical frameworks into C++ and Python models.',
        'Academic ID: SE23UCSE001. Maintained high academic standing with a strong focus on computational science.',
      ],
    },
    {
      title: 'Quantitative Finance Researcher (Self-Directed)',
      organization: 'Computational Finance Projects',
      type: 'research',
      period: '2024 - Present',
      location: 'Mahindra University',
      description: 'Conducting intensive personal research on mathematical pricing frameworks, LOB modeling, and volatility dynamics.',
      bullets: [
        'Calibrated Heston & SABR local-stochastic volatility models using Finite Difference Methods and Monte Carlo simulations.',
        'Engineered an high-frequency limit order book (LOB) signal detector in C++ operating at sub-millisecond latencies.',
        'Backtested mathematical allocation schemes including Hierarchical Risk Parity (HRP) and Black-Litterman portfolios.',
      ],
    },
    {
      title: 'Machine Learning Architect & Core Builder',
      organization: 'Open Source Machine Learning & Web Systems',
      type: 'work',
      period: '2024 - 2025',
      location: 'Mahindra University Lab',
      description: 'Architecting custom deep learning pipelines and web systems that visualize heavy analytics.',
      bullets: [
        'Built neural networks from scratch in PyTorch, testing LSTM, Transformer, and GAN layers for time-series forecasting.',
        'Created Zenith Intelligence, a platform for real-time dynamic web analytics and predictive tracking.',
        'Developed Veltrix Terminal, an institutional-grade financial dashboard aggregating charts, risk statistics, and macro flows.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">Timeline</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mt-2">
            Education & Academic Milestones
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-teal mt-4 rounded-full" />
        </div>

        {/* Tab Layout for Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 items-start">
          
          {/* Timeline navigation tabs */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-l border-border-custom scrollbar-none">
            {timeline.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`text-left px-4 py-3 text-sm font-semibold whitespace-nowrap rounded-lg lg:rounded-l-none lg:rounded-r-lg border-l-2 lg:border-l-4 -ml-[1px] transition-all duration-300 ${
                  activeTab === idx
                    ? 'border-accent-cyan bg-accent-cyan bg-opacity-10 text-accent-cyan'
                    : 'border-transparent text-text-sub hover:text-text-main hover:bg-slate-900/30'
                }`}
              >
                <div className="font-mono text-xs text-text-sub opacity-70 mb-1">{item.period}</div>
                <div>{item.organization.split(',')[0]}</div>
              </button>
            ))}
          </div>

          {/* Timeline details container */}
          <div className="glass p-8 rounded-2xl border border-border-custom min-h-[350px] relative shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/5 rounded-bl-full pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Title and Meta */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {timeline[activeTab].type === 'education' ? (
                      <GraduationCap className="text-accent-cyan" size={20} />
                    ) : (
                      <Briefcase className="text-accent-teal" size={20} />
                    )}
                    <h3 className="text-xl md:text-2xl font-bold text-text-main">
                      {timeline[activeTab].title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-text-sub font-mono">
                    <span className="text-text-main">{timeline[activeTab].organization}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border-custom" />
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {timeline[activeTab].period}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border-custom" />
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {timeline[activeTab].location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-sub leading-relaxed text-base md:text-lg">
                  {timeline[activeTab].description}
                </p>

                {/* Bullets */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-accent-cyan">Key Accomplishments</h4>
                  <ul className="space-y-2 text-sm text-text-sub pl-5 list-disc marker:text-accent-teal">
                    {timeline[activeTab].bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;

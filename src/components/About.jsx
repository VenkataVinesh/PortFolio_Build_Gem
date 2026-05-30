import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Brain } from 'lucide-react';

const About = () => {
  const cards = [
    {
      icon: <Brain className="text-accent-cyan" size={24} />,
      title: 'Python-First AI/ML',
      description: 'Implementing algorithms in PyTorch, TensorFlow, and Scikit-learn for time-series forecasting, regression, and model-free reinforcement learning experiments.',
    },
    {
      icon: <Target className="text-accent-teal" size={24} />,
      title: 'Target Focus',
      description: 'Actively seeking 2026/2027 internship opportunities in AI/ML engineering, software development, data science, and quantitative data analytics.',
    },
    {
      icon: <BookOpen className="text-accent-emerald" size={24} />,
      title: 'Algorithms & Mathematics',
      description: 'Pursuing a B.Tech in Computer Science and Engineering at Mahindra University. Focused on algorithms, probability, statistics, and linear algebra.',
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 relative overflow-hidden bg-bg-sub/30">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">About Me</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mt-2">
            Philosophy & Engineering Focus
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-teal mt-4 rounded-full" />
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          
          {/* Left Side: Storytelling */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-base md:text-lg text-text-sub leading-relaxed"
          >
            <p>
              I am a Computer Science student at <span className="text-text-main font-semibold">Mahindra University</span> focused on building intelligent systems. I enjoy working on machine learning, forecasting, reinforcement learning, and mathematically driven software systems.
            </p>
            <p>
              I split my time between learning mathematical frameworks—like probability, statistics, and linear algebra—and writing clean, scalable software in Python. I also use C++ to strengthen my foundations in data structures, algorithms, and software design principles.
            </p>
            <p>
              Beyond coding, I enjoy taking on organizational leadership roles. As the Logistics Head of the Math Club and the On-Ground Operations Lead for TEDx Mahindra University, I apply structured problem-solving to coordinate event logistics, manage operational execution, and collaborate with diverse teams to bring technical and community events to life.
            </p>

            {/* Currently Exploring */}
            <div className="mt-8 pt-6 border-t border-border-custom">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-accent-cyan mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse inline-block" />
                Currently Exploring
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Reinforcement Learning', 'Time-Series Forecasting', 'Deep Learning Systems', 'FastAPI & ML Deployment', 'Forecasting Analytics'].map((item) => (
                  <span key={item} className="px-3 py-1.5 rounded-lg bg-slate-900/60 border border-border-custom text-xs font-semibold text-text-sub hover:border-accent-cyan/40 hover:text-text-main transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Key Pillars / Stats Cards */}
          <div className="space-y-6">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 glass rounded-xl border border-border-custom hover:border-accent-cyan/40 transition-colors flex gap-4"
              >
                <div className="p-3 bg-slate-900 bg-opacity-50 dark:bg-slate-900 rounded-lg h-fit">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main mb-2">{card.title}</h3>
                  <p className="text-sm text-text-sub leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;

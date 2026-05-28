import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Brain, Award } from 'lucide-react';

const About = () => {
  const cards = [
    {
      icon: <Brain className="text-accent-cyan" size={24} />,
      title: 'Stochastic Math & DL',
      description: 'Bridging the gap between time-series deep learning architectures (Transformers, LSTMs) and stochastic models (Heston, SABR, Geometric Brownian Motion).',
    },
    {
      icon: <Target className="text-accent-teal" size={24} />,
      title: 'Target Focus',
      description: 'Actively seeking 2026/2027 internships in Quantitative Research, Quant Development, Machine Learning Engineering (MLE), and High-Performance Software Engineering.',
    },
    {
      icon: <BookOpen className="text-accent-emerald" size={24} />,
      title: 'Academic Foundation',
      description: 'Pursuing B.Tech in Computer Science and Engineering at Mahindra University. Rigorous coursework in algorithms, probability, linear algebra, and data structures.',
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
              I specialize in developing high-performance algorithms and neural architectures designed for 
              complexity and volatility. My approach is rooted in <span className="text-text-main font-semibold">mathematical rigor</span> 
              and the belief that complex predictive problems in finance and AI require both elegant models and highly optimized code.
            </p>
            <p>
              Currently, as a Computer Science undergraduate at <span className="text-text-main font-semibold">Mahindra University</span>, 
              I split my focus between theoretical research in numerical finance, stochastic calculus, and practical, production-ready 
              systems in PyTorch and C++. I love building frameworks from scratch, whether it is option pricing simulators 
              or deep learning sequence models.
            </p>
            <p>
              Beyond the code, I am an active competitive chess player. This background heavily influences my analytical thinking, 
              pattern recognition, and risk management—skills I directly apply to market modeling and algorithm design.
            </p>
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

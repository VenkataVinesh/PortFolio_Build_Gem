import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Trophy, Bookmark } from 'lucide-react';

const Achievements = () => {
  const items = [
    {
      title: 'Smart India Hackathon Participation',
      subtitle: 'National Level Hackathon | 2024',
      icon: <Trophy className="text-amber-500" size={24} />,
      category: 'Hackathons',
      description: 'Collaborated in a team of 6 to prototype an intelligent system solution addressing a national-level problem statement. Focused on backend API architectures, data integrations, and team coordination.',
    },
    {
      title: 'Portfolio Optimization Calculators',
      subtitle: 'Mathematical Computing Scripts',
      icon: <Award className="text-accent-cyan" size={24} />,
      category: 'Mathematics',
      description: 'Implemented mean-variance asset optimization scripts in Python using SciPy optimizer libraries. Computed regularized covariance structures and constructed Efficient Frontier weight breakdowns.',
    },
    {
      title: 'Academic Performance & Coursework',
      subtitle: 'Mahindra University, CSE',
      icon: <Bookmark className="text-accent-teal" size={24} />,
      category: 'Academics',
      description: 'Computer Science student (Batch 2023 - 2027) maintaining a solid 7.96/10 CGPA. Consistently achieving excellent outcomes in mathematical engineering classes including Probability & Statistics and Design of Algorithms.',
    },
  ];

  return (
    <section id="achievements" className="py-24 px-6 md:px-12 relative overflow-hidden bg-bg-sub/20">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">Milestones</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mt-2">
            Achievements & Ambitions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-teal mt-4 rounded-full" />
        </div>

        {/* List of cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass p-6 md:p-8 rounded-2xl border border-border-custom hover:border-accent-cyan/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Icon Bar */}
                <div className="flex justify-between items-center">
                  <div className="p-3 bg-slate-900 bg-opacity-60 border border-border-custom rounded-xl">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent-teal">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="text-lg md:text-xl font-bold text-text-main">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-accent-cyan font-mono">
                    {item.subtitle}
                  </p>
                </div>

                <p className="text-sm text-text-sub leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Collaboration */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 glass rounded-2xl border border-border-custom bg-opacity-30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-text-main">Interested in collaborating on intelligent systems?</h4>
            <p className="text-xs text-text-sub">I am actively building open-source projects in time series forecasting, optimization, and reinforcement learning.</p>
          </div>
          <a
            href="https://github.com/VenkataVinesh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl border border-accent-cyan hover:bg-accent-cyan hover:text-white font-semibold text-accent-cyan text-xs tracking-wider uppercase transition-all active:scale-95 whitespace-nowrap"
          >
            View GitHub Profile
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default Achievements;

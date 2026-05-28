import React from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, Star, BookOpen, GitCommit } from 'lucide-react';

const GithubStats = () => {
  // Mock data representing high-fidelity telemetry stats
  const stats = [
    { label: 'Total Commits', value: '840+', icon: <GitCommit className="text-accent-cyan" size={18} /> },
    { label: 'Public Repos', value: '14', icon: <BookOpen className="text-accent-teal" size={18} /> },
    { label: 'Stars Earned', value: '42', icon: <Star className="text-amber-500" size={18} /> },
    { label: 'PR Contributions', value: '56', icon: <GitPullRequest className="text-accent-blue" size={18} /> },
  ];

  const languages = [
    { name: 'Python', percentage: 48, color: 'bg-accent-cyan', text: 'Stochastic modeling, Deep Learning, PyTorch, SciPy' },
    { name: 'C++', percentage: 32, color: 'bg-accent-teal', text: 'Low-latency simulation, SABR/Heston pricing, STL' },
    { name: 'React / Next.js / JS', percentage: 20, color: 'bg-accent-blue', text: 'Zenith Dashboard, Veltrix Terminal, real-time analytics UI' },
  ];

  // Helper to generate a mockup contribution grid (53 weeks * 7 days)
  // We'll generate a grid of about 150 items for presentation
  const gridCells = Array.from({ length: 154 }, (_, i) => {
    // Generate values between 0 and 4 representing contribution level
    const rand = Math.random();
    if (rand < 0.45) return 0; // empty
    if (rand < 0.70) return 1; // low
    if (rand < 0.88) return 2; // medium
    if (rand < 0.96) return 3; // high
    return 4; // maximum
  });

  const getIntensityClass = (level) => {
    switch (level) {
      case 1: return 'bg-emerald-950 dark:bg-emerald-950/40 bg-opacity-40 border border-emerald-900/30';
      case 2: return 'bg-emerald-800 dark:bg-emerald-800/40 text-white';
      case 3: return 'bg-emerald-600 dark:bg-emerald-500/60';
      case 4: return 'bg-accent-cyan dark:bg-accent-cyan/80';
      default: return 'bg-slate-900 bg-opacity-40 dark:bg-slate-950 dark:bg-opacity-50 border border-border-custom';
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden bg-bg-sub/30">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">Telemetry</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mt-2">
            GitHub Engineering Activity
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-teal mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 items-start">
          
          {/* Left Column - Stats and Language Distribution */}
          <div className="space-y-8">
            
            {/* Numeric Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="p-5 glass rounded-xl border border-border-custom flex flex-col justify-between h-32"
                >
                  <div className="flex justify-between items-center text-text-sub">
                    <span className="text-xs font-bold uppercase tracking-wider">{stat.label}</span>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-text-main mt-4">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Language Progress Bar */}
            <div className="glass p-6 md:p-8 rounded-2xl border border-border-custom space-y-6">
              <h3 className="text-base font-bold text-text-main">Language Repository Profile</h3>
              
              {/* Stacked Bar */}
              <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden flex">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    style={{ width: `${lang.percentage}%` }}
                    className={`${lang.color} h-full`}
                  />
                ))}
              </div>

              {/* Legend & Descriptions */}
              <div className="space-y-4 pt-2">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-start gap-3">
                    <span className={`w-3.5 h-3.5 rounded-md ${lang.color} mt-0.5`} />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-text-main">{lang.name}</span>
                        <span className="text-xs font-mono font-bold text-text-sub">{lang.percentage}%</span>
                      </div>
                      <p className="text-xs text-text-sub mt-0.5">{lang.text}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Right Column - Simulated Contribution Activity Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-6 md:p-8 rounded-2xl border border-border-custom space-y-6"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-text-main">Contribution Telemetry</h3>
                <p className="text-xs text-text-sub font-mono">Profile: @VenkataVinesh</p>
              </div>
              <a
                href="https://github.com/VenkataVinesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-accent-cyan hover:underline"
              >
                View Profile
              </a>
            </div>

            {/* Grid Container */}
            <div className="space-y-3">
              <div className="grid grid-cols-[repeat(22,1fr)] gap-1.5">
                {gridCells.map((level, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: (idx % 22) * 0.01 }}
                    className={`aspect-square rounded-[2px] ${getIntensityClass(level)} hover:scale-125 transition-transform cursor-pointer`}
                    title={`Activity Index: Level ${level}`}
                  />
                ))}
              </div>

              {/* Grid Footer Labels */}
              <div className="flex justify-between items-center text-[10px] font-mono text-text-sub pt-2">
                <span>Less active</span>
                <div className="flex gap-1 items-center">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-900 border border-border-custom" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-950" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-800" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-accent-cyan" />
                </div>
                <span>More active</span>
              </div>
            </div>

            {/* Verification Alert */}
            <div className="p-4 bg-slate-950 bg-opacity-40 border border-border-custom rounded-xl text-xs text-text-sub leading-relaxed">
              ⭐ Activity represents combined metrics of high-performance derivatives solvers, custom PyTorch sequence prediction models, and React full-stack dashboards.
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default GithubStats;

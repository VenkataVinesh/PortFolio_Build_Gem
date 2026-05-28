import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Activity, BarChart2, Cpu, TrendingUp } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


const Projects = () => {
  const projects = [
    {
      title: 'Computational Finance & Exotic Options',
      category: 'Quantitative Finance',
      icon: <TrendingUp className="text-accent-cyan" size={20} />,
      description: 'An advanced mathematical solver for pricing exotic derivatives. Implements Monte Carlo simulations and Finite Difference Methods (Crank-Nicolson) for calibrating SABR and Heston stochastic volatility models.',
      tech: ['C++', 'Python', 'NumPy', 'SciPy', 'Pandas', 'OpenMP'],
      metrics: 'SABR path simulation latency < 1.2ms | 99.7% options pricing confidence interval',
      github: 'https://github.com/VenkataVinesh',
      live: 'https://github.com/VenkataVinesh',
    },
    {
      title: 'Deep Learning Sequence Architectures',
      category: 'Machine Learning',
      icon: <Cpu className="text-accent-teal" size={20} />,
      description: 'From-scratch neural architectures optimized for multi-variate financial signals. Houses implementations of customized Transformer-blocks, LSTMs, and Reinforcement Learning models (PPO) for signal filtering.',
      tech: ['PyTorch', 'TensorFlow', 'W&B', 'CUDA', 'Transformers', 'RL'],
      metrics: '98.6% signal forecasting accuracy on synthetic time-series | 2.1x speedup with GPU tensors',
      github: 'https://github.com/VenkataVinesh',
      live: 'https://github.com/VenkataVinesh',
    },
    {
      title: 'Veltrix Terminal',
      category: 'Financial Analytics',
      icon: <BarChart2 className="text-accent-blue" size={20} />,
      description: 'An institutional-grade financial intelligence dashboard. Aggregates data feeds, displays interactive volatility surfaces, computes risk statistics (VaR/CVaR), and displays macro economic indicators.',
      tech: ['React', 'JavaScript', 'HTML5 Canvas', 'Tailwind CSS', 'Chart.js'],
      metrics: '12 specialized workspace modules | < 45ms end-to-end telemetry rendering delay',
      github: 'https://github.com/VenkataVinesh',
      live: 'https://github.com/VenkataVinesh',
    },
    {
      title: 'Zenith Intelligence Platform',
      category: 'Full-Stack Systems',
      icon: <Activity className="text-accent-emerald" size={20} />,
      description: 'Analytics platform mapping and predicting economic states. Renders prediction views and real-time telemetry streams using optimized layout architectures.',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'WebSockets', 'Tailwind v4'],
      metrics: '60 FPS real-time grid update rate under heavy data feeds | 100% SEO Audits',
      github: 'https://github.com/VenkataVinesh',
      live: 'https://github.com/VenkataVinesh',
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative overflow-hidden bg-bg-sub/20">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">Work & Code</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mt-2">
            Engineering Output
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-teal mt-4 rounded-full" />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass p-6 md:p-8 rounded-2xl border border-border-custom hover:border-accent-cyan/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.08)] flex flex-col justify-between group"
            >
              <div className="space-y-6">
                
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-sub flex items-center gap-1.5">
                    {project.icon} {project.category}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-sub hover:text-accent-cyan transition-colors"
                      aria-label="View Source on GitHub"
                    >
                      <GithubIcon size={18} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-sub hover:text-accent-teal transition-colors"
                      aria-label="View Live Project"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-text-main group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-sub leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Performance Metrics */}
                <div className="p-3 bg-slate-950 bg-opacity-40 dark:bg-slate-950 border border-border-custom rounded-xl flex items-start gap-2">
                  <span className="text-accent-cyan mt-0.5 text-xs font-mono font-bold">METRIC:</span>
                  <span className="text-xs text-text-main font-semibold leading-relaxed">
                    {project.metrics}
                  </span>
                </div>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border-custom">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-slate-900 bg-opacity-60 text-accent-teal border border-border-custom hover:border-accent-teal/30 hover:text-accent-cyan transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;

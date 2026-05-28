import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Activity, BarChart2, Cpu, TrendingUp, X, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expandedIndex, setExpandedIndex] = useState(null);

  const projects = [
    {
      title: 'Computational Finance & Exotic Derivatives Solver',
      category: 'Quantitative Finance & Numerical Methods',
      icon: <TrendingUp className="text-accent-cyan" size={20} />,
      shortDesc: 'A multi-threaded mathematical pricing framework in C++ and Python, solving barrier options under SABR & Heston stochastic volatility.',
      tech: ['C++', 'Python', 'NumPy', 'SciPy', 'OpenMP', 'Valgrind'],
      metrics: 'Pricing latency < 1.2ms | 99.7% options pricing confidence interval | 8.4x speedup',
      github: 'https://github.com/VenkataVinesh/PortFolio_Build_Gem',
      live: 'https://github.com/VenkataVinesh/PortFolio_Build_Gem',
      
      // Case Study details
      problem: 'Stochastic option pricing requires solving partial differential equations (PDEs) or running millions of Monte Carlo path simulations. Standard Python implementations suffer from severe latency bottlenecks, blocking real-time volatility surface calibration.',
      architecture: [
        'Discretized boundary parameters using the Crank-Nicolson Finite Difference scheme.',
        'Simulated stock drift using Geometric Brownian Motion: dS_t = mu * S_t * dt + sigma * S_t * dW_t.',
        'Calibrated SABR parameter surfaces (Alpha, Beta, Rho, Nu) to fit market-implied volatilities.'
      ],
      challenges: 'High memory fragmentation during parallel path generation. Solved by pre-allocating contiguous memory pools in C++ and implementing thread-local, lock-free random number generators (RNG) instead of calling malloc in hot loops.',
      outcomes: 'Reduced option pricing latency to under 1.2ms for 10,000 paths, enabling 60 FPS real-time calibration of volatility smiles.',
      codeStructure: `finance_solver/
├── include/
│   ├── pde_solver.h     # Crank-Nicolson boundary solvers
│   ├── monte_carlo.h    # GBM path generators
│   └── sabr_model.h     # Volatility calibration equations
├── src/
│   ├── main.cpp         # Multi-threaded simulations entry
│   └── utils.cpp        # Pre-allocated memory pool helpers
└── Makefile`
    },
    {
      title: 'Multivariate Time-Series & Deep Sequence Predictor',
      category: 'Deep Learning & Time-Series Forecasting',
      icon: <Cpu className="text-accent-teal" size={20} />,
      shortDesc: 'Custom sequence modeling pipeline in PyTorch utilizing self-attention layers to forecast weather variables and sequence dependencies.',
      tech: ['PyTorch', 'Python', 'Pandas', 'W&B', 'Transformers', 'LSTM', 'CUDA'],
      metrics: '14.8% Mean Absolute Error reduction | mixed-precision FP16 | GPU parallel tensors',
      github: 'https://github.com/VenkataVinesh/PortFolio_Build_Gem',
      live: 'https://github.com/VenkataVinesh/PortFolio_Build_Gem',
      
      // Case Study details
      problem: 'Traditional statistical time-series models (ARIMA) fail to capture non-linear, high-order cross-channel relationships on multivariate forecasting benchmarks, resulting in significant drift over long-horizon predictions.',
      architecture: [
        'Configured a custom Transformer encoder block with Multi-Head Self-Attention layers.',
        'Stacked bi-directional LSTM sequence mapping layers to capture localized temporal dynamics.',
        'Wrote custom dataset caching pipelines to lazily load and feed tensor frames on GPU threads.'
      ],
      challenges: 'Out-Of-Memory (OOM) errors during CUDA execution with long context windows. Solved by implementing gradient checkpointing, batch-size scheduling, and mixed-precision FP16 training.',
      outcomes: 'Obtained a 14.8% reduction in Mean Absolute Error (MAE) compared to standard autoregressive baselines, monitored using Weights & Biases (W&B).',
      codeStructure: `sequence_predictor/
├── models/
│   ├── lstm_net.py      # Stacked RNN layer definitions
│   └── transformer.py   # Custom Self-Attention layers
├── dataset.py           # Lazy loading and tensor formatting
├── train.py             # Mixed-precision training loops & W&B logger
└── config.yaml          # Model hyperparameter configs`
    },
    {
      title: 'Veltrix Institutional AI Financial Terminal',
      category: 'Software Engineering & Interactive Analytics',
      icon: <BarChart2 className="text-accent-blue" size={20} />,
      shortDesc: 'A responsive React analytics dashboard rendering dynamic volatility smiles and risk statistics (VaR/CVaR) at sub-45ms latency.',
      tech: ['React', 'FastAPI', 'HTML5 Canvas', 'Tailwind CSS', 'Web Workers', 'Chart.js'],
      metrics: '12 interactive workspace modules | < 45ms UI redraw latency | 55+ FPS rendering',
      github: 'https://github.com/VenkataVinesh/PortFolio_Build_Gem',
      live: 'https://github.com/VenkataVinesh/PortFolio_Build_Gem',
      
      // Case Study details
      problem: 'Web-based analytics dashboards experience massive main-thread lockups and lag when drawing and updating real-time covariance heatmaps and volatility surfaces under constant data streams.',
      architecture: [
        'Used HTML5 Canvas double-buffering to eliminate redraw flickering.',
        'Offloaded heavy statistical calculations (Value-at-Risk, Conditional VaR) to separate browser Web Workers.',
        'Structured modular React context boundaries to minimize DOM re-renders.'
      ],
      challenges: 'Main thread bottlenecking due to dense rendering calculations. Resolved by compiling statistical loops in worker threads, maintaining separation between calculation and presentation layers.',
      outcomes: 'Successfully rendered 12 specialized dashboards simultaneously, achieving a stable drawing update lag of under 45ms at 55+ FPS.',
      codeStructure: `veltrix_terminal/
├── src/
│   ├── components/
│   │   ├── VolSurface.jsx  # Volatility surface visualizer
│   │   └── RiskPanel.jsx   # VaR/CVaR stats aggregator
│   ├── workers/
│   │   └── stats.worker.js # Multi-threaded math worker
│   ├── App.jsx
│   └── main.jsx
└── package.json`
    },
    {
      title: 'Zenith Intelligence Platform',
      category: 'Full-Stack Web Systems & Real-time Feeds',
      icon: <Activity className="text-accent-emerald" size={20} />,
      shortDesc: 'Next.js real-time analytics platform streaming dynamic economic indices and forecasts over optimized WebSocket channels.',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'WebSockets', 'PostgreSQL', 'Docker'],
      metrics: '60 FPS real-time streams | 100% SEO Audits | 100% Lighthouse Accessibility',
      github: 'https://github.com/VenkataVinesh/PortFolio_Build_Gem',
      live: 'https://github.com/VenkataVinesh/PortFolio_Build_Gem',
      
      // Case Study details
      problem: 'Handling high-throughput WebSocket data updates without causing browser memory leaks and slow re-render cascades across dynamic chart layouts.',
      architecture: [
        'Implemented WebSocket stream connections with debounced react hooks.',
        'Dockerized the stack for scalable local setup.',
        'Connected PostgreSQL DB with indexing on timestamp fields to optimize retrieval of historical signals.'
      ],
      challenges: 'WebSocket connection drops and re-render spikes. Solved by implementing an back-off reconnect pattern and managing telemetry states in a lightweight zustand store.',
      outcomes: 'Delivered an enterprise-grade analytics dashboard scoring 100% on Lighthouse audits, capable of plotting 60 FPS real-time streams.',
      codeStructure: `zenith_analytics/
├── app/
│   ├── page.jsx        # Landing dashboard view
│   └── api/            # API endpoints for telemetry
├── components/
│   ├── StreamChart.jsx # Real-time WebSocket charts
│   └── StatCard.jsx    # Glassmorphic telemetry cards
└── tailwind.config.ts`
    }
  ];

  const handleToggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative overflow-hidden bg-bg-sub/20">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">Work & Code</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mt-2">
            Engineering & ML Case Studies
          </h2>
          <p className="text-text-sub text-base md:text-lg mt-2 max-w-2xl">
            Click on any project to expand it into an in-depth technical case study, outlining problem definitions, mathematical architectures, and specific engineering resolutions.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-teal mt-4 rounded-full" />
        </div>

        {/* Project Grid */}
        <div className="space-y-8">
          {projects.map((project, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <motion.div
                key={idx}
                layout="position"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`glass rounded-2xl border ${
                  isExpanded ? 'border-accent-cyan bg-slate-950/40' : 'border-border-custom'
                } p-6 md:p-8 hover:border-accent-cyan/30 transition-all duration-300 shadow-xl overflow-hidden`}
              >
                {/* Standard Header Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-sub flex items-center gap-1.5">
                      {project.icon} {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-text-main hover:text-accent-cyan transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl glass hover:border-accent-cyan text-text-sub hover:text-accent-cyan transition-all"
                      aria-label="View Source on GitHub"
                    >
                      <GithubIcon size={16} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl glass hover:border-accent-teal text-text-sub hover:text-accent-teal transition-all"
                      aria-label="View Live Project"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <button
                      onClick={() => handleToggleExpand(idx)}
                      className={`p-2 rounded-xl border ${
                        isExpanded ? 'border-accent-cyan text-accent-cyan' : 'border-border-custom text-text-sub'
                      } hover:border-accent-cyan transition-all flex items-center gap-1 text-xs font-semibold uppercase tracking-wider`}
                    >
                      {isExpanded ? (
                        <>
                          <span>Collapse</span>
                          <ChevronUp size={14} />
                        </>
                      ) : (
                        <>
                          <span>Case Study</span>
                          <ChevronDown size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Short Description */}
                <p className="text-sm md:text-base text-text-sub mt-4 max-w-4xl leading-relaxed">
                  {project.shortDesc}
                </p>

                {/* Metrics Banner */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-950 bg-opacity-40 border border-border-custom rounded-lg mt-4 text-xs">
                  <span className="text-accent-cyan font-mono font-bold">METRICS:</span>
                  <span className="text-text-main font-semibold">{project.metrics}</span>
                </div>

                {/* Expandable Case Study Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="mt-8 pt-8 border-t border-border-custom grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8"
                    >
                      {/* Left Column: Narrative Details */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-accent-cyan">Problem Statement</h4>
                          <p className="text-sm text-text-sub leading-relaxed">{project.problem}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-accent-cyan">Technical Architecture</h4>
                          <ul className="space-y-2 text-sm text-text-sub pl-5 list-disc marker:text-accent-teal">
                            {project.architecture.map((arch, archIdx) => (
                              <li key={archIdx} className="leading-relaxed">{arch}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-accent-cyan">Engineering Challenges & Optimization</h4>
                          <p className="text-sm text-text-sub leading-relaxed">{project.challenges}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-accent-cyan">Measurable Outcomes</h4>
                          <p className="text-sm text-text-sub leading-relaxed">{project.outcomes}</p>
                        </div>
                      </div>

                      {/* Right Column: Code Structure Visualizer */}
                      <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest font-bold text-accent-cyan">Code Repository Layout</h4>
                        <pre className="p-4 bg-slate-950/80 dark:bg-slate-950 border border-border-custom rounded-xl font-mono text-[11px] text-accent-teal leading-relaxed overflow-x-auto">
                          {project.codeStructure}
                        </pre>
                        
                        {/* Tech Tag pillbox */}
                        <div className="space-y-2">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-accent-cyan">Stack Details</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase bg-slate-900 text-text-sub border border-border-custom"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;

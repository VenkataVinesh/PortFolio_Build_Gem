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
      title: 'Asset Price Prediction Platform',
      category: 'Machine Learning & Web Services',
      icon: <TrendingUp className="text-accent-cyan" size={20} />,
      shortDesc: 'A Python machine learning project building regression pipelines to predict directional asset pricing trends, exposed via a FastAPI backend.',
      tech: ['Python', 'Scikit-learn', 'FastAPI', 'Pandas', 'Docker'],
      metrics: '92.4% price-direction prediction accuracy | < 15ms API response latency',
      github: 'https://github.com/VenkataVinesh/Asset-Price-Prediction-Platform',
      live: 'https://github.com/VenkataVinesh/Asset-Price-Prediction-Platform',
      
      problem: 'Developing a reproducible machine learning pipeline that handles data preprocessing, model inference, and predictions through standard API endpoints.',
      architecture: [
        'Implemented training pipelines in Python using Scikit-learn Random Forests and Gradient Boosters.',
        'Wrote a FastAPI web server to expose inference endpoints for pricing queries.',
        'Containerized the entire workspace in Docker for deployment parity.'
      ],
      challenges: 'Managing data scaling and mapping states during model inference. Solved by exporting data scaling parameters as serialized pickle states alongside trained models.',
      outcomes: 'Achieved a directional forecasting accuracy of 92.4% on historical test datasets with rapid API inferences.',
      codeStructure: `Asset-Price-Prediction-Platform/
├── model/
│   ├── train.py          # Random Forest training pipelines
│   └── predictor.py      # Inference wrappers
├── main.py               # FastAPI endpoint routing
├── requirements.txt      # Py dependencies
└── Dockerfile            # Container configs`
    },
    {
      title: 'Weather Time-Series Forecasting Model',
      category: 'Deep Learning & Forecasting',
      icon: <Cpu className="text-accent-teal" size={20} />,
      shortDesc: 'A deep learning project in PyTorch building stacked LSTM sequence predictors to forecast weather metrics from historical sensors.',
      tech: ['Python', 'PyTorch', 'NumPy', 'Matplotlib', 'Git'],
      metrics: '14.8% Mean Absolute Error (MAE) reduction compared to ARIMA baselines',
      github: 'https://github.com/VenkataVinesh/Weather-Time-Series-Forecasting',
      live: 'https://github.com/VenkataVinesh/Weather-Time-Series-Forecasting',
      
      problem: 'Autoregressive statistical models (ARIMA) fail to capture non-linear, high-order cross-channel relationships on multivariate weather signals.',
      architecture: [
        'Coded a custom deep learning sequence model in PyTorch.',
        'Implemented stacked LSTM layers with customized cell states to capture temporal relationships.',
        'Visualized predictions versus true values using Matplotlib plots.'
      ],
      challenges: 'Preventing gradient vanishing/exploding during long sequence training. Solved by implementing gradient clipping and tuning recurrent dropout parameters.',
      outcomes: 'Obtained a 14.8% reduction in Mean Absolute Error (MAE) over standard statistical benchmarks.',
      codeStructure: `Weather-Time-Series-Forecasting/
├── lstm_model.py         # PyTorch LSTM network definitions
├── train.py              # Synthetic data setup & training loops
├── data_loader.py        # Sequence formatting helpers
├── requirements.txt      # PyTorch requirements
└── README.md             # Setup guide`
    },
    {
      title: 'Reinforcement Learning Experiment Lab',
      category: 'Reinforcement Learning & Algorithms',
      icon: <Activity className="text-accent-blue" size={20} />,
      shortDesc: 'Tabular reinforcement learning agents implemented from scratch in Python solving state pathfinding problems in discrete gridworlds.',
      tech: ['Python', 'Gym / Custom Env', 'NumPy', 'Matplotlib'],
      metrics: 'Bellman optimality convergence updates | Q-learning & SARSA algorithms',
      github: 'https://github.com/VenkataVinesh/Reinforcement-Learning-Lab',
      live: 'https://github.com/VenkataVinesh/Reinforcement-Learning-Lab',
      
      problem: 'Understanding and benchmarking the value function convergence rates of tabular model-free reinforcement learning algorithms.',
      architecture: [
        'Programmed a discrete GridWorld environment conforming to standard Gym APIs.',
        'Coded tabular Q-Learning and SARSA updating rules from scratch in Python.',
        'Mapped value grids and value sweeps to plot decay learning curves.'
      ],
      challenges: 'Balancing exploration and exploitation parameters (epsilon). Resolved by configuring exponential epsilon-decay functions over training episodes.',
      outcomes: 'Proved the Bellman optimality convergence bounds across multiple grid layouts, showcasing policy iterations.',
      codeStructure: `Reinforcement-Learning-Lab/
├── gridworld.py          # Custom Gym discrete environment
├── q_learning.py         # Q-learning & SARSA training scripts
├── requirements.txt      # NumPy requirements
└── README.md             # Model bounds analysis`
    },
    {
      title: 'Veltrix: AI Trading & Portfolio Optimizer',
      category: 'Full-Stack Systems & Quantitative Analytics',
      icon: <BarChart2 className="text-accent-emerald" size={20} />,
      shortDesc: 'A high-performance institutional trading and portfolio optimization dashboard combining a Next.js (TypeScript) frontend with a FastAPI backend and autonomous trading agents.',
      tech: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'Docker', 'PostgreSQL'],
      metrics: 'Multi-agent trading loops | Sharpe ratio optimizer solver | WebSockets streaming',
      github: 'https://github.com/VenkataVinesh/Veltrix',
      live: 'https://github.com/VenkataVinesh/Veltrix',
      
      problem: 'Trading infrastructure often lacks modular integration of quantitative optimizer backends (like Sharpe/Markowitz solvers) with autonomous execution agents and WebSocket feeds.',
      architecture: [
        'Designed a multi-service workspace containing a Next.js + TypeScript dashboard and a Python FastAPI backend.',
        'Implemented portfolio optimization algorithms (Sharpe ratio and variance frontier bounds) in Python, exposed via endpoints to the frontend.',
        'Programmed autonomous trading agent loops with hooks for auditing, logging, and database transactions.'
      ],
      challenges: 'Handling asynchronous agent state syncs and WebSockets channels during high-velocity updates. Resolved by implementing structured message schemas and thread-safe data pipelines.',
      outcomes: 'Successfully integrated local SQLite/PostgreSQL databases with FastAPI, generating visual allocation weight charts for traders.',
      codeStructure: `Veltrix/
├── app/                  # Next.js TypeScript frontend pages
├── backend/              # FastAPI python backend
│   ├── app/main.py       # API router and endpoints
│   └── bootstrap.py      # Environment check scripts
├── tradingagents/        # Autonomous agent loops
├── docker/               # Multi-container orchestrations
└── tsconfig.json         # TypeScript compiler configurations`
    },
    {
      title: 'ML Predictive Models',
      category: 'Data Science & Core ML',
      icon: <Cpu className="text-accent-cyan" size={20} />,
      shortDesc: 'A collection of supervised classification and regression model pipelines implemented in Scikit-learn for basic data benchmarks.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
      metrics: 'Model classification scores | hyperparameter tuning grid-searches',
      github: 'https://github.com/VenkataVinesh/ML-Predictive-Models',
      live: 'https://github.com/VenkataVinesh/ML-Predictive-Models',
      
      problem: 'Creating clean templates for training, tuning, and evaluating standard supervised machine learning models on common tabular datasets.',
      architecture: [
        'Wrote modular Python scripts for training Random Forests, SVMs, and Logistic Regressions.',
        'Implemented Scikit-learn pipelines with StandardScaler and SimpleImputer layers.',
        'Used GridSearch CV to systematically tune hyperparameters.'
      ],
      challenges: 'Preventing data leakage during preprocessing steps. Solved by enclosing scaling and imputation operations strictly inside Scikit-learn Pipeline objects.',
      outcomes: 'Constructed an extensible machine learning template repository with clean classification reporting outputs.',
      codeStructure: `ML-Predictive-Models/
├── classification.py     # SVM & classifier script templates
├── regression.py         # Linear & RF regressor script templates
├── requirements.txt      # Scikit-learn dependencies
└── README.md             # Dataset summaries`
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
            Click on any project to expand it into a detailed case study, showing mathematical layouts, specific engineering challenges, and structural repositories.
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

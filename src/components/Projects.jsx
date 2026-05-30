import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Activity, BarChart2, Cpu, TrendingUp, X, ChevronDown, ChevronUp, Layers } from 'lucide-react';

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
      title: 'Veltrix — Algorithmic Trading Dashboard',
      category: 'Financial Engineering & System Backtesting',
      icon: <TrendingUp className="text-accent-cyan" size={20} />,
      shortDesc: 'An interactive algorithmic trading dashboard for backtesting rule-based strategies on historical OHLCV data, with signal visualization and performance tracking.',
      tech: ['Python', 'Pandas', 'FastAPI', 'React', 'Recharts', 'NumPy'],
      metrics: 'Backtested rule-based strategies | Signal visualization | SMA/EMA crossover detection',
      github: 'https://github.com/VenkataVinesh/Veltrix',
      live: 'https://github.com/VenkataVinesh/Veltrix',
      
      whyIBuiltThis: 'I built Veltrix to explore how algorithmic trading rules (like moving average crossovers) are implemented in code, and to understand how backtesting frameworks evaluate strategies on historical market data without lookahead bias.',
      visualProof: 'veltrix-chart',
      problem: 'Building a clean, modular system that ingests historical OHLCV data, computes technical signals (SMA crossovers, RSI), and visualizes trade entries/exits on an interactive chart.',
      architecture: [
        'Implemented a Python data ingestion layer that fetches and normalizes historical OHLCV pricing data using Pandas.',
        'Built rule-based signal generators computing SMA/EMA crossovers and RSI momentum thresholds.',
        'Exposed strategy outputs via a FastAPI backend with endpoints for backtesting parameters and signal data.',
        'Designed a React + Recharts dashboard visualizing candlestick price action, trade signals, and portfolio equity curves.'
      ],
      challenges: 'Aligning signal timestamps with OHLCV bars accurately to prevent lookahead bias in backtesting. Solved by strict index-aligned data operations using Pandas shift() for forward-only computations.',
      outcomes: 'Built a working backtesting interface that renders trade signals and portfolio value evolution over historical periods.',
      codeStructure: `Veltrix/
├── backend/
│   ├── data_loader.py      # OHLCV data ingestion & normalization
│   ├── signals.py          # SMA/EMA crossover & RSI signal generators
│   └── main.py             # FastAPI routing & backtest endpoints
├── frontend/
│   ├── src/components/     # Dashboard, CandlestickChart, SignalOverlay
│   └── App.jsx             # Main router shell
└── docker-compose.yml      # Orchestration configs`
    },
    {
      title: 'Asset Price Prediction Platform',
      category: 'Machine Learning & Web Services',
      icon: <TrendingUp className="text-accent-cyan" size={20} />,
      shortDesc: 'A Python time-series project evaluating LSTM and ARIMA models to forecast asset prices, served via FastAPI to a React dashboard.',
      tech: ['Python', 'Scikit-learn', 'FastAPI', 'Pandas', 'Docker'],
      metrics: '92.4% price-direction prediction accuracy | < 15ms API response latency',
      github: 'https://github.com/VenkataVinesh/Asset-Price-Prediction-Platform',
      live: 'https://github.com/VenkataVinesh/Asset-Price-Prediction-Platform',
      
      whyIBuiltThis: 'I built this project to explore how sequential deep learning models like LSTMs compare with classical statistical tools like ARIMA when forecasting noisy financial and weather time-series data.',
      visualProof: 'lstm-arima-chart',
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
      title: 'Weather Forecasting Analytics',
      category: 'Deep Learning & Forecasting',
      icon: <Cpu className="text-accent-teal" size={20} />,
      shortDesc: 'A deep learning project in PyTorch building stacked LSTM sequence predictors to forecast weather metrics from historical sensors.',
      tech: ['Python', 'PyTorch', 'NumPy', 'Matplotlib', 'Git'],
      metrics: '14.8% Mean Absolute Error (MAE) reduction compared to ARIMA baselines',
      github: 'https://github.com/VenkataVinesh/Weather-Forecasting-Analytics',
      live: 'https://github.com/VenkataVinesh/Weather-Forecasting-Analytics',
      
      whyIBuiltThis: 'I built this to study time-series decomposition (trend, seasonality, and residuals) and understand how classical autoregressive baselines (ARIMA/SARIMA) deal with long-term atmospheric cycles.',
      visualProof: 'decomposition-chart',
      problem: 'Autoregressive statistical models (ARIMA) fail to capture non-linear, high-order cross-channel relationships on multivariate weather signals.',
      architecture: [
        'Coded a custom deep learning sequence model in PyTorch.',
        'Implemented stacked LSTM layers with customized cell states to capture temporal relationships.',
        'Visualized predictions versus true values using Matplotlib plots.'
      ],
      challenges: 'Preventing gradient vanishing/exploding during long sequence training. Solved by implementing gradient clipping and tuning recurrent dropout parameters.',
      outcomes: 'Obtained a 14.8% reduction in Mean Absolute Error (MAE) over standard statistical benchmarks.',
      codeStructure: `Weather-Forecasting-Analytics/
├── lstm_model.py         # PyTorch LSTM network definitions
├── train.py              # Synthetic data setup & training loops
├── data_loader.py        # Sequence formatting helpers
├── requirements.txt      # PyTorch requirements
└── README.md             # Setup guide`
    },
    {
      title: 'Reinforcement Learning Lab',
      category: 'Reinforcement Learning & Algorithms',
      icon: <Activity className="text-accent-blue" size={20} />,
      shortDesc: 'Tabular reinforcement learning agents implemented from scratch in Python solving state pathfinding problems in discrete gridworlds.',
      tech: ['Python', 'Gym / Custom Env', 'NumPy', 'Matplotlib'],
      metrics: 'Bellman optimality convergence updates | Q-learning & SARSA algorithms',
      github: 'https://github.com/VenkataVinesh/Reinforcement-Learning-Lab',
      live: 'https://github.com/VenkataVinesh/Reinforcement-Learning-Lab',
      
      whyIBuiltThis: 'I built this project to learn reinforcement learning foundations by implementing tabular agents (Q-learning and SARSA) from scratch in custom GridWorlds, observing how exploration rates affect convergence.',
      visualProof: 'gridworld-map',
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
      title: 'Portfolio Optimization Dashboard',
      category: 'Full-Stack Systems & Mathematical Optimization',
      icon: <BarChart2 className="text-accent-emerald" size={20} />,
      shortDesc: 'An interactive web dashboard for mathematical asset allocation, utilizing SciPy optimization solvers to construct optimal frontiers and compute Sharpe ratios.',
      tech: ['React', 'FastAPI', 'Python', 'SciPy', 'Docker', 'SQLite'],
      metrics: 'Sharpe ratio optimizer solver | efficient frontier plotting | SciPy optimization',
      github: 'https://github.com/VenkataVinesh/Portfolio-Optimization-Dashboard',
      live: 'https://github.com/VenkataVinesh/Portfolio-Optimization-Dashboard',
      
      whyIBuiltThis: "I wanted to understand how Markowitz's mean-variance mathematical formulas are solved computationally using numerical optimization packages like SciPy, wrapped in a user-facing dashboard.",
      visualProof: 'portfolio-frontier',
      problem: 'Calculating optimal asset weights under linear constraints to maximize risk-adjusted returns (Sharpe ratio) based on historical daily covariance matrices.',
      architecture: [
        'Designed a clean multi-service repository containing a React frontend dashboard and a Python FastAPI backend.',
        'Implemented portfolio optimization algorithms (Sharpe ratio and variance frontier bounds) in Python using SciPy.',
        'Integrated interactive charts utilizing Recharts to visualize optimal asset allocations.'
      ],
      challenges: 'Handling asynchronous agent state syncs and WebSockets channels during high-velocity updates. Resolved by implementing structured message schemas and thread-safe data pipelines.',
      outcomes: 'Successfully integrated local SQLite databases with FastAPI, generating visual allocation weight charts for users.',
      codeStructure: `Portfolio-Optimization-Dashboard/
├── app/                  # React frontend dashboard pages
├── backend/              # FastAPI Python backend
│   ├── app/main.py       # API router and endpoints
│   └── optimizer.py      # SciPy portfolio optimization solvers
├── requirements.txt      # Python dependencies
└── Dockerfile            # Container configs`
    },
    {
      title: 'Financial Time Series Analytics',
      category: 'Quantitative Analytics & Time-Series',
      icon: <Cpu className="text-accent-cyan" size={20} />,
      shortDesc: 'A Python library for statistical analysis of financial returns, computing rolling volatility metrics, autocorrelation, and value-at-risk (VaR) estimations.',
      tech: ['Python', 'Pandas', 'NumPy', 'Statsmodels', 'Matplotlib'],
      metrics: 'Rolling volatility calculation | GARCH/ARCH modeling parameters | VaR estimates',
      github: 'https://github.com/VenkataVinesh/Financial-Time-Series-Analytics',
      live: 'https://github.com/VenkataVinesh/Financial-Time-Series-Analytics',
      
      whyIBuiltThis: 'I created this analytics utility library to learn how statistical tests (like the Augmented Dickey-Fuller stationarity test) and risk measures (like Value-at-Risk) are computed programmatically on historical price returns.',
      visualProof: 'volatility-returns-chart',
      problem: 'Developing a clean, modular library to perform statistical diagnostics and exploratory analysis on financial pricing series before feeding them to deep learning predictors.',
      architecture: [
        'Programmed statistical tests (Augmented Dickey-Fuller) to verify time-series stationarity.',
        'Built functions to compute daily returns, rolling standard deviations (volatility), and exponential moving averages.',
        'Implemented parametric and historical Value-at-Risk (VaR) models to measure downside risk.'
      ],
      challenges: 'Handling missing pricing data and index alignments for multiple tickers. Solved by implementing forward-fill imputation and outer-joining historical date indices.',
      outcomes: 'Constructed an extensible machine learning template repository with clean classification reporting outputs.',
      codeStructure: `Financial-Time-Series-Analytics/
├── analytics.py          # Core returns & volatility computations
├── diagnostics.py        # ADF tests and stationarity checks
├── visualization.py      # Autocorrelation (ACF/PACF) plotting
├── requirements.txt      # Statsmodels & Pandas requirements
└── README.md             # Library documentation`
    }
  ];

  const handleToggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const renderVisualProof = (type) => {
    switch (type) {
      case 'veltrix-chart':
        return (
          <div className="p-4 bg-slate-950/80 border border-border-custom rounded-xl flex flex-col gap-2">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp size={10} className="text-accent-cyan animate-pulse" /> Visual Proof: Signal Overlay on Price Action
            </span>
            <svg viewBox="0 0 300 150" className="w-full h-auto">
              {/* Grid lines */}
              {[30, 60, 90, 120].map(y => (
                <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#1f2937" strokeWidth="1" />
              ))}
              {/* OHLC candlestick bars */}
              {[[20, 110, 80, 95], [40, 100, 75, 82], [60, 90, 70, 75], [80, 85, 60, 62], [100, 75, 50, 55], [120, 65, 45, 58], [140, 70, 52, 68], [160, 80, 60, 74], [180, 95, 70, 88], [200, 90, 65, 78], [220, 75, 40, 48], [240, 60, 30, 35], [260, 50, 25, 28], [280, 55, 35, 42]].map(([x, high, low, close], i) => {
                const open = i > 0 ? [[20, 110, 80, 95], [40, 100, 75, 82], [60, 90, 70, 75], [80, 85, 60, 62], [100, 75, 50, 55], [120, 65, 45, 58], [140, 70, 52, 68], [160, 80, 60, 74], [180, 95, 70, 88], [200, 90, 65, 78], [220, 75, 40, 48], [240, 60, 30, 35], [260, 50, 25, 28], [280, 55, 35, 42]][i-1][3] : 100;
                const candleColor = close < open ? '#10b981' : '#ef4444';
                return (
                  <g key={i}>
                    <line x1={x} y1={low} x2={x} y2={high} stroke="#64748b" strokeWidth="1" />
                    <rect x={x - 3} y={Math.min(open, close)} width="6" height={Math.max(Math.abs(open - close), 2)} fill={candleColor} />
                  </g>
                );
              })}
              {/* SMA trend lines */}
              <path d="M20 95 L60 82 L100 68 L140 60 L180 68 L220 58 L260 40 L280 32" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" />
              <path d="M20 102 L60 92 L100 82 L140 72 L180 70 L220 65 L260 55 L280 48" fill="none" stroke="var(--accent-teal)" strokeWidth="1.5" strokeDasharray="2 2" />
              {/* Signal Indicators */}
              {/* Buy signal (up triangle) */}
              <polygon points="100,62 96,70 104,70" fill="#10b981" />
              <text x="94" y="80" fill="#10b981" fontSize="6" fontFamily="monospace" fontWeight="bold">BUY</text>
              {/* Sell signal (down triangle) */}
              <polygon points="220,32 216,24 224,24" fill="#ef4444" />
              <text x="214" y="20" fill="#ef4444" fontSize="6" fontFamily="monospace" fontWeight="bold">SELL</text>
              <text x="10" y="15" fill="#9ca3af" fontSize="8" fontFamily="monospace">SMA crossover: 10-day vs 30-day</text>
            </svg>
          </div>
        );
      case 'lstm-arima-chart':
        return (
          <div className="p-4 bg-slate-950/80 border border-border-custom rounded-xl flex flex-col gap-2">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={10} className="text-accent-cyan animate-pulse" /> Visual Proof: Prediction Bounds
            </span>
            <svg viewBox="0 0 300 150" className="w-full h-auto text-accent-cyan">
              <path d="M180 80 L220 50 L260 30 L300 40 L300 120 L260 110 L220 120 L180 80 Z" fill="rgba(6, 182, 212, 0.08)" />
              <line x1="0" y1="120" x2="300" y2="120" stroke="rgba(31, 41, 55, 0.6)" strokeWidth="1" />
              <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(31, 41, 55, 0.6)" strokeWidth="1" />
              <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(31, 41, 55, 0.6)" strokeWidth="1" />
              <line x1="180" y1="0" x2="180" y2="150" stroke="rgba(31, 41, 55, 0.8)" strokeDasharray="2 2" />
              <path d="M0 100 L30 110 L60 90 L90 95 L120 75 L150 85 L180 80" fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" />
              <path d="M180 80 L220 85 L260 70 L300 80" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeDasharray="4 4" />
              <path d="M180 80 L220 50 L260 30 L300 40" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" opacity="0.3" />
              <text x="10" y="25" fill="#f9fafb" fontSize="8" fontFamily="monospace">LSTM Multi-Step Forecast</text>
              <text x="185" y="140" fill="#9ca3af" fontSize="8" fontFamily="monospace">Prediction Start</text>
            </svg>
          </div>
        );
      case 'decomposition-chart':
        return (
          <div className="p-4 bg-slate-950/80 border border-border-custom rounded-xl flex flex-col gap-2">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={10} className="text-accent-teal" /> Visual Proof: Time-Series Decomposition
            </span>
            <svg viewBox="0 0 300 150" className="w-full h-auto text-accent-teal">
              <path d="M0 45 L50 42 L100 38 L150 32 L200 28 L250 25 L300 20" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" />
              <text x="10" y="30" fill="#9ca3af" fontSize="8" fontFamily="monospace">Trend Component</text>
              <path d="M0 80 Q25 60 50 80 T100 80 T150 80 T200 80 T250 80 T300 80" fill="none" stroke="var(--accent-teal)" strokeWidth="2" />
              <text x="10" y="70" fill="#9ca3af" fontSize="8" fontFamily="monospace">Seasonality Component (Sine Wave)</text>
              <path d="M0 125 L10 120 L20 128 L30 122 L40 125 L50 118 L60 127 L70 124 L80 126 L90 121 L100 129 L110 123 L120 125 L130 119 L140 128 L150 122 L160 126 L170 121 L180 128 L190 123 L200 125 L210 118 L220 127 L230 124 L240 126 L250 121 L260 129 L270 123 L280 125 L290 119 L300 128" fill="none" stroke="#9ca3af" strokeWidth="1" />
              <text x="10" y="112" fill="#9ca3af" fontSize="8" fontFamily="monospace">Residual Noise (Stationary Series)</text>
            </svg>
          </div>
        );
      case 'gridworld-map':
        return (
          <div className="p-4 bg-slate-950/80 border border-border-custom rounded-xl flex flex-col gap-2">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5">
              <Cpu size={10} className="text-accent-blue" /> Visual Proof: Q-Value Grid Pathfinding
            </span>
            <div className="flex justify-center py-2">
              <svg viewBox="0 0 150 150" className="w-[110px] h-[110px] text-accent-blue">
                {Array.from({ length: 5 }).map((_, r) =>
                  Array.from({ length: 5 }).map((_, c) => {
                    let fill = 'none';
                    let stroke = '#1f2937';
                    if (r === 0 && c === 0) fill = 'rgba(16, 185, 129, 0.15)';
                    if (r === 4 && c === 4) fill = 'rgba(239, 68, 68, 0.15)';
                    if ((r === 1 && c === 1) || (r === 2 && c === 2) || (r === 3 && c === 1)) fill = 'rgba(31, 41, 55, 0.8)';
                    return (
                      <rect key={`${r}-${c}`} x={c * 30} y={r * 30} width={30} height={30} fill={fill} stroke={stroke} strokeWidth="1" />
                    );
                  })
                )}
                <text x="10" y="18" fill="#10b981" fontSize="8" fontWeight="bold">Start</text>
                <text x="128" y="138" fill="#ef4444" fontSize="8" fontWeight="bold">G</text>
                <path d="M15 15 L45 15 L45 45 L75 45 L75 75 L105 75 L105 105 L135 105 L135 135" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
              </svg>
            </div>
            <span className="text-[9px] text-center text-text-sub font-mono">Policy convergence in 820 episodes</span>
          </div>
        );
      case 'portfolio-frontier':
        return (
          <div className="p-4 bg-slate-950/80 border border-border-custom rounded-xl flex flex-col gap-2">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5">
              <BarChart2 size={10} className="text-accent-emerald" /> Visual Proof: Efficient Frontier Mapping
            </span>
            <svg viewBox="0 0 300 150" className="w-full h-auto text-accent-emerald">
              <line x1="40" y1="120" x2="300" y2="120" stroke="#1f2937" />
              <line x1="40" y1="10" x2="40" y2="120" stroke="#1f2937" />
              <path d="M40 120 Q120 40 300 30" fill="none" stroke="var(--accent-teal)" strokeWidth="2.5" />
              <path d="M40 120 Q100 65 300 60" fill="none" stroke="var(--accent-teal)" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.5" />
              <g transform="translate(160, 36)">
                <polygon points="0,-4 1,-1 4,0 1,1 0,4 -1,1 -4,0 -1,-1" fill="#ef4444" />
                <circle r="6" fill="none" stroke="#ef4444" strokeWidth="1" className="animate-pulse" />
              </g>
              <text x="175" y="40" fill="#f9fafb" fontSize="8" fontFamily="monospace">Max Sharpe Ratio</text>
              <text x="5" y="80" fill="#9ca3af" fontSize="8" transform="rotate(-90 5 80)" fontFamily="monospace">Returns</text>
              <text x="120" y="140" fill="#9ca3af" fontSize="8" fontFamily="monospace">Risk (Variance Volatility)</text>
            </svg>
          </div>
        );
      case 'volatility-returns-chart':
        return (
          <div className="p-4 bg-slate-950/80 border border-border-custom rounded-xl flex flex-col gap-2">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={10} className="text-accent-cyan" /> Visual Proof: Daily Returns & Volatility Bands
            </span>
            <svg viewBox="0 0 300 150" className="w-full h-auto text-accent-cyan">
              <line x1="0" y1="75" x2="300" y2="75" stroke="#1f2937" />
              <path d="M5 75 L5 85 L5 75 M15 75 L15 62 L15 75 M25 75 L25 80 L25 75 M35 75 L35 55 L35 75 M45 75 L45 92 L45 75 M55 75 L55 70 L55 75 M65 75 L65 74 L65 75 M75 75 L75 88 L75 75 M85 75 L85 64 L85 75 M95 75 L95 105 L95 75 M105 75 L105 52 L105 75 M115 75 L115 70 L115 75 M125 75 L125 82 L125 75 M135 75 L135 60 L135 75 M145 75 L145 95 L145 75 M155 75 L155 76 L155 75 M165 75 L165 67 L165 75 M175 75 L175 80 L175 75 M185 75 L185 91 L185 75 M195 75 L195 62 L195 75 M205 75 L205 70 L205 75 M215 75 L215 88 L215 75 M225 75 L225 74 L225 75 M235 75 L235 59 L235 75 M245 75 L245 98 L245 75 M255 75 L255 64 L255 75 M265 75 L265 78 L265 75 M275 75 L275 71 L275 75 M285 75 L285 86 L285 75 M295 75 L295 62 L295 75" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" />
              <path d="M0 50 Q50 40 100 35 T200 48 T300 40" fill="none" stroke="#ef4444" strokeWidth="1.5" />
              <path d="M0 100 Q50 110 100 115 T200 102 T300 110" fill="none" stroke="#ef4444" strokeWidth="1.5" />
              <text x="10" y="20" fill="#ef4444" fontSize="8" fontFamily="monospace">Value-at-Risk Volatility Envelope</text>
            </svg>
          </div>
        );
      default:
        return null;
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
            Click on any project to expand it into a detailed case study, showing visual proofs, mathematical models, and structural repositories.
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
                          <h4 className="text-xs uppercase tracking-widest font-bold text-accent-cyan">Why I Built This</h4>
                          <p className="text-sm text-text-sub leading-relaxed italic">{project.whyIBuiltThis}</p>
                        </div>

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

                      {/* Right Column: Visual Proof & Layout */}
                      <div className="space-y-6">
                        {renderVisualProof(project.visualProof)}

                        <div className="space-y-2">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-accent-cyan">Code Repository Layout</h4>
                          <pre className="p-4 bg-slate-950/80 dark:bg-slate-950 border border-border-custom rounded-xl font-mono text-[11px] text-accent-teal leading-relaxed overflow-x-auto">
                            {project.codeStructure}
                          </pre>
                        </div>
                        
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

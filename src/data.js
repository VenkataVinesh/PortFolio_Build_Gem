// Single source of truth for all variants. Everything here is traceable to the
// résumé and the actual repos — no fabricated metrics.

export const profile = {
  name: 'A. Venkata Vinesh Kumar Reddy',
  short: 'Vinesh',
  role: 'Machine Learning Engineer',
  target: 'ML / Deep Learning / LLM Engineering',
  tagline: 'I build systems that model sequential, noisy real-world data — forecasting it, optimizing decisions on it, and learning policies that act on it.',
  blurb: 'Computer Science undergrad at Mahindra University (CGPA 7.96) working across time-series forecasting, mathematical optimization, and reinforcement learning. Python-first, mathematically grounded, project-driven.',
  location: 'Hyderabad, India',
  email: 'venkatvinesh46@gmail.com',
  github: 'https://github.com/VenkataVinesh',
  linkedin: 'https://www.linkedin.com/in/venkat-vinesh',
  resume: './resume.pdf',
  photo: './profile.jpg',
  university: 'Mahindra University',
  cgpa: '7.96 / 10',
}

export const stats = [
  { k: 'CGPA', v: '7.96' },
  { k: 'Core', v: 'PyTorch' },
  { k: 'Focus', v: 'Time-Series · RL · Optimization' },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'C++', 'SQL', 'TypeScript', 'MATLAB'] },
  { group: 'ML / DL', items: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-Learn', 'LSTM / GRU', 'Statsmodels'] },
  { group: 'Data', items: ['NumPy', 'Pandas', 'Matplotlib', 'Recharts'] },
  { group: 'Systems', items: ['FastAPI', 'React', 'Next.js', 'Docker', 'PostgreSQL', 'Git'] },
  { group: 'Math', items: ['Probability', 'Statistics', 'Optimization', 'Time-Series', 'Reinforcement Learning'] },
]

export const projects = [
  {
    id: 'veltrix',
    name: 'Veltrix',
    kind: 'Algorithmic Trading & Backtesting Platform',
    summary: 'Full-stack quant research workspace — a Next.js dashboard over a FastAPI service that computes technical signals, runs Monte-Carlo portfolio optimization, calculates VaR/CVaR risk metrics, and streams telemetry over WebSockets.',
    highlights: [
      'Monte-Carlo Sharpe-ratio optimization & efficient frontier',
      'Signal engine: SMA/EMA/RSI/MACD/Bollinger/ATR',
      'Risk: Value-at-Risk, Expected Shortfall, HHI concentration',
      'PostgreSQL + Redis, Dockerized',
    ],
    tech: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    repo: 'https://github.com/VenkataVinesh/Veltrix',
    accent: '#06b6d4',
    motif: 'frontier',
  },
  {
    id: 'asset',
    name: 'Asset Price Prediction Platform',
    kind: 'Time-Series Forecasting Service',
    summary: 'End-to-end forecasting service putting an LSTM and an ARIMA model side-by-side on the same price series, with an on-the-fly feature pipeline and a FastAPI backend feeding a React/Recharts dashboard.',
    highlights: [
      'LSTM (PyTorch) vs ARIMA (Statsmodels), like-for-like',
      'On-the-fly SMA / EMA / RSI / volatility features',
      'Async FastAPI multi-step forecasts with bounds',
      'Dockerized for environment parity',
    ],
    tech: ['Python', 'PyTorch', 'Statsmodels', 'FastAPI', 'React', 'Docker'],
    repo: 'https://github.com/VenkataVinesh/Asset-Price-Prediction-Platform',
    accent: '#22d3ee',
    motif: 'forecast',
  },
  {
    id: 'weather',
    name: 'Weather Time-Series Forecasting',
    kind: 'Deep Learning · Sequence Models',
    summary: 'Stacked-LSTM sequence predictors in PyTorch for meteorological metrics on a reproducible synthetic series, benchmarked against ARIMA/SARIMA with trend & seasonality decomposition.',
    highlights: [
      'Stacked 2-layer LSTM (64 units, dropout 0.2)',
      'Trend / seasonality / residual decomposition',
      'ARIMA & SARIMA statistical baselines',
      'Reproducible — no external dataset needed',
    ],
    tech: ['Python', 'PyTorch', 'Statsmodels', 'Matplotlib'],
    repo: 'https://github.com/VenkataVinesh/Weather-Time-Series-Forecasting',
    accent: '#14b8a6',
    motif: 'decompose',
  },
  {
    id: 'rl',
    name: 'Reinforcement Learning Lab',
    kind: 'Tabular RL from scratch',
    summary: 'Q-Learning and SARSA agents implemented from scratch in NumPy on a custom GridWorld, studying how on-policy vs off-policy updates and ε-greedy exploration affect convergence.',
    highlights: [
      'Q-Learning & SARSA, hand-written Bellman backups',
      'Custom 5×5 GridWorld (Gym-style API)',
      'ε-greedy decay 1.0 → 0.05',
      'Reward-curve & policy visualizations',
    ],
    tech: ['Python', 'NumPy', 'Matplotlib'],
    repo: 'https://github.com/VenkataVinesh/Reinforcement-Learning-Lab',
    accent: '#818cf8',
    motif: 'grid',
  },
  {
    id: 'portfolio',
    name: 'Portfolio Optimization',
    kind: 'Markowitz Mean-Variance',
    summary: 'A focused implementation of Markowitz mean-variance optimization: solves for the maximum-Sharpe weights with SciPy (SLSQP) under long-only constraints and traces the efficient frontier.',
    highlights: [
      'SciPy SLSQP constrained optimizer',
      'Max-Sharpe weights, long-only',
      'Efficient frontier plotting',
      'The math core behind Veltrix',
    ],
    tech: ['Python', 'SciPy', 'NumPy', 'Matplotlib'],
    repo: 'https://github.com/VenkataVinesh/Portfolio-Optimization-Dashboard',
    accent: '#34d399',
    motif: 'frontier',
  },
]

export const experience = [
  {
    role: 'Head — Math Club',
    org: 'Mahindra University',
    period: 'Aug 2024 – May 2026',
    note: 'Promoted from Logistics Head to Head; led logistics & resource management for math-modeling competitions and academic events.',
  },
  {
    role: 'On-Ground Operations Lead — TEDx',
    org: 'TEDx Mahindra University',
    period: 'Jan 2024 – May 2024',
    note: 'Coordinated event operations, venue setup, and speaker/attendee logistics for 500+ attendees.',
  },
  {
    role: 'Participant & Team Developer',
    org: 'Smart India Hackathon',
    period: 'Sept – Oct 2024',
    note: 'Backend / API development in a 6-person team prototyping an intelligent system.',
  },
]

export const education = {
  school: 'Mahindra University, School of Engineering',
  degree: 'B.Tech, Computer Science & Engineering',
  period: 'Aug 2023 – Present',
  cgpa: '7.96 / 10',
}

// Per-project case-study content. Architecture is grounded in each repo's real
// structure/README — no invented metrics.
export const projectDetails = {
  veltrix: {
    tint: { a: [0.05, 0.40, 0.52], b: [0.10, 0.62, 0.72] },
    problem:
      'Quant research usually lives in scattered notebooks. Veltrix folds it into one workspace: a typed dashboard over a Python service that computes allocations, technical signals, risk metrics and backtests — with live telemetry streaming back.',
    build: [
      'Built a Next.js + TypeScript dashboard (Recharts) talking to a FastAPI service over REST, with a full-duplex WebSocket channel for real-time price, log and agent-status streams.',
      'Implemented the portfolio-optimization engine: an expected-returns vector and covariance matrix from a daily-returns matrix, then a vectorized Monte-Carlo search over weight vectors that maximizes the Sharpe ratio under a volatility cap.',
      'Wrote a technical-analysis engine (SMA, EMA, RSI, MACD, ATR, Bollinger) and a risk engine — Value-at-Risk, Expected Shortfall (CVaR), HHI concentration and historical scenario stress tests.',
      'Containerized the system — Next.js, FastAPI, a PostgreSQL ledger and a Redis pub/sub cache — with Docker Compose, behind JWT auth and an audited multi-agent consensus loop.',
    ],
    arch: {
      layers: [
        { name: 'Frontend · Next.js : 3001', nodes: [{ t: 'React Dashboard', s: 'Recharts UI' }, { t: 'WebSocket Client', s: 'real-time streams' }] },
        { name: 'FastAPI Service : 8000', nodes: [{ t: 'Router / Swagger' }, { t: 'WebSocket Server' }, { t: 'Data Loader', s: 'Pandas' }] },
        { name: 'Quant Mechanics', nodes: [{ t: 'Monte-Carlo Optimizer' }, { t: 'Covariance & Returns' }, { t: 'Risk · VaR / CVaR / HHI' }] },
        { name: 'Agent Subsystem', nodes: [{ t: 'tradingagents loop' }, { t: 'Audit hooks' }] },
        { name: 'Storage', nodes: [{ t: 'PostgreSQL ledger' }, { t: 'Redis cache / event bus' }] },
      ],
      flow: 'UI → HTTP → Router → Loader → Optimizer · WS ↔ Redis · Router/Loop → PostgreSQL',
    },
    outcome:
      'A single workspace to define a portfolio, compute optimal weights, inspect risk, backtest a rule-based strategy and watch signals & telemetry update live.',
  },

  asset: {
    tint: { a: [0.07, 0.38, 0.56], b: [0.13, 0.62, 0.78] },
    problem:
      'Where does a deep sequence model actually beat a well-fit classical baseline on noisy price data — and what does the extra complexity buy you? This platform puts an LSTM and an ARIMA model on the same series so the trade-off is visible, not assumed.',
    build: [
      'Built a PyTorch stacked-LSTM (2 layers, 64 hidden units, 30-step window over close / volatility / RSI) and a Statsmodels ARIMA baseline with AIC-based order selection — a like-for-like comparison.',
      'Engineered an on-the-fly feature pipeline (SMA, EMA, RSI, volatility) with strict index-aligned windowing so there is no leakage between the rolling window and the forecast horizon.',
      'Served multi-step forecasts with confidence bounds from an async FastAPI backend to a React + Recharts dashboard, and persisted scaler state alongside the model so inference reproduces training-time normalization.',
      'Containerized the whole thing with Docker Compose; deploy configs for Vercel (frontend) and Render (backend).',
    ],
    arch: {
      layers: [
        { name: 'Frontend', nodes: [{ t: 'React Dashboard', s: 'Recharts' }] },
        { name: 'FastAPI (async)', nodes: [{ t: 'Forecast Router' }, { t: 'Feature Pipeline', s: 'SMA / EMA / RSI' }] },
        { name: 'Models', nodes: [{ t: 'PyTorch LSTM' }, { t: 'Statsmodels ARIMA' }] },
        { name: 'Data', nodes: [{ t: 'Historical price series' }] },
      ],
      flow: 'Dashboard → /forecast → features → {LSTM | ARIMA} → multi-step path + bounds',
    },
    outcome:
      'A working service that lets you switch between LSTM and ARIMA per request and compare their forecast paths and confidence intervals on the same data.',
  },

  weather: {
    tint: { a: [0.05, 0.40, 0.40], b: [0.14, 0.64, 0.58] },
    problem:
      'A clean testbed for sequence models on seasonal time series: forecast meteorological metrics and measure where a stacked LSTM earns its keep against ARIMA/SARIMA, on a reproducible synthetic series anyone can regenerate.',
    build: [
      'Built stacked 2-layer LSTM predictors in PyTorch (64 units, dropout 0.2) on a reproducible synthetic meteorological series — no external dataset download required.',
      'Ran classical time-series decomposition to isolate trend, seasonality and residuals, and tuned against residual-stationarity checks.',
      'Benchmarked the LSTM against ARIMA and SARIMA baselines, plotting train/validation loss curves to compare convergence and accuracy trade-offs.',
    ],
    arch: {
      layers: [
        { name: 'Data', nodes: [{ t: 'Synthetic series', s: 'reproducible' }] },
        { name: 'Preprocess', nodes: [{ t: 'Trend / Seasonality / Residual' }, { t: 'Windowing' }] },
        { name: 'Models', nodes: [{ t: 'PyTorch LSTM' }, { t: 'ARIMA' }, { t: 'SARIMA' }] },
        { name: 'Evaluation', nodes: [{ t: 'Loss curves' }, { t: 'Baseline comparison' }] },
      ],
      flow: 'Series → decompose → window → {LSTM | ARIMA | SARIMA} → loss / comparison',
    },
    outcome:
      'A reproducible pipeline that trains the LSTM, plots loss, and sets up an honest like-for-like comparison against statistical baselines.',
  },

  rl: {
    tint: { a: [0.20, 0.18, 0.55], b: [0.34, 0.34, 0.78] },
    problem:
      'Reinforcement learning is easiest to trust once you have written the update rule yourself. This lab implements Bellman backups by hand and watches the policy and value estimates evolve — no library doing the learning for you.',
    build: [
      'Built a custom 5×5 GridWorld environment with a Gym-style API (start, goal +10, pit −10, four actions).',
      'Implemented Q-Learning (off-policy) and SARSA (on-policy) agents from scratch in NumPy, writing the temporal-difference updates directly.',
      'Used ε-greedy exploration decaying 1.0 → 0.05 and visualized the reward curve and learned policy across training episodes.',
    ],
    arch: {
      layers: [
        { name: 'Environment', nodes: [{ t: 'GridWorld 5×5', s: 'Gym-style API' }] },
        { name: 'Agent', nodes: [{ t: 'Q-Learning', s: 'off-policy' }, { t: 'SARSA', s: 'on-policy' }] },
        { name: 'Update', nodes: [{ t: 'TD Bellman backup' }, { t: 'ε-greedy 1.0 → 0.05' }] },
        { name: 'Output', nodes: [{ t: 'Reward curve' }, { t: 'Learned policy' }] },
      ],
      flow: 'Env ⇄ Agent (state, reward) → TD update → Q-table → policy & reward curve',
    },
    outcome:
      'Two hand-written tabular agents that converge to the shortest path, with a clear view of how on-policy vs off-policy updates differ.',
  },

  portfolio: {
    tint: { a: [0.07, 0.40, 0.30], b: [0.18, 0.64, 0.46] },
    problem:
      'Implement the Markowitz mean-variance problem end-to-end with a real numerical solver, rather than a closed-form shortcut — and watch the efficient frontier emerge from the covariance structure of the returns.',
    build: [
      'Formulated the objective: minimize the negative Sharpe ratio subject to fully-invested, long-only weight constraints.',
      'Solved it with SciPy’s SLSQP constrained optimizer over the covariance matrix of asset returns, seeded from a sensible initial allocation.',
      'Traced the efficient frontier and plotted it with the maximum-Sharpe portfolio highlighted (Matplotlib).',
    ],
    arch: {
      layers: [
        { name: 'Input', nodes: [{ t: 'Daily returns matrix', s: 'synthetic' }] },
        { name: 'Statistics', nodes: [{ t: 'Expected returns μ' }, { t: 'Covariance Σ' }] },
        { name: 'Optimizer', nodes: [{ t: 'SciPy SLSQP' }, { t: 'constraints: Σw=1, w≥0' }] },
        { name: 'Output', nodes: [{ t: 'Max-Sharpe weights' }, { t: 'Efficient frontier' }] },
      ],
      flow: 'Returns → μ, Σ → minimize −Sharpe (SLSQP) → optimal weights + frontier',
    },
    outcome:
      'A compact, reproducible script that outputs the optimal weights and saves an efficient-frontier plot — the math core behind Veltrix.',
  },
}

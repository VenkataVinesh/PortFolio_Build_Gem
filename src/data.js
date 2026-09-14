// Single source of truth for the whole site. Every claim here traces to the
// résumé, a repo README, or a document. No fabricated metrics.
//
// Kept deliberately in sync with:
//   career-update/resume_en.tex
//   career-update/resume_fr.tex
//   career-update/linkedin_updates.md
// Change one, change them all.

export const profile = {
  name: 'Venkata Vinesh Kumar Reddy Atluri',
  short: 'Venkat',
  role: 'ML / Deep Learning Engineering',
  target: 'ML / Deep Learning / LLM Engineering',
  tagline:
    'I build machine learning systems end to end: forecasting noisy real-world data, optimising decisions on it, learning policies that act on it, and shipping the service around it.',
  blurb:
    'Computer Science undergraduate at Mahindra University, spending my final year at École Centrale de Lyon on the Lyon Centrale Digital Lab programme. I work across time-series forecasting, mathematical optimisation and reinforcement learning.',
  location: 'Écully, Lyon, France',
  email: 'venkata-vinesh-kumar-reddy.atluri@etu.ec-lyon.fr',
  emailAlt: 'venkatvinesh46@gmail.com',
  github: 'https://github.com/VenkataVinesh',
  linkedin: 'https://www.linkedin.com/in/venkat-vinesh',
  photo: './profile.jpg',
  university: 'Mahindra University',
  cgpa: '7.96 / 10',
  // What I am actually looking for. Kept explicit so recruiters do not guess.
  seeking: {
    what: 'six-month ML / Deep Learning internship',
    when: 'February 2027',
    where: 'Lyon, Paris, or remote in France',
  },
}

// Résumé is published in both languages; the /#/resume route toggles between them.
export const resumes = [
  { lang: 'en', label: 'English', file: './resume-en.pdf', download: 'Atluri_Venkata_Vinesh_Kumar_Reddy_EN.pdf' },
  { lang: 'fr', label: 'Français', file: './resume-fr.pdf', download: 'Atluri_Venkata_Vinesh_Kumar_Reddy_FR.pdf' },
]

export const education = [
  {
    school: 'École Centrale de Lyon',
    place: 'Écully, France',
    award: 'Diplôme d’établissement',
    programme: 'Lyon Centrale Digital Lab 2026–2027',
    period: 'Sep 2026 – Aug 2027',
    note: 'Full-time team projects of three to five students building prototypes for partner companies, coached by Centrale Lyon faculty and by professionals from those companies. Concludes with a six-month industrial internship from February 2027.',
    current: true,
  },
  {
    school: 'Mahindra University',
    place: 'Hyderabad, India',
    award: 'B.Tech, Computer Science and Engineering',
    programme: 'CGPA 7.96 / 10',
    period: 'Aug 2023 – 2027 (expected)',
    note: 'Final year completed on exchange at École Centrale de Lyon. Relevant coursework: Deep Neural Networks, Reinforcement Learning, Computational Finance with Applications, Applied Time Series Analysis.',
    current: false,
  },
]

export const certification = {
  name: 'Machine Learning Specialization',
  issuer: 'DeepLearning.AI and Stanford Online',
  instructor: 'Andrew Ng',
  date: 'Aug 2026',
  credentialId: 'JOWXFIWH9QN2',
}

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'Telugu', level: 'Native' },
  { name: 'Hindi', level: 'Conversational' },
  { name: 'French', level: 'A1, in progress' },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'C++', 'SQL', 'TypeScript', 'MATLAB'] },
  { group: 'ML / DL', items: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-Learn', 'LSTM / GRU', 'Statsmodels'] },
  { group: 'Data', items: ['NumPy', 'Pandas', 'Matplotlib', 'Time-series'] },
  { group: 'Systems', items: ['FastAPI', 'Next.js', 'React', 'Supabase', 'PostgreSQL', 'Docker', 'Git'] },
  { group: 'Mathematics', items: ['Probability', 'Statistics', 'Optimisation', 'Stochastic calculus', 'Reinforcement learning'] },
]

export const projects = [
  {
    id: 'veltrix',
    name: 'Veltrix',
    kind: 'Market Analytics and Forecasting Terminal',
    period: 'Dec 2025 – Present',
    summary:
      'An analytics terminal for market data, built so every recommendation can be audited. The signal engine shows the vote and weight of each indicator behind a call, and forecasts are walk-forward validated so the reported confidence is measured rather than tuned.',
    highlights: [
      'Auditable signal engine: each indicator vote shown with its weight',
      'Walk-forward validation over 1,500 out-of-sample calls',
      'GARCH(1,1) volatility, calibrated 95% prediction intervals',
      'Next.js route handlers, Supabase Postgres with row-level security',
    ],
    // Every figure below comes from docs/FORECAST-EVALUATION.md in the repo.
    metrics: [
      { v: '50.2%', k: 'measured directional hit-rate', sub: '753 of 1,500 walk-forward calls, z = 0.16' },
      { v: '94.75%', k: 'interval coverage vs 95% nominal', sub: 'GARCH(1,1), up from 91.67% under EWMA' },
    ],
    tech: ['TypeScript', 'Next.js', 'Supabase', 'lightweight-charts'],
    repo: 'https://github.com/VenkataVinesh/Veltrix',
    demo: 'https://veltrix-terminal-frontend.vercel.app',
    accent: '#06b6d4',
  },
  {
    id: 'asset',
    name: 'Asset Price Prediction Platform',
    kind: 'Sequence Models vs Classical Baselines',
    period: 'Jan 2026 – Present',
    summary:
      'Puts a stacked LSTM and an ARIMA baseline on the same series so the trade-off between them is measured rather than assumed, with the leakage controls that make such a comparison mean anything.',
    highlights: [
      'LSTM (PyTorch) against ARIMA (Statsmodels), like for like',
      'Index-aligned windowing, so no look-ahead leakage',
      'Scaler state persisted with the model for reproducible inference',
      'Async FastAPI serving multi-step forecasts with intervals',
    ],
    tech: ['Python', 'PyTorch', 'Statsmodels', 'FastAPI', 'React'],
    repo: 'https://github.com/VenkataVinesh/Asset-Price-Prediction-Platform',
    accent: '#22d3ee',
  },
  {
    id: 'weather',
    name: 'Weather Time-Series Forecasting',
    kind: 'Deep Learning, Sequence Models',
    period: 'Jun 2025 – Jul 2025',
    summary:
      'Stacked LSTM predictors benchmarked against ARIMA and SARIMA on a seasonal series, with trend and seasonality decomposition. Runs on a reproducible synthetic series, so anyone can rerun it without a dataset download.',
    highlights: [
      'Stacked two-layer LSTM, 64 units, dropout 0.2',
      'Trend, seasonality and residual decomposition',
      'ARIMA and SARIMA statistical baselines',
      'Reproducible, no external dataset required',
    ],
    tech: ['Python', 'PyTorch', 'Statsmodels', 'Matplotlib'],
    repo: 'https://github.com/VenkataVinesh/Weather-Time-Series-Forecasting',
    accent: '#14b8a6',
  },
  {
    id: 'rl',
    name: 'Reinforcement Learning Lab',
    kind: 'Tabular RL from Scratch',
    period: 'Feb 2026 – May 2026',
    summary:
      'Q-Learning and SARSA with the temporal-difference updates written by hand in NumPy on a custom GridWorld, built to understand on-policy against off-policy properly rather than to call a library.',
    highlights: [
      'Q-Learning and SARSA, hand-written Bellman backups',
      'Custom 5x5 GridWorld with a Gym-style API',
      'Epsilon-greedy decay from 1.0 to 0.05',
      'Reward-curve and learned-policy visualisations',
    ],
    tech: ['Python', 'NumPy', 'Matplotlib'],
    repo: 'https://github.com/VenkataVinesh/Reinforcement-Learning-Lab',
    accent: '#818cf8',
  },
  {
    id: 'portfolio',
    name: 'Portfolio Optimization',
    kind: 'Markowitz Mean-Variance',
    period: '2026',
    summary:
      'Markowitz mean-variance optimisation solved with a real numerical solver rather than a closed-form shortcut: maximum-Sharpe weights under long-only constraints, tracing the efficient frontier from the covariance structure of returns.',
    highlights: [
      'SciPy SLSQP constrained optimiser',
      'Maximum-Sharpe weights, long-only',
      'Efficient frontier traced and plotted',
    ],
    tech: ['Python', 'SciPy', 'NumPy', 'Matplotlib'],
    repo: 'https://github.com/VenkataVinesh/Portfolio-Optimization-Dashboard',
    accent: '#34d399',
  },
]

// Direction of travel, not work in progress. There is no code for these yet and
// this section says so. A repo link appears here only once there is a repo.
export const planned = [
  {
    name: 'EU AI Act and GDPR RAG Assistant',
    kind: 'Retrieval over Regulatory Text',
    summary:
      'Retrieval over EU AI Act and GDPR text, built around an evaluation harness that measures hallucination rate and retrieval quality before anything else gets added.',
  },
  {
    name: 'Industrial Visual Defect Detection',
    kind: 'Anomaly Detection as a Service',
    summary:
      'Visual defect detection for industrial parts, treated as a production service from the start, with experiment tracking and drift monitoring rather than a notebook.',
  },
]

export const experience = [
  {
    role: 'Head, Mathematics Club',
    org: 'Mahindra University',
    period: 'Aug 2024 – May 2026',
    note: 'Logistics Head (Aug 2024 to Apr 2025), then Head (Aug 2025 to May 2026). Coordinated logistics and resource allocation for university mathematics modelling competitions and academic events.',
  },
  {
    role: 'On-Ground Operations Lead',
    org: 'TEDx Mahindra University',
    period: 'Jan 2024 – May 2024',
    note: 'Ran on-ground operations, venue setup and speaker logistics for an event with over 500 attendees.',
  },
  {
    role: 'Participant and Team Developer',
    org: 'Smart India Hackathon',
    period: 'Sep 2024 – Oct 2024',
    note: 'Worked in a team of six to prototype an intelligent system, contributing to ideation and backend API development.',
  },
]

// Per-project case-study content. Architecture is grounded in each repo's real
// structure and README. No invented metrics.
export const projectDetails = {
  veltrix: {
    tint: { a: [0.05, 0.40, 0.52], b: [0.10, 0.62, 0.72] },
    problem:
      'Most market tools hand you a number and ask you to trust it. Veltrix was built the other way round: every BUY or SELL call exposes the indicators that produced it and the weight each one carried, and every forecast reports a confidence that was measured out of sample rather than fitted in it.',
    build: [
      'Built a signal engine that scores RSI, MACD, Bollinger bands, EMA/SMA trend and volume, sums the weighted votes, normalises the result to the range -1 to +1 and thresholds at 0.3. The full vote breakdown is shown in the interface, so a recommendation can be argued with.',
      'Validated forecasts walk-forward rather than on a single split. Pooled across 1,500 out-of-sample calls the directional hit-rate is 50.2 per cent with z = 0.16, which is a coin flip. The terminal reports that rather than a tuned backtest figure, and an earlier n=40 run that showed a far more exciting spread was traced to small-sample noise and discarded.',
      'Replaced an EWMA volatility estimate with GARCH(1,1) after measuring that the EWMA intervals were delivering only 91.67 per cent coverage against a 95 per cent nominal band. The GARCH model brought measured coverage to 94.75 per cent. The band is the part of the forecast worth using.',
      'Built and benchmarked ridge regression and gradient-boosted trees as alternatives, then removed both after they failed to beat the baseline while costing 123 to 443 times more per forecast.',
      'Migrated off an earlier FastAPI, PostgreSQL and Redis backend. Responsibilities now live in Next.js route handlers and Supabase, with row-level security on the Postgres tables and a seeded paper portfolio per account.',
    ],
    arch: {
      layers: [
        { name: 'Client · Next.js', nodes: [{ t: 'Terminal UI', s: 'lightweight-charts' }, { t: 'Signal breakdown', s: 'per-indicator votes' }] },
        { name: 'Route handlers · app/api', nodes: [{ t: 'Quote and series' }, { t: 'Signal engine' }, { t: 'Forecast + intervals' }] },
        { name: 'Modelling', nodes: [{ t: 'Walk-forward harness' }, { t: 'GARCH(1,1) volatility' }, { t: 'Rejected: ridge, GBT' }] },
        { name: 'Data providers', nodes: [{ t: 'Finnhub / Twelve Data' }, { t: 'CoinGecko' }] },
        { name: 'Supabase', nodes: [{ t: 'Postgres + row-level security' }, { t: 'Auth and paper portfolio' }] },
      ],
      flow: 'UI → route handler → signal engine and forecast → provider data · auth and holdings ↔ Supabase',
    },
    outcome:
      'A terminal that will tell you when it has no edge. The directional forecast does not beat a coin flip and says so; what is genuinely calibrated is the prediction interval, and the interface points you at the band rather than the midline. Paper trading only, with no broker integration and no order execution.',
    limits: [
      'The directional forecast has no measured edge. Use the interval, not the midline.',
      'Sell orders are not implemented and the control is visibly disabled.',
      'Paper trading only. No broker integration, and no order leaves the browser.',
    ],
  },

  asset: {
    tint: { a: [0.07, 0.38, 0.56], b: [0.13, 0.62, 0.78] },
    problem:
      'Where does a deep sequence model actually beat a well-fitted classical baseline on noisy data, and what does the extra complexity buy? This platform puts an LSTM and an ARIMA model on the same series so the trade-off is visible instead of assumed.',
    build: [
      'Built a PyTorch stacked LSTM (two layers, 64 hidden units, a 30-step window over close, volatility and RSI) and a Statsmodels ARIMA baseline with AIC-based order selection, so the comparison is like for like.',
      'Engineered a feature pipeline computing SMA, EMA, RSI and volatility with strict index-aligned windowing, so no information from beyond the forecast horizon leaks into the window.',
      'Persisted scaler state alongside the model, so inference reproduces training-time normalisation exactly rather than re-fitting a scaler on the inference set.',
      'Served multi-step forecasts with confidence bounds from an async FastAPI backend to a React dashboard that overlays history against the projected path.',
    ],
    arch: {
      layers: [
        { name: 'Frontend', nodes: [{ t: 'React dashboard', s: 'history vs forecast' }] },
        { name: 'FastAPI (async)', nodes: [{ t: 'Forecast router' }, { t: 'Feature pipeline', s: 'SMA / EMA / RSI' }] },
        { name: 'Models', nodes: [{ t: 'PyTorch LSTM' }, { t: 'Statsmodels ARIMA' }] },
        { name: 'Artefacts', nodes: [{ t: 'Model weights' }, { t: 'Persisted scaler' }] },
      ],
      flow: 'Dashboard → /forecast → features → {LSTM | ARIMA} → multi-step path and bounds',
    },
    outcome:
      'A service that switches between the LSTM and ARIMA per request and puts their forecast paths and confidence intervals on the same axes, on the same data, under the same preprocessing.',
  },

  weather: {
    tint: { a: [0.05, 0.40, 0.40], b: [0.14, 0.64, 0.58] },
    problem:
      'A clean testbed for sequence models on seasonal data: forecast meteorological metrics and find where a stacked LSTM earns its keep against ARIMA and SARIMA, on a series anyone can regenerate exactly.',
    build: [
      'Built stacked two-layer LSTM predictors in PyTorch (64 units, dropout 0.2) on a reproducible synthetic meteorological series, so the project runs without an external dataset download.',
      'Ran classical decomposition to isolate trend, seasonality and residuals, and tuned hyperparameters against residual stationarity checks rather than against validation loss alone.',
      'Benchmarked the LSTM against ARIMA and SARIMA baselines, plotting train and validation loss curves to compare convergence and accuracy trade-offs.',
    ],
    arch: {
      layers: [
        { name: 'Data', nodes: [{ t: 'Synthetic series', s: 'reproducible' }] },
        { name: 'Preprocess', nodes: [{ t: 'Trend / seasonality / residual' }, { t: 'Windowing' }] },
        { name: 'Models', nodes: [{ t: 'PyTorch LSTM' }, { t: 'ARIMA' }, { t: 'SARIMA' }] },
        { name: 'Evaluation', nodes: [{ t: 'Loss curves' }, { t: 'Baseline comparison' }] },
      ],
      flow: 'Series → decompose → window → {LSTM | ARIMA | SARIMA} → loss and comparison',
    },
    outcome:
      'A reproducible pipeline that trains the LSTM, plots its loss, and sets up an honest like-for-like comparison against statistical baselines. Because the series is synthetic and seeded, the comparison replicates on any machine.',
  },

  rl: {
    tint: { a: [0.20, 0.18, 0.55], b: [0.34, 0.34, 0.78] },
    problem:
      'Reinforcement learning is easiest to trust once you have written the update rule yourself. This lab implements the temporal-difference backups by hand and watches the policy and value estimates evolve, with no library doing the learning.',
    build: [
      'Built a custom 5x5 GridWorld with a Gym-style API: a start state, a goal worth +10, a pit worth -10, and four actions.',
      'Implemented Q-Learning (off-policy) and SARSA (on-policy) from scratch in NumPy, writing the temporal-difference updates directly rather than calling into a framework.',
      'Used epsilon-greedy exploration decaying from 1.0 to 0.05, and visualised the reward curve and the learned policy across training episodes to show how the two update rules diverge.',
    ],
    arch: {
      layers: [
        { name: 'Environment', nodes: [{ t: 'GridWorld 5x5', s: 'Gym-style API' }] },
        { name: 'Agents', nodes: [{ t: 'Q-Learning', s: 'off-policy' }, { t: 'SARSA', s: 'on-policy' }] },
        { name: 'Update', nodes: [{ t: 'TD Bellman backup' }, { t: 'Epsilon-greedy 1.0 to 0.05' }] },
        { name: 'Output', nodes: [{ t: 'Reward curve' }, { t: 'Learned policy' }] },
      ],
      flow: 'Env ⇄ agent (state, reward) → TD update → Q-table → policy and reward curve',
    },
    outcome:
      'Two hand-written tabular agents that converge to the shortest path, with a clear view of how the on-policy and off-policy updates differ in the routes they settle on near the pit.',
  },

  portfolio: {
    tint: { a: [0.07, 0.40, 0.30], b: [0.18, 0.64, 0.46] },
    problem:
      'Implement the Markowitz mean-variance problem end to end with a real numerical solver rather than a closed-form shortcut, and watch the efficient frontier emerge from the covariance structure of the returns.',
    build: [
      'Formulated the objective as minimising the negative Sharpe ratio subject to fully-invested, long-only weight constraints.',
      'Solved it with the SciPy SLSQP constrained optimiser over the covariance matrix of asset returns, seeded from a sensible initial allocation.',
      'Traced the efficient frontier and plotted it with the maximum-Sharpe portfolio highlighted.',
    ],
    arch: {
      layers: [
        { name: 'Input', nodes: [{ t: 'Daily returns matrix' }] },
        { name: 'Statistics', nodes: [{ t: 'Expected returns' }, { t: 'Covariance matrix' }] },
        { name: 'Optimiser', nodes: [{ t: 'SciPy SLSQP' }, { t: 'Constraints: sum w = 1, w >= 0' }] },
        { name: 'Output', nodes: [{ t: 'Max-Sharpe weights' }, { t: 'Efficient frontier' }] },
      ],
      flow: 'Returns → mean and covariance → minimise negative Sharpe (SLSQP) → weights and frontier',
    },
    outcome:
      'A compact, reproducible script that outputs the optimal weights and saves an efficient-frontier plot. It is a small project and it is scoped as one: the mathematics is the point.',
  },
}

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
  target: 'ML / AI Engineering (LLM applications, ML engineering, applied deep learning)',
  tagline:
    'I build machine learning systems end to end: finding signal in noisy real-world data, forecasting it, building LLM pipelines around it, and shipping the service around it.',
  blurb:
    'Computer Science undergraduate at Mahindra University, spending my final year at École Centrale de Lyon on the Lyon Centrale Digital Lab programme. I work across signal processing, time-series forecasting and LLM applications.',
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
    headline: 'Seeking a 6-month ML / AI engineering internship from March 2027.',
    where: 'Open to France, Switzerland and Germany.',
    note: 'University internship agreement provided.',
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
    note: 'Full-time team projects of three to five students building prototypes for partner companies, coached by Centrale Lyon faculty and by professionals from those companies. Concludes with a compulsory 6-month industrial internship, March to August 2027.',
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

// Only skills that a project on the résumé actually shows. Same four groups as the résumé.
export const skills = [
  { group: 'Languages', items: ['Python', 'TypeScript'] },
  { group: 'ML / DL', items: ['PyTorch (LSTM, 1-D U-Net)', 'Statsmodels (ARIMA, GARCH)', 'Time-series forecasting', 'Signal processing', 'Model selection (BIC)'] },
  { group: 'LLM and data', items: ['LLM prompting pipelines', 'Retrieval over documents', 'NumPy / SciPy (least squares)', 'Pandas'] },
  { group: 'Engineering', items: ['FastAPI', 'React', 'Docker', 'Qt', 'multiprocessing', 'pytest', 'Git'] },
]

export const projects = [
  {
    id: 'triagemate',
    name: 'TriageMate',
    kind: 'Hackathon project, Swiss {ai} Weeks Zurich 2026',
    period: 'Sep 2026',
    summary:
      'A triage co-pilot for operational service desks, built for the Swiss Life challenge at the Swiss {ai} Weeks Zurich Hackathon. It screens an incoming ticket or email for PII and prompt injection, classifies and routes it, assigns a priority with a written reason, retrieves similar past cases, and drafts a response an analyst can approve, edit or reject.',
    highlights: [
      '20,000-ticket dataset was only 173 unique descriptions, with effectively random priority labels',
      'A trained classifier did no better than always guessing the majority class',
      'Priority computed with an explicit ITIL urgency x impact matrix instead of a trained model',
      'Tickets used as a retrieval library rather than training data, with the LLM used only where judgment was needed',
    ],
    // Shortened summary for the home tile; same claims as `summary`.
    teaser:
      'A triage co-pilot for service desks: PII and prompt-injection screening, routing, a priority with a written reason, and a drafted reply an analyst approves, edits or rejects.',
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'Azure AI Foundry', 'SQLite', 'Docker', 'Azure Container Apps'],
    accent: '#f59e0b',
    repo: 'https://github.com/DaPres/SwissAiWeeks_Team_8',
    screenshots: [
      { src: './projects/triagemate/intake.webp', alt: 'TriageMate intake screen: describe the problem, sample tickets to try' },
      { src: './projects/triagemate/priority.webp', alt: 'TriageMate priority result: ITIL urgency x impact matrix with written reasons and confidence' },
      { src: './projects/triagemate/draft-reply.webp', alt: 'TriageMate draft reply with knowledge-base citations, ready for analyst approval' },
    ],
  },
  {
    id: 'precitec',
    name: 'PRECITEC Sensor: Peak Detection',
    kind: 'LTDS lab, École Centrale de Lyon · team of 4',
    period: 'Oct 2026',
    summary:
      'Live surface-height measurement from a PRECITEC CHRocodile CLS 2 confocal line sensor, using the lab\'s own Python software instead of the vendor\'s app. When two surfaces are very close their peaks overlap and the vendor software reports one wrong height. My part was to find every surface from the raw spectra, even close ones.',
    highlights: [
      'Exactly 2 surfaces found on 120/120 real glass-slide channels; the old Gaussian method found 4',
      'Closest pair resolved on a live frame: 0.77 peak widths (4.7 px), real sensor',
      'Simulated benchmark: 93% of close pairs found at 0.75 peak widths',
      'Integrated live into the team\'s app without changing acquisition',
    ],
    // Real-sensor results only. Simulated-benchmark figures are on the case page, labelled as simulated.
    metrics: [
      { v: '120/120', k: 'real glass-slide channels with exactly 2 surfaces found', sub: 'the old Gaussian method found 4' },
      { v: '0.77 FWHM', k: 'closest pair resolved on a live frame', sub: '4.7 px, real sensor' },
    ],
    tech: ['Python', 'NumPy / SciPy', 'PyTorch', 'Qt', 'pytest'],
    codePrivate: true,
    accent: '#fb7185',
  },
  {
    id: 'maintenance-copilot',
    motif: 'EN · FR · DE', // ghost type on the home tile; restates a highlight below
    name: 'Maintenance Copilot',
    kind: 'Agent over Sensor Telemetry and Manuals',
    period: 'Nov 2026 – in progress',
    inProgress: true,
    summary:
      'Being built: an agent for industrial compressor maintenance. It flags anomalies in real compressor telemetry, retrieves cited troubleshooting pages from public equipment manuals in English, French and German, and writes a diagnosis and a structured work order, or abstains when the evidence does not support one. No results yet; none are claimed here.',
    highlights: [
      'Anomaly detection on real compressor telemetry (MetroPT-3), scored on a strict time split',
      'Retrieval over public equipment manuals in English, French and German',
      'Cited diagnoses and structured work orders, with abstention when evidence is thin',
      'Synthetic fault scenarios always labelled synthetic',
    ],
    tech: ['Python', 'PyTorch', 'FastAPI', 'Docker'],
    accent: '#a78bfa',
  },
  {
    id: 'asset',
    motif: 'LSTM / ARIMA', // ghost type on the home tile; restates a highlight below
    name: 'Asset Price Prediction Platform',
    kind: 'Sequence Models vs Classical Baselines',
    period: 'Jan 2026 – Jun 2026',
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
    id: 'veltrix',
    motif: '94.75%', // ghost type on the home tile; restates a highlight below
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
      { v: '94.75%', k: 'interval coverage vs 95% nominal', sub: 'GARCH(1,1), up from 91.67% under EWMA' },
      { v: '50.2%', k: 'directional hit-rate, reported honestly as no edge', sub: '753 of 1,500 walk-forward calls, z = 0.16' },
    ],
    tech: ['TypeScript', 'Next.js', 'Supabase', 'lightweight-charts'],
    repo: 'https://github.com/VenkataVinesh/Veltrix',
    demo: 'https://veltrix-terminal-frontend.vercel.app',
    accent: '#06b6d4',
  },
  {
    id: 'rl',
    motif: 'Q · SARSA', // ghost type on the home tile; restates a highlight below
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
    motif: 'max Sharpe', // ghost type on the home tile; restates a highlight below
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
  {
    id: 'weather',
    motif: 'trend · season', // ghost type on the home tile; restates a highlight below
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
]

export const experience = [
  {
    role: 'Head, Mathematics Club',
    org: 'Mahindra University',
    period: 'Aug 2024 – May 2026',
    note: 'Logistics Head (Aug 2024 to Apr 2025), then Head (Jul 2025 to May 2026). Coordinated logistics and resource allocation for university mathematics modelling competitions and academic events.',
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

// Per-project case-study content, grounded in each repo's README. No invented
// metrics. The site deliberately has no diagrams or charts: results render as type.
export const projectDetails = {
  precitec: {
    tint: { a: [0.45, 0.10, 0.18], b: [0.72, 0.20, 0.30] },
    problem:
      'The LTDS lab wanted live surface-height measurement from a PRECITEC CHRocodile CLS 2 confocal line sensor using its own Python software. The sensor measures 1,200 points along a line at once; each point gives a 200-pixel colour spectrum, and each reflecting surface makes one peak (a glass slide gives two). When two surfaces are very close their peaks overlap, and the vendor software reports one wrong height. Delivered on 22 October 2026 by a team of four: two teammates built acquisition, the viewer, the top view and the sensor API; a fourth teammate and I built the peak detection.',
    buildLabel: 'My approach',
    teamNote:
      'Team of 4. My part: planning, the peak detector, the simulator and benchmark, lab testing, the neural-network retraining and the integration into the app. Acquisition and the viewer were built by teammates.',
    build: [
      'Planned the project, including the four-week plan, and built the peak-detection package: a noise model, simple methods, multipeak Gaussian fitting with BIC model selection, a 1-D U-Net and a benchmark.',
      'Ran lab tests on the real sensor. They showed the first detectors failed on real data, finding 4 to 11 surfaces where there were 2, because real peaks are not Gaussian.',
      'Designed the robust detector that runs live. It fits a measured peak template (calibrated on real frames) with per-peak width and skew, decides how many peaks there are with a quasi-BIC rule that includes an "honest noise" term for model error, uses neighbouring channels as extra evidence, and warm-starts for speed.',
      'Built a realistic simulator and a fixed benchmark (seed 2026, from a different calibration than the detector uses), so the simulated numbers are not tuned to the detector.',
      'Derived the theoretical limit with a resolvability calculation and the Cramér-Rao bound.',
      'Retrained the neural network on the realistic simulator, and integrated the detector into the team\'s app as a --peaks panel through a viewer hook, without changing acquisition.',
    ],
    results: {
      real: [
        { v: '120/120', k: 'glass-slide channels with exactly 2 surfaces found', sub: 'the old Gaussian method found 4' },
        { v: '0.77 FWHM', k: 'closest pair resolved on the live frame', sub: '4.7 px' },
      ],
      simulated: [
        { v: '93%', k: 'close pairs found at 0.75 FWHM (about 3.5 px)' },
        { v: '47%', k: 'close pairs found at 0.5 FWHM' },
        { v: '97% / 100%', k: 'single surfaces / triples counted correctly' },
        { v: '±0.07 px', k: 'precision for a single surface', sub: 'about 0.3 px for pairs 1 FWHM apart' },
        { v: '0.57 → 0.927', k: 'neural-network F1 after retraining on the simulator', sub: '0.85 s per line' },
      ],
      runtime: 'Runtime of the robust detector: about 2 s per 1,200-channel line live with warm start, and 22 to 37 s for the first image.',
    },
    outcome:
      'A detector that runs live inside the lab\'s Python app and, on a real glass slide, finds exactly the two surfaces that are there where the Gaussian baseline found four. It reaches the limit set by the current 5.6% knowledge of the peak shape, so better calibration is the next step. The neural network finds more very close pairs but invents surfaces on single peaks, so the robust detector makes the final decision.',
    limitsLabel: 'Limits and what is unfinished',
    limits: [
      'Only two results are on real data: 2 surfaces on 120/120 glass-slide channels, and the 0.77 FWHM pair. The close-pair detection rates come from a simulated benchmark.',
      'Still in progress: calibration at several sensor heights, and a combined robust-plus-network approach.',
      'The neural network invents surfaces on single peaks, so it does not make the final decision.',
      'Code is private (lab project); details on request.',
    ],
  },

  triagemate: {
    tint: { a: [0.30, 0.20, 0.04], b: [0.56, 0.36, 0.08] },
    problem:
      'Operational service desks need a triage step that gets the ticket to the right team with the right priority, fast, without either a black-box model or a human reading every line. Built at the Swiss {ai} Weeks Zurich Hackathon for the Swiss Life challenge, over 24 to 25 September 2026, as a team project.',
    buildLabel: 'What we built',
    teamNote: 'Team project. My part: classification and retrieval logic, and the LLM prompting pipeline.',
    build: [
      'Screened incoming tickets and emails for PII and prompt injection before anything else touched them.',
      'Found that the 20,000-ticket training set was only 173 unique descriptions, with priority labels effectively random: the same description appeared across all five priority levels, and a trained classifier did no better than always guessing the majority class.',
      'Computed priority instead with an explicit ITIL urgency x impact matrix, so the routing logic is auditable rather than a black box.',
      'Used the tickets as a retrieval library for similar past cases rather than as training data, and used the LLM only where judgment was genuinely needed: classification, routing and drafting.',
      'Drafted a response for each ticket that an analyst can approve, edit or reject rather than sending automatically.',
    ],
    outcome:
      'A triage co-pilot that keeps the parts needing judgment testable: priority comes from an explicit matrix rather than a model trained on effectively random labels, and every drafted response goes through an analyst before it reaches anyone.',
    limits: [
      'Built in a 24 to 25 September 2026 hackathon timeframe, as a team project for the Swiss Life challenge.',
      'The training data\'s priority labels were unusable, so priority is rule-based rather than learned.',
    ],
  },

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
    outcome:
      'A compact, reproducible script that outputs the optimal weights and saves an efficient-frontier plot. It is a small project and it is scoped as one: the mathematics is the point.',
  },
}

// Headline figures for the home page. Each one is restated from a project entry
// above (metrics or highlights); nothing here is new. `tag` says where each
// was measured: real sensor, real data, or real out-of-sample runs.
export const figures = [
  { v: '120/120', k: 'real glass-slide channels with exactly 2 surfaces found', from: 'precitec', tag: 'Real sensor' },
  { v: '0.77 FWHM', k: 'closest pair resolved on a live frame', from: 'precitec', tag: 'Real sensor' },
  { v: '173', k: 'unique descriptions inside a 20,000-ticket dataset', from: 'triagemate', tag: 'Real data' },
  { v: '94.75%', k: 'interval coverage vs 95% nominal, GARCH(1,1)', from: 'veltrix', tag: 'Out of sample' },
]

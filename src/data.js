// Single source of truth for the whole site. Every claim here traces to the
// résumé, a repo README, or a document. No fabricated metrics.
//
// Kept deliberately in sync with:
//   career-update/resume_en.tex
//   career-update/resume_fr.tex
//   career-update/linkedin_updates.md
//   career-update/docs/COORDINATION.md (shared project one-liners and number rules)
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
    programme: '3 years completed; final year on exchange at École Centrale de Lyon',
    period: 'Aug 2023 – 2027 (expected)',
    note: 'Relevant coursework: Deep Neural Networks, Reinforcement Learning, Computational Finance with Applications, Applied Time Series Analysis.',
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
    motif: 'vs naive', // ghost type on the home tile
    name: 'Asset Price Prediction Platform',
    kind: 'LSTM and ARIMA vs a Naive Baseline',
    period: 'Jan 2026 – Jun 2026',
    dataNote: 'Simulated prices',
    summary:
      'A trained LSTM and an AIC-selected ARIMA, served by FastAPI behind a React dashboard and evaluated walk-forward against a naive "tomorrow = today" baseline. The prices are simulated (geometric Brownian motion). On that random walk neither model beats naive, and the dashboard says so.',
    highlights: [
      'Walk-forward on simulated prices: neither model beats the naive baseline, and the dashboard says so',
      'Causal features, and a scaler fitted on training rows only and saved with the weights',
      'ARIMA order chosen by AIC; on two of three series it picks (0,1,0), which is the naive model',
      'Every API response is labelled simulated, with no invented fallback when a fit fails',
    ],
    // From the repo README (python evaluate.py). Simulated prices: always labelled.
    metrics: [
      { v: '1.32', k: 'naive "tomorrow = today" MAE on simulated AAPL, the best of the three', sub: 'LSTM 1.35, ARIMA(2,1,0) 1.40 · fit on 400 of 500 days, last 100 predicted walk-forward' },
      { v: '(0,1,0)', k: 'ARIMA order chosen by AIC on two of three series, which is the naive model', sub: 'MSFT and BTC-USD' },
    ],
    metricsTag: 'Simulated',
    tech: ['Python', 'PyTorch', 'Statsmodels', 'FastAPI', 'React', 'pytest'],
    repo: 'https://github.com/VenkataVinesh/Asset-Price-Prediction-Platform',
    screenshots: [
      { src: './projects/asset/dashboard.webp', w: 1600, h: 1301, small: './projects/asset/dashboard-800.webp', alt: 'Asset dashboard: simulated AAPL history, LSTM forecast with validation-residual band, SIMULATED DATA badge, and walk-forward MAE against naive' },
    ],
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
    screenshots: [
      { src: './projects/veltrix/dashboard.webp', w: 1600, h: 1000, small: './projects/veltrix/dashboard-800.webp', alt: 'Veltrix dashboard: KPI strip, BTC chart with OHLC legend, composite signal with every indicator vote, markets table and the edge report' },
      { src: './projects/veltrix/command-palette.webp', w: 1600, h: 1000, alt: 'Veltrix command palette (⌘K) filtering symbols for "eth"' },
      { src: './projects/veltrix/trade.webp', w: 1600, h: 1000, alt: 'Veltrix paper-trade view: BTC/USD chart and a buy ticket against live prices; no real order is placed' },
    ],
    accent: '#06b6d4',
  },
  {
    id: 'rl',
    motif: 'Q · SARSA', // ghost type on the home tile
    name: 'Reinforcement Learning Lab',
    kind: 'Tabular RL from Scratch',
    period: 'Feb 2026 – May 2026',
    summary:
      'Q-learning and SARSA written from scratch in NumPy on a 5×5 GridWorld, with the temporal-difference updates by hand and the bootstrap target as the only difference between the two agents. Over 10 seeds, both learn the optimal 8-step path every time.',
    highlights: [
      'Q-learning and SARSA from scratch in NumPy, compared over 10 seeds',
      'Both learn the optimal 8-step path on 10 of 10 seeds',
      'Same environment, seeds and schedule: only the bootstrap target differs',
      'Tests for environment dynamics, targets, reproducibility and convergence',
    ],
    // From the repo README (python train.py, 10 seeds x 1,000 episodes).
    metrics: [
      { v: '10/10', k: 'seeds where both agents learn the optimal 8-step path', sub: '5×5 GridWorld, 1,000 episodes per seed' },
      { v: '2.60 ± 0.17', k: 'SARSA mean reward over the last 100 episodes', sub: 'Q-learning 2.45 ± 0.18; an optimal episode scores +3' },
    ],
    metricsTag: 'GridWorld · 10 seeds',
    metricsTone: 'neutral',
    tech: ['Python', 'NumPy', 'Matplotlib', 'pytest'],
    repo: 'https://github.com/VenkataVinesh/Reinforcement-Learning-Lab',
    accent: '#818cf8',
  },
  {
    id: 'portfolio',
    motif: 'max Sharpe', // ghost type on the home tile
    name: 'Portfolio Optimization',
    kind: 'Markowitz Mean-Variance',
    period: '2026',
    dataNote: 'Synthetic data',
    summary:
      'Long-only Markowitz mean-variance optimisation solved numerically with SciPy SLSQP: the maximum-Sharpe portfolio and the true efficient frontier, on synthetic, seeded returns, so the output shows the method, not a market.',
    highlights: [
      'Max-Sharpe weights and the true efficient frontier, solved with SciPy SLSQP',
      'Synthetic five-asset market with a one-factor covariance, positive-definite by construction',
      'Tests check that no random long-only portfolio lies above the frontier',
    ],
    // From the repo README (python optimization.py). Synthetic: always labelled.
    metrics: [
      { v: '0.809', k: 'Sharpe ratio of the max-Sharpe portfolio', sub: 'expected return 16.55%, volatility 18.00%, risk-free rate 2%' },
    ],
    metricsTag: 'Synthetic',
    tech: ['Python', 'SciPy', 'NumPy', 'Matplotlib', 'pytest'],
    repo: 'https://github.com/VenkataVinesh/Portfolio-Optimization-Dashboard',
    accent: '#34d399',
  },
  {
    id: 'weather',
    motif: 'noise floor', // ghost type on the home tile
    name: 'Weather Time-Series Forecasting',
    kind: 'LSTM vs Baselines on a Known Noise Floor',
    period: 'Jun 2025 – Jul 2025',
    dataNote: 'Synthetic data',
    summary:
      'A stacked LSTM for one-step-ahead hourly temperature, compared on a held-out test split with persistence, seasonal-naive and SARIMA baselines. The data is synthetic, a 24-hour cycle plus Gaussian noise, so the noise floor is known and every score can be read against it.',
    highlights: [
      'LSTM vs persistence, seasonal-naive and SARIMA baselines, on synthetic data',
      'Scores read against the known noise floor of the data',
      'Chronological 70 / 15 / 15 split, scaler fitted on the training slice only',
      '2-layer LSTM, 32 units, dropout 0.2, best validation epoch kept',
    ],
    // From the repo README (python train.py, 108 test hours, 3 seeds). Synthetic: always labelled.
    metrics: [
      { v: '1.03 °C', k: 'LSTM test MAE, 3 seeds (± 0.01)', sub: 'seasonal naive 1.13, SARIMA 1.14, persistence 1.71' },
      { v: '0.80 °C', k: 'noise floor: the best any model could do on this data', sub: 'the LSTM closes about 30% of the gap to the floor' },
    ],
    metricsTag: 'Synthetic',
    tech: ['Python', 'PyTorch', 'Statsmodels', 'Matplotlib', 'pytest'],
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
      'Built and benchmarked ridge regression and gradient-boosted stumps as alternatives, then cut both: RMSE changed by under 1%, hit-rates moved toward 50%, and they were 123 to 443 times slower.',
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
    problem:
      'Where does a deep sequence model actually beat a well-fitted classical baseline, and how do you show it honestly when it does not? On a random walk the best forecast is the last price, so the harness has to be strict enough to show that rather than hide it.',
    build: [
      'Trained a 2-layer, 32-unit PyTorch LSTM on a 30-day window of log return, RSI and 14-day volatility to predict the next log return, with a chronological split and the scaler fitted on training rows only and saved with the weights.',
      'Used the last 15% of training rows for validation: they pick the best epoch and give the residual spread that sets the forecast band.',
      'Fitted ARIMA(p,1,q) with p and q up to 2, chosen by AIC, with an analytical 95% interval. If a fit fails, the API returns an error instead of an invented fallback.',
      'Evaluated both walk-forward against a naive "tomorrow = today" baseline: fit on the first 400 of 500 simulated days, then predict each of the last 100 using only earlier prices.',
      'Served forecasts from FastAPI to a React dashboard. Every response carries "simulated": true and the UI shows a SIMULATED DATA badge. Tests cover causality, train-only scaling, AIC selection and API labelling.',
    ],
    outcome:
      'On a random walk the best forecast is the last price, and the harness shows exactly that: AIC picks ARIMA(0,1,0), the naive model, on two of three series, and the LSTM lands within a few percent of naive but never below it. The evaluation is the deliverable, and it is ready for a real price series.',
    limits: [
      'No real market data has been evaluated yet. The loader accepts a date,close CSV, but any claim about real prices needs that run first.',
      'A single LSTM seed in the evaluation, a 100-day test window and no hyperparameter search.',
      'Recursive multi-step forecasts reuse the model\'s own outputs, so their bands assume independent errors.',
    ],
  },

  weather: {
    problem:
      'A clean testbed for sequence models: forecast next-hour temperature on a series whose noise is known exactly, so a model\'s error can be measured against the best that is possible, not only against other models.',
    build: [
      'Generated 720 synthetic hours: temperature 20 + 8 sin(2πt/24) plus N(0,1) noise, humidity anti-correlated with it, and pressure as a random walk.',
      'Split the series chronologically 70 / 15 / 15, fitted standardisation on the training slice only and saved it with the weights; 24-hour windows of all three features predict the next hour.',
      'Trained a 2-layer, 32-unit PyTorch LSTM (dropout 0.2, L1 loss, Adam) and kept the epoch with the best validation loss.',
      'Compared it on 108 held-out hours with persistence, seasonal-naive (24 h) and SARIMA(1,0,0)(1,0,0)₂₄ baselines, with tests for split order, train-only scaling and causal windows.',
    ],
    outcome:
      'Seasonal naive\'s 1.13 °C matches the theory exactly (√2 × the 0.80 °C noise floor), which confirms the harness. The LSTM beats it by smoothing across the window instead of copying one noisy hour. On a clean synthetic sinusoid that is an easy job: the value here is the evaluation harness, not the number.',
    limits: [
      'Synthetic data only. Swapping in a real station series means replacing the generator.',
      'One-step-ahead only; multi-step forecasting would need recursive or direct heads.',
      'A small test set (108 points), so SARIMA and seasonal naive are effectively tied, and no hyperparameter search.',
    ],
  },

  rl: {
    problem:
      'Reinforcement learning is easiest to trust once you have written the update rule yourself. This lab implements the temporal-difference backups by hand, with no library doing the learning, and compares an off-policy and an on-policy agent under identical conditions.',
    build: [
      'Built a 5×5 GridWorld: start (0,0), a goal worth +10, a pit worth −10, −1 per step, and walls that block movement.',
      'Implemented Q-learning (off-policy, bootstrapping from the greedy action) and SARSA (on-policy, bootstrapping from the action actually taken next) in NumPy, with α = 0.1 and γ = 0.95.',
      'Explored ε-greedy with random tie-breaking, decaying ε from 1.0 by ×0.995 per episode to a floor of 0.05.',
      'Ran both agents on the same environment, seeds and schedule, 10 seeds × 1,000 episodes, with tests that check the only difference is the bootstrap target.',
    ],
    outcome:
      'Both agents learn the optimal 8-step path on every seed. SARSA scores slightly higher during training (2.60 against 2.45) because it learns the value of the policy it actually follows, exploration included, but the gap is about one standard deviation: on a grid this small it is a tendency, not a finding.',
    limits: [
      'A 25-state tabular problem: it shows the update rules, not anything about scale, and there is no function approximation.',
      'The pit sits off the optimal route, so the classic cliff-walking contrast (SARSA choosing a safer path) does not show up here.',
      'Hyperparameters are textbook defaults, not tuned.',
    ],
  },

  portfolio: {
    problem:
      'Implement the Markowitz mean-variance problem end to end with a real numerical solver rather than a closed-form shortcut, and trace the true efficient frontier from the covariance structure of the returns.',
    build: [
      'Built a synthetic five-asset market with expected returns drawn from 5–20% and a one-factor covariance (B Bᵀ + D), positive-definite by construction.',
      'Found the maximum-Sharpe portfolio by minimising the negative Sharpe ratio with SciPy SLSQP, fully invested and long-only, with a 2% risk-free rate.',
      'Traced the efficient frontier: for each target return, from the minimum-variance portfolio up to the best single asset, minimise variance under the same constraints.',
      'Overlaid 2,000 random long-only portfolios and tested that none lies above or to the left of the frontier.',
    ],
    outcome:
      'A compact, reproducible script that prints the optimal weights and draws the frontier. It is a small project and it is scoped as one: the mathematics is the point.',
    limits: [
      'Synthetic inputs. With real data the expected-return estimates dominate the result; shrinkage or Black-Litterman would be the next step.',
      'Single period, long-only, no transaction costs and no turnover limits.',
      'Despite the repository name, this is a script, not a dashboard.',
    ],
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

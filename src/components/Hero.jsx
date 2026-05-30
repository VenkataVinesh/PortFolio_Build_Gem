import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Terminal, Cpu, GitCommit } from 'lucide-react';

const Hero = () => {
  const [telemetry, setTelemetry] = useState({
    loss: '0.1420',
    mae: '0.2854',
    episode: '100',
    reward: '24.5',
    device: 'CUDA:0 (RTX 4060 Ti)',
    timestamp: new Date().toLocaleTimeString(),
  });

  // Dynamic simulation effect in the terminal representing ML epochs and Q-learning updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const nextEpisode = parseInt(prev.episode) + 50;
        const nextLoss = (0.012 + Math.random() * 0.008).toFixed(4);
        const nextMAE = (0.078 + Math.random() * 0.005).toFixed(4);
        const nextReward = (182.4 + Math.random() * 4.8).toFixed(1);
        return {
          ...prev,
          loss: nextLoss,
          mae: nextMAE,
          episode: nextEpisode > 1500 ? '100' : nextEpisode.toString(),
          reward: nextReward,
          timestamp: new Date().toLocaleTimeString(),
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden grid-bg">
      <div className="cyber-grid" />
      
      {/* Visual background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan opacity-10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-teal opacity-10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column - Copywriting & Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-widest bg-accent-cyan bg-opacity-10 text-accent-cyan border border-accent-cyan border-opacity-25">
              <Cpu size={12} className="animate-pulse" /> AI/ML Engineering Student | Python Developer | RL & Optimization Enthusiast
            </span>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-text-main">
              Building Intelligent <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-teal to-accent-blue font-extrabold">
                Systems & Algorithms
              </span>
            </h1>
          </div>

          <div className="space-y-4">
            <p className="max-w-xl text-lg md:text-xl text-text-sub leading-relaxed font-semibold">
              Building intelligent systems combining machine learning, algorithms, optimization, and scalable software engineering.
            </p>
            <p className="max-w-xl text-sm md:text-base text-text-sub leading-relaxed">
              Pursuing Computer Science at <span className="text-text-main font-semibold">Mahindra University</span> (CGPA: 7.96). 
              Currently seeking internship opportunities in <span className="text-text-main font-semibold">AI/ML engineering, software development, forecasting, and optimization</span>.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-4 max-w-lg border-y border-border-custom py-4">
            <div>
              <div className="text-2xl font-bold text-accent-cyan">7.96</div>
              <div className="text-xs text-text-sub uppercase tracking-wider">Current CGPA</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-teal">Python & PyTorch</div>
              <div className="text-xs text-text-sub uppercase tracking-wider">Core Arsenal</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-emerald">Operations</div>
              <div className="text-xs text-text-sub uppercase tracking-wider">TEDx & Math Club</div>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-3 items-center">
            <a
              href="./resume.pdf"
              download="Venkata_Vinesh_Resume.pdf"
              className="group px-5 py-3 bg-accent-cyan hover:bg-opacity-90 text-white font-semibold rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-accent-cyan/15 hover:shadow-accent-cyan/25 text-xs md:text-sm"
            >
              <FileText size={15} />
              <span>Download CV</span>
            </a>
            <a
              href="https://github.com/VenkataVinesh"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 glass hover:border-accent-cyan text-text-main font-semibold rounded-xl flex items-center gap-2 transition-all active:scale-95 text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/venkat-vinesh"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 glass hover:border-accent-cyan text-text-main font-semibold rounded-xl flex items-center gap-2 transition-all active:scale-95 text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span>LinkedIn</span>
            </a>
            <a
              href="#contact"
              className="px-4 py-3 border border-dashed border-border-custom hover:border-accent-cyan text-text-sub hover:text-text-main font-semibold rounded-xl transition-all active:scale-95 text-xs"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right Column - Interactive Mathematical Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-md lg:max-w-none mx-auto w-full"
        >
          {/* Glass Card Shadow Backing */}
          <div className="absolute inset-0 bg-accent-cyan/5 rounded-2xl filter blur-xl -z-10" />

          <div className="w-full glass rounded-2xl overflow-hidden border border-border-custom shadow-2xl">
            {/* Terminal Title Bar */}
            <div className="bg-slate-900 bg-opacity-70 dark:bg-slate-950 dark:bg-opacity-80 px-4 py-3 flex items-center justify-between border-b border-border-custom">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="text-[11px] font-mono text-text-sub flex items-center gap-1.5 uppercase tracking-widest">
                <Terminal size={12} className="text-accent-cyan" /> train_session.log
              </div>
              <div className="w-12" /> {/* spacer */}
            </div>

            {/* Terminal Body */}
            <div className="p-5 font-mono text-xs text-text-sub space-y-4 bg-slate-950/40 dark:bg-slate-950/70">
              <div className="space-y-1">
                <p className="text-accent-cyan"># python train.py --model=LSTM --dataset=WeatherSeries</p>
                <p className="text-emerald-500">✔ CUDA Initialization Complete: {telemetry.device}</p>
                <p className="text-text-main pl-3">↳ Epoch 45/50 | Loss: <span className="text-yellow-500">{telemetry.loss}</span> | Val MAE: <span className="text-emerald-400">{telemetry.mae}</span></p>
              </div>

              <div className="space-y-1">
                <p className="text-accent-cyan"># python rl_agent.py --env=GridWorld-v2 --train</p>
                <p className="text-text-sub">Executing tabular Q-Learning value updates...</p>
                <p className="text-text-main pl-3">↳ Episode: {telemetry.episode} | Mean Reward: {telemetry.reward}</p>
                <p className="text-emerald-500 pl-3">✔ Q-learning policy stabilized successfully</p>
              </div>

              <div className="space-y-1">
                <p className="text-accent-cyan"># python forecast.py --model=ARIMA --steps=12</p>
                <p className="text-text-sub">Loading historical time-series data...</p>
                <p className="text-text-main pl-3">↳ Forecast completed. MSE: 0.024 | MAPE: 1.84%</p>
              </div>

              <div className="border-t border-border-custom pt-3 mt-3 flex justify-between items-center text-[10px]">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span className="text-emerald-400">ENGINE ONLINE</span>
                </div>
                <div>{telemetry.timestamp}</div>
              </div>
            </div>
          </div>

          {/* Underlay Info Badge */}
          <div className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-lg border border-border-custom flex items-center gap-2 shadow-md hover:border-accent-cyan transition-colors">
            <GitCommit size={14} className="text-accent-cyan" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-main">
              ACTIVE SESSION
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;

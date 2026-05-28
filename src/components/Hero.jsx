import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Terminal, Shield, Award, Cpu, GitCommit } from 'lucide-react';

const Hero = () => {
  const [telemetry, setTelemetry] = useState({
    latency: '1.24ms',
    accuracy: '98.6%',
    sabrAlpha: '0.412',
    sabrBeta: '0.500',
    device: 'CUDA:0 (RTX 4060 Ti)',
    timestamp: new Date().toLocaleTimeString(),
  });

  // Dynamic simulation effect in the terminal
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        latency: (1.15 + Math.random() * 0.2).toFixed(2) + 'ms',
        accuracy: (98.4 + Math.random() * 0.4).toFixed(1) + '%',
        sabrAlpha: (0.405 + Math.random() * 0.015).toFixed(3),
        timestamp: new Date().toLocaleTimeString(),
      }));
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
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-accent-cyan bg-opacity-10 text-accent-cyan border border-accent-cyan border-opacity-25">
              <Cpu size={12} className="animate-pulse" /> AI/ML Engineer & Quant Developer
            </span>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-text-main">
              Building the Future <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-teal to-accent-blue font-extrabold">
                of Quantitative Systems
              </span>
            </h1>
          </div>

          <p className="max-w-xl text-lg md:text-xl text-text-sub leading-relaxed font-medium">
            Pursuing Computer Science at <span className="text-text-main font-semibold">Mahindra University</span>. 
            Developing high-performance architectures at the intersection of <span className="text-text-main font-semibold">deep learning</span>, 
            <span className="text-text-main font-semibold">stochastic calculus</span>, and <span className="text-text-main font-semibold">quantitative finance</span>.
          </p>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-4 max-w-lg border-y border-border-custom py-4">
            <div>
              <div className="text-2xl font-bold text-accent-cyan">2027</div>
              <div className="text-xs text-text-sub uppercase tracking-wider">CS Graduate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-teal">C++ & PyTorch</div>
              <div className="text-xs text-text-sub uppercase tracking-wider">Core Arsenal</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-emerald">Chess</div>
              <div className="text-xs text-text-sub uppercase tracking-wider">Strategic Mind</div>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#projects"
              className="group relative px-6 py-3.5 bg-accent-cyan hover:bg-opacity-90 text-white font-semibold rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-accent-cyan/15 hover:shadow-accent-cyan/25"
            >
              <span>Explore Work</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#resume"
              className="px-6 py-3.5 glass hover:border-accent-cyan text-text-main font-semibold rounded-xl flex items-center gap-2 transition-all active:scale-95"
            >
              <FileText size={16} />
              <span>View Resume</span>
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 text-text-sub hover:text-text-main font-semibold transition-colors"
            >
              Get in Touch
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
                <Terminal size={12} className="text-accent-cyan" /> sys_telemetry.log
              </div>
              <div className="w-12" /> {/* spacer */}
            </div>

            {/* Terminal Body */}
            <div className="p-5 font-mono text-xs text-text-sub space-y-4 bg-slate-950/40 dark:bg-slate-950/70">
              <div className="space-y-1">
                <p className="text-accent-cyan"># env_check --verbose</p>
                <p className="text-emerald-500">✔ CUDA Initialization Complete</p>
                <p className="text-text-main pl-3">Device: {telemetry.device}</p>
                <p className="text-text-main pl-3">VRAM: 8.00 GB GDDR6 (RTX 4060 Ti)</p>
              </div>

              <div className="space-y-1">
                <p className="text-accent-cyan"># quant_engine --run-model=SABR</p>
                <p className="text-text-sub">Calibrating SABR Volatility parameters...</p>
                <p className="text-text-main pl-3">↳ Alpha: {telemetry.sabrAlpha} | Beta: {telemetry.sabrBeta}</p>
                <p className="text-text-main pl-3">↳ Rho: -0.328 | Vol-of-Vol (Nu): 0.684</p>
                <p className="text-emerald-500 pl-3">✔ Calibration converged in 1.48 ms</p>
              </div>

              <div className="space-y-1">
                <p className="text-accent-cyan"># lob_signals --stream-realtime</p>
                <p className="text-text-sub">Detecting signals from LOB feed...</p>
                <p className="text-text-main pl-3">↳ Signal Detection Latency: <span className="text-yellow-500">{telemetry.latency}</span></p>
                <p className="text-text-main pl-3">↳ Prediction Accuracy (Transformers): <span className="text-emerald-400">{telemetry.accuracy}</span></p>
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
              SE23UCSE001
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;

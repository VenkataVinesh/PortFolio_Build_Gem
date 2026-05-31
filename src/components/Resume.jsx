import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap, Award, Mail, Phone, Globe } from 'lucide-react';

const Resume = () => {
  return (
    <section id="resume" className="py-24 px-6 md:px-12 relative overflow-hidden bg-bg-sub/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">Credentials</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mt-2">
              Curriculum Vitae
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-teal mt-4 rounded-full" />
          </div>

          <a
            href="./resume.pdf"
            download="Venkata_Vinesh_Resume.pdf"
            className="group px-6 py-3 bg-accent-cyan hover:bg-opacity-90 text-white font-semibold rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-accent-cyan/15 hover:shadow-accent-cyan/25"
          >
            <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
            <span>Download PDF Resume</span>
          </a>
        </div>

        {/* Interactive Resume Sheet Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-3xl border border-border-custom shadow-2xl space-y-10 relative bg-slate-950/20"
        >
          {/* Header section */}
          <div className="border-b border-border-custom pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-text-main">
                A Venkata Vinesh Kumar Reddy
              </h3>
              <p className="text-sm font-semibold text-accent-cyan font-mono tracking-wider uppercase">
                Computer Science & AI/ML Student
              </p>
            </div>

            {/* Quick Contact info */}
            <div className="space-y-1.5 text-xs font-semibold text-text-sub font-mono">
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-accent-teal" />
                <a href="mailto:venkatvinesh46@gmail.com" className="hover:text-text-main transition-colors">
                  venkatvinesh46@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-accent-teal" />
                <a href="tel:6364144883" className="hover:text-text-main transition-colors">
                  +91 63641 44883
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-accent-teal" />
                <a
                  href="https://github.com/VenkataVinesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-main transition-colors"
                >
                  github.com/VenkataVinesh
                </a>
              </div>
            </div>
          </div>

          {/* Education Block */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <GraduationCap size={16} /> Education
            </h4>
            <div className="pl-6 border-l border-border-custom space-y-4">
              <div>
                <div className="flex justify-between items-baseline gap-4 flex-wrap">
                  <h5 className="text-base font-bold text-text-main">
                    Mahindra University, Hyderabad
                  </h5>
                  <span className="text-xs font-semibold text-text-sub font-mono">2023 - 2027</span>
                </div>
                <p className="text-sm text-accent-teal font-semibold font-mono">
                  B.Tech in Computer Science & Engineering
                </p>
                <p className="text-xs text-text-sub mt-2 leading-relaxed">
                  Focusing on design and analysis of algorithms, probability theory, statistics, optimization techniques, 
                  machine learning models, and deep sequence predictors.
                </p>
              </div>
            </div>
          </div>

          {/* Core Skills Summary */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <FileText size={16} /> Technical Arsenal
            </h4>
            <div className="pl-6 border-l border-border-custom grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-text-main uppercase tracking-wider block">Programming Languages</span>
                <span className="text-text-sub font-medium leading-relaxed block">
                  Python (Primary), JavaScript, SQL, C++ (Algorithms & systems fundamentals)
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-text-main uppercase tracking-wider block">AI / Machine Learning</span>
                <span className="text-text-sub font-medium leading-relaxed block">
                  PyTorch, TensorFlow, Scikit-learn, Reinforcement Learning, LSTM/GRU models, Time-Series forecasting
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-text-main uppercase tracking-wider block">Software Engineering</span>
                <span className="text-text-sub font-medium leading-relaxed block">
                  React, FastAPI, Docker, REST APIs, Git, Algorithms & Data Structures, OOP
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-text-main uppercase tracking-wider block">Mathematics & Analytics</span>
                <span className="text-text-sub font-medium leading-relaxed block">
                  Probability, Statistics, Mathematical Optimization, Financial Mathematics, Data Analysis
                </span>
              </div>
            </div>
          </div>

          {/* Project & Research Experience */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <Briefcase size={16} /> Technical Projects
            </h4>
            <div className="pl-6 border-l border-border-custom space-y-6">
              
              {/* Asset Prediction */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline gap-4 flex-wrap">
                  <h5 className="text-sm font-bold text-text-main">
                    Asset Price Prediction Platform
                  </h5>
                  <span className="text-xs font-semibold text-text-sub font-mono">Python Project</span>
                </div>
                <p className="text-xs text-text-sub leading-relaxed">
                  Built an interactive forecasting platform to evaluate how sequential deep learning models (LSTMs) compare with classical statistical baselines (ARIMA) on noisy pricing data. Calculated 14-day rolling technical features (SMA, EMA, RSI, Volatility) using Pandas, exposed via a FastAPI backend to a React dashboard.
                </p>
              </div>

              {/* Weather Time-Series */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline gap-4 flex-wrap">
                  <h5 className="text-sm font-bold text-text-main">
                    Weather Forecasting Analytics
                  </h5>
                  <span className="text-xs font-semibold text-text-sub font-mono">Deep Learning Project</span>
                </div>
                <p className="text-xs text-text-sub leading-relaxed">
                  Analyzed multi-dimensional meteorological sensors, implementing ARIMA, SARIMA, and PyTorch LSTM networks to forecast temperature and humidity. Conducted time-series decomposition to isolate trend and seasonal patterns, optimizing parameters based on residual stationarity.
                </p>
              </div>

              {/* Veltrix */}
              <div className="space-y-1">
                <div className="flex justify-between items-baseline gap-4 flex-wrap">
                  <h5 className="text-sm font-bold text-text-main">
                    Veltrix — Algorithmic Trading Dashboard
                  </h5>
                  <span className="text-xs font-semibold text-text-sub font-mono">Systems & Optimization</span>
                </div>
                <p className="text-xs text-text-sub leading-relaxed">
                  Engineered a full-stack algorithmic trading backtester using FastAPI and Next.js. Integrated mathematical optimization engines utilizing SciPy solvers to find optimal Sharpe allocation weights. Containerized the system using Docker and visualized backtest signals and portfolio variance using Recharts.
                </p>
              </div>
            </div>
          </div>

          {/* Strategic Achievements */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-accent-cyan flex items-center gap-2">
              <Award size={16} /> Extracurricular Activities
            </h4>
            <div className="pl-6 border-l border-border-custom space-y-3 text-xs">
              <div>
                <span className="font-bold text-text-main block">TEDx & Math Club Leadership</span>
                <span className="text-text-sub block">
                  On-Ground Operations Lead for TEDx Mahindra University, managing logistics, scheduling, and AV configurations for 500+ attendees. Logistics Head for Math Club, directing venues and event setup for academic contests.
                </span>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Resume;

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Code, BarChart2 } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Code className="text-accent-cyan" size={22} />,
      skills: [
        'Python (Primary Language - AI/ML & Scripts)',
        'C++ (Algorithms, Data Structures & Systems)',
        'JavaScript / ES6 (Web Applications)',
        'SQL (Relational Databases & Data Querying)',
      ],
    },
    {
      title: 'AI & Machine Learning',
      icon: <Brain className="text-accent-teal" size={22} />,
      skills: [
        'PyTorch & TensorFlow (Model Architectures)',
        'Scikit-learn (ML Algorithms & Pipelines)',
        'Reinforcement Learning (Value/Policy Iterations)',
        'LSTM & GRU (Deep Sequence Modeling)',
        'Time Series Forecasting & Auto-Regression',
        'Model Training Telemetry via Weights & Biases',
      ],
    },
    {
      title: 'Software Engineering',
      icon: <Cpu className="text-accent-blue" size={22} />,
      skills: [
        'React & Next.js (Modern Front-end Apps)',
        'FastAPI & REST APIs (Python Web Services)',
        'Docker (Containerization & Deployment)',
        'Git (Version Control & Collaboration)',
        'HTML5 Canvas (Sub-50ms Graphic Telemetries)',
      ],
    },
    {
      title: 'Mathematics & Analytics',
      icon: <BarChart2 className="text-accent-emerald" size={22} />,
      skills: [
        'Probability Theory & Random Processes',
        'Mathematical Statistics & Estimators',
        'Mathematical Optimization & Linear Programming',
        'Financial Mathematics (Asset Allocation models)',
        'Data Analysis & Visualizations (Pandas, Matplotlib)',
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative overflow-hidden bg-bg-sub/30">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">Technical Arsenal</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mt-2">
            Core Specializations
          </h2>
          <p className="text-text-sub text-base md:text-lg mt-2 max-w-xl">
            A balanced integration of solid software engineering practices, Python machine learning, and mathematical foundations.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-teal mt-4 rounded-full" />
        </div>

        {/* Skill Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="p-6 md:p-8 glass rounded-2xl border border-border-custom hover:border-accent-cyan/30 transition-all duration-300 shadow-lg"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-custom">
                <div className="p-2 bg-slate-900 bg-opacity-60 rounded-lg">
                  {category.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-text-main">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-teal group-hover:bg-accent-cyan group-hover:scale-150 transition-all duration-200" />
                    <span className="text-sm text-text-sub group-hover:text-text-main transition-colors font-medium">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;

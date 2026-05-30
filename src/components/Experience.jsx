import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Briefcase, GraduationCap, MapPin } from 'lucide-react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);

  const timeline = [
    {
      title: 'B.Tech in Computer Science & Engineering',
      organization: 'Mahindra University, Hyderabad',
      type: 'education',
      period: '2023 - Present',
      location: 'Hyderabad, India',
      description: 'Acquiring solid mathematical and algorithmic foundations. Focusing heavily on design and analysis of algorithms, probability, statistics, optimization techniques, and machine learning architectures.',
      bullets: [
        'Selected Coursework: Design & Analysis of Algorithms, Probability & Statistics, Optimization Techniques, Deep Learning, Reinforcement Learning.',
        'Actively implementing mathematical optimization models and neural networks in Python.',
        'Maintaining a solid academic performance (CGPA: 7.96/10) with active involvement in technical leadership.',
      ],
    },
    {
      title: 'AI/ML & Software Projects Developer',
      organization: 'Independent & Academic Development',
      type: 'research',
      period: '2024 - Present',
      location: 'Mahindra University Lab',
      description: 'Developing Python projects implementing predictive modeling, time-series forecasting, and reinforcement learning agents.',
      bullets: [
        'Programmed model-free RL agents (Q-Learning and SARSA) from scratch in Python to prove convergence bounds.',
        'Built deep sequence models in PyTorch using LSTM cells to forecast weather patterns, achieving 14.8% MAE error reduction.',
        'Created asset prediction scripts in Scikit-learn (Random Forests) wrapped in FastAPI backend endpoints.',
      ],
    },
    {
      title: 'Logistics Head',
      organization: 'Math Club, Mahindra University',
      type: 'work',
      period: 'Aug 2024 - Present',
      location: 'Hyderabad, India',
      description: 'Led operational planning and logistics coordination for mathematics competitions, academic events, and problem-solving seminars.',
      bullets: [
        'Organized technical competitions and academic events engaging over 300+ students.',
        'Coordinated venue logistics, resource management, and event execution schedules.',
        'Led operational planning for weekly problem-solving sessions and academic workshops.',
      ],
    },
    {
      title: 'On-Ground Operations Lead',
      organization: 'TEDx Mahindra University',
      type: 'work',
      period: 'Jan 2024 - May 2024',
      location: 'Hyderabad, India',
      description: 'Coordinated on-ground logistics, venue setup, and audio-visual setups for regional speakers and over 500 attendees.',
      bullets: [
        'Managed operational flows, event timelines, and cross-functional coordination between stage managers and technical crews.',
        'Assisted in large-scale speaker and attendee management, keeping event schedules aligned.',
        'Collaborated with design and logistics teams for smooth event execution.',
      ],
    },
    {
      title: 'Participant & Team Developer',
      organization: 'Smart India Hackathon (SIH)',
      type: 'work',
      period: 'Sept 2024 - Oct 2024',
      location: 'National Level Competition',
      description: 'Collaborated in a team of 6 to prototype an intelligent system solution addressing a national-level problem statement.',
      bullets: [
        'Designed and implemented backend system components and REST APIs for data collection.',
        'Researched and integrated data analysis algorithms to process system telemetry.',
        'Participated in intensive brainstorming and prototyping sprints during the hackathon.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">Timeline</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mt-2">
            Education & Project Milestones
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-teal mt-4 rounded-full" />
        </div>

        {/* Tab Layout for Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12 items-start">
          
          {/* Timeline navigation tabs */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 border-b lg:border-b-0 lg:border-l border-border-custom scrollbar-none">
            {timeline.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`text-left px-4 py-3 text-sm font-semibold whitespace-nowrap rounded-lg lg:rounded-l-none lg:rounded-r-lg border-l-2 lg:border-l-4 -ml-[1px] transition-all duration-300 ${
                  activeTab === idx
                    ? 'border-accent-cyan bg-accent-cyan bg-opacity-10 text-accent-cyan'
                    : 'border-transparent text-text-sub hover:text-text-main hover:bg-slate-900/30'
                }`}
              >
                <div className="font-mono text-xs text-text-sub opacity-70 mb-1">{item.period}</div>
                <div>{item.organization.split(',')[0]}</div>
              </button>
            ))}
          </div>

          {/* Timeline details container */}
          <div className="glass p-8 rounded-2xl border border-border-custom min-h-[350px] relative shadow-xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/5 rounded-bl-full pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Title and Meta */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {timeline[activeTab].type === 'education' ? (
                      <GraduationCap className="text-accent-cyan" size={20} />
                    ) : (
                      <Briefcase className="text-accent-teal" size={20} />
                    )}
                    <h3 className="text-xl md:text-2xl font-bold text-text-main">
                      {timeline[activeTab].title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-text-sub font-mono">
                    <span className="text-text-main">{timeline[activeTab].organization}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border-custom" />
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {timeline[activeTab].period}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border-custom" />
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {timeline[activeTab].location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-sub leading-relaxed text-base md:text-lg">
                  {timeline[activeTab].description}
                </p>

                {/* Bullets */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-accent-cyan">Key Accomplishments</h4>
                  <ul className="space-y-2 text-sm text-text-sub pl-5 list-disc marker:text-accent-teal">
                    {timeline[activeTab].bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;

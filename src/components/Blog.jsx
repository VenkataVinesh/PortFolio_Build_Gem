import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Clock, ChevronRight, ArrowLeft, TrendingUp } from 'lucide-react';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      title: 'Understanding Bellman Equations Through Reinforcement Learning',
      date: 'May 12, 2026',
      readTime: '6 min read',
      category: 'Reinforcement Learning',
      summary: 'A simple breakdown of how agents calculate step-by-step value expectations and search policies using tabular Q-learning scripts.',
      content: [
        { type: 'h3', text: 'What is the Bellman Equation?' },
        { type: 'p', text: 'At its core, the Bellman Equation is a recursive formula that defines how we calculate state values in reinforcement learning. It states that the value of your current state is the immediate reward you receive, plus the discounted value of the next state you transition into:' },
        { type: 'equation', key: 'bellman-equation' },
        { type: 'p', text: 'Instead of calculating entire trajectories, the agent computes state updates step-by-step. Learning this mathematically was one thing, but coding it made it click.' },
        { type: 'h3', text: 'Tabular Q-Learning' },
        { type: 'p', text: "Tabular Q-learning is a model-free RL algorithm. It maintains a grid of estimated state-action values called a Q-table. When the agent takes action $a$ in state $s$ and transitions to $s'$ with reward $r$, it performs a Temporal Difference (TD) value update:" },
        { type: 'equation', key: 'q-learning-update' },
        { type: 'p', text: 'Here, $\\alpha$ is the learning rate, and $\\gamma$ is the discount factor.' },
        { type: 'h3', text: 'Python Implementation of a Q-learning Step' },
        { type: 'p', text: 'Here is a clean Python function showing how this value iteration is coded:' },
        { type: 'code', code: `import numpy as np

def update_q_value(q_table, state, action, reward, next_state, alpha, gamma):
    """
    Performs a standard Q-value update based on Bellman value iteration.
    """
    # 1. Find the best action for the next state from current estimates
    best_next_action = np.argmax(q_table[next_state])
    
    # 2. Compute the Temporal Difference Target (reward + discounted future value)
    td_target = reward + gamma * q_table[next_state][best_next_action]
    
    # 3. Calculate the TD Error
    td_error = td_target - q_table[state][action]
    
    # 4. Perform Q-value incremental update
    q_table[state][action] += alpha * td_error
    return q_table` },
        { type: 'h3', text: 'Epsilon-Decay Policies' },
        { type: 'p', text: 'During early episodes, the agent explores random paths (high epsilon). Over time, we decay epsilon so the agent exploits its Q-table parameters, converging to the optimal policy bounds.' },
        { type: 'h3', text: 'My Personal Takeaway' },
        { type: 'p', text: 'One thing that initially confused me about Bellman equations was how the future value is discounted recursively ($\\gamma$). It seemed like magic until I coded a simple Q-table sweep. Mapping state values iteratively showed me how the discount parameter controls an agent\'s "horizon"—higher values make it seek long-term rewards, while lower values make it opportunistic.' }
      ]
    },
    {
      id: 2,
      title: 'Building a Portfolio Optimization Model with Python',
      date: 'April 20, 2026',
      readTime: '8 min read',
      category: 'Mathematics & Optimization',
      summary: 'Using SciPy to optimize asset weights, calculate Sharpe Ratios, and plot Markowitz Efficient Frontiers in Python.',
      content: [
        { type: 'h3', text: 'Portfolio Mean & Variance' },
        { type: 'p', text: 'When constructing an asset portfolio, our goals are to maximize expected returns and minimize volatility variance. For portfolio weights vector $w$, historical returns vector $\\mu$, and asset covariance matrix $\\Sigma$, the expected return and variance are:' },
        { type: 'equation', key: 'portfolio-mean-variance' },
        { type: 'p', text: 'The Sharpe Ratio measures excess return per unit of standard deviation: $SR = \\frac{\\mu_p - R_f}{\\sigma_p}$, where $R_f$ is the risk-free rate.' },
        { type: 'h3', text: 'Optimization under Constraints' },
        { type: 'p', text: 'To find the optimal portfolio, we minimize negative Sharpe Ratio under constraints (weights must sum to 1, and no short-selling is allowed: $0 \\le w_i \\le 1$):' },
        { type: 'equation', key: 'portfolio-optimization' },
        { type: 'h3', text: 'Python SciPy Optimization Script' },
        { type: 'p', text: 'We can solve this optimization problem in Python using `scipy.optimize`:' },
        { type: 'code', code: `import numpy as np
import scipy.optimize as sco

def max_sharpe_ratio(mean_returns, cov_matrix, risk_free_rate=0.0):
    num_assets = len(mean_returns)
    
    # Define objectives
    def objective(weights):
        p_return = np.sum(mean_returns * weights)
        p_volatility = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
        return -(p_return - risk_free_rate) / p_volatility
        
    # Weights must sum to 1
    constraints = ({'type': 'eq', 'fun': lambda x: np.sum(x) - 1.0})
    # Boundaries: weights between 0 and 1
    bounds = tuple((0.0, 1.0) for _ in range(num_assets))
    # Initial guess
    init_guess = num_assets * [1.0 / num_assets]
    
    results = sco.minimize(
        objective, 
        init_guess, 
        method='SLSQP', 
        bounds=bounds, 
        constraints=constraints
    )
    return results.x  # Returns optimal asset weights` },
        { type: 'h3', text: 'Analyzing the Efficient Frontier' },
        { type: 'p', text: 'By resolving this minimization for different target returns, we map the boundary curve known as the Markowitz Efficient Frontier, which represents the optimal portfolio layouts for any given risk tolerance.' },
        { type: 'h3', text: 'My Personal Takeaway' },
        { type: 'p', text: 'I built this model to see how Markowitz\'s mean-variance equations hold up under real-world constraints. Initially, I expected optimization solvers to be extremely robust, but I quickly learned that the covariance matrices are highly sensitive to outliers. This taught me the value of statistical cleaning and covariance shrinkage.' }
      ]
    },
    {
      id: 3,
      title: 'How LSTMs Help in Weather Forecasting',
      date: 'March 05, 2026',
      readTime: '5 min read',
      category: 'Deep Learning',
      summary: 'A look at how Recurrent Networks and LSTM gates capture temporal weather trends, coded in PyTorch.',
      content: [
        { type: 'h3', text: 'Cell States & Recurrent Gates' },
        { type: 'p', text: 'Standard recurrent neural networks (RNNs) suffer from vanishing gradients when training on long time-series sequences. Long Short-Term Memory (LSTM) cells bypass this by maintaining a cell state $C_t$ and using three gate networks:' },
        { type: 'equation', key: 'lstm-gates' },
        { type: 'p', text: 'The cell state is updated linearly, allowing gradients to flow back easily.' },
        { type: 'h3', text: 'PyTorch Time-Series Forecast Layer' },
        { type: 'p', text: 'Here is how we construct a forecasting LSTM model using PyTorch:' },
        { type: 'code', code: `import torch
import torch.nn as nn

class WeatherForecastingLSTM(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_layers, output_dim):
        super(WeatherForecastingLSTM, self).__init__()
        # PyTorch recurrent layer
        self.lstm = nn.LSTM(
            input_size=input_dim, 
            hidden_size=hidden_dim, 
            num_layers=num_layers, 
            batch_first=True
        )
        # Fully connected projection output layer
        self.fc = nn.Linear(hidden_dim, output_dim)
        
    def forward(self, x):
        # x input shape: (batch_size, sequence_length, input_features)
        lstm_out, (hn, cn) = self.lstm(x)
        
        # Take sequence output of the final time step
        final_time_step_output = lstm_out[:, -1, :]
        
        # Project output to predictions
        predictions = self.fc(final_time_step_output)
        return predictions` },
        { type: 'h3', text: 'Data Formatting & Forecasting MAE' },
        { type: 'p', text: 'Multivariate sequences must be formatted as rolling window frames (e.g. past 24 hours of sensors to forecast next hour). We train the model by minimizing Mean Absolute Error (MAE) loss, checking prediction curves against true values.' },
        { type: 'h3', text: 'My Personal Takeaway' },
        { type: 'p', text: 'When I first tried using standard Recurrent Neural Networks (RNNs) for temperature series, the gradients vanished within 10 sequence steps, leading to poor predictions. Transitioning to LSTMs was an eye-opener; seeing how the forget and input gates learn which historic anomalies to remember helped me understand why gated topologies dominate sequence modeling.' }
      ]
    },
    {
      id: 4,
      title: 'What I Learned While Training My First RL Agent',
      date: 'February 10, 2026',
      readTime: '5 min read',
      category: 'Reinforcement Learning',
      summary: 'My first-hand experience designing a custom GridWorld simulation, struggling with sparse rewards, and watching my agent learn optimal pathways through epsilon decay.',
      content: [
        { type: 'h3', text: 'The GridWorld-v2 Environment' },
        { type: 'p', text: 'To learn how model-free RL algorithms work in practice, I built a custom GridWorld environment in Python. The agent\'s goal is to find the shortest path to a goal state while avoiding terminal obstacles.' },
        { type: 'p', text: 'When I first started training, I gave the agent a simple reward of +1 for reaching the goal and 0 elsewhere. Because the grid was large, the agent spent thousands of episodes randomly wandering around, never finding the goal. This was my first lesson in the challenge of sparse rewards.' },
        { type: 'h3', text: 'Reward Shaping' },
        { type: 'p', text: 'To help the agent learn, I introduced a step penalty ($r = -0.1$ for each movement) to encourage it to find the shortest path. This shaped reward function immediately changed the learning behavior: the agent quickly discovered that lingering in non-goal states carried a cost, pushing it to seek the goal.' },
        { type: 'h3', text: 'Learning Rate ($\\alpha$) and Epsilon Decay' },
        { type: 'p', text: 'I noticed that if the exploration rate ($\\epsilon$) decayed too quickly, the agent got stuck in sub-optimal paths. Conversely, if it decayed too slowly, training took too long. I set up an exponential decay:' },
        { type: 'equation', key: 'epsilon-decay' },
        { type: 'p', text: 'Tuning these parameters showed me how delicate RL training is compared to standard supervised learning. Coding this simulation solidified my respect for the mathematical foundations of decision-making agents.' },
        { type: 'h3', text: 'My Personal Takeaway' },
        { type: 'p', text: 'During early runs, my Q-learning agent got stuck in infinite loops, pacing back and forth in empty cells. I realized that my epsilon decay factor was too aggressive—the agent stopped exploring before finding the goal. Tuning the exploration parameters taught me that hyperparameters in reinforcement learning behave much more dynamically than in static classification tasks.' }
      ]
    }
  ];

  const renderParagraphText = (text) => {
    const parts = [];
    const regex = /(`[^`]+`|\$[^\$]+\$)/g;
    const splitText = text.split(regex);
    
    return splitText.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        const code = part.slice(1, -1);
        return (
          <code key={index} className="bg-slate-900 border border-border-custom px-1.5 py-0.5 rounded text-accent-teal font-mono text-[11px] sm:text-xs">
            {code}
          </code>
        );
      }
      if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);
        let renderedMath = math;
        renderedMath = renderedMath.replace(/\\alpha/g, 'α');
        renderedMath = renderedMath.replace(/\\gamma/g, 'γ');
        renderedMath = renderedMath.replace(/\\epsilon/g, 'ε');
        renderedMath = renderedMath.replace(/\\sigma/g, 'σ');
        renderedMath = renderedMath.replace(/\\Sigma/g, 'Σ');
        renderedMath = renderedMath.replace(/\\odot/g, '⊙');
        renderedMath = renderedMath.replace(/\\leftarrow/g, '←');
        renderedMath = renderedMath.replace(/\\epsilon_\{min\}/g, 'ε_min');
        renderedMath = renderedMath.replace(/\\epsilon_0/g, 'ε_0');
        renderedMath = renderedMath.replace(/\\epsilon_t/g, 'ε_t');
        renderedMath = renderedMath.replace(/d\^t/g, 'dᵗ');
        renderedMath = renderedMath.replace(/w\^T/g, 'wᵀ');
        renderedMath = renderedMath.replace(/\\mu_p/g, 'μ_p');
        renderedMath = renderedMath.replace(/\\sigma_p/g, 'σ_p');
        renderedMath = renderedMath.replace(/\\mu/g, 'μ');
        renderedMath = renderedMath.replace(/R_f/g, 'R_f');

        // Match subscript like x_t or s' or similar
        const subMatch = renderedMath.match(/^([A-Za-z])_([a-zA-Z0-9'min]+)$/);
        if (subMatch) {
          const [, base, sub] = subMatch;
          return (
            <span key={index} className="font-serif italic text-accent-cyan mx-0.5 font-semibold">
              {base}<sub className="text-[9px] -bottom-[1px] ml-[1px]">{sub}</sub>
            </span>
          );
        }
        
        // Match superscripts like w^T
        const supMatch = renderedMath.match(/^([A-Za-z])\^([A-Z0-9])$/);
        if (supMatch) {
          const [, base, sup] = supMatch;
          return (
            <span key={index} className="font-serif italic text-accent-cyan mx-0.5 font-semibold">
              {base}<sup className="text-[9px]">{sup}</sup>
            </span>
          );
        }

        return (
          <span key={index} className="font-serif italic text-accent-cyan mx-0.5 font-semibold">
            {renderedMath}
          </span>
        );
      }
      return part;
    });
  };

  const renderMathBlock = (key, idx) => {
    switch (key) {
      case 'bellman-equation':
        return (
          <div key={idx} className="my-6 p-6 bg-slate-950/60 border border-border-custom rounded-2xl flex flex-col items-center justify-center gap-3 shadow-inner">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5 self-start">
              <TrendingUp size={10} className="text-accent-cyan" /> Mathematical formulation: Bellman Expectation
            </span>
            <div className="flex items-center justify-center flex-wrap gap-1 font-serif text-base sm:text-lg md:text-xl text-accent-cyan tracking-wide py-2">
              <span className="italic">V</span>(s)
              <span className="mx-2 text-text-sub font-sans font-light">=</span>
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase text-text-sub bg-slate-900 border border-border-custom px-2 py-0.5 rounded">max</span>
              <sub className="text-[8px] sm:text-[9px] -ml-2 mr-2 mt-4 font-sans text-text-sub">a</sub>
              <span className="text-xl sm:text-2xl font-light -mt-1 select-none">∑</span>
              <sub className="text-[8px] sm:text-[9px] -ml-3 mr-2 mt-6 text-text-sub">s', r</sub>
              <span className="italic">p</span>(s', r | s, a)
              <span className="text-lg sm:text-xl ml-1 font-light">[</span>
              <span className="ml-1">r</span>
              <span className="mx-1.5 text-text-sub">+</span>
              <span className="italic text-accent-teal">γ</span>
              <span className="italic ml-1">V</span>(s')
              <span className="text-lg sm:text-xl ml-1 font-light">]</span>
            </div>
          </div>
        );
      case 'q-learning-update':
        return (
          <div key={idx} className="my-6 p-6 bg-slate-950/60 border border-border-custom rounded-2xl flex flex-col items-center justify-center gap-3 shadow-inner">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5 self-start">
              <TrendingUp size={10} className="text-accent-cyan" /> Algorithm Equation: Q-Value Update step
            </span>
            <div className="flex items-center justify-center flex-wrap gap-1 font-serif text-base sm:text-lg md:text-xl text-accent-cyan tracking-wide py-2">
              <span className="italic">Q</span>(s, a)
              <span className="mx-2 text-accent-teal">←</span>
              <span className="italic">Q</span>(s, a)
              <span className="mx-2 text-text-sub">+</span>
              <span className="italic text-accent-teal">α</span>
              <span className="text-lg sm:text-xl ml-1 font-light">[</span>
              <span className="ml-1">r</span>
              <span className="mx-1.5 text-text-sub">+</span>
              <span className="italic text-accent-teal">γ</span>
              <span className="font-sans text-[9px] sm:text-[10px] font-bold uppercase text-text-sub bg-slate-900 border border-border-custom px-1.5 py-0.5 rounded ml-1">max</span>
              <sub className="text-[8px] sm:text-[9px] -ml-2 mr-2 mt-4 font-sans text-text-sub">a'</sub>
              <span className="italic">Q</span>(s', a')
              <span className="mx-2 text-text-sub">-</span>
              <span className="italic">Q</span>(s, a)
              <span className="text-lg sm:text-xl ml-1 font-light">]</span>
            </div>
          </div>
        );
      case 'portfolio-mean-variance':
        return (
          <div key={idx} className="my-6 p-6 bg-slate-950/60 border border-border-custom rounded-2xl flex flex-col items-center justify-center gap-4 shadow-inner">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5 self-start">
              <TrendingUp size={10} className="text-accent-cyan" /> Mathematical Formulae: Mean & Volatility Volatility
            </span>
            <div className="flex flex-col gap-4 py-2 w-full">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16">
                <div className="flex items-center font-serif text-base sm:text-lg text-accent-cyan tracking-wide">
                  <span className="text-text-sub font-sans text-xs uppercase mr-2.5">Expected Return:</span>
                  <span className="italic text-accent-teal">μ</span>
                  <sub className="text-[9px] -ml-0.5 mt-2 font-sans text-text-sub">p</sub>
                  <span className="mx-2.5 text-text-sub">=</span>
                  <span className="italic">w</span>
                  <sup className="text-[9px] -mt-2 font-sans text-text-sub">T</sup>
                  <span className="italic ml-1 text-accent-teal">μ</span>
                </div>
                <div className="flex items-center font-serif text-base sm:text-lg text-accent-cyan tracking-wide">
                  <span className="text-text-sub font-sans text-xs uppercase mr-2.5">Portfolio Variance:</span>
                  <span className="italic text-accent-teal">σ</span>
                  <sub className="text-[9px] -ml-0.5 mt-2 font-sans text-text-sub">p</sub>
                  <sup className="text-[9px] -mt-2 mr-1 text-text-sub">2</sup>
                  <span className="mx-2.5 text-text-sub">=</span>
                  <span className="italic">w</span>
                  <sup className="text-[9px] -mt-2 font-sans text-text-sub">T</sup>
                  <span className="italic ml-1 text-accent-teal">Σ</span>
                  <span className="italic ml-1">w</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center mt-3 pt-4 border-t border-border-custom/30 font-serif text-base sm:text-lg text-accent-cyan tracking-wide">
                <span className="text-text-sub font-sans text-xs uppercase mr-4">Sharpe Ratio Formula:</span>
                <span className="font-semibold">SR</span>
                <span className="mx-3 text-text-sub">=</span>
                <div className="flex flex-col items-center mx-1">
                  <span className="px-2 text-center text-xs sm:text-sm border-b border-accent-cyan/60 pb-0.5">
                    <span className="italic text-accent-teal">μ</span>
                    <sub className="text-[8px]">p</sub>
                    <span className="mx-1.5 text-text-sub">-</span>
                    <span className="italic">R</span>
                    <sub className="text-[8px]">f</sub>
                  </span>
                  <span className="px-2 text-center text-xs sm:text-sm pt-0.5">
                    <span className="italic text-accent-teal">σ</span>
                    <sub className="text-[8px]">p</sub>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'portfolio-optimization':
        return (
          <div key={idx} className="my-6 p-6 bg-slate-950/60 border border-border-custom rounded-2xl flex flex-col items-center justify-center gap-3 shadow-inner">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5 self-start">
              <TrendingUp size={10} className="text-accent-cyan" /> Objective function: Sharpe Maximization
            </span>
            <div className="flex items-center justify-center font-serif text-base sm:text-lg md:text-xl text-accent-cyan tracking-wide py-2">
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase text-text-sub bg-slate-900 border border-border-custom px-2 py-0.5 rounded">min</span>
              <sub className="text-[8px] sm:text-[9px] -ml-2 mr-3 mt-4 font-sans text-text-sub">w</sub>
              <span className="mx-2 text-text-sub">-</span>
              <div className="flex flex-col items-center mx-1">
                <span className="px-2 text-center text-xs sm:text-sm border-b border-accent-cyan/60 pb-0.5">
                  <span className="italic">w</span>
                  <sup className="text-[8px] -mt-2">T</sup>
                  <span className="italic ml-0.5 text-accent-teal">μ</span>
                  <span className="mx-1.5 text-text-sub">-</span>
                  <span className="italic">R</span>
                  <sub className="text-[8px]">f</sub>
                </span>
                <span className="px-2 text-center text-xs sm:text-sm pt-0.5">
                  <span className="mr-0.5 select-none">√</span>
                  <span className="border-t border-accent-cyan/60 pt-0.5 pl-0.5">
                    <span className="italic">w</span>
                    <sup className="text-[8px] -mt-2">T</sup>
                    <span className="italic ml-0.5 text-accent-teal">Σ</span>
                    <span className="italic ml-0.5">w</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        );
      case 'lstm-gates':
        return (
          <div key={idx} className="my-6 p-6 bg-slate-950/60 border border-border-custom rounded-2xl flex flex-col items-center justify-center gap-4 shadow-inner">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5 self-start">
              <TrendingUp size={10} className="text-accent-cyan" /> Cell Mechanics: Gated recurrent operations
            </span>
            <div className="flex flex-col gap-3 py-1 w-full max-w-sm sm:max-w-md mx-auto">
              <div className="flex items-center justify-between font-serif text-xs sm:text-sm text-accent-cyan">
                <span className="text-text-sub text-[10px] uppercase font-sans font-bold">1. Forget Gate:</span>
                <div className="flex items-center tracking-wide">
                  <span className="italic">f</span><sub className="text-[8px] mt-1">t</sub>
                  <span className="mx-2 text-text-sub">=</span>
                  <span className="italic text-accent-teal">σ</span>
                  <span className="text-[10px] font-sans text-text-sub bg-slate-900 border border-border-custom px-1.5 py-0.5 rounded mx-1">
                    W<sub className="text-[8px]">f</sub>[h<sub className="text-[8px]">t-1</sub>, x<sub className="text-[8px]">t</sub>] + b<sub className="text-[8px]">f</sub>
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between font-serif text-xs sm:text-sm text-accent-cyan">
                <span className="text-text-sub text-[10px] uppercase font-sans font-bold">2. Input Gate:</span>
                <div className="flex items-center tracking-wide">
                  <span className="italic">i</span><sub className="text-[8px] mt-1">t</sub>
                  <span className="mx-2 text-text-sub">=</span>
                  <span className="italic text-accent-teal">σ</span>
                  <span className="text-[10px] font-sans text-text-sub bg-slate-900 border border-border-custom px-1.5 py-0.5 rounded mx-1">
                    W<sub className="text-[8px]">i</sub>[h<sub className="text-[8px]">t-1</sub>, x<sub className="text-[8px]">t</sub>] + b<sub className="text-[8px]">i</sub>
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between font-serif text-xs sm:text-sm text-accent-cyan">
                <span className="text-text-sub text-[10px] uppercase font-sans font-bold">3. Output State:</span>
                <div className="flex items-center tracking-wide">
                  <span className="italic">h</span><sub className="text-[8px] mt-1">t</sub>
                  <span className="mx-2 text-text-sub">=</span>
                  <span className="italic">o</span><sub className="text-[8px] mt-1">t</sub>
                  <span className="mx-1.5 text-accent-teal">⊙</span>
                  <span className="font-sans text-[10px] font-bold text-text-sub bg-slate-900 border border-border-custom px-1.5 py-0.5 rounded">tanh</span>
                  <span className="ml-1 text-sm font-light">(</span>
                  <span className="italic">C</span><sub className="text-[8px] mt-1">t</sub>
                  <span className="text-sm font-light">)</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'epsilon-decay':
        return (
          <div key={idx} className="my-6 p-6 bg-slate-950/60 border border-border-custom rounded-2xl flex flex-col items-center justify-center gap-3 shadow-inner">
            <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider flex items-center gap-1.5 self-start">
              <TrendingUp size={10} className="text-accent-cyan" /> Decaying Policy Equation: Epsilon Crossover
            </span>
            <div className="flex items-center justify-center font-serif text-base sm:text-lg md:text-xl text-accent-cyan tracking-wide py-2">
              <span className="italic text-accent-teal">ε</span>
              <sub className="text-[8px] sm:text-[9px] -ml-0.5 mt-2 font-sans text-text-sub">t</sub>
              <span className="mx-2.5 text-text-sub">=</span>
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase text-text-sub bg-slate-900 border border-border-custom px-2 py-0.5 rounded">max</span>
              <span className="text-base sm:text-lg font-light ml-1">(</span>
              <span className="italic text-accent-teal">ε</span>
              <sub className="text-[8px] sm:text-[9px] -ml-0.5 mt-2 font-sans text-text-sub">min</sub>
              <span className="mx-2 text-text-sub">,</span>
              <span className="italic text-accent-teal">ε</span>
              <sub className="text-[8px] sm:text-[9px] -ml-0.5 mt-2 font-sans text-text-sub">0</sub>
              <span className="mx-1.5 text-text-sub">×</span>
              <span className="italic">d</span>
              <sup className="text-[8px] -mt-2 font-sans">t</sup>
              <span className="text-base sm:text-lg font-light ml-1">)</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="blog" className="py-24 px-6 md:px-12 relative overflow-hidden bg-bg-sub/10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Header */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">Technical Writing</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mt-2">
                  Articles & Curious Logs
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-teal mt-4 rounded-full" />
              </div>

              {/* Grid of Articles */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ y: -5 }}
                    className="glass p-6 rounded-2xl border border-border-custom hover:border-accent-cyan/40 transition-all duration-300 flex flex-col justify-between h-96 group cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-mono font-bold text-accent-teal uppercase tracking-widest">
                        <span>{post.category}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-text-main group-hover:text-accent-cyan transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-xs md:text-sm text-text-sub leading-relaxed line-clamp-4">
                        {post.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-bold text-accent-cyan uppercase tracking-wider mt-4 pt-4 border-t border-border-custom">
                      <span>Read Article</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="post"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-4xl mx-auto glass p-6 md:p-12 rounded-3xl border border-border-custom shadow-2xl relative"
            >
              {/* Back Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-accent-cyan uppercase tracking-wider mb-8 hover:text-text-main transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Articles</span>
              </button>

              {/* Meta */}
              <div className="space-y-4 mb-8 pb-6 border-b border-border-custom">
                <div className="flex flex-wrap gap-4 text-xs font-mono font-bold text-accent-teal uppercase tracking-widest">
                  <span>{selectedPost.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border-custom self-center" />
                  <span className="flex items-center gap-1"><Calendar size={12} /> {selectedPost.date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border-custom self-center" />
                  <span className="flex items-center gap-1"><Clock size={12} /> {selectedPost.readTime}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-text-main leading-tight">
                  {selectedPost.title}
                </h3>
              </div>

              {/* Content Markup */}
              <div className="prose prose-invert max-w-none text-text-sub space-y-6 text-sm md:text-base leading-relaxed font-sans">
                {selectedPost.content.map((block, idx) => {
                  switch (block.type) {
                    case 'h3':
                      return (
                        <h4 key={idx} className="text-lg md:text-xl font-bold text-text-main pt-6 pb-2 border-b border-border-custom/25 mt-6">
                          {block.text}
                        </h4>
                      );
                    case 'p':
                      return (
                        <p key={idx} className="text-sm md:text-base text-text-sub leading-relaxed my-3">
                          {renderParagraphText(block.text)}
                        </p>
                      );
                    case 'equation':
                      return renderMathBlock(block.key, idx);
                    case 'code':
                      return (
                        <pre key={idx} className="p-4 bg-slate-950 border border-border-custom rounded-xl font-mono text-xs text-accent-teal leading-relaxed overflow-x-auto my-4 shadow-inner">
                          <code>{block.code}</code>
                        </pre>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Blog;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Clock, ChevronRight, X, ArrowLeft } from 'lucide-react';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      title: 'Bellman Optimality & Temporal Difference Bounds in RL',
      date: 'May 12, 2026',
      readTime: '6 min read',
      category: 'Reinforcement Learning',
      summary: 'An analytical review of policy improvement bounds under Bellman equation constraints. Implements basic temporal difference updates and explores state transitions.',
      content: `### Introduction to Bellman Optimality

In reinforcement learning, the Bellman Optimality Equation defines the optimal value function $V^*(s)$, representing the maximum expected cumulative reward starting from state $s$. The optimality equation is formulated recursively as:

$$V^*(s) = \\max_{a} \\sum_{s', r} p(s', r | s, a) \\left[ r + \\gamma V^*(s') \\right]$$

This recursive formulation bounds the optimal policy iteration. The goal is to update policy $\\pi(a|s)$ until it converges to the optimal bounds.

### Temporal Difference Learning (TD)

Temporal Difference (TD) learning allows an agent to learn value updates without a complete transition model. In $TD(0)$, the state-value update rule is:

$$V(S_t) \\leftarrow V(S_t) + \\alpha \\left[ R_{t+1} + \\gamma V(S_{t+1}) - V(S_t) \\right]$$

where $R_{t+1} + \\gamma V(S_{t+1}) - V(S_t)$ is the temporal difference error, representing the discrepancy between our estimated value and a single-step sample estimate.

### Python Implementation of Q-Learning Step

Below is an optimized snippet implementing a single Q-value updating step under $\\epsilon$-greedy exploration policies:

\`\`\`python
import numpy as np

def update_q_table(q_table, state, action, reward, next_state, alpha, gamma):
    \"\"\"
    Performs a Bellman-equation Q-value update step.
    \"\"\"
    # Find the maximum estimated Q-value for the next state
    best_next_action = np.argmax(q_table[next_state])
    
    # Calculate TD target
    td_target = reward + gamma * q_table[next_state][best_next_action]
    
    # Calculate TD error
    td_error = td_target - q_table[state][action]
    
    # Perform standard update
    q_table[state][action] += alpha * td_error
    return q_table
\`\`\`

### Summary & Bound Convergence

Through value iteration and policy mapping, TD algorithms converge to the optimal Bellman boundary, assuming that all state-action pairs are visited infinitely often and the learning rate satisfies standard stochastic approximation conditions.`
    },
    {
      id: 2,
      title: 'Stochastic Option Pricing: Solvers for Heston Drift Dynamics',
      date: 'April 20, 2026',
      readTime: '8 min read',
      category: 'Quantitative Finance',
      summary: 'Exploring stochastic calculus asset simulations. Calibrates local volatilities under correlated random walks using the Heston model equations.',
      content: `### Heston Model Formulation

The Heston Model is a stochastic volatility model where asset price $S_t$ and its volatility variance $v_t$ follow correlated stochastic differential equations (SDEs):

$$dS_t = \\mu S_t dt + \\sqrt{v_t} S_t dW_t^S$$
$$dv_t = \\kappa (\\theta - v_t) dt + \\xi \\sqrt{v_t} dW_t^v$$

Here, $\\kappa$ represents the speed of variance reversion, $\\theta$ represents the long-term mean variance, and $\\xi$ is the volatility of volatility. The Brownian motions are correlated:

$$d\\langle W^S, W^v \\rangle_t = \\rho dt$$

This correlation $\\rho$ models the leverage effect, where variance increases as asset price falls.

### Numerical Path Discretization

To price options under these dynamics, we discretize the continuous SDEs using the Euler-Maruyama approximation method over time step $\\Delta t$:

$$S_{t+1} = S_t + \\mu S_t \\Delta t + \\sqrt{v_t^+} S_t Z_S \\sqrt{\\Delta t}$$
$$v_{t+1} = v_t + \\kappa (\\theta - v_t^+) \\Delta t + \\xi \\sqrt{v_t^+} Z_v \\sqrt{\\Delta t}$$

where $Z_S$ and $Z_v$ are correlated standard normal variables: $Z_v = \\rho Z_S + \\sqrt{1 - \\rho^2} Z_{\\text{orthogonal}}$.

### Python Simulation Core

The following script simulates Heston price paths to price European calls:

\`\`\`python
import numpy as np

def simulate_heston_paths(S0, v0, mu, kappa, theta, xi, rho, T, steps, paths):
    dt = T / steps
    S = np.zeros((steps + 1, paths))
    v = np.zeros((steps + 1, paths))
    S[0] = S0
    v[0] = v0
    
    for t in range(1, steps + 1):
        # Generate correlated normals
        Z_S = np.random.normal(0, 1, paths)
        Z_orthogonal = np.random.normal(0, 1, paths)
        Z_v = rho * Z_S + np.sqrt(1 - rho**2) * Z_orthogonal
        
        # Keep variance positive using full truncation scheme
        v_prev = np.maximum(v[t-1], 0)
        
        # Euler step
        S[t] = S[t-1] + mu * S[t-1] * dt + np.sqrt(v_prev) * S[t-1] * Z_S * np.sqrt(dt)
        v[t] = v[t-1] + kappa * (theta - v_prev) * dt + xi * np.sqrt(v_prev) * Z_v * np.sqrt(dt)
        
    return S, v
\`\`\`

### Quantitative Pricing Applications

Option values are computed by taking the risk-neutral expected value of the payoffs, e.g., $\\mathbb{E}[\\max(S_T - K, 0)]$, discounted back to time zero. This C++ simulation completes pricing tasks with high speed.`
    },
    {
      id: 3,
      title: 'LSTM Sequence Mapping for Weather Predictions',
      date: 'March 05, 2026',
      readTime: '5 min read',
      category: 'Deep Learning',
      summary: 'Deep dive into cell state controls, LSTM gate functions, and how they minimize error on multivariate weather forecasting signals.',
      content: `### LSTM Cell Mechanics

Long Short-Term Memory (LSTM) cells are designed to solve the vanishing gradient problem in recurrent networks. They control information flow via three gates:

1. **Forget Gate ($f_t$):** Controls what context to drop from the cell state.
   $$f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)$$
2. **Input Gate ($i_t$):** Controls what new data to write to the cell state.
   $$i_t = \\sigma(W_i [h_{t-1}, x_t] + b_i)$$
   $$\\tilde{C}_t = \\tanh(W_c [h_{t-1}, x_t] + b_c)$$
3. **Output Gate ($o_t$):** Controls what hidden state to export.
   $$o_t = \\sigma(W_o [h_{t-1}, x_t] + b_o)$$
   $$h_t = o_t \\odot \\tanh(C_t)$$

The cell state $C_t$ is updated linearly: $C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t$, allowing gradients to flow back easily during training.

### PyTorch Sequence Layer Definition

Here is a typical PyTorch model implementation of a sequence forecast layer combining LSTM and Linear projections:

\`\`\`python
import torch
import torch.nn as nn

class WeatherSequenceModel(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_layers, output_dim):
        super(WeatherSequenceModel, self).__init__()
        self.lstm = nn.LSTM(
            input_size=input_dim, 
            hidden_size=hidden_dim, 
            num_layers=num_layers, 
            batch_first=True
        )
        self.fc = nn.Linear(hidden_dim, output_dim)
        
    def forward(self, x):
        # x shape: (batch, seq_len, input_dim)
        lstm_out, (hn, cn) = self.lstm(x)
        
        # Take the output of the final time step
        last_step = lstm_out[:, -1, :]
        
        # Project to target forecast dimension
        out = self.fc(last_step)
        return out
\`\`\`

### Loss Minimization Bounds

During training, we minimize Mean Absolute Error (MAE) or Mean Squared Error (MSE) loss metrics over target dimensions. Mixed precision FP16 and attention mechanisms help improve training convergence speed and prediction accuracy.`
    }
  ];

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
                  Articles & Technical Analyses
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
                {selectedPost.content.split('\n\n').map((block, idx) => {
                  if (block.startsWith('### ')) {
                    return <h4 key={idx} className="text-lg md:text-xl font-bold text-text-main pt-4">{block.replace('### ', '')}</h4>;
                  }
                  if (block.startsWith('$$') && block.endsWith('$$')) {
                    return (
                      <div key={idx} className="py-3 px-4 bg-slate-950/40 border border-border-custom rounded-xl font-mono text-center text-accent-cyan overflow-x-auto my-4">
                        {block.replace(/\$\$/g, '')}
                      </div>
                    );
                  }
                  if (block.startsWith('`') && block.includes('`')) {
                    const code = block.replace(/```python|```/g, '').trim();
                    return (
                      <pre key={idx} className="p-4 bg-slate-950 border border-border-custom rounded-xl font-mono text-xs text-accent-teal leading-relaxed overflow-x-auto my-4">
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: block.replace(/`([^`]+)`/g, '<code class="bg-slate-900 px-1 py-0.5 rounded text-accent-teal font-mono text-xs">$1</code>') }} />
                  );
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

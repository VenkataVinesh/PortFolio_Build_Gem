import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, Clock, ChevronRight, ArrowLeft } from 'lucide-react';

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
      content: `### What is the Bellman Equation?

At its core, the Bellman Equation is a recursive formula that defines how we calculate state values in reinforcement learning. It states that the value of your current state is the immediate reward you receive, plus the discounted value of the next state you transition into:

$$V(s) = \\max_{a} \\sum_{s', r} p(s', r | s, a) \\left[ r + \\gamma V(s') \\right]$$

Instead of calculating entire trajectories, the agent computes state updates step-by-step. Learning this mathematically was one thing, but coding it made it click.

### Tabular Q-Learning

Tabular Q-learning is a model-free RL algorithm. It maintains a grid of estimated state-action values called a Q-table. When the agent takes action $a$ in state $s$ and transitions to $s'$ with reward $r$, it performs a Temporal Difference (TD) value update:

$$Q(s, a) \\leftarrow Q(s, a) + \\alpha \\left[ r + \\gamma \\max_{a'} Q(s', a') - Q(s, a) \\right]$$

Here, $\\alpha$ is the learning rate, and $\\gamma$ is the discount factor.

### Python Implementation of a Q-learning Step

Here is a clean Python function showing how this value iteration is coded:

\`\`\`python
import numpy as np

def update_q_value(q_table, state, action, reward, next_state, alpha, gamma):
    \"\"\"
    Performs a standard Q-value update based on Bellman value iteration.
    \"\"\"
    # 1. Find the best action for the next state from current estimates
    best_next_action = np.argmax(q_table[next_state])
    
    # 2. Compute the Temporal Difference Target (reward + discounted future value)
    td_target = reward + gamma * q_table[next_state][best_next_action]
    
    # 3. Calculate the TD Error
    td_error = td_target - q_table[state][action]
    
    # 4. Perform Q-value incremental update
    q_table[state][action] += alpha * td_error
    return q_table
\`\`\`

### Epsilon-Decay Policies
During early episodes, the agent explores random paths (high epsilon). Over time, we decay epsilon so the agent exploits its Q-table parameters, converging to the optimal policy bounds.`
    },
    {
      id: 2,
      title: 'Building a Portfolio Optimization Model with Python',
      date: 'April 20, 2026',
      readTime: '8 min read',
      category: 'Mathematics & Optimization',
      summary: 'Using SciPy to optimize asset weights, calculate Sharpe Ratios, and plot Markowitz Efficient Frontiers in Python.',
      content: `### Portfolio Mean & Variance

When constructing an asset portfolio, our goals are to maximize expected returns and minimize volatility variance. For portfolio weights vector $w$, historical returns vector $\\mu$, and asset covariance matrix $\\Sigma$, the expected return and variance are:

$$\\mu_p = w^T \\mu$$
$$\\sigma_p^2 = w^T \\Sigma w$$

The Sharpe Ratio measures excess return per unit of standard deviation: $SR = \\frac{\\mu_p - R_f}{\\sigma_p}$, where $R_f$ is the risk-free rate.

### Optimization under Constraints

To find the optimal portfolio, we minimize negative Sharpe Ratio under constraints (weights must sum to 1, and no short-selling is allowed: $0 \\le w_i \\le 1$):

$$\\min_{w} \\quad -\\frac{w^T \\mu - R_f}{\\sqrt{w^T \\Sigma w}}$$

### Python SciPy Optimization Script

We can solve this optimization problem in Python using \`scipy.optimize\`:

\`\`\`python
import numpy as np
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
    return results.x  # Returns optimal asset weights
\`\`\`

### Analyzing the Efficient Frontier

By resolving this minimization for different target returns, we map the boundary curve known as the Markowitz Efficient Frontier, which represents the optimal portfolio layouts for any given risk tolerance.`
    },
    {
      id: 3,
      title: 'How LSTMs Help in Weather Forecasting',
      date: 'March 05, 2026',
      readTime: '5 min read',
      category: 'Deep Learning',
      summary: 'A look at how Recurrent Networks and LSTM gates capture temporal weather trends, coded in PyTorch.',
      content: `### Cell States & Recurrent Gates

Standard recurrent neural networks (RNNs) suffer from vanishing gradients when training on long time-series sequences. Long Short-Term Memory (LSTM) cells bypass this by maintaining a cell state $C_t$ and using three gate networks:

1. **Forget Gate ($f_t$):** Decides what context data to drop.
   $$f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)$$
2. **Input Gate ($i_t$):** Decides what new data to write to memory.
   $$i_t = \\sigma(W_i [h_{t-1}, x_t] + b_i)$$
3. **Output Gate ($o_t$):** Decides what hidden state to export to the next cell.
   $$h_t = o_t \\odot \\tanh(C_t)$$

The cell state is updated linearly, allowing gradients to flow back easily.

### PyTorch Time-Series Forecast Layer

Here is how we construct a forecasting LSTM model using PyTorch:

\`\`\`python
import torch
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
        return predictions
\`\`\`

### Data Formatting & Forecasting MAE

Multivariate sequences must be formatted as rolling window frames (e.g. past 24 hours of sensors to forecast next hour). We train the model by minimizing Mean Absolute Error (MAE) loss, checking prediction curves against true values.`
    },
    {
      id: 4,
      title: 'What I Learned While Training My First RL Agent',
      date: 'February 10, 2026',
      readTime: '5 min read',
      category: 'Reinforcement Learning',
      summary: 'My first-hand experience designing a custom GridWorld simulation, struggling with sparse rewards, and watching my agent learn optimal pathways through epsilon decay.',
      content: `### The GridWorld-v2 Environment

To learn how model-free RL algorithms work in practice, I built a custom GridWorld environment in Python. The agent's goal is to find the shortest path to a goal state while avoiding terminal obstacles. 

When I first started training, I gave the agent a simple reward of +1 for reaching the goal and 0 elsewhere. Because the grid was large, the agent spent thousands of episodes randomly wandering around, never finding the goal. This was my first lesson in the challenge of sparse rewards.

### Reward Shaping

To help the agent learn, I introduced a step penalty ($r = -0.1$ for each movement) to encourage it to find the shortest path. This shaped reward function immediately changed the learning behavior: the agent quickly discovered that lingering in non-goal states carried a cost, pushing it to seek the goal.

### Learning Rate ($\\alpha$) and Epsilon Decay

I noticed that if the exploration rate ($\\epsilon$) decayed too quickly, the agent got stuck in sub-optimal paths. Conversely, if it decayed too slowly, training took too long. I set up an exponential decay:

$$\\epsilon_t = \\max(\\epsilon_{min}, \\epsilon_0 \\times d^t)$$

Tuning these parameters showed me how delicate RL training is compared to standard supervised learning. Coding this simulation solidified my respect for the mathematical foundations of decision-making agents.`
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

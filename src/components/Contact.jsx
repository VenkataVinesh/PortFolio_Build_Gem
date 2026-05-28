import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = 'venkatvinesh46@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    
    // Trigger small confetti burst for visual reward!
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 }
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Simulate successful API send
    setSubmitted(true);

    // Trigger full screen confetti burst to celebrate contact!
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-teal opacity-5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">Connection</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-main mt-2">
            Start a Conversation
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-cyan to-accent-teal mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-stretch">
          
          {/* Left Column: Contact info & Quick Copier */}
          <div className="flex flex-col justify-between space-y-8 p-6 md:p-8 glass rounded-2xl border border-border-custom bg-opacity-25">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-text-main">
                Let's Build Something Impactful
              </h3>
              <p className="text-sm md:text-base text-text-sub leading-relaxed">
                I am actively seeking internship opportunities in quantitative research, asset pricing software, 
                and machine learning modeling. 
                Whether you have an opening, a chess challenge, or just want to chat about stochastic equations, 
                feel free to reach out!
              </p>

              <div className="space-y-4 pt-4 text-sm font-semibold text-text-sub font-mono">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 bg-opacity-60 border border-border-custom rounded-lg">
                    <Mail size={16} className="text-accent-cyan" />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-sub opacity-70 block uppercase">Personal Email</span>
                    <a href="mailto:venkatvinesh46@gmail.com" className="hover:text-accent-cyan transition-colors text-text-main">
                      venkatvinesh46@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 bg-opacity-60 border border-border-custom rounded-lg">
                    <Mail size={16} className="text-accent-teal" />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-sub opacity-70 block uppercase">Mahindra University Email</span>
                    <a href="mailto:se23ucse001@mahindrauniversity.edu.in" className="hover:text-accent-teal transition-colors text-text-main">
                      se23ucse001@mahindrauniversity.edu.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 bg-opacity-60 border border-border-custom rounded-lg">
                    <Phone size={16} className="text-accent-blue" />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-sub opacity-70 block uppercase">Phone Number</span>
                    <a href="tel:6364144883" className="hover:text-accent-blue transition-colors text-text-main">
                      +91 63641 44883
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 bg-opacity-60 border border-border-custom rounded-lg">
                    <MapPin size={16} className="text-accent-emerald" />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-sub opacity-70 block uppercase">Location</span>
                    <span className="text-text-main">Hyderabad, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Copy email widget */}
            <div className="p-4 bg-slate-950 bg-opacity-40 border border-border-custom rounded-xl flex items-center justify-between gap-4">
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-sub block">Direct Link</span>
                <span className="text-xs font-mono font-bold text-text-main truncate block">{emailAddress}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className={`p-2.5 rounded-xl border transition-all duration-200 shrink-0 ${
                  copied
                    ? 'border-accent-emerald text-accent-emerald bg-accent-emerald bg-opacity-10'
                    : 'border-border-custom text-text-sub hover:text-accent-cyan hover:border-accent-cyan'
                }`}
                title="Copy email to clipboard"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="glass p-6 md:p-8 rounded-2xl border border-border-custom flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-text-sub">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 bg-opacity-50 dark:bg-slate-950 border border-border-custom rounded-xl focus:border-accent-cyan focus:outline-none text-sm text-text-main transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-text-sub">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 bg-opacity-50 dark:bg-slate-950 border border-border-custom rounded-xl focus:border-accent-cyan focus:outline-none text-sm text-text-main transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-text-sub">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 bg-opacity-50 dark:bg-slate-950 border border-border-custom rounded-xl focus:border-accent-cyan focus:outline-none text-sm text-text-main transition-colors"
                  placeholder="Quant / Machine Learning Internship Opportunities"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-text-sub">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 bg-opacity-50 dark:bg-slate-950 border border-border-custom rounded-xl focus:border-accent-cyan focus:outline-none text-sm text-text-main transition-colors resize-none"
                  placeholder="Hello Vinesh, I am a recruiter at... I would love to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-4 bg-accent-cyan hover:bg-opacity-90 disabled:bg-accent-emerald disabled:bg-opacity-20 disabled:text-accent-emerald text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] shadow-md shadow-accent-cyan/15 disabled:shadow-none border disabled:border-accent-emerald/30"
              >
                {submitted ? (
                  <>
                    <Check size={16} />
                    <span>Message Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;

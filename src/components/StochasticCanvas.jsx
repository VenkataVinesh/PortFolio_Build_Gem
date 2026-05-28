import React, { useEffect, useRef } from 'react';

const StochasticCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position
    const mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Initialize Brownian Motion paths (stock price random walks)
    const paths = Array.from({ length: 5 }, (_, i) => {
      const step = 4;
      const count = Math.ceil(width / step);
      return {
        y: height * (0.35 + i * 0.1),
        currentY: height * (0.35 + i * 0.1),
        volatility: 1.5 + i * 0.8,
        drift: -0.05,
        points: [],
        step,
        count,
        color: i % 2 === 0 ? 'rgba(6, 182, 212, 0.12)' : 'rgba(20, 184, 166, 0.12)',
        lightColor: i % 2 === 0 ? 'rgba(8, 145, 178, 0.04)' : 'rgba(13, 148, 136, 0.04)',
      };
    });

    // Populate initial points
    paths.forEach((path) => {
      let x = 0;
      let y = path.y;
      for (let j = 0; j < path.count; j++) {
        path.points.push({ x, y });
        x += path.step;
      }
    });

    // Initialize neural network particles (for mouse interaction)
    const particles = [];
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      // Clear canvas with subtle trail
      const isLight = document.documentElement.classList.contains('light');
      ctx.fillStyle = isLight ? 'rgba(248, 250, 252, 0.25)' : 'rgba(2, 6, 23, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Draw Stochastic Random Walks (Stock simulation)
      paths.forEach((path) => {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = isLight ? path.lightColor : path.color;

        // Shift points left and add a new random step at the end (real-time stream simulation)
        path.points.forEach((pt, idx) => {
          if (idx < path.points.length - 1) {
            pt.y = path.points[idx + 1].y;
          } else {
            // Geometric Brownian Motion step simulation
            const change = (Math.random() - 0.5) * path.volatility + path.drift;
            path.currentY += change;
            
            // Constrain within a band
            const targetCenter = path.y;
            const deviation = path.currentY - targetCenter;
            if (Math.abs(deviation) > height * 0.25) {
              path.currentY -= deviation * 0.05; // Pull back toward center
            }
            pt.y = path.currentY;
          }
        });

        // Draw smooth path
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let j = 1; j < path.points.length - 1; j++) {
          const xc = (path.points[j].x + path.points[j + 1].x) / 2;
          const yc = (path.points[j].y + path.points[j + 1].y) / 2;
          ctx.quadraticCurveTo(path.points[j].x, path.points[j].y, xc, yc);
        }
        ctx.stroke();
      });

      // Draw Neural Network nodes & links (ML representation)
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wall collisions
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse influence
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            // Gravity effect pulling towards mouse
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? 'rgba(8, 145, 178, 0.4)' : 'rgba(6, 182, 212, 0.4)';
        ctx.fill();
      });

      // Connect particles with thin lines
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const dist = Math.hypot(pi.x - pj.x, pi.y - pj.y);
          if (dist < 100) {
            const alpha = (100 - dist) / 100 * (isLight ? 0.08 : 0.12);
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = isLight 
              ? `rgba(13, 148, 136, ${alpha})` 
              : `rgba(20, 184, 166, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect particles to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dist = Math.hypot(pi.x - mouse.x, pi.y - mouse.y);
          if (dist < mouse.radius) {
            const alpha = (mouse.radius - dist) / mouse.radius * (isLight ? 0.15 : 0.25);
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isLight 
              ? `rgba(8, 145, 178, ${alpha})` 
              : `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none"
      style={{ opacity: 0.95 }}
    />
  );
};

export default StochasticCanvas;

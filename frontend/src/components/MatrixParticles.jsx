import React, { useEffect, useRef } from 'react';

const MatrixParticles = ({ className = "", particleCount = 100 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    // Particle class
    class MatrixParticle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.speed = Math.random() * 3 + 1;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.trail = [];
        this.maxTrail = Math.floor(Math.random() * 10) + 5;
        this.char = this.getRandomChar();
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.1;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
      }

      getRandomChar() {
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        return chars[Math.floor(Math.random() * chars.length)];
      }

      update() {
        // Update position
        this.y += this.speed;
        this.x += Math.sin(this.pulse) * 0.5;
        
        // Update rotation and pulse
        this.rotation += this.rotationSpeed;
        this.pulse += this.pulseSpeed;

        // Add current position to trail
        this.trail.push({ x: this.x, y: this.y, opacity: this.opacity });
        
        // Limit trail length
        if (this.trail.length > this.maxTrail) {
          this.trail.shift();
        }

        // Reset if off screen
        if (this.y > canvas.height + 50) {
          this.reset();
        }

        // Randomly change character
        if (Math.random() < 0.02) {
          this.char = this.getRandomChar();
        }
      }

      draw() {
        ctx.save();
        
        // Draw trail
        this.trail.forEach((point, index) => {
          const trailOpacity = (index / this.trail.length) * this.opacity;
          const trailSize = this.size * (index / this.trail.length);
          
          ctx.fillStyle = `rgba(0, 255, 255, ${trailOpacity * 0.3})`;
          ctx.fillRect(point.x - trailSize/2, point.y - trailSize/2, trailSize, trailSize);
        });

        // Main particle glow effect
        const pulseMultiplier = Math.sin(this.pulse) * 0.3 + 0.7;
        const glowSize = this.size * pulseMultiplier * 3;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, glowSize
        );
        gradient.addColorStop(0, `rgba(0, 255, 255, ${this.opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(0, 255, 255, ${this.opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          this.x - glowSize,
          this.y - glowSize,
          glowSize * 2,
          glowSize * 2
        );

        // Main particle
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity * pulseMultiplier})`;
        ctx.font = `${this.size * 8}px 'JetBrains Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Add shadow for more depth
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 5;
        ctx.fillText(this.char, 0, 0);
        
        ctx.restore();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new MatrixParticle());
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Add occasional digital distortion
      if (Math.random() < 0.01) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Add random digital noise
        for (let i = 0; i < data.length; i += 4) {
          if (Math.random() < 0.001) {
            data[i + 1] = Math.min(255, data[i + 1] + Math.random() * 50); // Green channel
            data[i + 2] = Math.min(255, data[i + 2] + Math.random() * 50); // Blue channel
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        mixBlendMode: 'screen',
        zIndex: 1
      }}
    />
  );
};

export default MatrixParticles;
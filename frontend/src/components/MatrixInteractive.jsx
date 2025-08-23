import React, { useEffect, useRef, useState } from 'react';

const MatrixInteractive = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [clickEffects, setClickEffects] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let explosions = [];
    let dataFlow = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Explosion effect class
    class MatrixExplosion {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.age = 0;
        this.maxAge = 60;
        
        // Create explosion particles
        for (let i = 0; i < 15; i++) {
          this.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            size: Math.random() * 4 + 2,
            opacity: 1,
            char: this.getRandomChar()
          });
        }
      }

      getRandomChar() {
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        return chars[Math.floor(Math.random() * chars.length)];
      }

      update() {
        this.age++;
        this.particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx *= 0.98;
          particle.vy *= 0.98;
          particle.opacity = 1 - (this.age / this.maxAge);
        });
      }

      draw(ctx) {
        this.particles.forEach(particle => {
          ctx.save();
          ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
          ctx.font = `${particle.size * 4}px 'JetBrains Mono', monospace`;
          ctx.shadowColor = '#00FFFF';
          ctx.shadowBlur = 8;
          ctx.fillText(particle.char, particle.x, particle.y);
          ctx.restore();
        });
      }

      isDead() {
        return this.age >= this.maxAge;
      }
    }

    // Data flow stream class
    class DataStream {
      constructor(startX, startY, targetX, targetY) {
        this.startX = startX;
        this.startY = startY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.progress = 0;
        this.speed = 0.02;
        this.width = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.particles = [];
        this.age = 0;
        this.maxAge = 120;
      }

      update() {
        this.progress += this.speed;
        this.age++;
        
        if (this.progress <= 1) {
          const currentX = this.startX + (this.targetX - this.startX) * this.progress;
          const currentY = this.startY + (this.targetY - this.startY) * this.progress;
          
          this.particles.push({
            x: currentX,
            y: currentY,
            age: 0,
            maxAge: 30
          });
        }

        // Update particles
        this.particles = this.particles.filter(particle => {
          particle.age++;
          return particle.age < particle.maxAge;
        });
      }

      draw(ctx) {
        if (this.particles.length > 1) {
          ctx.save();
          ctx.strokeStyle = `rgba(0, 255, 65, ${this.opacity})`;
          ctx.lineWidth = this.width;
          ctx.shadowColor = '#00FF41';
          ctx.shadowBlur = 5;
          
          ctx.beginPath();
          this.particles.forEach((particle, index) => {
            const particleOpacity = (1 - particle.age / particle.maxAge) * this.opacity;
            ctx.globalAlpha = particleOpacity;
            
            if (index === 0) {
              ctx.moveTo(particle.x, particle.y);
            } else {
              ctx.lineTo(particle.x, particle.y);
            }
          });
          ctx.stroke();
          ctx.restore();
        }
      }

      isDead() {
        return this.age >= this.maxAge && this.particles.length === 0;
      }
    }

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add to mouse trail
      setMouseTrail(prev => {
        const newTrail = [...prev, { x, y, time: Date.now() }];
        return newTrail.slice(-20); // Keep last 20 points
      });

      // Create data streams to mouse position
      if (Math.random() < 0.1) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        dataFlow.push(new DataStream(startX, startY, x, y));
      }
    };

    // Mouse click handler
    const handleMouseClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create explosion effect
      explosions.push(new MatrixExplosion(x, y));
      
      // Add click effect for React state
      const clickEffect = { 
        id: Date.now(), 
        x, 
        y, 
        time: Date.now() 
      };
      setClickEffects(prev => [...prev, clickEffect]);
      
      // Remove click effect after animation
      setTimeout(() => {
        setClickEffects(prev => prev.filter(effect => effect.id !== clickEffect.id));
      }, 1000);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleMouseClick);

    // Draw mouse trail
    const drawMouseTrail = () => {
      const now = Date.now();
      mouseTrail.forEach((point, index) => {
        const age = now - point.time;
        const opacity = Math.max(0, 1 - age / 2000); // Fade over 2 seconds
        
        if (opacity > 0) {
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, 20
          );
          gradient.addColorStop(0, `rgba(0, 255, 255, ${opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(point.x - 20, point.y - 20, 40, 40);
        }
      });
    };

    // Neural network visualization
    const drawNeuralNetwork = () => {
      if (Math.random() < 0.02) {
        const nodeCount = 8;
        const nodes = [];
        
        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
          nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            connections: []
          });
        }
        
        // Create connections
        nodes.forEach((node, index) => {
          const connectionCount = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < connectionCount; i++) {
            const targetIndex = Math.floor(Math.random() * nodeCount);
            if (targetIndex !== index) {
              node.connections.push(nodes[targetIndex]);
            }
          }
        });
        
        // Draw network
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.2)';
        ctx.lineWidth = 1;
        
        nodes.forEach(node => {
          node.connections.forEach(target => {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          });
        });
        
        // Draw nodes
        nodes.forEach(node => {
          ctx.fillStyle = 'rgba(0, 255, 65, 0.6)';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });
        
        ctx.restore();
      }
    };

    // Digital corruption effect
    const drawCorruption = () => {
      if (Math.random() < 0.005) {
        const corruptionCount = Math.floor(Math.random() * 5) + 1;
        
        for (let i = 0; i < corruptionCount; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const width = Math.random() * 100 + 20;
          const height = Math.random() * 20 + 5;
          
          // Create corruption pattern
          const imageData = ctx.createImageData(width, height);
          const data = imageData.data;
          
          for (let j = 0; j < data.length; j += 4) {
            if (Math.random() < 0.1) {
              data[j] = 0;     // Red
              data[j + 1] = Math.random() * 255; // Green
              data[j + 2] = 65;   // Blue
              data[j + 3] = Math.random() * 150; // Alpha
            }
          }
          
          ctx.putImageData(imageData, x, y);
        }
      }
    };

    // Main animation loop
    const animate = () => {
      // Semi-transparent overlay for trail effects
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw mouse trail
      drawMouseTrail();
      
      // Update and draw explosions
      explosions = explosions.filter(explosion => {
        explosion.update();
        explosion.draw(ctx);
        return !explosion.isDead();
      });
      
      // Update and draw data streams
      dataFlow = dataFlow.filter(stream => {
        stream.update();
        stream.draw(ctx);
        return !stream.isDead();
      });
      
      // Draw special effects
      drawNeuralNetwork();
      drawCorruption();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseTrail]);

  return (
    <div className={`absolute inset-0 pointer-events-auto ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        style={{ 
          mixBlendMode: 'screen',
          zIndex: 10
        }}
      />
      
      {/* Click effect rings */}
      {clickEffects.map(effect => (
        <div
          key={effect.id}
          className="absolute pointer-events-none"
          style={{
            left: effect.x - 25,
            top: effect.y - 25,
            width: 50,
            height: 50,
          }}
        >
          <div className="w-full h-full border-2 border-matrix-green rounded-full animate-ping opacity-75" />
          <div className="absolute inset-2 border border-matrix-green rounded-full animate-pulse opacity-50" />
        </div>
      ))}
    </div>
  );
};

export default MatrixInteractive;
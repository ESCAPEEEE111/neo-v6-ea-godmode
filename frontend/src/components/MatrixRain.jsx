import React, { useEffect, useRef, useState } from 'react';

const MatrixRain = ({ className = "", density = 50, interactive = true }) => {
  const canvasRef = useRef(null);
  const backgroundCanvasRef = useRef(null);
  const glitchCanvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const backgroundCanvas = backgroundCanvasRef.current;
    const glitchCanvas = glitchCanvasRef.current;
    
    if (!canvas || !backgroundCanvas || !glitchCanvas) return;

    const ctx = canvas.getContext('2d');
    const bgCtx = backgroundCanvas.getContext('2d');
    const glitchCtx = glitchCanvas.getContext('2d');
    
    let animationFrameId;
    let glitchAnimationId;

    // Set canvas sizes
    const resizeCanvas = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      canvas.width = width;
      canvas.height = height;
      backgroundCanvas.width = width;
      backgroundCanvas.height = height;
      glitchCanvas.width = width;
      glitchCanvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Extended character sets for more authentic Matrix look
    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const symbols = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";
    
    const matrixChars = (katakana + latin + nums + symbols).split("");

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Multiple layers of drops with different properties
    const createDrops = (speed, brightness, trail) => {
      const drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = {
          y: Math.random() * canvas.height,
          speed: speed + Math.random() * 2,
          brightness: brightness,
          trail: trail,
          char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
          age: 0,
          maxAge: 50 + Math.random() * 100
        };
      }
      return drops;
    };

    // Create multiple layers
    const foregroundDrops = createDrops(1, 1, 20);
    const midgroundDrops = createDrops(0.7, 0.7, 15);
    const backgroundDrops = createDrops(0.3, 0.4, 10);

    // Glitch effect variables
    let glitchIntensity = 0;
    let glitchCounter = 0;

    // Mouse interaction handler
    const handleMouseMove = (e) => {
      if (!interactive) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
      
      // Create disturbance effect around mouse
      const columnIndex = Math.floor(x / fontSize);
      const range = 5;
      
      for (let i = Math.max(0, columnIndex - range); i < Math.min(columns, columnIndex + range); i++) {
        const distance = Math.abs(i - columnIndex);
        const disturbance = 1 - (distance / range);
        
        foregroundDrops[i].speed = 1 + disturbance * 3;
        foregroundDrops[i].brightness = 0.8 + disturbance * 0.4;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Background grid pattern
    const drawGrid = () => {
      bgCtx.strokeStyle = 'rgba(0, 255, 255, 0.03)';
      bgCtx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += fontSize * 2) {
        bgCtx.beginPath();
        bgCtx.moveTo(x, 0);
        bgCtx.lineTo(x, canvas.height);
        bgCtx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += fontSize * 3) {
        bgCtx.beginPath();
        bgCtx.moveTo(0, y);
        bgCtx.lineTo(canvas.width, y);
        bgCtx.stroke();
      }
    };

    // Draw drops layer
    const drawLayer = (drops, context, fadeAmount, glowEffect = false) => {
      // Create fade effect
      context.fillStyle = `rgba(0, 0, 0, ${fadeAmount})`;
      context.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop, i) => {
        // Update drop
        drop.y += drop.speed;
        drop.age++;
        
        // Reset drop if it goes off screen or reaches max age
        if (drop.y > canvas.height + fontSize || drop.age > drop.maxAge) {
          drop.y = -fontSize;
          drop.age = 0;
          drop.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          drop.speed = drop.speed + (Math.random() - 0.5) * 0.5;
        }

        // Calculate opacity based on age and position
        const ageOpacity = 1 - (drop.age / drop.maxAge);
        const positionOpacity = Math.min(1, (canvas.height - drop.y) / canvas.height);
        const opacity = Math.min(ageOpacity, positionOpacity) * drop.brightness;

        // Draw glow effect if enabled
        if (glowEffect && opacity > 0.3) {
          context.shadowColor = '#00FFFF';
          context.shadowBlur = 8;
        } else {
          context.shadowBlur = 0;
        }

        // Set color with opacity
        const cyan = Math.floor(255 * opacity);
        context.fillStyle = `rgb(0, ${cyan}, 255)`;
        context.font = `${fontSize}px 'JetBrains Mono', monospace`;

        // Draw character
        context.fillText(drop.char, i * fontSize, drop.y);

        // Draw trail
        for (let j = 1; j < drop.trail && drop.y - j * fontSize > 0; j++) {
          const trailOpacity = opacity * (1 - j / drop.trail);
          const trailCyan = Math.floor(255 * trailOpacity);
          context.fillStyle = `rgb(0, ${trailCyan}, 255)`;
          
          const trailChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          context.fillText(trailChar, i * fontSize, drop.y - j * fontSize);
        }

        // Randomly change character
        if (Math.random() < 0.05) {
          drop.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        }
      });
    };

    // Glitch effect
    const drawGlitch = () => {
      glitchCounter++;
      
      // Random glitch triggers
      if (Math.random() < 0.002) {
        glitchIntensity = Math.random() * 50;
      }
      
      if (glitchIntensity > 0) {
        glitchCtx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Digital noise
        const imageData = glitchCtx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          if (Math.random() < glitchIntensity / 10000) {
            data[i] = 0;     // Red
            data[i + 1] = Math.random() * 255; // Green
            data[i + 2] = 65;   // Blue
            data[i + 3] = Math.random() * 100; // Alpha
          }
        }
        
        glitchCtx.putImageData(imageData, 0, 0);
        
        // Horizontal glitch lines
        for (let i = 0; i < glitchIntensity / 10; i++) {
          const y = Math.random() * canvas.height;
          const height = Math.random() * 5 + 1;
          const offset = (Math.random() - 0.5) * 20;
          
          glitchCtx.fillStyle = 'rgba(0, 255, 65, 0.3)';
          glitchCtx.fillRect(offset, y, canvas.width, height);
        }
        
        glitchIntensity *= 0.9;
      }
    };

    // Digital distortion effect
    const drawDistortion = () => {
      if (Math.random() < 0.001) {
        const strips = Math.floor(Math.random() * 5) + 1;
        
        for (let i = 0; i < strips; i++) {
          const y = Math.random() * canvas.height;
          const height = Math.random() * 20 + 5;
          const displacement = (Math.random() - 0.5) * 10;
          
          // Get image data
          const imageData = ctx.getImageData(0, y, canvas.width, height);
          
          // Apply displacement
          ctx.putImageData(imageData, displacement, y);
        }
      }
    };

    // Pulsing effect for special characters
    const drawPulsingChars = () => {
      const pulseTime = Date.now() * 0.003;
      const specialChars = ['0', '1', 'Z', 'N', 'E', 'O'];
      
      ctx.save();
      
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const char = specialChars[Math.floor(Math.random() * specialChars.length)];
        const pulse = Math.sin(pulseTime + i) * 0.5 + 0.5;
        
        ctx.fillStyle = `rgba(0, 255, 65, ${pulse * 0.8})`;
        ctx.font = `${fontSize + pulse * 8}px 'JetBrains Mono', monospace`;
        ctx.fillText(char, x, y);
      }
      
      ctx.restore();
    };

    // Main animation loop
    const animate = () => {
      // Clear main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background grid (static)
      bgCtx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      
      // Draw multiple layers with different properties
      drawLayer(backgroundDrops, ctx, 0.1, false);
      drawLayer(midgroundDrops, ctx, 0.05, false);
      drawLayer(foregroundDrops, ctx, 0.02, true);
      
      // Add special effects
      drawPulsingChars();
      drawDistortion();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // Glitch animation loop (separate for performance)
    const animateGlitch = () => {
      drawGlitch();
      glitchAnimationId = requestAnimationFrame(animateGlitch);
    };

    // Start animations
    animate();
    animateGlitch();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(glitchAnimationId);
    };
  }, [density, interactive]);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Background grid layer */}
      <canvas
        ref={backgroundCanvasRef}
        className="absolute inset-0 opacity-100"
        style={{ mixBlendMode: 'normal' }}
      />
      
      {/* Main matrix rain layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-80"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Glitch effect layer */}
      <canvas
        ref={glitchCanvasRef}
        className="absolute inset-0 opacity-60"
        style={{ mixBlendMode: 'overlay' }}
      />
      
      {/* Additional CSS animations for extra flair */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-10" />
      
      {/* Scanning line effect */}
      <div 
        className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-matrix-green to-transparent opacity-30 animate-pulse"
        style={{
          top: `${Math.sin(Date.now() * 0.001) * 50 + 50}%`,
          animation: 'matrix-scan 8s linear infinite'
        }}
      />
    </div>
  );
};

export default MatrixRain;
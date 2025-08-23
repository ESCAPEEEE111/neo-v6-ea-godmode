import React, { useEffect, useRef } from 'react';

const MatrixWaves = ({ className = "", intensity = 0.5 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Wave parameters
    const waves = [
      { 
        amplitude: 30 * intensity, 
        frequency: 0.02, 
        speed: 0.03, 
        offset: 0, 
        opacity: 0.3,
        strokeWidth: 2
      },
      { 
        amplitude: 20 * intensity, 
        frequency: 0.015, 
        speed: -0.02, 
        offset: Math.PI / 4, 
        opacity: 0.4,
        strokeWidth: 1.5
      },
      { 
        amplitude: 40 * intensity, 
        frequency: 0.025, 
        speed: 0.01, 
        offset: Math.PI / 2, 
        opacity: 0.2,
        strokeWidth: 3
      },
      { 
        amplitude: 15 * intensity, 
        frequency: 0.03, 
        speed: -0.04, 
        offset: Math.PI, 
        opacity: 0.5,
        strokeWidth: 1
      }
    ];

    // Digital grid lines
    const drawDigitalGrid = () => {
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      const gridSize = 50;
      const offsetX = (time * 10) % gridSize;
      const offsetY = (time * 5) % gridSize;
      
      // Vertical lines
      for (let x = -offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = -offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Draw flowing data streams
    const drawDataStreams = () => {
      const streamCount = 5;
      
      for (let i = 0; i < streamCount; i++) {
        ctx.save();
        
        const streamY = (canvas.height / streamCount) * i + (canvas.height / streamCount / 2);
        const streamOffset = time * (50 + i * 20);
        const opacity = 0.3 + Math.sin(time + i) * 0.2;
        
        // Create gradient for data stream
        const gradient = ctx.createLinearGradient(0, streamY - 10, 0, streamY + 10);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
        gradient.addColorStop(0.5, `rgba(0, 255, 255, ${opacity})`);
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        
        // Draw flowing line with digital distortion
        ctx.beginPath();
        for (let x = -100; x < canvas.width + 100; x += 5) {
          const digitalNoise = Math.random() < 0.1 ? Math.random() * 10 - 5 : 0;
          const y = streamY + 
                   Math.sin((x + streamOffset) * 0.01) * 20 +
                   Math.sin((x + streamOffset) * 0.005) * 10 +
                   digitalNoise;
          
          if (x === -100) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        
        // Add data packets
        for (let j = 0; j < 3; j++) {
          const packetX = ((streamOffset * 0.5 + j * 200) % (canvas.width + 200)) - 100;
          const packetY = streamY + Math.sin((packetX + streamOffset) * 0.01) * 20;
          
          // Packet glow
          const packetGradient = ctx.createRadialGradient(
            packetX, packetY, 0,
            packetX, packetY, 15
          );
          packetGradient.addColorStop(0, `rgba(0, 255, 255, ${opacity})`);
          packetGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
          
          ctx.fillStyle = packetGradient;
          ctx.fillRect(packetX - 15, packetY - 15, 30, 30);
          
          // Packet core
          ctx.fillStyle = `rgba(0, 255, 255, ${opacity + 0.3})`;
          ctx.fillRect(packetX - 3, packetY - 3, 6, 6);
        }
        
        ctx.restore();
      }
    };

    // Draw matrix-style sine waves
    const drawMatrixWaves = () => {
      waves.forEach((wave, index) => {
        ctx.save();
        
        // Set wave properties
        ctx.strokeStyle = `rgba(0, 255, 255, ${wave.opacity})`;
        ctx.lineWidth = wave.strokeWidth;
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 5;
        
        // Calculate wave positions
        const waveY = canvas.height * (0.2 + index * 0.2);
        
        ctx.beginPath();
        
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = waveY + 
                   Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude +
                   Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5 + wave.offset) * (wave.amplitude * 0.3) +
                   Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.7 + wave.offset) * (wave.amplitude * 0.5);
          
          // Add digital distortion occasionally
          const digitalY = Math.random() < 0.02 ? y + (Math.random() - 0.5) * 20 : y;
          
          if (x === 0) {
            ctx.moveTo(x, digitalY);
          } else {
            ctx.lineTo(x, digitalY);
          }
        }
        
        ctx.stroke();
        
        // Add wave particles
        for (let x = 0; x < canvas.width; x += 100) {
          const particleY = waveY + 
                          Math.sin(x * wave.frequency + time * wave.speed + wave.offset) * wave.amplitude;
          
          // Particle glow
          const particleGradient = ctx.createRadialGradient(
            x, particleY, 0,
            x, particleY, 10
          );
          particleGradient.addColorStop(0, `rgba(0, 255, 255, ${wave.opacity + 0.2})`);
          particleGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
          
          ctx.fillStyle = particleGradient;
          ctx.fillRect(x - 10, particleY - 10, 20, 20);
          
          // Particle core
          ctx.fillStyle = `rgba(0, 255, 255, ${wave.opacity + 0.4})`;
          ctx.fillRect(x - 2, particleY - 2, 4, 4);
        }
        
        ctx.restore();
      });
    };

    // Add digital interference lines
    const drawInterference = () => {
      if (Math.random() < 0.03) {
        const interferenceCount = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < interferenceCount; i++) {
          const y = Math.random() * canvas.height;
          const opacity = Math.random() * 0.3 + 0.1;
          
          ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
          ctx.lineWidth = Math.random() * 3 + 1;
          
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y + (Math.random() - 0.5) * 10);
          ctx.stroke();
        }
      }
    };

    // Main animation loop
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw all effects
      drawDigitalGrid();
      drawDataStreams();
      drawMatrixWaves();
      drawInterference();
      
      time += 0.1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ 
        mixBlendMode: 'screen',
        zIndex: 0
      }}
    />
  );
};

export default MatrixWaves;
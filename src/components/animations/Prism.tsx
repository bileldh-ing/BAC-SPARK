import React, { useEffect, useRef } from 'react';

interface PrismProps {
  animationType?: 'rotate' | 'pulse' | 'wave';
  timeScale?: number;
  height?: number;
  baseWidth?: number;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  noise?: number;
  glow?: number;
}

const Prism: React.FC<PrismProps> = ({
  animationType = 'rotate',
  timeScale = 0.5,
  height = 3.5,
  baseWidth = 5.5,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  noise = 0.5,
  glow = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const animate = () => {
      time += timeScale;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsl(${25 + hueShift}, 95%, 60%)`);
      gradient.addColorStop(0.5, `hsl(${35 + hueShift}, 90%, 50%)`);
      gradient.addColorStop(1, `hsl(${45 + hueShift}, 85%, 40%)`);
      
      ctx.fillStyle = gradient;
      
      // Draw animated geometric shapes
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let i = 0; i < 20; i++) {
        ctx.save();
        
        const angle = (time * 0.01 + i * 0.3) * colorFrequency;
        const radius = 100 + Math.sin(time * 0.02 + i) * 50;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.translate(x, y);
        
        if (animationType === 'rotate') {
          ctx.rotate(time * 0.02 + i);
        }
        
        const size = baseWidth + Math.sin(time * 0.03 + i) * noise * 20;
        
        ctx.beginPath();
        ctx.rect(-size/2, -size/2, size, size);
        ctx.fillStyle = `hsla(${25 + hueShift + i * 10}, 95%, 60%, ${0.1 + glow * 0.1})`;
        ctx.fill();
        
        ctx.restore();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationType, timeScale, height, baseWidth, scale, hueShift, colorFrequency, noise, glow]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
};

export default Prism;
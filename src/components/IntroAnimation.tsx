import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const controls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: Particle[] = [];
  const particleCount = 100;

  // 粒子类
  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;

    constructor(canvasWidth: number, canvasHeight: number) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      // 生成蓝色系随机颜色
      const hue = 210 + Math.random() * 30; // 蓝色到浅蓝色
      const saturation = 70 + Math.random() * 30; // 70-100%
      const lightness = 50 + Math.random() * 20; // 50-70%
      this.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    update(canvasWidth: number, canvasHeight: number) {
      this.x += this.speedX;
      this.y += this.speedY;

      // 边界检测
      if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
      if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 连接粒子的线
  const connectParticles = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 距离小于100px时画线
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(148, 163, 184, ${0.2 - distance/500})`; // 透明度随距离变化
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  };

  // 初始化和动画循环
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 动画循环
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 更新和绘制所有粒子
      for (const particle of particles) {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      }
      
      // 连接粒子
      connectParticles(ctx, canvas.width, canvas.height);
      
      requestAnimationFrame(animate);
    };

    animate();

    // 开始文字动画
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    });

    // 动画完成后调用回调
    const timer = setTimeout(() => {
      controls.start({
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: "easeIn"
        }
      }).then(() => {
        onComplete();
      });
    }, 3000); // 3秒后开始淡出

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [controls, onComplete]);

  // 文字字符数组
  const textChars = ['L', 'Y', 'J', 'Y'];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 z-50 flex items-center justify-center">
      {/* 粒子背景 */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
      
      {/* 动态文字 */}
      <motion.div 
        className="relative z-10 flex space-x-6"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        {textChars.map((char, index) => (
          <motion.span
            key={index}
            className="text-8xl md:text-[10rem] font-bold text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              textShadow: [
                `0 0 10px rgba(59, 130, 246, 0.7)`,
                `0 0 20px rgba(59, 130, 246, 0.5)`,
                `0 0 30px rgba(59, 130, 246, 0.3)`,
                `0 0 40px rgba(59, 130, 246, 0.1)`
              ]
            }}
            transition={{
              delay: index * 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            style={{
              backgroundImage: "linear-gradient(45deg, #3b82f6, #60a5fa, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
      
      {/* 加载指示器 */}
      <motion.div 
        className="absolute bottom-20 left-0 right-0 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="h-1 w-48 bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 2.5, ease: "linear" }}
          />
        </div>
        <motion.span 
          className="mt-4 text-blue-400 font-light tracking-wider text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          LOADING NAVIGATION SYSTEM
        </motion.span>
      </motion.div>
    </div>
  );
};

export default IntroAnimation;
import React from 'react';

const StarryBackground: React.FC = () => {
  // 生成随机星星
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 150; i++) {
      const size = Math.random() * 2 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const opacity = Math.random() * 0.8 + 0.2;
      
      stars.push(
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            opacity
          }}
        />
      );
    }
    return stars;
  };
  
  return (
    <div className="absolute inset-0 bg-slate-950 overflow-hidden">
      {/* 星星背景 */}
      {generateStars()}
    </div>
  );
};

export default StarryBackground;
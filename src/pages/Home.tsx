/// <reference types="node" />
import React, { useState, useEffect, useRef } from 'react';
import StarryBackground from '@/components/StarryBackground';
import StatisticsModal from '@/components/StatisticsModal';
import { generateRandomStatsData } from '@/lib/utils';

// 标题文字
const TITLE_TEXT = "lyjy导航页";

// 颜色集合
const COLORS = [
  '#3b82f6', // 蓝色
  '#8b5cf6', // 紫色
  '#ec4899', // 粉色
  '#f59e0b', // 橙色
  '#10b981', // 绿色
  '#06b6d4', // 青色
];

export default function Home() {
  // 创建每个字符的颜色状态数组
  const [charColors, setCharColors] = useState<string[]>(
    TITLE_TEXT.split('').map(() => '#ffffff') // 初始全部为白色
  );
  
  const titleRef = useRef<HTMLDivElement>(null);
  const animationInterval = useRef<number | null>(null);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [statsData] = useState(generateRandomStatsData());
  
  // 生成随机颜色
  const getRandomColor = () => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  };
  
  // 逐个字符变色动画
  const startColorAnimation = () => {
    let currentIndex = 0;
    
    // 清除之前的定时器
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
    }
    
    // 设置新的定时器
  animationInterval.current = setInterval(() => {
    // 创建新的颜色数组，只更新当前索引的颜色
    const newColors = [...charColors];
    newColors[currentIndex] = getRandomColor();
    setCharColors(newColors);
    
    // 移动到下一个字符，到达末尾则回到开始
    currentIndex = (currentIndex + 1) % TITLE_TEXT.length;
  }, 200); // 每个字符间隔200ms变色，无停顿循环
  };
  
  // 组件挂载时开始动画
  useEffect(() => {
    startColorAnimation();
    
    // 组件卸载时清除定时器
    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
      }
    };
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 星空背景 */}
      <StarryBackground />
      
      {/* 主内容 */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
        {/* 标题 - 逐个字变色效果 */}
        <div 
          ref={titleRef}
          className="mb-12 text-center"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold' }}
        >
           {TITLE_TEXT.split('').map((char, index) => (
             <span
               key={index}
               className="inline-block transition-colors duration-500"
               style={{ 
                 color: charColors[index], 
                 textShadow: `0 0 8px ${charColors[index]}80` 
               }}
             >
               {char}
             </span>
           ))}
        </div>
        
         <div className="mb-8 text-center text-lg">
           <span className="text-gray-300">欢迎来到lyjy导航页，</span>
           <span className="text-red-500 animate-pulse">请用鼠标中键点击"进入"按钮</span>
         </div>
        
        {/* 按钮容器 - 半透明背景 */}
        <div className="w-full max-w-md bg-black/30 backdrop-blur-md rounded-xl p-8 shadow-2xl">
          {/* 按钮组 */}
          <div className="space-y-4">
             <a 
  href="https://lyjymain.netlify.app" 
  target="_blank" 
  rel="noopener noreferrer"
  className="flex items-center justify-between w-full py-3 px-4 border border-gray-600 rounded-lg overflow-hidden group"
>
  <span className="text-white font-medium">lyjy主页</span>
  <span className="bg-blue-600 text-white text-sm px-3 py-1 transition-transform duration-300 group-hover:scale-105">
    进入
  </span>
</a>
            
            <a 
              href="https://lyjysearch.netlify.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full py-3 px-4 border border-gray-600 rounded-lg overflow-hidden group"
            >
              <span className="text-white font-medium">lyjy搜索页</span>
              <span className="bg-blue-600 text-white text-sm px-3 py-1 transition-transform duration-300 group-hover:scale-105">
                进入
              </span>
             </a>
             
               <a 
                 href="https://blog-lyjy.haisnap.com" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-between w-full py-3 px-4 border border-gray-600 rounded-lg overflow-hidden group"
               >
                 <span className="text-white font-medium">lyjy的blog</span>
                 <span className="bg-blue-600 text-white text-sm px-3 py-1 transition-transform duration-300 group-hover:scale-105">
                   进入
                 </span>
               </a>
              <a 
                href="https://toolbox-lyjy.haisnap.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full py-3 px-4 border border-gray-600 rounded-lg overflow-hidden group"
              >
                <span className="text-white font-medium">lyjy工具箱（beta）</span>
                <span className="bg-purple-600 text-white text-sm px-3 py-1 transition-transform duration-300 group-hover:scale-105">
                  进入
                </span>
              </a>
              
              <button 
              className="flex items-center justify-between w-full py-3 px-4 border border-gray-600 rounded-lg overflow-hidden bg-gray-800/50 cursor-not-allowed"
              disabled
            >
              <span className="text-gray-400 font-medium">敬请期待</span>
              <span className="bg-gray-500 text-white text-sm px-3 py-1">
                进入
              </span>
            </button>
          </div>
        </div>
        
         {/* 页脚 */}
         <div className="absolute bottom-6 text-center text-gray-400 text-sm">
           <p>© 2025 lyjy导航页 All Rights Reserved</p>
         </div>
         
         {/* Statistics Button - Fixed in bottom right corner */}
         <button
           onClick={() => setShowStatsModal(true)}
           className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
           aria-label="查看网站统计数据"
         >
           <i class="fa-solid fa-chart-line text-xl"></i>
         </button>
         
         {/* Statistics Modal */}
         <StatisticsModal
           isOpen={showStatsModal}
           onClose={() => setShowStatsModal(false)}
           data={statsData}
         />
      </div>
    </div>
  );
}
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import IntroAnimation from "@/components/IntroAnimation";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  // 处理动画完成后的回调
  const handleIntroComplete = () => {
    // 添加一个小延迟，确保过渡更平滑
    setTimeout(() => {
      setShowIntro(false);
      setIntroCompleted(true);
    }, 300);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      {/* 显示启动动画 */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      
      {/* 主页面内容 - 只有在介绍动画完成后才渲染 */}
      {introCompleted && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        </Routes>
      )}
    </AuthContext.Provider>
  );
}

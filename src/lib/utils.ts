import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export interface WebsiteStats {
  date: string;
  homepage: number;
  search: number;
  grandmaTraining: number;
  monopoly: number;
  toolbox: number;
  homeworkSystem: number;
  fruitGame: number;
}

/**
 * Generates random website statistics data for the past 30 days
 */
export function generateRandomStatsData(): WebsiteStats[] {
  const data: WebsiteStats[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Format date as MM-DD
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}`;
    
    // 检查是否为周末（周六或周日）
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 0是周日，6是周六
    
    // 随机决定是否为特殊高峰日（非周末也可能有高峰）
    const isSpecialDay = !isWeekend && Math.random() < 0.1; // 10%的工作日也会有高峰
    
    // 生成访问量 - 确保所有页面访问量总和不超过1000
    let homepageVisits, searchVisits, grandmaTrainingVisits, monopolyVisits, toolboxVisits, homeworkSystemVisits, fruitGameVisits;
    
    // 计算每日总访问量上限
    const dailyTotalCap = 1000;
    
    if (isWeekend || isSpecialDay) {
      // 周末或特殊日：较高的访问量，但确保总和不超过1000
      
      // 主页和搜索页作为主要入口，分配较大比例
      const mainTrafficPortion = 0.6; // 60%的流量分配给主页和搜索页
      const mainTraffic = Math.floor(dailyTotalCap * mainTrafficPortion * (0.8 + Math.random() * 0.2)); // 稍微随机波动
      
      homepageVisits = Math.floor(mainTraffic * 0.55); // 主页占主要流量的55%
      searchVisits = Math.floor(mainTraffic * 0.45); // 搜索页占主要流量的45%
      
      // 其他页面分配剩余的40%流量
      const remainingTraffic = dailyTotalCap - mainTraffic;
      
      // 按照一定比例分配剩余流量
      grandmaTrainingVisits = Math.floor(remainingTraffic * 0.25); // 老人训练题
      monopolyVisits = Math.floor(remainingTraffic * 0.20); // 大富翁计分器
      toolboxVisits = Math.floor(remainingTraffic * 0.25); // 工具箱
      homeworkSystemVisits = Math.floor(remainingTraffic * 0.20); // 作业系统
      fruitGameVisits = Math.floor(remainingTraffic * 0.10); // 水果游戏
    } else {
      // 普通工作日：较低的访问量，总和在300-800之间
      const dailyTotal = Math.floor(Math.random() * 501) + 300; // 300-800
      
      // 主页和搜索页作为主要入口，分配较大比例
      const mainTrafficPortion = 0.7; // 70%的流量分配给主页和搜索页
      const mainTraffic = Math.floor(dailyTotal * mainTrafficPortion);
      
      homepageVisits = Math.floor(mainTraffic * 0.6); // 主页占主要流量的60%
      searchVisits = Math.floor(mainTraffic * 0.4); // 搜索页占主要流量的40%
      
      // 其他页面分配剩余的30%流量
      const remainingTraffic = dailyTotal - mainTraffic;
      
      // 按照一定比例分配剩余流量
      grandmaTrainingVisits = Math.floor(remainingTraffic * 0.20); // 老人训练题
      monopolyVisits = Math.floor(remainingTraffic * 0.15); // 大富翁计分器
      toolboxVisits = Math.floor(remainingTraffic * 0.30); // 工具箱
      homeworkSystemVisits = Math.floor(remainingTraffic * 0.25); // 作业系统
      fruitGameVisits = Math.floor(remainingTraffic * 0.10); // 水果游戏
    }
    
    data.push({
      date: formattedDate,
      homepage: Math.max(10, homepageVisits), // 确保至少有10次访问
      search: Math.max(5, searchVisits), // 确保至少有5次访问
      grandmaTraining: Math.max(2, grandmaTrainingVisits), // 确保至少有2次访问
      monopoly: Math.max(2, monopolyVisits), // 确保至少有2次访问
      toolbox: Math.max(3, toolboxVisits), // 确保至少有3次访问
      homeworkSystem: Math.max(3, homeworkSystemVisits), // 确保至少有3次访问
      fruitGame: Math.max(2, fruitGameVisits) // 确保至少有2次访问
    });
  }
  
  return data;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
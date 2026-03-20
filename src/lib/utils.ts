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
 * Generates random website statistics data for the past 30 days with more realistic patterns
 * and交错波动效果 (interleaved fluctuation effect)
 */
export function generateRandomStatsData(): WebsiteStats[] {
  const data: WebsiteStats[] = [];
  const today = new Date();
  
  // 创建范围限制对象
  const ranges = {
    homepage: { min: 500, max: 800 },
    search: { min: 400, max: 700 },
    grandmaTraining: { min: 0, max: 300 },
    monopoly: { min: 0, max: 300 },
    toolbox: { min: 0, max: 300 },
    homeworkSystem: { min: 200, max: 400 },
    fruitGame: { min: 0, max: 300 }
  };
  
  // 生成基础随机值，但确保每个值都不相同
  let lastHomepage = 500 + Math.floor(Math.random() * 301); // 500-800
  let lastSearch = 400 + Math.floor(Math.random() * 301);  // 400-700
  let lastGrandmaTraining = Math.floor(Math.random() * 301); // 0-300
  let lastMonopoly = Math.floor(Math.random() * 301); // 0-300
  let lastToolbox = Math.floor(Math.random() * 301); // 0-300
  let lastHomeworkSystem = 200 + Math.floor(Math.random() * 201); // 200-400
  let lastFruitGame = Math.floor(Math.random() * 301); // 0-300
  
  // 生成30天的数据
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Format date as MM-DD
    const formattedDate = `${date.getMonth() + 1}-${date.getDate()}`;
    
    // 获取星期几 (0-6)
    const dayOfWeek = date.getDay();
    
    // 模拟周期性模式，例如每周的高峰期和低谷期
    const weeklyMultiplier = {
      homepage: [1.0, 1.05, 1.1, 1.08, 1.05, 1.2, 1.15], // 周末较高
      search: [0.95, 1.0, 1.05, 1.03, 1.0, 1.1, 1.05],
      grandmaTraining: [0.8, 0.9, 1.0, 0.95, 1.05, 1.2, 1.15],
      monopoly: [0.7, 0.8, 0.9, 1.0, 1.1, 1.4, 1.3],
      toolbox: [1.0, 1.05, 1.1, 1.05, 1.0, 0.9, 0.85],
      homeworkSystem: [1.1, 1.15, 1.2, 1.15, 1.1, 0.7, 0.6],
      fruitGame: [0.8, 0.9, 1.0, 1.1, 1.15, 1.3, 1.25]
    };
    
    // 为每个服务生成独立的随机波动，确保有升有跌
    // 增强随机性，确保不会出现连续相同的值
    const applyFluctuation = (current: number, service: keyof typeof ranges, baseChange: number = 0, prevValue: number | null = null) => {
      let newValue = current;
      let attempts = 0;
      
      // 尝试多次生成不同的值，确保变化明显
      while ((newValue === current || (prevValue !== null && newValue === prevValue)) && attempts < 10) {
        // 基础波动范围为-15%到+15%
        let change = (Math.random() - 0.5) * 0.3;
        
        // 30%的概率发生较大波动（暴涨或暴跌）
        if (Math.random() < 0.3) {
          change = (Math.random() - 0.5) * 0.6; // -30%到+30%的大波动
        }
        
        // 应用周期性乘数和额外的基础变化
        newValue = current * (1 + change) * weeklyMultiplier[service][dayOfWeek] * (1 + baseChange);
        
        // 确保数值在指定范围内
        newValue = Math.max(ranges[service].min, Math.min(ranges[service].max, Math.floor(newValue)));
        
        attempts++;
      }
      
      // 如果尝试多次后仍然相同，强制加1或减1（在范围内）
      if (newValue === current && attempts >= 10) {
        if (current < ranges[service].max) {
          newValue = current + 1;
        } else if (current > ranges[service].min) {
          newValue = current - 1;
        }
      }
      
      return newValue;
    };
    
    // 为不同服务应用不同的基础变化趋势，使它们有不同的涨跌模式
    const baseChanges = {
      homepage: (Math.random() - 0.5) * 0.12,
      search: (Math.random() - 0.5) * 0.12,
      grandmaTraining: (Math.random() - 0.5) * 0.18,
      monopoly: (Math.random() - 0.5) * 0.18,
      toolbox: (Math.random() - 0.5) * 0.15,
      homeworkSystem: (Math.random() - 0.5) * 0.15,
      fruitGame: (Math.random() - 0.5) * 0.17
    };
    
    // 保存上一个值用于比较，确保不连续重复
    const prevHomepage = lastHomepage;
    
    // 计算新的访问量数值，确保每个服务都有独立的涨跌
    lastHomepage = applyFluctuation(lastHomepage, 'homepage', baseChanges.homepage, i > 28 ? null : prevHomepage);
    lastSearch = applyFluctuation(lastSearch, 'search', baseChanges.search);
    lastGrandmaTraining = applyFluctuation(lastGrandmaTraining, 'grandmaTraining', baseChanges.grandmaTraining);
    lastMonopoly = applyFluctuation(lastMonopoly, 'monopoly', baseChanges.monopoly);
    lastToolbox = applyFluctuation(lastToolbox, 'toolbox', baseChanges.toolbox);
    lastHomeworkSystem = applyFluctuation(lastHomeworkSystem, 'homeworkSystem', baseChanges.homeworkSystem);
    lastFruitGame = applyFluctuation(lastFruitGame, 'fruitGame', baseChanges.fruitGame);
    
    // 确保在90%的情况下，主页访问量高于搜索页，更符合实际情况
    if (lastSearch > lastHomepage && Math.random() > 0.1) {
      // 交换两个值，确保主页访问量更高
      const temp = lastHomepage;
      lastHomepage = lastSearch;
      lastSearch = temp;
      
      // 进一步确保交换后的值仍在各自范围内
      if (lastHomepage > ranges.homepage.max) lastHomepage = ranges.homepage.max;
      if (lastSearch < ranges.search.min) lastSearch = ranges.search.min;
    }
    
    data.push({
      date: formattedDate,
      homepage: lastHomepage,
      search: lastSearch,
      grandmaTraining: lastGrandmaTraining,
      monopoly: lastMonopoly,
      toolbox: lastToolbox,
      homeworkSystem: lastHomeworkSystem,
      fruitGame: lastFruitGame
    });
  }
  
  return data;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
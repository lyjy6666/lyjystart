import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export interface WebsiteStats {
  date: string;
  homepage: number;
  search: number;
  grandmaTraining: number;
  monopoly: number;
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
     
     // 生成访问量 - 周末或特殊日有更高的访问量
     let homepageVisits, searchVisits, blogVisits, toolboxVisits;
     
      if (isWeekend || isSpecialDay) {
        // 周末或特殊日：更高的访问量范围
        if (isWeekend) {
          homepageVisits = Math.floor(Math.random() * 1501) + 1500; // 周末：1500-3000
          searchVisits = Math.floor(Math.random() * 1501) + 1500;   // 周末：1500-3000
          blogVisits = Math.floor(Math.random() * 501) + 300;       // 周末：300-800
          toolboxVisits = Math.floor(Math.random() * 501) + 300;    // 周末：300-800
        } else {
          homepageVisits = Math.floor(Math.random() * 1001) + 1000;  // 特殊工作日：1000-2000
          searchVisits = Math.floor(Math.random() * 1001) + 1000;   // 特殊工作日：1000-2000
          blogVisits = Math.floor(Math.random() * 301) + 200;       // 特殊工作日：200-500
          toolboxVisits = Math.floor(Math.random() * 301) + 200;    // 特殊工作日：200-500
        }
      }
       // 普通工作日：原始范围
       homepageVisits = Math.floor(Math.random() * 1801) + 200;  // 200-2000
       searchVisits = Math.floor(Math.random() * 1801) + 200;    // 200-2000
       blogVisits = Math.floor(Math.random() * 451) + 50;        // 50-500
       toolboxVisits = Math.floor(Math.random() * 451) + 50;     // 50-500
    
    data.push({
      date: formattedDate,
      homepage: homepageVisits,
      search: searchVisits,
      grandmaTraining: blogVisits, // 复用原blog的数据范围
      monopoly: toolboxVisits      // 复用原toolbox的数据范围
    });
  }
  
  return data;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
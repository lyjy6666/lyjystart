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
     
      // 生成访问量 - 周末或特殊日有更高的访问量
      let homepageVisits, searchVisits, grandmaTrainingVisits, monopolyVisits, toolboxVisits, homeworkSystemVisits;
      
       if (isWeekend || isSpecialDay) {
         // 周末或特殊日：更高的访问量范围
         if (isWeekend) {
           homepageVisits = Math.floor(Math.random() * 1501) + 1500; // 周末：1500-3000
           searchVisits = Math.floor(Math.random() * 1501) + 1500;   // 周末：1500-3000
           grandmaTrainingVisits = Math.floor(Math.random() * 501) + 300;       // 周末：300-800
           monopolyVisits = Math.floor(Math.random() * 501) + 300;    // 周末：300-800
           toolboxVisits = Math.floor(Math.random() * 401) + 250;    // 周末：250-650
           homeworkSystemVisits = Math.floor(Math.random() * 401) + 250;    // 周末：250-650
         } else {
           homepageVisits = Math.floor(Math.random() * 1001) + 1000;  // 特殊工作日：1000-2000
           searchVisits = Math.floor(Math.random() * 1001) + 1000;   // 特殊工作日：1000-2000
           grandmaTrainingVisits = Math.floor(Math.random() * 301) + 200;       // 特殊工作日：200-500
           monopolyVisits = Math.floor(Math.random() * 301) + 200;    // 特殊工作日：200-500
           toolboxVisits = Math.floor(Math.random() * 301) + 150;    // 特殊工作日：150-450
           homeworkSystemVisits = Math.floor(Math.random() * 301) + 150;    // 特殊工作日：150-450
         }
       } else {
        // 普通工作日：原始范围
        homepageVisits = Math.floor(Math.random() * 1801) + 200;  // 200-2000
        searchVisits = Math.floor(Math.random() * 1801) + 200;    // 200-2000
        grandmaTrainingVisits = Math.floor(Math.random() * 451) + 50;        // 50-500
        monopolyVisits = Math.floor(Math.random() * 451) + 50;     // 50-500
        toolboxVisits = Math.floor(Math.random() * 401) + 50;     // 50-450
        homeworkSystemVisits = Math.floor(Math.random() * 401) + 50;     // 50-450
       }
     
      data.push({
        date: formattedDate,
        homepage: homepageVisits,
        search: searchVisits,
        grandmaTraining: grandmaTrainingVisits,
        monopoly: monopolyVisits,
        toolbox: toolboxVisits,
        homeworkSystem: homeworkSystemVisits,
        fruitGame: isWeekend || isSpecialDay ? 
          Math.floor(Math.random() * 401) + 300 : // 周末或特殊日：300-700
          Math.floor(Math.random() * 301) + 50     // 普通工作日：50-350
      });
  }
  
  return data;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
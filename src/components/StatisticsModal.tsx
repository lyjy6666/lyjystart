import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface StatisticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    date: string;
    homepage: number;
    search: number;
    grandmaTraining: number;
    monopoly: number;
  }[];
}

export default function StatisticsModal({ isOpen, onClose, data }: StatisticsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">网站访问统计 (最近30天)</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Homepage Chart */}
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">LYJY主页访问量</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="homepage" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Search Page Chart */}
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <h3 className="text-lg font-semibold mb-4 text-purple-600 dark:text-purple-400">LYJY搜索页访问量</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="search" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
           {/* Grandma Training Chart */}
           <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
             <h3 className="text-lg font-semibold mb-4 text-green-600 dark:text-green-400">LYJY老人训练题访问量</h3>
             <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={data}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                   <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b7280" />
                   <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                   <Tooltip 
                     contentStyle={{ 
                       backgroundColor: 'white', 
                       border: '1px solid #e5e7eb',
                       borderRadius: '8px',
                       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                     }} 
                   />
                   <Line 
                     type="monotone" 
                     dataKey="grandmaTraining" 
                     stroke="#10b981" 
                     strokeWidth={2}
                     dot={{ r: 4 }}
                     activeDot={{ r: 6 }}
                   />
                 </LineChart>
               </ResponsiveContainer>
             </div>
           </div>
           
           {/* Monopoly Chart */}
           <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
             <h3 className="text-lg font-semibold mb-4 text-yellow-600 dark:text-yellow-400">LYJY大富翁计分器访问量</h3>
             <div className="h-80">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={data}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                   <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b7280" />
                   <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                   <Tooltip 
                     contentStyle={{ 
                       backgroundColor: 'white', 
                       border: '1px solid #e5e7eb',
                       borderRadius: '8px',
                       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                     }} 
                   />
                   <Line 
                     type="monotone" 
                     dataKey="monopoly" 
                     stroke="#f59e0b" 
                     strokeWidth={2}
                     dot={{ r: 4 }}
                     activeDot={{ r: 6 }}
                   />
                 </LineChart>
               </ResponsiveContainer>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
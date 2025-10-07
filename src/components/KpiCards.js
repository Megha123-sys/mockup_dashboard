import React from 'react';
import CountUp from 'react-countup';
import { useState, useEffect } from 'react';

const KpiCards = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const kpiData = [
    {
      title: 'Total Impressions',
      value: data.summary.totalImpressions,
      format: (value) => `${(value / 100000).toFixed(1)}L`,
      icon: '👁️',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-400 hover:to-blue-500'
    },
    {
      title: 'Total Clicks',
      value: data.summary.totalClicks,
      format: (value) => `${(value / 1000).toFixed(1)}K`,
      icon: '🖱️',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-400 hover:to-green-500'
    },
    {
      title: 'CTR',
      value: data.summary.overallCTR,
      format: (value) => `${value.toFixed(1)}%`,
      icon: '📊',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-400 hover:to-purple-500'
    },
    {
      title: 'Conversions',
      value: data.summary.totalConversions,
      format: (value) => `${(value / 1000).toFixed(1)}K`,
      icon: '🎯',
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-400 hover:to-orange-500'
    },
    {
      title: 'ROAS',
      value: data.summary.overallROAS,
      format: (value) => `${value.toFixed(1)}x`,
      icon: '💰',
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-400 hover:to-red-500'
    },
    {
      title: 'Total Spend',
      value: data.summary.totalSpend,
      format: (value) => `₹${(value / 100000).toFixed(1)}L`,
      icon: '💸',
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:from-indigo-400 hover:to-indigo-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {kpiData.map((kpi, index) => (
        <div
          key={kpi.title}
          className={`bg-gradient-to-r ${kpi.color} ${kpi.hoverColor} rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slide-up`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-2">{kpi.title}</p>
              <div className="text-3xl font-bold text-white">
                {isVisible && (
                  <CountUp
                    start={0}
                    end={kpi.value}
                    duration={2.5}
                    formattingFn={kpi.format}
                    useEasing={true}
                    separator=","
                  />
                )}
              </div>
            </div>
            <div className="text-4xl opacity-80">
              {kpi.icon}
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse-slow"></div>
            <span className="text-white/70 text-xs">Live Data</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KpiCards;

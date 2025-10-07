import React, { useState } from 'react';

const DashboardInsights = ({ insights, campaigns }) => {
  const [activeTab, setActiveTab] = useState('performance');

  const getPerformanceColor = (roas, benchmark) => {
    const ratio = roas / benchmark;
    if (ratio >= 1.5) return 'text-green-400';
    if (ratio >= 1.2) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getPerformanceIcon = (roas, benchmark) => {
    const ratio = roas / benchmark;
    if (ratio >= 1.5) return '🚀';
    if (ratio >= 1.2) return '📈';
    return '⚠️';
  };

  const calculateBenchmarkComparison = () => {
    return campaigns.map(campaign => {
      const { benchmark } = campaign;
      const roasRatio = campaign.roas / benchmark.benchmarkROAS;
      const cvrRatio = campaign.cvr / benchmark.benchmarkCVR;
      const ctrRatio = campaign.ctr / benchmark.benchmarkCTR;
      
      return {
        ...campaign,
        roasRatio,
        cvrRatio,
        ctrRatio,
        overallPerformance: (roasRatio + cvrRatio + ctrRatio) / 3
      };
    }).sort((a, b) => b.overallPerformance - a.overallPerformance);
  };

  const benchmarkComparisons = calculateBenchmarkComparison();

  const tabs = [
    { id: 'performance', label: 'Top Performers', icon: '🏆' },
    { id: 'optimization', label: 'Optimization Tips', icon: '⚡' },
    { id: 'benchmarks', label: 'Benchmark Analysis', icon: '📊' },
    { id: 'recommendations', label: 'Growth Strategy', icon: '🎯' }
  ];

  return (
    <div className="bg-dark-card rounded-xl p-6 shadow-lg border border-dark-border">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-dark-text mb-4">Strategic Insights & Analysis</h3>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-dark-bg text-dark-text-secondary hover:text-dark-text hover:bg-dark-border'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-dark-text mb-4">Top Performing Channels</h4>
            {insights.topPerformingChannels.map((channel, index) => (
              <div key={index} className="bg-dark-bg rounded-lg p-4 border border-dark-border hover:border-blue-500/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-dark-text">{channel.platform}</h5>
                  <span className="text-2xl font-bold text-green-400">{channel.roas.toFixed(1)}x ROAS</span>
                </div>
                <p className="text-dark-text-secondary text-sm">{channel.insight}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'optimization' && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-dark-text mb-4">Platform Optimization Recommendations</h4>
            {insights.optimizationTips.map((tip, index) => (
              <div key={index} className="bg-dark-bg rounded-lg p-4 border border-dark-border hover:border-yellow-500/50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 text-sm">⚡</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-dark-text mb-1">{tip.platform}</h5>
                    <p className="text-dark-text-secondary text-sm">{tip.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'benchmarks' && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-dark-text mb-4">Benchmark Performance Analysis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benchmarkComparisons.slice(0, 6).map((campaign, index) => (
                <div key={campaign.id} className="bg-dark-bg rounded-lg p-4 border border-dark-border hover:border-purple-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-dark-text text-sm">{campaign.platform}</h5>
                    <span className="text-lg">{getPerformanceIcon(campaign.roas, campaign.benchmark.benchmarkROAS)}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-dark-text-secondary text-xs">ROAS</span>
                      <span className={`text-sm font-medium ${getPerformanceColor(campaign.roas, campaign.benchmark.benchmarkROAS)}`}>
                        {campaign.roas.toFixed(1)}x vs {campaign.benchmark.benchmarkROAS.toFixed(1)}x
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-dark-text-secondary text-xs">CVR</span>
                      <span className={`text-sm font-medium ${getPerformanceColor(campaign.cvr, campaign.benchmark.benchmarkCVR)}`}>
                        {campaign.cvr.toFixed(1)}% vs {campaign.benchmark.benchmarkCVR.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-dark-text-secondary text-xs">CTR</span>
                      <span className={`text-sm font-medium ${getPerformanceColor(campaign.ctr, campaign.benchmark.benchmarkCTR)}`}>
                        {campaign.ctr.toFixed(1)}% vs {campaign.benchmark.benchmarkCTR.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-dark-border">
                    <div className="flex justify-between items-center">
                      <span className="text-dark-text-secondary text-xs">Overall Performance</span>
                      <span className={`text-sm font-bold ${getPerformanceColor(campaign.overallPerformance, 1)}`}>
                        {(campaign.overallPerformance * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-dark-text mb-4">Growth Strategy Recommendations</h4>
            <div className="space-y-4">
              {insights.growthRecommendations.map((recommendation, index) => (
                <div key={index} className="bg-dark-bg rounded-lg p-4 border border-dark-border hover:border-green-500/50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 text-sm">🎯</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-dark-text text-sm">{recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Additional Strategic Notes */}
            <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-blue-500/20">
              <h5 className="font-semibold text-dark-text mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Key Strategic Insights
              </h5>
              <div className="space-y-3 text-sm text-dark-text-secondary">
                <p>• <strong className="text-green-400">Automation channels</strong> show exceptional ROAS (20-25x) - prioritize budget allocation</p>
                <p>• <strong className="text-blue-400">Marketplace platforms</strong> (Swiggy, Blinkit) deliver consistent high conversion rates</p>
                <p>• <strong className="text-yellow-400">EdTech campaigns</strong> outperform industry benchmarks across all metrics</p>
                <p>• <strong className="text-purple-400">Cross-platform retargeting</strong> opportunities identified for scaling successful audiences</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardInsights;

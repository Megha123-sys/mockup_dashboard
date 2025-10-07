import React from 'react';
import KpiCards from './KpiCards';
import Charts from './Charts';
import CampaignTable from './CampaignTable';
import DashboardInsights from './DashboardInsights';

const Dashboard = ({ data }) => {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-card border-b border-dark-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-dark-text">
                Performance Marketing Dashboard
              </h1>
              <p className="text-dark-text-secondary text-sm mt-1">
                Megha Aggerwal • Real-time Campaign Analytics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-dark-text-secondary text-sm">Live Data</span>
              </div>
              <div className="text-right">
                <div className="text-dark-text-secondary text-xs">Last Updated</div>
                <div className="text-dark-text text-sm font-medium">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <section className="mb-12">
          <KpiCards data={data} />
        </section>

        {/* Charts Section */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-dark-text mb-2">Performance Analytics</h2>
            <p className="text-dark-text-secondary text-sm">
              Comprehensive analysis of channel performance, conversion trends, and campaign distribution
            </p>
          </div>
          <Charts data={data} />
        </section>

        {/* Campaign Table */}
        <section className="mb-12">
          <CampaignTable campaigns={data.campaigns} />
        </section>

        {/* Insights Section */}
        <section className="mb-12">
          <DashboardInsights insights={data.insights} campaigns={data.campaigns} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark-card border-t border-dark-border mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="text-dark-text-secondary text-sm">
              © 2024 Performance Marketing Dashboard • Built with React & Chart.js
            </div>
            <div className="flex items-center space-x-6 text-sm text-dark-text-secondary">
              <span>📊 Analytics</span>
              <span>🎯 Optimization</span>
              <span>📈 Growth</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

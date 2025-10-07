import React, { useState, useMemo } from 'react';

const CampaignTable = ({ campaigns }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlatform, setFilterPlatform] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const platforms = [...new Set(campaigns.map(campaign => campaign.platform))];
  const statuses = [...new Set(campaigns.map(campaign => campaign.status))];

  const filteredAndSortedCampaigns = useMemo(() => {
    let filtered = campaigns.filter(campaign => {
      const matchesSearch = campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.platform.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || campaign.status === filterStatus;
      const matchesPlatform = filterPlatform === 'All' || campaign.platform === filterPlatform;
      
      return matchesSearch && matchesStatus && matchesPlatform;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [campaigns, sortConfig, filterStatus, filterPlatform, searchTerm]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'Active': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Scaling': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Paused': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
        {status}
      </span>
    );
  };

  const getBenchmarkIndicator = (campaign) => {
    const { benchmark } = campaign;
    const isAboveBenchmark = campaign.roas > benchmark.benchmarkROAS;
    
    return (
      <div className="flex items-center space-x-2">
        <span className={`text-xs ${isAboveBenchmark ? 'text-green-400' : 'text-red-400'}`}>
          {isAboveBenchmark ? '↗' : '↘'}
        </span>
        <span className={`text-xs ${isAboveBenchmark ? 'text-green-400' : 'text-red-400'}`}>
          {benchmark.benchmarkROAS.toFixed(1)}x
        </span>
      </div>
    );
  };

  const formatCurrency = (value) => `₹${(value / 1000).toFixed(0)}K`;
  const formatCPC = (value) => `₹${value.toFixed(1)}`;
  const formatNumber = (value) => value.toLocaleString();
  const formatPercentage = (value) => `${value.toFixed(1)}%`;

  return (
    <div className="bg-dark-card rounded-xl p-6 shadow-lg border border-dark-border">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-dark-text mb-4">Campaign Performance Table</h3>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Platforms</option>
            {platforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              <th 
                className="text-left py-3 px-4 text-dark-text-secondary font-medium cursor-pointer hover:text-dark-text transition-colors"
                onClick={() => handleSort('platform')}
              >
                Platform {sortConfig.key === 'platform' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="text-left py-3 px-4 text-dark-text-secondary font-medium cursor-pointer hover:text-dark-text transition-colors"
                onClick={() => handleSort('campaignName')}
              >
                Campaign Name {sortConfig.key === 'campaignName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="text-right py-3 px-4 text-dark-text-secondary font-medium cursor-pointer hover:text-dark-text transition-colors"
                onClick={() => handleSort('ctr')}
              >
                CTR {sortConfig.key === 'ctr' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="text-right py-3 px-4 text-dark-text-secondary font-medium cursor-pointer hover:text-dark-text transition-colors"
                onClick={() => handleSort('cpc')}
              >
                CPC {sortConfig.key === 'cpc' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="text-right py-3 px-4 text-dark-text-secondary font-medium cursor-pointer hover:text-dark-text transition-colors"
                onClick={() => handleSort('roas')}
              >
                ROAS {sortConfig.key === 'roas' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="text-right py-3 px-4 text-dark-text-secondary font-medium cursor-pointer hover:text-dark-text transition-colors"
                onClick={() => handleSort('conversions')}
              >
                Conversions {sortConfig.key === 'conversions' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="text-right py-3 px-4 text-dark-text-secondary font-medium cursor-pointer hover:text-dark-text transition-colors"
                onClick={() => handleSort('amountSpent')}
              >
                Spend {sortConfig.key === 'amountSpent' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="text-center py-3 px-4 text-dark-text-secondary font-medium">Status</th>
              <th className="text-center py-3 px-4 text-dark-text-secondary font-medium">Benchmark</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCampaigns.map((campaign) => (
              <tr 
                key={campaign.id} 
                className="border-b border-dark-border hover:bg-dark-bg/50 transition-colors"
              >
                <td className="py-4 px-4 text-dark-text font-medium">{campaign.platform}</td>
                <td className="py-4 px-4 text-dark-text">{campaign.campaignName}</td>
                <td className="py-4 px-4 text-right text-dark-text">{formatPercentage(campaign.ctr)}</td>
                <td className="py-4 px-4 text-right text-dark-text">{formatCPC(campaign.cpc)}</td>
                <td className="py-4 px-4 text-right text-dark-text font-medium">{campaign.roas.toFixed(1)}x</td>
                <td className="py-4 px-4 text-right text-dark-text">{formatNumber(campaign.conversions)}</td>
                <td className="py-4 px-4 text-right text-dark-text">{formatCurrency(campaign.amountSpent)}</td>
                <td className="py-4 px-4 text-center">{getStatusBadge(campaign.status)}</td>
                <td className="py-4 px-4 text-center">{getBenchmarkIndicator(campaign)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-dark-border">
        <div className="flex justify-between items-center text-sm text-dark-text-secondary">
          <span>Showing {filteredAndSortedCampaigns.length} of {campaigns.length} campaigns</span>
          <span>Total Spend: {formatCurrency(campaigns.reduce((sum, c) => sum + c.amountSpent, 0))}</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignTable;

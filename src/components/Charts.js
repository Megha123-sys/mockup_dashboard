import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ data }) => {
  // Bar Chart Data - Spend vs ROAS by Platform
  const barChartData = {
    labels: data.channelPerformance.map(item => item.platform),
    datasets: [
      {
        label: 'Spend (₹)',
        data: data.channelPerformance.map(item => item.spend),
        backgroundColor: 'rgba(66, 133, 244, 0.8)',
        borderColor: 'rgba(66, 133, 244, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'ROAS (x)',
        data: data.channelPerformance.map(item => item.roas * 10000), // Scale for visibility
        backgroundColor: 'rgba(52, 168, 83, 0.8)',
        borderColor: 'rgba(52, 168, 83, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        yAxisID: 'y1',
      }
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#F1F5F9',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Channel Performance: Spend vs ROAS',
        color: '#F1F5F9',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#F1F5F9',
        bodyColor: '#F1F5F9',
        borderColor: '#334155',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            if (context.datasetIndex === 0) {
              return `Spend: ₹${(context.parsed.y / 1000).toFixed(0)}K`;
            } else {
              return `ROAS: ${(context.parsed.y / 10000).toFixed(1)}x`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#94A3B8',
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          color: '#334155'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: '#94A3B8',
          callback: function(value) {
            return `₹${(value / 1000).toFixed(0)}K`;
          }
        },
        grid: {
          color: '#334155'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: '#94A3B8',
          callback: function(value) {
            return `${(value / 10000).toFixed(1)}x`;
          }
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  // Line Chart Data - Conversion Trends
  const lineChartData = {
    labels: data.conversionTrends.map(item => item.month),
    datasets: [
      {
        label: 'Conversions',
        data: data.conversionTrends.map(item => item.conversions),
        borderColor: 'rgba(251, 188, 4, 1)',
        backgroundColor: 'rgba(251, 188, 4, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(251, 188, 4, 1)',
        pointBorderColor: '#F1F5F9',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Revenue (₹L)',
        data: data.conversionTrends.map(item => item.revenue / 100000),
        borderColor: 'rgba(234, 67, 53, 1)',
        backgroundColor: 'rgba(234, 67, 53, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(234, 67, 53, 1)',
        pointBorderColor: '#F1F5F9',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        yAxisID: 'y1',
      }
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#F1F5F9',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Conversion Trends Over Time',
        color: '#F1F5F9',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#F1F5F9',
        bodyColor: '#F1F5F9',
        borderColor: '#334155',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            if (context.datasetIndex === 0) {
              return `Conversions: ${context.parsed.y}`;
            } else {
              return `Revenue: ₹${context.parsed.y}L`;
            }
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#94A3B8'
        },
        grid: {
          color: '#334155'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: '#94A3B8'
        },
        grid: {
          color: '#334155'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: '#94A3B8',
          callback: function(value) {
            return `₹${value}L`;
          }
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  // Pie Chart Data - Campaign Type Contribution
  const pieChartData = {
    labels: data.campaignTypeContribution.map(item => item.type),
    datasets: [
      {
        data: data.campaignTypeContribution.map(item => item.spend),
        backgroundColor: [
          'rgba(66, 133, 244, 0.8)',
          'rgba(52, 168, 83, 0.8)',
          'rgba(251, 188, 4, 0.8)',
          'rgba(234, 67, 53, 0.8)',
          'rgba(156, 39, 176, 0.8)',
        ],
        borderColor: [
          'rgba(66, 133, 244, 1)',
          'rgba(52, 168, 83, 1)',
          'rgba(251, 188, 4, 1)',
          'rgba(234, 67, 53, 1)',
          'rgba(156, 39, 176, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 10,
      }
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#F1F5F9',
          font: {
            size: 12
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'Campaign Type Spend Distribution',
        color: '#F1F5F9',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        titleColor: '#F1F5F9',
        bodyColor: '#F1F5F9',
        borderColor: '#334155',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ₹${(context.parsed / 1000).toFixed(0)}K (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="space-y-8">
      {/* Bar Chart */}
      <div className="bg-dark-card rounded-xl p-6 shadow-lg border border-dark-border">
        <div className="h-96">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-dark-card rounded-xl p-6 shadow-lg border border-dark-border">
        <div className="h-96">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-dark-card rounded-xl p-6 shadow-lg border border-dark-border">
        <div className="h-96">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts;

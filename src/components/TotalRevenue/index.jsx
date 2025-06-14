import React from 'react';
import Icon from '../../components/Icon';
import '../../components/TotalRevenue/styles.css';

const TotalRevenue = () => {
  const salesToday = 12400;
  const revenuePercentage = 65; 
  const circumference = 2 * Math.PI * 70; // For r=70, circumference is 439.82
  const strokeDashoffset = circumference - (revenuePercentage / 100) * circumference;

  return (
    <div className="total-revenue-card">
      <div className="card-header">
        <h2>Total Revenue</h2>
        <Icon name="dropdown" className="icon" />
      </div>
      <div className="chart-container">
        <svg width="160" height="160" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            className="donut-background"
            cx="80"
            cy="80"
            r="70"
            strokeWidth="10"
          />
          {/* Progress circle */}
          <circle
            className="donut-progress"
            cx="80"
            cy="80"
            r="70"
            strokeWidth="10"
            strokeDasharray={circumference}
            style={{ '--initial-dashoffset': strokeDashoffset }}
          />
          {/* Text inside the donut chart */}
          <text x="80" y="70" textAnchor="middle" className="revenue-text">
            Revenue
          </text>
          <text x="80" y="95" textAnchor="middle" className="percentage-text">
            {revenuePercentage}%
          </text>
        </svg>
      </div>

      <div className="sales-today">
        <h3>Sales Today</h3>
        <p className="sales-amount">₹{salesToday.toLocaleString()}</p>
        
      </div>

      <div className="comparison-metrics">
        <div className="metric-item">
          <span className="metric-label">Target</span>
          <span className="metric-value down">
            <Icon name="arrow-down" /> ₹17.8k
          </span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Last week</span>
          <span className="metric-value up">
            <Icon name="arrow-up" /> ₹11.4k
          </span>
        </div>
        <div className="metric-item">
          <span className="metric-label">Last Month</span>
          <span className="metric-value down">
            <Icon name="arrow-down" /> ₹20.0k
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue; 
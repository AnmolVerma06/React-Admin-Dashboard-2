import React, { useState } from 'react';
import Icon from '../Icon'; // Path relative to src/components/SalesAnalytics
import './styles.css';

const SalesAnalytics = () => {
  const [hoveredData, setHoveredData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState('monthly'); // Changed default to monthly

  const allSalesData = [
    { date: "Jun '25", revenue: 440, sales: 23 },
    { date: '02 Jun', revenue: 520, sales: 42 },
    { date: '03 Jun', revenue: 410, sales: 35 },
    { date: '04 Jun', revenue: 670, sales: 27 },
    { date: '05 Jun', revenue: 230, sales: 43 },
    { date: '06 Jun', revenue: 410, sales: 22 },
    { date: '07 Jun', revenue: 200, sales: 17 },
    { date: '08 Jun', revenue: 350, sales: 31 },
    { date: '09 Jun', revenue: 750, sales: 22 },
    { date: '10 Jun', revenue: 320, sales: 22 },
    { date: '11 Jun', revenue: 260, sales: 12 },
    { date: '12 Jun', revenue: 120, sales: 16 },
  ];

  const salesData = activeFilter === 'weekly' 
    ? allSalesData.slice(0, 7) // Data until 07 Jun
    : allSalesData; // Data until 12 Jun for monthly (or full data if needed)

  // Chart dimensions
  const width = 750;
  const height = 300;
  const padding = 50;

  // Scales
  const maxRevenue = Math.max(...salesData.map(d => d.revenue));
  const maxSales = Math.max(...salesData.map(d => d.sales));

  const xScale = (index) => padding + (index / (salesData.length - 1)) * (width - 2 * padding);
  const revenueYScale = (value) => height - padding - (value / maxRevenue) * (height - 2 * padding);
  const salesYScale = (value) => height - padding - (value / maxSales) * (height - 2 * padding);

  // Line path generator for sales
  const salesLinePath = salesData.map((d, i) => {
    const x = xScale(i);
    const y = salesYScale(d.sales);
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');

  const handleMouseEnter = (event, data, index) => {
    setHoveredData({ data, index });
    const chartX = xScale(index);
    const chartY = revenueYScale(data.revenue);

    setTooltipPos({
      x: chartX + 15,
      y: chartY - 70,
    });
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  return (
    <div className="sales-chart">
      <div className="sales-chart-header">
        <h2>Sales Analytics</h2>
        <div className="chart-controls">
          <button 
            className={`chart-button ${activeFilter === 'weekly' ? 'active' : ''}`}
            onClick={() => setActiveFilter('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`chart-button ${activeFilter === 'monthly' ? 'active' : ''}`}
            onClick={() => setActiveFilter('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="chart-placeholder">
        <svg 
          className="chart"
          viewBox={`0 0 ${width} ${height}`}
          onMouseLeave={handleMouseLeave}
        >
          {/* X-axis */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e2e8f0" />
          {/* Y-axis (Revenue) */}
          <line x1={padding} y1={height - padding} x2={padding} y2={padding} stroke="#e2e8f0" />
          {/* Y-axis (Sales) */}
          <line x1={width - padding} y1={height - padding} x2={width - padding} y2={padding} stroke="#e2e8f0" />

          {/* Y-axis labels (Revenue) */}
          {[0, 200, 400, 600, 800].map((value, i) => (
            <text key={i} x={padding - 10} y={revenueYScale(value) + 5} textAnchor="end" fill="#64748b" fontSize="12">{value}</text>
          ))}
          <text x={padding - 30} y={height / 2} textAnchor="middle" transform={`rotate(-90 ${padding - 30} ${height / 2})`} fill="#64748b" fontSize="12">Net Revenue</text>

          {/* Y-axis labels (Sales) */}
          {[10, 20, 30, 40, 50].map((value, i) => (
            <text key={i} x={width - padding + 10} y={salesYScale(value) + 5} textAnchor="start" fill="#64748b" fontSize="12">{value}</text>
          ))}
          <text x={width - padding + 30} y={height / 2} textAnchor="middle" transform={`rotate(90 ${width - padding + 30} ${height / 2})`} fill="#64748b" fontSize="12">Number of Sales</text>

          {/* X-axis labels */}
          {salesData.map((d, i) => (
            <text key={i} x={xScale(i)} y={height - padding + 20} textAnchor="middle" fill="#64748b" fontSize="12">{d.date}</text>
          ))}

          {/* Revenue Bars */}
          {salesData.map((d, i) => {
            const x = xScale(i);
            const barWidth = 20;
            const barHeight = height - padding - revenueYScale(d.revenue);
            const isHovered = hoveredData && hoveredData.index === i;
            return (
              <React.Fragment key={i}>
                <rect
                  x={x - barWidth / 2}
                  y={revenueYScale(d.revenue)}
                  width={barWidth}
                  height={barHeight}
                  fill="#4ade80"
                  className={`bar-animate ${isHovered ? 'highlighted' : ''}`}
                  onMouseEnter={(event) => handleMouseEnter(event, d, i)}
                />
                <text
                  x={x}
                  y={revenueYScale(d.revenue) - 5}
                  textAnchor="middle"
                  fill="#1e293b"
                  fontSize="12"
                  className="revenue-label"
                >
                  {d.revenue}
                </text>
              </React.Fragment>
            );
          })}

          {/* Sales Line */}
          <path
            d={salesLinePath}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            className="line-animate"
          />

          {/* Sales Points and Labels */}
          {salesData.map((d, i) => {
            const x = xScale(i);
            const y = salesYScale(d.sales);
            const isHovered = hoveredData && hoveredData.index === i;
            return (
              <React.Fragment key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#6366f1"
                  className={`point-animate sales-point ${isHovered ? 'highlighted' : ''}`}
                  onMouseEnter={(event) => handleMouseEnter(event, d, i)}
                />
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  fill="#6366f1"
                  fontSize="12"
                  className="sales-label"
                >
                  {d.sales}
                </text>
              </React.Fragment>
            );
          })}

          {/* Tooltip (Popup) */}
          {hoveredData && (
            <g>
              <line
                x1={xScale(hoveredData.index)}
                y1={height - padding}
                x2={xScale(hoveredData.index)}
                y2={padding}
                stroke="#cbd5e1"
                strokeDasharray="4 4"
                className="hover-line"
              />
              <foreignObject
                x={tooltipPos.x}
                y={tooltipPos.y}
                width="120"
                height="90"
                className="tooltip-container"
              >
                <div xmlns="http://www.w3.org/1999/xhtml" className="chart-tooltip">
                  <div className="tooltip-date">{hoveredData.data.date}</div>
                  <div className="tooltip-item">
                    <span className="dot revenue"></span>
                    Revenue: {hoveredData.data.revenue}
                  </div>
                  <div className="tooltip-item">
                    <span className="dot sales"></span>
                    Sales: {hoveredData.data.sales}
                  </div>
                </div>
              </foreignObject>
            </g>
          )}
        </svg>
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color revenue"></span>
          <span>Revenue</span>
        </div>
        <div className="legend-item">
          <span className="legend-color sales"></span>
          <span>Sales</span>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics; 
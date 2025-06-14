import React from 'react';
import Icon from '../../components/Icon';
import SalesAnalytics from '../../components/SalesAnalytics';
import TotalRevenue from '../../components/TotalRevenue';
import TopUsersBalances from '../../components/TopUsersBalances';
import RevenueHistory from '../../components/RevenueHistory';
import './styles.css';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Total Sales',
      value: '₹54,239',
      change: '+14.5%',
      trend: 'up',
      icon: 'sales'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: 'orders'
    },
    {
      title: 'Total Customers',
      value: '8,456',
      change: '+12.3%',
      trend: 'up',
      icon: 'customers'
    },
    {
      title: 'Average Order Value',
      value: '₹844.00',
      change: '-2.4%',
      trend: 'down',
      icon: 'average'
    }
  ];

  const recentOrders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      product: 'Premium Widget',
      amount: '$299.99',
      status: 'delivered'
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      product: 'Basic Widget',
      amount: '$199.99',
      status: 'processing'
    },
    {
      id: '#ORD-003',
      customer: 'Bob Johnson',
      product: 'Deluxe Widget',
      amount: '$399.99',
      status: 'shipped'
    }
  ];

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-icon">
              <Icon name={metric.icon} />
            </div>
            <div className="metric-info">
              <h3>{metric.title}</h3>
              <div className="metric-value">{metric.value}</div>
              <div className={`metric-change ${metric.trend}`}>
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <TotalRevenue />
        <SalesAnalytics />
      </div>

      <div className="bottom-section">
        <TopUsersBalances />
        <RevenueHistory />
      </div>

      {/* Remove Recent Orders section */}
      {/*
      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <div className="orders-list">
          {recentOrders.map((order, index) => (
            <div key={index} className="order-item">
              <div className="order-info">
                <span className="order-id">{order.id}</span>
                <span className="order-customer">{order.customer}</span>
                <span className="order-product">{order.product}</span>
                <span className="order-amount">{order.amount}</span>
              </div>
              <span className={`order-status ${order.status}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
      */}
    </div>
  );
};

export default Dashboard; 
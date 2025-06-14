import React from 'react';
import './styles.css';

const RevenueHistory = () => {
  const revenueData = [
    {
      id: 1,
      marketplace: 'Amazon',
      date: 'April 2025',
      payouts: '3848.68',
      status: 'Upcoming',
    },
    {
      id: 2,
      marketplace: 'Flipkart',
      date: 'April 2025',
      payouts: '1247.25',
      status: 'Received',
    },
    {
      id: 3,
      marketplace: 'Meesho',
      date: 'May 2025',
      payouts: '815.89',
      status: 'Received',
    },
    {
      id: 4,
      marketplace: 'Myntra',
      date: 'April 2025',
      payouts: '1248.75',
      status: 'Not Received',
    },
    {
      id: 5,
      marketplace: 'Amazon',
      date: 'May 2025',
      payouts: '2978.21',
      status: 'Upcoming',
    },
    {
      id: 6,
      marketplace: 'Flipkart',
      date: 'May 2025',
      payouts: '1358.10',
      status: 'Received',
    },
  ];

  return (
    <div className="revenue-history-card">
      <div className="card-header">
        <h2>Revenue History</h2>
        <div className="menu-icon">...</div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Marketplaces</th>
              <th>Date</th>
              <th>Payouts</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((data) => (
              <tr key={data.id}>
                <td>{data.marketplace}</td>
                <td>{data.date}</td>
                <td>₹{data.payouts}</td>
                <td>
                  <span className={`status-badge ${data.status.toLowerCase().replace(' ', '-')}`}>
                    {data.status}
                  </span>
                </td>
                <td>
                  <button className="action-button">✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueHistory; 
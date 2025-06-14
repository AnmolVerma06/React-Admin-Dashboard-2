import React from 'react';
import './styles.css';

const NotificationMenu = () => {
  const notifications = [
    {
      id: 1,
      message: 'New order received: #ORD-001',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      message: `Product 'Premium Widget' is low on stock.`,
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      message: 'Your weekly sales report is ready.',
      time: 'Yesterday',
      read: true,
    },
    {
      id: 4,
      message: 'Customer support ticket #234 opened.',
      time: '2 days ago',
      read: true,
    },
  ];

  return (
    <div className="notification-menu">
      <div className="notification-header">
        <h3>Notifications</h3>
        <span>({notifications.filter(n => !n.read).length} new)</span>
      </div>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <p className="no-notifications">No new notifications.</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className={`notification-item ${notification.read ? 'read' : ''}`}>
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          ))
        )}
      </div>
      <div className="notification-footer">
        <button>View All Notifications</button>
      </div>
    </div>
  );
};

export default NotificationMenu; 
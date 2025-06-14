import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import { ThemeContext } from '../../contexts/ThemeContext';
import lightLogo from '../../assets/logo-2.png?url';
import darkLogo from '../../assets/logo-2-dark.png?url';
import './styles.css';

const Sidebar = () => {
  const { themeMode } = useContext(ThemeContext);

  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/' },
    { name: 'Orders', icon: 'orders', path: '/orders' },
    { name: 'Customers', icon: 'customers', path: '/customers' },
    { name: 'Calendar', icon: 'calendar', path: '/calendar' },
    { name: 'Kanban', icon: 'kanban', path: '/kanban' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img 
          src={themeMode === 'light' ? lightLogo : darkLogo}
          alt="E-Commerce Logo"
          className="sidebar-logo"
        />
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <Icon name={item.icon} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 
import React, { useState, useContext } from 'react';
import Icon from '../Icon';
import NotificationMenu from '../NotificationMenu';
import user12 from '../../assets/users/user-12.jpg?url';
import { ThemeContext } from '../../contexts/ThemeContext';
import './styles.css';

const Header = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { themeMode, toggleThemeMode, primaryColor, changePrimaryColor, themeColors } = useContext(ThemeContext);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowSettingsMenu(false);
    setShowUserMenu(false);
  };

  const handleSettingsClick = () => {
    setShowSettingsMenu(!showSettingsMenu);
    setShowNotifications(false);
    setShowUserMenu(false);
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
    setShowSettingsMenu(false);
  };

  return (
    <header className="header">
      <div className="header-left">
       
      </div>
      <div className="header-right">
        <div className="search-bar">
          <Icon name="search" className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="header-actions">
          <div className="notification-container">
            <button className="icon-button notification-button" onClick={handleNotificationClick}>
              <Icon name="bell" />
              <span className="notification-badge">9</span>
            </button>
            {showNotifications && <NotificationMenu />}
          </div>
          <div className="user-profile" onClick={handleUserMenuClick}>
            <img src={user12} alt="User Avatar" className="user-avatar" />
            <span className="user-name">Anmol</span>
            <Icon name="dropdown" className="dropdown-icon" />
            {showUserMenu && (
              <div className="user-menu">
                <p className="welcome-text">Welcome !</p>
                <button className="user-menu-item">
                  <Icon name="user" />
                  <span>My Account</span>
                </button>
                <button className="user-menu-item">
                  <Icon name="lock" />
                  <span>Lock Screen</span>
                </button>
                <button className="user-menu-item">
                  <Icon name="logout" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
          <div className="settings-container">
            <button className="icon-button settings-button" onClick={handleSettingsClick}>
            <Icon name="settings" />
          </button>
            {showSettingsMenu && (
              <div className="settings-menu">
                <div className="settings-option">
                  <span>Dark Mode</span>
                  <label className="switch">
                    <input type="checkbox" checked={themeMode === 'dark'} onChange={toggleThemeMode} />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="settings-option">
                  <span>Theme Color</span>
                  <div className="color-options">
                    {Object.entries(themeColors).map(([name, color]) => (
                      <div
                        key={name}
                        className={`color-box ${primaryColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => changePrimaryColor(color)}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
import React, { useState } from 'react';
import './styles.css';
import Icon from '../../components/Icon';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // Set to June 2025 initially
  
  // Initialize events with sample data and any stored new events
  const [events, setEvents] = useState(() => {
    const storedNewEvents = localStorage.getItem('newCalendarEvents');
    const newEvents = storedNewEvents ? JSON.parse(storedNewEvents).map(event => ({
      ...event,
      date: new Date(event.date) // Convert date string back to Date object
    })) : [];
    return [
    {
      id: 1,
      title: '9:25p Interview',
      date: new Date(2025, 5, 11), // June 11, 2025
        color: 'var(--event-color-green)', // Green
    },
    {
      id: 2,
      title: '9:25p Meeting with John Deo',
      date: new Date(2025, 5, 13), // June 13, 2025
        color: 'var(--event-color-yellow)', // Yellow
    },
    {
      id: 3,
      title: '9:25p Phone Sc',
      date: new Date(2025, 5, 13), // June 13, 2025
        color: 'var(--event-color-blue)', // Blue
    },
    {
      id: 4,
      title: '9:2! Meeting with',
      date: new Date(2025, 5, 15), // June 15, 2025
        color: 'var(--event-color-yellow)', // Yellow
    },
    {
      id: 5,
      title: '9:25p Buy a Theme',
      date: new Date(2025, 5, 17), // June 17, 2025
        color: 'var(--event-color-purple)', // Purple
    },
      ...newEvents
    ];
  });

  const [eventThemes, setEventThemes] = useState([
    { id: 1, name: 'New Theme Release', color: 'var(--event-color-green)' }, // Green
    { id: 2, name: 'My Event', color: 'var(--event-color-blue)' }, // Blue
    { id: 3, name: 'Meet manager', color: 'var(--event-color-yellow)' }, // Yellow
    { id: 4, name: 'Create New theme', color: 'var(--event-color-red)' }, // Red
    { id: 5, name: 'Interview', color: 'var(--event-color-green)' }, // Specific for interview
    { id: 6, name: 'Phone Sc', color: 'var(--event-color-blue)' }, // Specific for phone sc
    { id: 7, name: 'Buy a Theme', color: 'var(--event-color-purple)' }, // Specific for buy a theme
  ]);

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [selectedEventTheme, setSelectedEventTheme] = useState(eventThemes[0].color);
  const [editingEvent, setEditingEvent] = useState(null);

  const [showThemeModal, setShowThemeModal] = useState(false);
  const [newThemeName, setNewThemeName] = useState('');
  const [newThemeColor, setNewThemeColor] = useState('#000000');
  const [editingTheme, setEditingTheme] = useState(null);

  const [activeView, setActiveView] = useState('month'); // 'month', 'week', 'list'

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const openAddEventModal = (date = null) => {
    setNewEventTitle('');
    setNewEventDate(date ? date.toISOString().substring(0, 10) : '');
    setSelectedEventTheme(eventThemes[0].color);
    setEditingEvent(null);
    setShowAddEventModal(true);
  };

  const closeAddEventModal = () => {
    setShowAddEventModal(false);
  };

  const handleSaveEvent = () => {
    if (!newEventTitle || !newEventDate) {
      alert("Please enter event title and date.");
      return;
    }

    const eventDate = new Date(newEventDate);
    const selectedThemeObject = eventThemes.find(theme => theme.color === selectedEventTheme);

    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, title: newEventTitle, date: eventDate, color: selectedEventTheme } 
          : event
      ));
      // Also update the local storage for edited events
      const storedNewEvents = localStorage.getItem('newCalendarEvents');
      const newEvents = storedNewEvents ? JSON.parse(storedNewEvents).map(event => ({
        ...event,
        date: new Date(event.date)
      })) : [];
      const updatedNewEvents = newEvents.map(event => 
        event.id === editingEvent.id 
          ? { ...event, title: newEventTitle, date: eventDate.toISOString(), color: selectedEventTheme } 
          : event
      );
      localStorage.setItem('newCalendarEvents', JSON.stringify(updatedNewEvents));
    } else {
      const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
      const newEvent = {
        id: newId,
        title: newEventTitle,
        date: eventDate.toISOString(), // Store as ISO string
        color: selectedEventTheme,
      };
      
      // Update state
      setEvents([...events, { ...newEvent, date: eventDate }]); // Store as Date object in state
      
      // Store only the new event in localStorage
      const storedNewEvents = localStorage.getItem('newCalendarEvents');
      const newEvents = storedNewEvents ? JSON.parse(storedNewEvents) : [];
      localStorage.setItem('newCalendarEvents', JSON.stringify([...newEvents, newEvent]));
    }
    closeAddEventModal();
  };

  const handleEditEventClick = (event) => {
    setEditingEvent(event);
    setNewEventTitle(event.title);
    setNewEventDate(event.date.toISOString().substring(0, 10));
    setSelectedEventTheme(event.color);
    setShowAddEventModal(true);
  };

  // Theme management functions
  const openThemeModal = () => {
    setNewThemeName('');
    setNewThemeColor('#000000');
    setEditingTheme(null);
    setShowThemeModal(true);
  };

  const closeThemeModal = () => {
    setShowThemeModal(false);
  };

  const handleAddTheme = () => {
    if (!newThemeName || !newThemeColor) {
      alert("Please enter theme name and color.");
      return;
    }
    const newTheme = {
      id: eventThemes.length + 1,
      name: newThemeName,
      color: newThemeColor,
    };
    setEventThemes([...eventThemes, newTheme]);
    setNewThemeName('');
    setNewThemeColor('#000000');
  };

  const handleEditTheme = (themeToEdit) => {
    setEditingTheme(themeToEdit);
    setNewThemeName(themeToEdit.name);
    setNewThemeColor(themeToEdit.color);
  };

  const handleSaveTheme = () => {
    if (!newThemeName || !newThemeColor) {
      alert("Please enter theme name and color.");
      return;
    }
    setEventThemes(eventThemes.map(theme => 
      theme.id === editingTheme.id 
        ? { ...theme, name: newThemeName, color: newThemeColor } 
        : theme
    ));
    setEditingTheme(null);
    setNewThemeName('');
    setNewThemeColor('#000000');
  };

  const handleDeleteTheme = (id) => {
    if (window.confirm("Are you sure you want to delete this theme?")) {
      setEventThemes(eventThemes.filter(theme => theme.id !== id));
      // Also, update events that might be using this theme
      setEvents(events.map(event => 
        event.color === eventThemes.find(theme => theme.id === id)?.color 
          ? { ...event, color: eventThemes[0].color } // Revert to default theme
          : event
      ));
    }
  };

  const handleDeleteEvent = (id) => {
    // Check if the event is a new one (stored in localStorage)
    const storedNewEvents = localStorage.getItem('newCalendarEvents');
    const newEvents = storedNewEvents ? JSON.parse(storedNewEvents) : [];
    
    if (newEvents.some(event => event.id === id)) {
      // If it's a new event, remove it from localStorage
      const updatedNewEvents = newEvents.filter(event => event.id !== id);
      localStorage.setItem('newCalendarEvents', JSON.stringify(updatedNewEvents));
    }
    
    // Update state
    setEvents(events.filter(event => event.id !== id));
  };

  const renderMonthlyView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];

    // Empty cells for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = events.filter(event => {
        console.log('Event Date Type:', typeof event.date, 'Event Date Value:', event.date);
        return (
        event.date.getFullYear() === year &&
        event.date.getMonth() === month &&
        event.date.getDate() === i
      );
      });
      const fullDate = new Date(year, month, i);

      days.push(
        <div key={`day-${i}`} className="calendar-day" onClick={() => openAddEventModal(fullDate)}>
          <span className="day-number">{i}</span>
          <div className="events-list">
            {dayEvents.map(event => (
              <div 
                key={event.id} 
                className="calendar-event" 
                style={{ backgroundColor: event.color }} 
                onClick={(e) => {e.stopPropagation(); handleEditEventClick(event);}}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="calendar-grid-container">
        <div className="calendar-weekdays">
          {dayNames.map(day => (
            <div key={day} className="weekday-name">{day}</div>
          ))}
        </div>
        <div className="calendar-days">
          {days}
        </div>
      </div>
    );
  };

  const renderListView = () => {
    // Sort events by date for list view
    const sortedEvents = [...events].sort((a, b) => a.date - b.date);

    // Group events by date for better display
    const groupedEvents = sortedEvents.reduce((acc, event) => {
      const dateKey = event.date.toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});

    return (
      <div className="calendar-list-view">
        {Object.keys(groupedEvents).length === 0 ? (
          <p className="no-events">No events to display for this period.</p>
        ) : (
          Object.entries(groupedEvents).map(([dateKey, eventsForDay]) => (
            <div key={dateKey} className="date-group">
              <h4 className="date-header">{dateKey}</h4>
              <div className="events-list">
                {eventsForDay.map(event => (
                  <div 
                    key={event.id} 
                    className="calendar-event list-item" 
                    style={{ backgroundColor: event.color }}
                    onClick={() => handleEditEventClick(event)}
                  >
                    <span>{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const goToPrevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar-page-container">
      <div className="calendar-sidebar">
        <button className="create-event-button" onClick={() => openAddEventModal()}>+ Create New Event</button>
        <button className="manage-themes-button" onClick={openThemeModal}>Manage Themes</button>
        <div className="how-it-works">
          <h3>How It Works ?</h3>
          <ul>
            <li>Users can toggle between different views (daily, weekly, monthly, list) to get a clear perspective of scheduled events and availability.</li>
            <li>Admins can create, edit, drag, and delete events directly on the calendar through intuitive click or drag-and-drop interactions.</li>
            <li>Events can be easily rescheduled by dragging them across the calendar—no need for manual edits.</li>
          </ul>
        </div>
      </div>
      <div className="calendar-main-content">
        <div className="calendar-header">
          <div className="calendar-navigation">
            <button 
              onClick={goToPrevMonth}
            >
              Prev
            </button>
            <button 
              onClick={goToNextMonth}
            >
              Next
            </button>
            <button className="today-button" onClick={goToToday}>Today</button>
          </div>
          <h2 className="current-month">
            {activeView === 'month' && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
            {activeView === 'list' && `Events for ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
          </h2>
          <div className="view-options">
            <button 
              className={activeView === 'month' ? 'active' : ''}
              onClick={() => setActiveView('month')}
            >
              Month
            </button>
            <button 
              className={activeView === 'list' ? 'active' : ''}
              onClick={() => setActiveView('list')}
            >
              List
            </button>
          </div>
        </div>
        
        {activeView === 'month' && renderMonthlyView()}
        {activeView === 'list' && renderListView()}

      </div>

      {showAddEventModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingEvent ? "Edit Event" : "Create New Event"}</h3>
            <div className="form-group">
              <label htmlFor="eventTitle">Title:</label>
              <input 
                type="text" 
                id="eventTitle" 
                value={newEventTitle} 
                onChange={(e) => setNewEventTitle(e.target.value)} 
                placeholder="Event Title" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventDate">Date:</label>
              <input 
                type="date" 
                id="eventDate" 
                value={newEventDate} 
                onChange={(e) => setNewEventDate(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventTheme">Theme:</label>
              <select 
                id="eventTheme" 
                value={selectedEventTheme} 
                onChange={(e) => setSelectedEventTheme(e.target.value)}
              >
                {eventThemes.map(theme => (
                  <option key={theme.id} value={theme.color}>{theme.name}</option>
                ))}
              </select>
            </div>
            <div className="modal-actions">
              <button className="cancel-button" onClick={closeAddEventModal}>Cancel</button>
              <button className="save-button" onClick={handleSaveEvent}>{editingEvent ? "Save Changes" : "Add Event"}</button>
            </div>
          </div>
        </div>
      )}

      {showThemeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Manage Themes</h3>
            <div className="form-group">
              <label htmlFor="themeName">Theme Name:</label>
              <input 
                type="text" 
                id="themeName" 
                value={newThemeName} 
                onChange={(e) => setNewThemeName(e.target.value)} 
                placeholder="Theme Name" 
              />
            </div>
            <div className="form-group">
              <label htmlFor="themeColor">Theme Color:</label>
              <input 
                type="color" 
                id="themeColor" 
                value={newThemeColor} 
                onChange={(e) => setNewThemeColor(e.target.value)} 
              />
            </div>
            <div className="modal-actions">
              {editingTheme ? (
                <button className="save-button" onClick={handleSaveTheme}>Save Changes</button>
              ) : (
                <button className="save-button" onClick={handleAddTheme}>Add Theme</button>
              )}
              <button className="cancel-button" onClick={closeThemeModal}>Close</button>
            </div>

            <div className="theme-list">
              <h4>Existing Themes:</h4>
              {eventThemes.length === 0 ? (
                <p>No themes available.</p>
              ) : (
                eventThemes.map(theme => (
                  <div key={theme.id} className="theme-item">
                    <span className="theme-color-box" style={{ backgroundColor: theme.color }}></span>
                    <span>{theme.name}</span>
                    <div className="theme-actions">
                      <button onClick={() => handleEditTheme(theme)}>Edit</button>
                      <button onClick={() => handleDeleteTheme(theme.id)}>Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar; 
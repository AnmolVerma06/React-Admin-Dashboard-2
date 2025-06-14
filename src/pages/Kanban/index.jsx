import React, { useState } from 'react';
import './styles.css';
import Icon from '../../components/Icon';

// Import all user images
import user1 from '../../assets/users/user-1.jpg';
import user2 from '../../assets/users/user-2.jpg';
import user3 from '../../assets/users/user-3.jpg';
import user4 from '../../assets/users/user-4.jpg';
import user5 from '../../assets/users/user-5.jpg';
import user6 from '../../assets/users/user-6.jpg';
import user7 from '../../assets/users/user-7.jpg';
import user8 from '../../assets/users/user-8.jpg';
import user9 from '../../assets/users/user-9.jpg';
import user10 from '../../assets/users/user-10.jpg';
import user11 from '../../assets/users/user-11.jpg';
import user12 from '../../assets/users/user-12.jpg';

const userImages = {
  'user-1': user1,
  'user-2': user2,
  'user-3': user3,
  'user-4': user4,
  'user-5': user5,
  'user-6': user6,
  'user-7': user7,
  'user-8': user8,
  'user-9': user9,
  'user-10': user10,
  'user-11': user11,
  'user-12': user12,
};

const initialTasksData = {
  todo: [
    {
      id: '1',
      title: 'Check Daily Orders API',
      description: 'Ensure the orders API is returning correct totals.',
      assignee: 'user-1',
      priority: 'high',
      dueDate: '2025-06-08',
      status: 'todo'
    },
    {
      id: '2',
      title: 'Verify Discount Logic',
      description: 'Check if scheduled promotional discounts apply properly on all products.',
      assignee: 'user-3',
      priority: 'low',
      dueDate: '2025-06-06',
      status: 'todo'
    },
    {
      id: '3',
      title: 'Check Abandoned Cart Analytics',
      description: 'Review abandoned cart metrics and export data for marketing follow-up.',
      assignee: 'user-1',
      priority: 'medium',
      dueDate: '2025-06-08',
      status: 'todo'
    },
    {
      id: '4',
      title: 'Test Checkout Flow',
      description: 'Perform a dry run of the checkout process with dummy payment data.',
      assignee: 'user-2',
      priority: 'low',
      dueDate: '2025-06-08',
      status: 'todo'
    },
  ],
  inProgress: [
    {
      id: '5',
      title: 'Update Out-of-Stock Products',
      description: 'Manually verify and disable out-of-stock items from dashboard catalog.',
      assignee: 'user-2',
      priority: 'low',
      dueDate: '2025-06-07',
      status: 'inProgress'
    },
    {
      id: '6',
      title: 'Push Daily Sales Report to Admin',
      description: 'Automatically generate and email daily sales report at 8 PM.',
      assignee: 'user-2',
      priority: 'high',
      dueDate: '2025-06-07',
      status: 'inProgress'
    },
    {
      id: '7',
      title: 'Review Pending Vendor Requests',
      description: 'Approve or reject new vendor applications from the backend panel.',
      assignee: 'user-4',
      priority: 'high',
      dueDate: '2025-06-09',
      status: 'inProgress'
    },
  ],
  completed: [
    {
      id: '8',
      title: 'Fix Sales Chart Tooltip Bug',
      description: 'Resolve the issue where tooltips on sales bar chart show wrong data points.',
      assignee: 'user-1',
      priority: 'low',
      dueDate: '2025-06-07',
      status: 'completed'
    },
    {
      id: '9',
      title: 'Daily Product Sync with Backend',
      description: 'Sync newly added or updated products from inventory DB to dashboard view.',
      assignee: 'user-1',
      priority: 'high',
      dueDate: '2025-06-08',
      status: 'completed'
    },
    {
      id: '10',
      title: 'Refactor Customer Support Tab',
      description: 'Improve UI layout of the support tickets tab for better prioritization.',
      assignee: 'user-3',
      priority: 'medium',
      dueDate: '2025-06-06',
      status: 'completed'
    },
    {
      id: '11',
      title: 'Optimize Product Images',
      description: 'Convert and compress product images for faster dashboard loading.',
      assignee: 'user-2',
      priority: 'low',
      dueDate: '2025-06-06',
      status: 'completed'
    },
  ],
};

const Kanban = () => {
  const [tasks, setTasks] = useState(() => {
    // Get new tasks from localStorage
    const storedNewTasks = localStorage.getItem('newKanbanTasks');
    const newTasks = storedNewTasks ? JSON.parse(storedNewTasks) : [];

    // Initialize with sample data
    const initialTasks = {
      todo: [...initialTasksData.todo],
      inProgress: [...initialTasksData.inProgress],
      completed: [...initialTasksData.completed]
    };

    // Add new tasks to their respective columns
    newTasks.forEach(task => {
      if (initialTasks[task.status]) {
        initialTasks[task.status].push(task);
      }
    });

    return initialTasks;
  });

  const [draggingTask, setDraggingTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: '',
    priority: 'Low',
    users: [],
    column: 'todo'
  });

  const handleDragStart = (e, taskId, sourceColumn) => {
    e.dataTransfer.setData('taskId', taskId.toString());
    e.dataTransfer.setData('sourceColumn', sourceColumn);
    setDraggingTask(taskId);
  };

  const handleDragOver = (e, column) => {
    e.preventDefault();
    if (dragOverColumn !== column) {
      setDragOverColumn(column);
    }
  };

  const handleDragLeave = (e, column) => {
    if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');
    
    if (sourceColumn === targetColumn) {
      setDraggingTask(null);
      setDragOverColumn(null);
      return;
    }

    setTasks(prevTasks => {
      // Find the task in the source column
      const taskToMove = prevTasks[sourceColumn].find(task => task.id.toString() === taskId);
      if (!taskToMove) return prevTasks;

      // Remove from source column
      const updatedSourceColumn = prevTasks[sourceColumn].filter(task => task.id.toString() !== taskId);
      
      // Add to target column with updated status
      const updatedTask = { ...taskToMove, status: targetColumn };
      const updatedTargetColumn = [...prevTasks[targetColumn], updatedTask];

      // Update localStorage for new tasks
      const storedNewTasks = localStorage.getItem('newKanbanTasks');
      let newTasks = storedNewTasks ? JSON.parse(storedNewTasks) : [];

      // Check if this is a new task (not in initialTasksData)
      const isNewTask = !Object.values(initialTasksData).flat().some(task => task.id.toString() === taskId);

      if (isNewTask) {
        // Remove from old position in newTasks
        newTasks = newTasks.filter(task => task.id.toString() !== taskId);
        // Add to new position
        newTasks.push(updatedTask);
        localStorage.setItem('newKanbanTasks', JSON.stringify(newTasks));
      }

      return {
        ...prevTasks,
        [sourceColumn]: updatedSourceColumn,
        [targetColumn]: updatedTargetColumn,
      };
    });

    setDraggingTask(null);
    setDragOverColumn(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleUserSelection = (userImageName) => {
    setNewTask(prev => {
      const isSelected = prev.users.includes(userImageName);
      const updatedUsers = isSelected
        ? prev.users.filter(user => user !== userImageName)
        : [...prev.users, userImageName];
      return { ...prev, users: updatedUsers };
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    
    // Create new task object
    const newTaskData = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignee: newTask.users[0] || 'user-1', // Keep first user as primary assignee
      assignees: newTask.users, // Store all assigned users
      priority: newTask.priority,
      dueDate: newTask.date,
      status: newTask.column
    };

    // Add to localStorage
    const storedNewTasks = localStorage.getItem('newKanbanTasks');
    let newTasks = storedNewTasks ? JSON.parse(storedNewTasks) : [];
    newTasks.push(newTaskData);
    localStorage.setItem('newKanbanTasks', JSON.stringify(newTasks));

    // Update state
    setTasks(prevTasks => ({
      ...prevTasks,
      [newTask.column]: [...prevTasks[newTask.column], newTaskData]
    }));

    // Reset form
    setNewTask({
      title: '',
      description: '',
      date: '',
      priority: 'Low',
      users: [],
      column: 'todo'
    });
    setShowAddForm(false);
  };

  const handleDeleteTask = (taskId) => {
    // Check if the task is a new one (stored in localStorage)
    const storedNewTasks = localStorage.getItem('newKanbanTasks');
    let newTasks = storedNewTasks ? JSON.parse(storedNewTasks) : [];
    
    // Remove from localStorage if it's a new task
    if (newTasks.some(task => task.id === taskId)) {
      newTasks = newTasks.filter(task => task.id !== taskId);
      localStorage.setItem('newKanbanTasks', JSON.stringify(newTasks));
    }

    // Update state for all tasks
    setTasks(prevTasks => ({
      todo: prevTasks.todo.filter(task => task.id !== taskId),
      inProgress: prevTasks.inProgress.filter(task => task.id !== taskId),
      completed: prevTasks.completed.filter(task => task.id !== taskId)
    }));
  };

  const renderTasks = (columnName) => {
    return tasks[columnName].map((task) => (
      <div 
        key={task.id} 
        className="task-card"
        draggable="true"
        onDragStart={(e) => handleDragStart(e, task.id, columnName)}
      >
        <div className="task-header">
          <h4 className="task-title">{task.title}</h4>
          <div className="task-header-actions">
            <span className={`priority-label ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
            <button 
              className="delete-task-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(task.id);
              }}
            >
              <Icon name="trash" width="16" height="16" />
            </button>
          </div>
        </div>
        <p className="task-description">{task.description}</p>
        <div className="task-footer">
          <div className="task-meta">
            <span className="task-date">🗓️ {task.dueDate}</span>
          </div>
          <div className="task-right-section">
            <div className="task-users">
              {(task.assignees || [task.assignee]).map((user, index) => (
                <img
                  key={user}
                  src={userImages[user]}
                  alt={user}
                  className="user-avatar"
                  style={{
                    marginLeft: index > 0 ? '-10px' : '0',
                    zIndex: 10 - index
                  }}
                />
              ))}
            </div>
            <input type="checkbox" className="task-checkbox" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="kanban-page-container">
      <div className="kanban-board">
        <div 
          className={`kanban-column ${dragOverColumn === 'todo' ? 'drag-over' : ''}`}
          onDragOver={(e) => handleDragOver(e, 'todo')}
          onDrop={(e) => handleDrop(e, 'todo')}
          onDragLeave={(e) => handleDragLeave(e, 'todo')}
        >
          <div className="column-header">
            <h3>
              To Do
              <div className="column-options">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </h3>
            <span className="column-description">Your awesome text goes here.</span>
          </div>
          <div className="tasks-list">{renderTasks('todo')}</div>
          <button className="add-new-button" onClick={() => { setShowAddForm(true); setNewTask(prev => ({ ...prev, column: 'todo' })); }}>+ Add New</button>
        </div>

        <div 
          className={`kanban-column ${dragOverColumn === 'inProgress' ? 'drag-over' : ''}`}
          onDragOver={(e) => handleDragOver(e, 'inProgress')}
          onDrop={(e) => handleDrop(e, 'inProgress')}
          onDragLeave={(e) => handleDragLeave(e, 'inProgress')}
        >
          <div className="column-header">
            <h3>
              In Progress
              <div className="column-options">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </h3>
            <span className="column-description">Your awesome text goes here.</span>
          </div>
          <div className="tasks-list">{renderTasks('inProgress')}</div>
          <button className="add-new-button" onClick={() => { setShowAddForm(true); setNewTask(prev => ({ ...prev, column: 'inProgress' })); }}>+ Add New</button>
        </div>

        <div 
          className={`kanban-column ${dragOverColumn === 'completed' ? 'drag-over' : ''}`}
          onDragOver={(e) => handleDragOver(e, 'completed')}
          onDrop={(e) => handleDrop(e, 'completed')}
          onDragLeave={(e) => handleDragLeave(e, 'completed')}
        >
          <div className="column-header">
            <h3>
              Completed
              <div className="column-options">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </h3>
            <span className="column-description">Your awesome text goes here.</span>
          </div>
          <div className="tasks-list">{renderTasks('completed')}</div>
          <button className="add-new-button" onClick={() => { setShowAddForm(true); setNewTask(prev => ({ ...prev, column: 'completed' })); }}>+ Add New</button>
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Task</h3>
              <button className="close-btn" onClick={() => setShowAddForm(false)}>×</button>
            </div>
            <form onSubmit={handleAddTask} className="modal-form">
              <div className="form-row">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={newTask.title} onChange={handleInputChange} required />
              </div>
              <div className="form-row">
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={newTask.description} onChange={handleInputChange} required></textarea>
              </div>
              <div className="form-row">
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" name="date" value={newTask.date} onChange={handleInputChange} required />
              </div>
              <div className="form-row">
                <label htmlFor="priority">Priority:</label>
                <select id="priority" name="priority" value={newTask.priority} onChange={handleInputChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-row">
                <label>Assigned Users:</label>
                <div className="user-selection">
                  {[...Array(12)].map((_, index) => {
                    const userImageName = `user-${index + 1}`;
                    const isSelected = newTask.users.includes(userImageName);
                    return (
                      <div
                        key={userImageName}
                        className={`user-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleUserSelection(userImageName)}
                      >
                        <img
                          src={userImages[userImageName]}
                          alt={userImageName}
                          className="user-avatar-select"
                        />
                        {isSelected && <div className="selected-indicator">✓</div>}
                      </div>
                    );
                  })}
                </div>
                <div className="selected-users-list">
                  {newTask.users.length > 0 && (
                    <>
                      <h4>Selected Users:</h4>
                      <div className="selected-users">
                        {newTask.users.map(user => (
                          <div key={user} className="selected-user-item">
                            <img
                              src={userImages[user]}
                              alt={user}
                              className="user-avatar-select"
                            />
                            <button
                              type="button"
                              className="remove-user-btn"
                              onClick={() => handleUserSelection(user)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="column">Column:</label>
                <select id="column" name="column" value={newTask.column} onChange={handleInputChange}>
                  <option value="todo">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-btn">Add Task</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;
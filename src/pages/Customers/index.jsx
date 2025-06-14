import React, { useState } from 'react';
import './styles.css';
import Icon from '../../components/Icon';

// Import user images
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

const userProfileImages = {
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
  'user-12': user12
};

const initialCustomersData = [
  {
    id: 1,
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    balance: '₹12,500',
    orders: 15,
    lastOrder: '2024-03-15',
    status: 'Active',
    profilePic: 'user-1'
  },
  {
    id: 2,
    name: 'Priya Patel',
    phone: '+91 87654 32109',
    balance: '₹8,750',
    orders: 8,
    lastOrder: '2024-03-14',
    status: 'Active',
    profilePic: 'user-2'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    phone: '+91 76543 21098',
    balance: '₹15,200',
    orders: 12,
    lastOrder: '2024-03-13',
    status: 'Inactive',
    profilePic: 'user-3'
  },
  {
    id: 4,
    name: 'Neha Gupta',
    phone: '+91 65432 10987',
    balance: '₹9,800',
    orders: 6,
    lastOrder: '2024-03-12',
    status: 'Active',
    profilePic: 'user-4'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    phone: '+91 54321 09876',
    balance: '₹22,300',
    orders: 18,
    lastOrder: '2024-03-11',
    status: 'Active',
    profilePic: 'user-5'
  },
  {
    id: 6,
    name: 'Ananya Reddy',
    phone: '+91 43210 98765',
    balance: '₹7,600',
    orders: 9,
    lastOrder: '2024-03-10',
    status: 'Inactive',
    profilePic: 'user-6'
  },
  {
    id: 7,
    name: 'Rajesh Verma',
    phone: '+91 32109 87654',
    balance: '₹18,900',
    orders: 14,
    lastOrder: '2024-03-09',
    status: 'Active',
    profilePic: 'user-7'
  },
  {
    id: 8,
    name: 'Sneha Joshi',
    phone: '+91 21098 76543',
    balance: '₹11,200',
    orders: 7,
    lastOrder: '2024-03-08',
    status: 'Active',
    profilePic: 'user-8'
  },
  {
    id: 9,
    name: 'Arjun Mehta',
    phone: '+91 10987 65432',
    balance: '₹14,500',
    orders: 11,
    lastOrder: '2024-03-07',
    status: 'Inactive',
    profilePic: 'user-9'
  },
  {
    id: 10,
    name: 'Pooja Shah',
    phone: '+91 98765 12340',
    balance: '₹9,300',
    orders: 8,
    lastOrder: '2024-03-06',
    status: 'Active',
    profilePic: 'user-10'
  },
  {
    id: 11,
    name: 'Karan Malhotra',
    phone: '+91 87654 01239',
    balance: '₹16,800',
    orders: 13,
    lastOrder: '2024-03-05',
    status: 'Active',
    profilePic: 'user-11'
  },
  {
    id: 12,
    name: 'Divya Nair',
    phone: '+91 76543 90128',
    balance: '₹10,500',
    orders: 9,
    lastOrder: '2024-03-04',
    status: 'Inactive',
    profilePic: 'user-12'
  },
  {
    id: 13,
    name: 'Rohan Kapoor',
    phone: '+91 65432 89017',
    balance: '₹13,200',
    orders: 10,
    lastOrder: '2024-03-03',
    status: 'Active',
    profilePic: 'user-1'
  },
  {
    id: 14,
    name: 'Meera Iyer',
    phone: '+91 54321 78906',
    balance: '₹8,900',
    orders: 7,
    lastOrder: '2024-03-02',
    status: 'Active',
    profilePic: 'user-2'
  },
  {
    id: 15,
    name: 'Surya Menon',
    phone: '+91 43210 67895',
    balance: '₹19,500',
    orders: 16,
    lastOrder: '2024-03-01',
    status: 'Active',
    profilePic: 'user-3'
  },
  {
    id: 16,
    name: 'Aditi Desai',
    phone: '+91 32109 56784',
    balance: '₹11,800',
    orders: 8,
    lastOrder: '2024-02-29',
    status: 'Inactive',
    profilePic: 'user-4'
  },
  {
    id: 17,
    name: 'Vivek Choudhary',
    phone: '+91 21098 45673',
    balance: '₹15,600',
    orders: 12,
    lastOrder: '2024-02-28',
    status: 'Active',
    profilePic: 'user-5'
  },
  {
    id: 18,
    name: 'Tanvi Agarwal',
    phone: '+91 10987 34562',
    balance: '₹9,200',
    orders: 6,
    lastOrder: '2024-02-27',
    status: 'Active',
    profilePic: 'user-6'
  },
  {
    id: 19,
    name: 'Rishi Bhat',
    phone: '+91 98765 23451',
    balance: '₹17,300',
    orders: 14,
    lastOrder: '2024-02-26',
    status: 'Inactive',
    profilePic: 'user-7'
  },
  {
    id: 20,
    name: 'Zara Khan',
    phone: '+91 87654 12340',
    balance: '₹12,100',
    orders: 9,
    lastOrder: '2024-02-25',
    status: 'Active',
    profilePic: 'user-8'
  }
];

const Customers = () => {
  const [customers, setCustomers] = useState(() => {
    const storedNewCustomers = localStorage.getItem('newCustomers');
    const newCustomers = storedNewCustomers ? JSON.parse(storedNewCustomers) : [];
    return [...initialCustomersData, ...newCustomers];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    balance: '',
    orders: '',
    lastOrder: '',
    status: 'Active',
    profilePic: 'user-1'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = searchTerm === '' ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' ||
      customer.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newId = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const newCustomerWithId = { ...newCustomer, id: newId };

    setCustomers(prevCustomers => [...prevCustomers, newCustomerWithId]);
    
    const storedNewCustomers = localStorage.getItem('newCustomers');
    const newCustomers = storedNewCustomers ? JSON.parse(storedNewCustomers) : [];
    localStorage.setItem('newCustomers', JSON.stringify([...newCustomers, newCustomerWithId]));
    
    setNewCustomer({
      name: '',
      phone: '',
      balance: '',
      orders: '',
      lastOrder: '',
      status: 'Active',
      profilePic: 'user-1'
    });
    setShowAddForm(false);
  };

  const handleExport = () => {
    const headers = ['ID', 'Name', 'Phone', 'Balance', 'Orders', 'Last Order', 'Status'];
    const csvData = filteredCustomers.map(customer => [
      customer.id,
      customer.name,
      customer.phone,
      customer.balance.replace('₹', '').replace(',', ''),
      customer.orders,
      customer.lastOrder,
      customer.status
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'customers.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteCustomer = (id) => {
    // Check if the customer is a new one (stored in localStorage)
    const storedNewCustomers = localStorage.getItem('newCustomers');
    let newCustomers = storedNewCustomers ? JSON.parse(storedNewCustomers) : [];
    
    // Remove from localStorage if it's a new customer
    if (newCustomers.some(customer => customer.id === id)) {
      newCustomers = newCustomers.filter(customer => customer.id !== id);
      localStorage.setItem('newCustomers', JSON.stringify(newCustomers));
    }
    
    // Update state for all customers
    setCustomers(prevCustomers => {
      const updatedCustomers = prevCustomers.filter(customer => customer.id !== id);
      return updatedCustomers;
    });
  };

  return (
    <div className="customers-page">
      <div className="customers-header">
        <h2>Customers</h2>
        <div className="customers-actions-right">
          <button className="add-customer-btn" onClick={() => setShowAddForm(true)}>
            <Icon name="plus" width="16" height="16" /> Add Customer
          </button>
          <button className="export-btn" onClick={handleExport}>
            <Icon name="export" width="16" height="16" /> Export
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="add-customer-form-container">
            <h3>Add New Customer</h3>
            <form onSubmit={handleAddCustomer} className="add-customer-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={newCustomer.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" value={newCustomer.phone} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance:</label>
                <input type="text" id="balance" name="balance" value={newCustomer.balance} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="orders">Orders:</label>
                <input type="number" id="orders" name="orders" value={newCustomer.orders} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="lastOrder">Last Order Date:</label>
                <input type="date" id="lastOrder" name="lastOrder" value={newCustomer.lastOrder} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select id="status" name="status" value={newCustomer.status} onChange={handleInputChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="profilePic">Profile Picture:</label>
                <select id="profilePic" name="profilePic" value={newCustomer.profilePic} onChange={handleInputChange}>
                  {Object.keys(userProfileImages).map(key => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="add-btn">Add Customer</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="customers-table-container">
        <div className="customers-table-controls">
          <div className="filter-group">
            <label htmlFor="status-filter">Status</label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
            >
              <option value="all">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="search-bar">
            <Icon name="search" width="20" height="20" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>

        <table className="customers-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Balance</th>
              <th>Orders</th>
              <th>Last Order</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <div className="customer-info">
                    <img src={userProfileImages[customer.profilePic]} alt="profile" className="profile-pic" />
                    <span>{customer.name}</span>
                  </div>
                </td>
                <td>{customer.phone}</td>
                <td>{customer.balance}</td>
                <td>{customer.orders}</td>
                <td>{customer.lastOrder}</td>
                <td>
                  <span className={`status-badge ${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="action-icons">
                  <Icon name="eye" width="20" height="20" />
                  <Icon name="edit" width="20" height="20" />
                  <button 
                    className="delete-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteCustomer(customer.id);
                    }}
                  >
                    <Icon name="trash" width="20" height="20" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-controls">
          <div className="page-info">
            Display : 10
            <select>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
          </div>
          <div className="page-info">
            Page {currentPage} of {totalPages}
          </div>
          <div className="pagination-buttons">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
          <div className="page-info">
            Go to page : 
            <input type="number" value={currentPage} onChange={(e) => handlePageChange(Number(e.target.value))}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Customers as default }; 
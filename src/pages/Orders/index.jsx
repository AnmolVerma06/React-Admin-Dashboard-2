import React, { useState } from 'react';
import './styles.css';
import Icon from '../../components/Icon';

// Import product images (assuming product-1.png to product-8.png exist in src/assets/products)
import product1 from '../../assets/products/product-1.png';
import product2 from '../../assets/products/product-2.png';
import product3 from '../../assets/products/product-3.png';
import product4 from '../../assets/products/product-4.png';
import product5 from '../../assets/products/product-5.png';
import product6 from '../../assets/products/product-6.png';
import product7 from '../../assets/products/product-7.png';
import product8 from '../../assets/products/product-8.png';

const productImages = {
  'product-1': product1,
  'product-2': product2,
  'product-3': product3,
  'product-4': product4,
  'product-5': product5,
  'product-6': product6,
  'product-7': product7,
  'product-8': product8,
};

const generateRandomId = () => {
  return '#BM' + Math.floor(Math.random() * 90000 + 10000);
};

const getRandomDate = () => {
  const start = new Date(2024, 0, 1);
  const end = new Date(2025, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + 
         date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

const getRandomTotal = () => {
  return '₹' + (Math.random() * (10000 - 500) + 500).toFixed(2);
};

const paymentStatuses = ['Payment Failed', 'Unpaid', 'Paid', 'Awaiting Authorization'];
const paymentMethods = ['Visa', 'Credit Card', 'Paypal', 'Payoneer', 'Bank Transfer'];
const orderStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Pending'];

const getRandomStatus = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomProducts = () => {
  const numProducts = Math.floor(Math.random() * 3) + 1; // 1 to 3 products
  const selectedProducts = new Set();
  while (selectedProducts.size < numProducts) {
    const randomIndex = Math.floor(Math.random() * 8) + 1; // product-1 to product-8
    selectedProducts.add(`product-${randomIndex}`);
  }
  return Array.from(selectedProducts);
};

const initialOrdersData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  orderId: generateRandomId(),
  products: getRandomProducts(),
  date: getRandomDate(),
  paymentStatus: getRandomStatus(paymentStatuses),
  total: getRandomTotal(),
  paymentMethod: getRandomStatus(paymentMethods),
  orderStatus: getRandomStatus(orderStatuses),
}));

const Orders = () => {
  const [orders, setOrders] = useState(() => {
    const storedNewOrders = localStorage.getItem('newOrders');
    const newOrders = storedNewOrders ? JSON.parse(storedNewOrders) : [];
    return [...initialOrdersData, ...newOrders];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    orderId: generateRandomId(),
    products: [],
    date: getRandomDate(),
    paymentStatus: 'Unpaid',
    total: '₹0.00',
    paymentMethod: 'Credit Card',
    orderStatus: 'Pending'
  });

  const itemsPerPage = 10;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' ||
      order.orderStatus.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    const newOrderWithId = { ...newOrder, id: newId };
    
    setOrders(prevOrders => [...prevOrders, newOrderWithId]);
    
    const storedNewOrders = localStorage.getItem('newOrders');
    const newOrders = storedNewOrders ? JSON.parse(storedNewOrders) : [];
    localStorage.setItem('newOrders', JSON.stringify([...newOrders, newOrderWithId]));
    
    setNewOrder({
      orderId: generateRandomId(),
      products: [],
      date: getRandomDate(),
      paymentStatus: 'Unpaid',
      total: '₹0.00',
      paymentMethod: 'Credit Card',
      orderStatus: 'Pending'
    });
    setShowAddForm(false);
  };

  const handleExport = () => {
    const headers = ['ID', 'Order ID', 'Products', 'Date', 'Payment Status', 'Total', 'Payment Method', 'Order Status'];
    const csvData = filteredOrders.map(order => [
      order.id,
      order.orderId,
      order.products.join('; '),
      order.date,
      order.paymentStatus,
      order.total.replace('₹', '').replace(',', ''),
      order.paymentMethod,
      order.orderStatus
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'orders.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteOrder = (id) => {
    // Check if the order is a new one (stored in localStorage)
    const storedNewOrders = localStorage.getItem('newOrders');
    let newOrders = storedNewOrders ? JSON.parse(storedNewOrders) : [];
    
    // Remove from localStorage if it's a new order
    if (newOrders.some(order => order.id === id)) {
      newOrders = newOrders.filter(order => order.id !== id);
      localStorage.setItem('newOrders', JSON.stringify(newOrders));
    }
    
    // Update state for all orders
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.filter(order => order.id !== id);
      return updatedOrders;
    });
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>Orders</h2>
        <div className="orders-actions-right">
          <button className="add-new-order-btn" onClick={() => setShowAddForm(true)}>
            <Icon name="plus" width="16" height="16" /> Add New Order
          </button>
          <button className="export-btn" onClick={handleExport}>
            <Icon name="export" width="16" height="16" /> Export
          </button>
        </div>
      </div>

      {showAddForm && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h3>Add New Order</h3>
        <button className="close-btn" onClick={() => setShowAddForm(false)}>×</button>
      </div>
      <form onSubmit={handleAddOrder} className="modal-form">
        <div className="form-row">
          <label htmlFor="orderId">Order ID:</label>
          <input type="text" id="orderId" name="orderId" value={newOrder.orderId} readOnly />
        </div>
        <div className="form-row">
          <label htmlFor="products">Products:</label>
          <div className="product-selection">
            {Object.keys(productImages).map(key => (
              <div
                key={key}
                className={`product-item ${newOrder.products.includes(key) ? 'selected' : ''}`}
                onClick={() => {
                  const updatedProducts = newOrder.products.includes(key)
                    ? newOrder.products.filter(product => product !== key)
                    : [...newOrder.products, key];
                  setNewOrder({ ...newOrder, products: updatedProducts });
                }}
              >
                <img src={productImages[key]} alt={key} className="product-thumb" />
              </div>
            ))}
          </div>
          <div className="selected-products">
            <h4>Selected Products:</h4>
            <div className="selected-products-list">
              {newOrder.products.map(product => (
                <div key={product} className="selected-product-item">
                  <img src={productImages[product]} alt={product} className="product-thumb" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={newOrder.date} onChange={handleInputChange}/>

        </div>
        <div className="form-row">
          <label htmlFor="paymentStatus">Payment Status:</label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            value={newOrder.paymentStatus}
            onChange={handleInputChange}
          >
            {paymentStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="total">Total:</label>
          <input
            type="text"
            id="total"
            name="total"
            value={newOrder.total}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={newOrder.paymentMethod}
            onChange={handleInputChange}
          >
            {paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="orderStatus">Order Status:</label>
          <select
            id="orderStatus"
            name="orderStatus"
            value={newOrder.orderStatus}
            onChange={handleInputChange}
          >
            {orderStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="modal-actions">
          <button type="submit" className="save-btn">Add Order</button>
          <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
)}

      <div className="orders-table-container">
        <div className="orders-table-controls">
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
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="search-bar">
            <Icon name="search" width="20" height="20" />
            <input 
              type="text" 
              placeholder="Search : 20 records..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>

        <table className="orders-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Order ID</th>
              <th>Products</th>
              <th>Date</th>
              <th>Payment Status</th>
              <th>Total</th>
              <th>Payment Method</th>
              <th>Order Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{order.orderId}</td>
                <td className="product-images">
                  {order.products.map((product, idx) => (
                    <img
                      key={idx}
                      src={productImages[product]}
                      alt={product}
                      className="product-thumb"
                    />
                  ))}
                </td>
                <td>{order.date}</td>
                <td>
                  <span className={`status-badge ${order.paymentStatus.toLowerCase().replace(' ', '-')}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>{order.total}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
                    {order.orderStatus}
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
                      handleDeleteOrder(order.id);
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
            Display :
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

export default Orders; 
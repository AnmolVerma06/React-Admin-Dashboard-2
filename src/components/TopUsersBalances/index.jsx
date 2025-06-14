import React from 'react';
import './styles.css';

import user1 from '../../assets/users/user-1.jpg?url';
import user2 from '../../assets/users/user-2.jpg?url';
import user3 from '../../assets/users/user-3.jpg?url';
import user4 from '../../assets/users/user-4.jpg?url';
import user5 from '../../assets/users/user-5.jpg?url';

const userProfileImages = {
  'user-1': user1,
  'user-2': user2,
  'user-3': user3,
  'user-4': user4,
  'user-5': user5,
};

const TopUsersBalances = () => {
  const users = [
    {
      id: 1,
      name: 'Anmol Verma',
      memberSince: '2023',
      avatar: 'user-1.jpg',
      currency: 'BTC',
      balance: '80',
      reserved: '100',
    },
    {
      id: 2,
      name: 'Erwin E. Brown',
      memberSince: '2023',
      avatar: 'user-2.jpg',
      currency: 'ETH',
      balance: '200',
      reserved: '250',
    },
    {
      id: 3,
      name: 'Margeret V. Ligon',
      memberSince: '2023',
      avatar: 'user-3.jpg',
      currency: 'EUR',
      balance: '25.08',
      reserved: '12.58',
    },
    {
      id: 4,
      name: 'Jose D. Delacruz',
      memberSince: '2023',
      avatar: 'user-4.jpg',
      currency: 'CNY',
      balance: '82',
      reserved: '30.83',
    },
    {
      id: 5,
      name: 'Luke J. Sain',
      memberSince: '2023',
      avatar: 'user-5.jpg',
      currency: 'BTC',
      balance: '212',
      reserved: '117',
    },
  ];

  return (
    <div className="top-users-balances-card">
      <div className="card-header">
        <h2>Top 5 Users Balances</h2>
        <div className="menu-icon">...</div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Currency</th>
              <th>Balance</th>
              <th>Reserved in order</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="profile-info">
                    <img src={userProfileImages[user.avatar.replace('.jpg', '')]} alt={user.name} />
                    <div>
                      <div className="user-name">{user.name}</div>
                      <div className="member-since">Member Since {user.memberSince}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="currency-info">
                    <span className="currency-symbol">₹ RUP</span>
                  </div>
                </td>
                <td>₹ {user.balance}</td>
                <td>₹ {user.reserved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default TopUsersBalances; 
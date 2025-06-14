# 🚀 React Admin Dashboard

A modern, feature-rich admin dashboard application built with **React** and **Vite**, designed to streamline key business operations like managing orders, customers, tasks, and more. It offers a responsive layout, light/dark mode, and customizable theme colors for a personalized user experience.

---

## ⚠️ IMPORTANT NOTE

**This React Admin Dashboard is made without any external third party library**

---

## 🌐 Live Demo

👉 [Click here to try the live demo](https://anmolverma06.github.io/React-Admin-Dashboard-2/)

---

## 📌 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Folder Structure](#-folder-structure)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

### 📊 Dashboard Overview
- Visual display of sales, orders, customers, and AOV
- Percentage trends with arrows
- SalesAnalytics, TotalRevenue, TopUsersBalances, RevenueHistory charts

### 🛒 Orders Management
- Order list with ID, products, thumbnails, date, amount, status
- Delete orders with localStorage sync
- Color-coded status badges
- Add Order button with localStorage support
- Export order data to CSV
- Search and sort orders table

### 👤 Customers Management
- Customer profile info: name, phone, orders, balance, last order date
- Status badges and delete option with persistence
- Add Customer button with localStorage support
- Export customer data to CSV
- Search and sort customers table

### 📋 Kanban Board
- Tasks in To Do, In Progress, Completed
- Drag-and-drop using HTML Drag & Drop API
- Task modal for adding with details like due date, priority, and assignment
- Task deletion with UI & localStorage update

### 📆 Calendar View
- Custom-built calendar rendering using React logic
- Create new event via form
- Task colors vary based on assigned theme
- List view showing all events in a single page
- Add new theme and pick favorite colors from the color picker

### 🎨 Theming
- Light/Dark mode toggle using React Context + CSS variables
- Theme color picker (e.g., red, blue, green, purple, orange)

### 📱 Responsive UI
- Collapsible sidebar
- Top navigation with theme controls, notifications, and profile
- Notification dropdown menu

---

## 🛠️ Tech Stack

| Tool                  | Description                                                                  |
|-----------------------|------------------------------------------------------------------------------|
| React 18.2.0          | Component-based UI framework                                                 |
| Vite 5.1.0            | Fast bundler with Hot Module Replacement (HMR)                               |
| React Router 6.22     | SPA routing using `HashRouter` for static hosting                           |
| LocalStorage API      | Client-side persistence across sessions                                     |
| Pure CSS + Variables  | Styling with dynamic theme support (light/dark mode, color themes)           |
| SVG for Charts        | Lightweight chart rendering using inline SVG                                 |
| HTML Drag & Drop API  | Enables drag-and-drop functionality in Kanban board                         |
| React Calendar Logic  | Custom implementation of calendar UI without third-party libraries          |
| Custom SVG Icons      | Icon management using `/assets/icons` as React components or `<img>` tags   |
| ESLint                | Code linting using standard React plugins                                   |


---

## 📦 Installation

```bash
# Clone this repository
git clone https://github.com/AnmolVerma06/React-Admin-Dashboard-2.git

# Navigate to the project folder
cd React-Admin-Dashboard-2

# Install dependencies
npm install

# Run development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) to view it in the browser.

---

## 📁 Folder Structure

```
React-Admin-Dashboard-2/
├── public/
│   └── ...                    # Static assets
├── src/
│   ├── assets/                # Static images and icons
│   ├── components/            # Reusable UI components
│   ├── context/               # Theme provider logic
│   ├── data/                  # Static data (mocked users/orders)
│   ├── pages/                 # Pages: Dashboard, Orders, etc.
│   ├── router/                # Routing configuration
│   ├── styles/                # Component-specific CSS
│   └── App.jsx                # App entry point
├── .eslintrc.cjs              # ESLint rules
├── vite.config.js             # Vite configuration
└── package.json               # Project metadata and dependencies
```

---

## 🧩 Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview the production build
npm run lint       # Lint code using ESLint
```

---

## 🙌 Developed By

**Anmol Verma**  
🔗 [GitHub Profile](https://github.com/AnmolVerma06)

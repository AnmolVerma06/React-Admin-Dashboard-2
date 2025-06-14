
# ⚠️ IMPORTANT NOTE

**This React Admin Dashboard is made without any external third party library**

---

# 🌐 Live Demo

👉 [Click here to try the live demo](https://anmolverma06.github.io/React-Admin-Dashboard-2/)

---

# 🚀 React Admin Dashboard

A modern, feature-rich admin dashboard application built with **React** and **Vite**, designed to streamline key business operations like managing orders, customers, tasks, and more. It offers a responsive layout, light/dark mode, and customizable theme colors for a personalized user experience.

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

## ✨ Features

### 📊 Dashboard Overview
- At-a-glance KPIs: Total Sales, Orders, Customers, Avg. Order Value
- Interactive charts: Revenue, Sales Analytics, User Balances, Revenue History

### 🛒 Orders Management
- Order list with ID, products, thumbnails, date, amount, status
- Delete orders with localStorage sync
- Color-coded status badges

### 👤 Customers Management
- Customer profile info: name, phone, orders, balance, last order date
- Status badges and delete option with persistence

### 🗂️ Kanban Board
- Columns: **To Do**, **In Progress**, **Completed**
- Drag & drop tasks between columns
- Each task shows title, description, due date, priority, and assigned users
- Add and delete tasks with real-time updates

### 📅 Calendar View
- Placeholder for scheduling/events (extendable)

### 🌗 Theming & Personalization
- **Dark Mode** toggle
- 🎨 Multiple **theme color options** (Red, Blue, Green, Purple, Orange)
- Theme managed using React Context API and CSS custom properties

### 📱 Responsive UI
- Collapsible sidebar
- Top navigation with theme controls, notifications, and profile

---

## 🛠️ Tech Stack

| Tool              | Description                                  |
|-------------------|----------------------------------------------|
| SVG for Charts    | Lightweight chart rendering using inline SVG |
| HTML Drag & Drop API | Used in Kanban board for reordering tasks |
| React Calendar Logic | Custom implementation for rendering and managing calendar UI without external libraries |

|-------------------|----------------------------------------------|
| React 18.2.0      | Component-based UI framework                 |
| Vite 5.1.0        | Fast bundler with HMR                        |
| React Router 6.22 | SPA routing with HashRouter                  |
| CSS Variables     | Dynamic styling and theme switching          |
| LocalStorage API  | Client-side persistence                      |
| Pure CSS          | Styling (no third-party UI libraries)        |
| Custom SVG Icons  | Icon management from `/assets/icons`         |
| ESLint            | Code linting and style enforcement           |

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

## 🤝 Contributing

Your contributions are welcome!

1. Fork this repo
2. Create a branch: `git checkout -b feature-xyz`
3. Commit changes: `git commit -m 'Add feature xyz'`
4. Push your branch: `git push origin feature-xyz`
5. Create a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for more details.

---

## 🙌 Developed By

**Anmol Verma**  
🔗 [GitHub Profile](https://github.com/AnmolVerma06)

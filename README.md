# 📊 Finance Dashboard UI

A modern, responsive, and interactive financial dashboard built for tracking transactions, analyzing spending habits, and managing financial data.

This project was built to demonstrate proficiency in modern frontend architecture, global state management, and UI/UX best practices.

## 🚀 Tech Stack

- **Framework:** React 18 (via Vite for lightning-fast HMR)
- **Styling:** Tailwind CSS (with native Dark Mode support)
- **State Management:** Zustand (with LocalStorage persistence)
- **Data Visualization:** Recharts
- **Icons:** Lucide React

## ✨ Key Features

### Core Requirements Fulfilled

- **Dashboard Overview:** Dynamic calculation of Total Balance, Income, and Expenses. Includes a time-based Line Chart and a categorical Pie/Donut chart.
- **Transactions Manager:** A complete table view with search, advanced filtering (by type and category), and multi-criteria sorting.
- **Role-Based Access Control (RBAC):** Simulated UI roles. "Admins" can add/delete transactions and export data. "Viewers" are restricted to read-only access.
- **Smart Insights:** Auto-calculates the highest spending category, largest single expense, and overall activity summary.
- **Responsive Layout:** A fully responsive CSS grid/flexbox layout with a mobile-first slide-out "hamburger" sidebar.

### Optional Enhancements Added

- **🌙 Dark Mode:** Seamless, full-app dark mode using Tailwind's custom variant handling.
- **💾 Data Persistence:** Zustand `persist` middleware ensures data survives browser refreshes.
- **⏳ Mock API Integration:** Asynchronous `setTimeout` promises simulate server latency with beautiful UI loading states and disabled buttons to prevent double-submissions.
- **📥 Export Functionality:** One-click generation and downloading of a `.csv` file containing all filtered transaction data.
- **🎨 Animations:** Smooth CSS transitions for page loads, hover states, and modal popups.

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd finance-dashboard
   ```

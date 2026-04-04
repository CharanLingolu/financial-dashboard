import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import useStore from "./store/useStore";

function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const { theme } = useStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      <div key={currentView} className="animate-fade-in">
        {currentView === "dashboard" && <Dashboard />}
        {currentView === "transactions" && <Transactions />}
        {currentView === "insights" && <Insights />}
      </div>
    </Layout>
  );
}

export default App;

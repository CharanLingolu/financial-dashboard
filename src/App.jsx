import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./components/Insights";
import useStore from "./store/useStore";

function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const { theme } = useStore();

  // NEW: Ensure dark mode is applied if the user refreshes the page
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {/* NEW: We wrap the pages in a div with a unique key. 
          When the key changes, React replays the animation! */}
      <div key={currentView} className="animate-fade-in">
        {currentView === "dashboard" && <Dashboard />}
        {currentView === "transactions" && <Transactions />}
        {currentView === "insights" && <Insights />}
      </div>
    </Layout>
  );
}

export default App;

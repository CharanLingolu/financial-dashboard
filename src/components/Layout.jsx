import React, { useState } from "react";
import {
  LayoutDashboard,
  ArrowRightLeft,
  PieChart,
  Shield,
  Lightbulb,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import useStore from "../store/useStore";

const Layout = ({ children, currentView, setCurrentView }) => {
  const { role, setRole, theme, toggleTheme } = useStore();
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen transition-colors bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 shadow-xl z-30 bg-white dark:bg-gray-800 dark:border-r dark:border-gray-700 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6">
          <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <PieChart /> FinDash
          </h2>

          <button
            className="md:hidden text-gray-500 dark:text-gray-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-2 flex flex-col gap-1">
          <button
            onClick={() => handleNav("dashboard")}
            className={`flex items-center gap-3 px-6 py-3 w-full text-left transition-colors ${
              currentView === "dashboard"
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-medium dark:bg-gray-700 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button
            onClick={() => handleNav("transactions")}
            className={`flex items-center gap-3 px-6 py-3 w-full text-left transition-colors ${
              currentView === "transactions"
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-medium dark:bg-gray-700 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <ArrowRightLeft size={20} /> Transactions
          </button>
          <button
            onClick={() => handleNav("insights")}
            className={`flex items-center gap-3 px-6 py-3 w-full text-left transition-colors ${
              currentView === "insights"
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-medium dark:bg-gray-700 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <Lightbulb size={20} /> Insights
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col w-full overflow-hidden min-w-0">
        <header className="flex justify-between items-center p-4 md:p-6 bg-white dark:bg-gray-800 shadow-sm z-10 transition-colors">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white capitalize">
              {currentView}
            </h1>
          </div>

          <div className="flex gap-2 md:gap-4 items-center">
            <button
              onClick={toggleTheme}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {currentView === "transactions" && (
              <div className="relative">
                <button
                  onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                  className="flex items-center gap-1 md:gap-2 bg-gray-100 dark:bg-gray-700 px-3 md:px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors"
                >
                  <Shield
                    size={18}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <span className="hidden sm:inline text-sm font-medium text-gray-600 dark:text-gray-300">
                    Role:
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 capitalize text-sm md:text-base">
                    {role}
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-gray-500 dark:text-gray-400 ml-1"
                  />
                </button>

                {isRoleMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                    <button
                      onClick={() => {
                        setRole("viewer");
                        setIsRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        role === "viewer"
                          ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      Viewer
                    </button>
                    <button
                      onClick={() => {
                        setRole("admin");
                        setIsRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        role === "admin"
                          ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      Admin
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

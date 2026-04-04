import React, { useState, useEffect } from "react";
import useStore from "../store/useStore";
import {
  Search,
  Trash2,
  Plus,
  Download,
  Filter,
  Inbox,
  ChevronDown,
} from "lucide-react";
import TransactionModal from "./TransactionModal";

const Transactions = () => {
  const { transactions, role, deleteTransaction, isLoading } = useStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (role === "viewer") setIsModalOpen(false);
  }, [role]);

  let processedTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || tx.type === filterType;
    const matchesCategory =
      filterCategory === "all" || tx.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  processedTransactions.sort((a, b) => {
    if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sortBy === "amount-desc") return b.amount - a.amount;
    if (sortBy === "amount-asc") return a.amount - b.amount;
    return 0;
  });

  const exportToCSV = () => {
    const headers = ["S.No,Date,Description,Category,Type,Amount"];
    const csvRows = processedTransactions.map(
      (tx, index) =>
        `${index + 1},${tx.date},"${tx.description}",${tx.category},${
          tx.type
        },${tx.amount}`
    );
    const csvString = [headers, ...csvRows].join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "finance_transactions.csv";
    link.click();
  };

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-140px)] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6 transition-colors overflow-hidden">
        <div className="flex flex-col gap-4 mb-4 shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Transaction History
            </h2>
            <div className="flex gap-2">
              <button
                onClick={exportToCSV}
                className="flex items-center justify-center p-2 md:px-4 md:py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Download size={18} />
                <span className="hidden sm:inline md:ml-2">Export</span>
              </button>
              {role === "admin" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center p-2 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  <Plus size={18} />
                  <span className="hidden sm:inline md:ml-2">Add New</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 shrink-0">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="appearance-none pl-9 pr-10 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income Only</option>
                  <option value="expense">Expenses Only</option>
                </select>
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>

              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="appearance-none px-4 pr-10 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {[
                    "Food",
                    "Housing",
                    "Utilities",
                    "Entertainment",
                    "Salary",
                    "Freelance",
                    "Other",
                  ].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="flex-1 overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Processing...
              </span>
            </div>
          )}

          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 shadow-sm">
              <tr className="text-gray-500 dark:text-gray-400 text-sm border-b border-gray-200 dark:border-gray-700">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Amount</th>
                {role === "admin" && (
                  <th className="p-4 font-medium text-right">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {processedTransactions.length > 0 ? (
                processedTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                      {tx.date}
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                      {tx.description}
                    </td>
                    <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs">
                        {tx.category}
                      </span>
                    </td>
                    <td
                      className={`p-4 text-sm font-bold ${
                        tx.type === "income"
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {tx.type === "income" ? "+" : "-"}$
                      {tx.amount.toLocaleString()}
                    </td>
                    {role === "admin" && (
                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="p-2 text-red-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Inbox
                        size={48}
                        className="text-gray-300 dark:text-gray-600 mb-4"
                      />
                      <span className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-1">
                        No transactions found
                      </span>
                      <p className="text-sm">
                        Try adjusting your filters or add a new transaction.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Transactions;

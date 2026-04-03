import React from "react";
import useStore from "../store/useStore";
import { Lightbulb, TrendingDown, AlertCircle, Award } from "lucide-react";

const Insights = () => {
  const { transactions } = useStore();

  const expenses = transactions.filter((tx) => tx.type === "expense");

  const categoryTotals = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const highestCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] > categoryTotals[b] ? a : b
        )
      : "None";

  const highestCategoryAmount = categoryTotals[highestCategory] || 0;

  const largestExpense =
    expenses.length > 0
      ? expenses.reduce(
          (max, tx) => (tx.amount > max.amount ? tx : max),
          expenses[0]
        )
      : null;

  // --- NEW: EMPTY STATE CHECK ---
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 min-h-[400px] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center transition-colors">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-full mb-4">
          <Lightbulb size={48} className="text-blue-500 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          No Insights Yet
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          We need a little more data to analyze your spending habits. Switch to
          the Admin role and add some transactions to unlock your financial
          insights!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <Lightbulb size={28} className="text-yellow-300" />
          <h2 className="text-2xl font-bold">Financial Insights</h2>
        </div>
        <p className="text-blue-100 max-w-2xl">
          Here is a breakdown of your spending habits based on your recent
          transaction history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Insight 1 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start gap-4 transition-colors">
          <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400 shrink-0">
            <TrendingDown size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Top Spending Category
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              You have spent the most money on{" "}
              <strong className="text-gray-800 dark:text-gray-200">
                {highestCategory}
              </strong>
              .
            </p>
            <div className="mt-3 text-2xl font-bold text-orange-600 dark:text-orange-400">
              ${highestCategoryAmount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Insight 2 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start gap-4 transition-colors">
          <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Largest Single Expense
            </h3>
            {largestExpense ? (
              <>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Your biggest purchase was{" "}
                  <strong className="text-gray-800 dark:text-gray-200">
                    {largestExpense.description}
                  </strong>
                  .
                </p>
                <div className="mt-3 text-2xl font-bold text-red-600 dark:text-red-400">
                  ${largestExpense.amount.toLocaleString()}
                </div>
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                No expenses recorded yet.
              </p>
            )}
          </div>
        </div>

        {/* Insight 3 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-start gap-4 md:col-span-2 transition-colors">
          <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400 shrink-0">
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Activity Summary
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              You have recorded a total of{" "}
              <strong className="text-gray-800 dark:text-gray-200">
                {transactions.length}
              </strong>{" "}
              transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialTransactions } from "../data/mockData";

const useStore = create(
  persist(
    (set) => ({
      transactions: initialTransactions,
      role: "viewer",
      theme: "light",

      // NEW: Add an isLoading state
      isLoading: false,

      setRole: (newRole) => set({ role: newRole }),

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          return { theme: newTheme };
        }),

      // MOCK API: Simulate a server delay when adding data
      addTransaction: async (newTx) => {
        set({ isLoading: true }); // 1. Turn on loading state

        // 2. Fake a network delay of 800 milliseconds
        await new Promise((resolve) => setTimeout(resolve, 800));

        set((state) => ({
          transactions: [newTx, ...state.transactions],
          isLoading: false, // 3. Turn off loading state
        }));
      },

      // MOCK API: Simulate a server delay when deleting data
      deleteTransaction: async (id) => {
        set({ isLoading: true });

        await new Promise((resolve) => setTimeout(resolve, 600));

        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
          isLoading: false,
        }));
      },
    }),
    {
      name: "finance-dashboard-storage",
    }
  )
);

export default useStore;

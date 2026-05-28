import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Sidebar from "./components/Sidebar";
import UserList from "./components/UserList";
import Filters from "./components/Filters";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-surface overflow-hidden text-text">
        {/* responsive */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-20 md:static md:z-auto
            transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Filters onMenuClick={() => setSidebarOpen((o) => !o)} />
          <UserList />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;

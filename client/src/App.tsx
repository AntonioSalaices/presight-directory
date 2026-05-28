import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Sidebar from "./components/Sidebar";
import UserList from "./components/UserList";
import Filters from "./components/Filters";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-surface overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Filters />
          <UserList />
        </div>
      </div>
    </QueryClientProvider>
  );
}

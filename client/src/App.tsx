import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Sidebar from "./components/Sidebar";
import UserList from "./components/UserList";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div>Hola</div>
        <Sidebar />
        <main>
          <UserList></UserList>
        </main>
      </div>
    </QueryClientProvider>
  );
}

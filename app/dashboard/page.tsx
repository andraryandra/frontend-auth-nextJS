"use client";

import React, { useState } from "react";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import Navbar from "../components/dashboard/navbar/Navbar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow p-4 bg-gray-100">
          <h1 className="text-3xl font-semibold">Dashboard Content</h1>
          {/* Konten utama di sini */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
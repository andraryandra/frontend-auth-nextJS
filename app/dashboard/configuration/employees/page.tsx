"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/dashboard/navbar/Navbar";
import Employees from "./user/page";
import Roles from "./role/page";
import PermissionsEmployees from "./permission/page";

const Page: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("users");

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-4">
        <div className="flex space-x-4 mb-4 border-b">
          <button
            className={`px-4 py-2 rounded-t-lg ${
              currentTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTabChange("users")}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${
              currentTab === "roles" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTabChange("roles")}
          >
            Roles
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg ${
              currentTab === "permissions"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleTabChange("permissions")}
          >
            Permissions
          </button>
        </div>

        {currentTab === "users" && <Employees />}
        {currentTab === "roles" && <Roles />}
        {currentTab === "permissions" && <PermissionsEmployees />}
      </div>
    </div>
  );
};

export default Page;
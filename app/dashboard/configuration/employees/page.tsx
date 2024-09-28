"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/dashboard/navbar/Navbar";
import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";

const Page: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [permissionFilter, setPermissionFilter] = useState("");

  // Mock data for the table
  const tableData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      role: "Admin",
      permission: "Full Access",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      username: "janesmith",
      role: "User",
      permission: "Read",
    },
    // Add more data here...
  ];

  // Pagination configuration
  const itemsPerPage = 10;
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Function to handle tab change
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setCurrentPage(1); // Reset current page when changing tabs
  };

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Function to handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle role filter change
  const handleRoleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(event.target.value);
  };

  // Function to handle permission filter change
  const handlePermissionFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPermissionFilter(event.target.value);
  };

  // Filter table data based on current tab, search term, and filters
  const filteredData = tableData.filter((data) => {
    if (currentTab === "users") {
      return (
        data.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (roleFilter === "" || data.role === roleFilter) &&
        (permissionFilter === "" || data.permission === permissionFilter)
      );
    } else if (currentTab === "roles") {
      return data.role === currentTab;
    } else if (currentTab === "permissions") {
      return data.permission === currentTab;
    }
    return false;
  });

  // Get the current page data
  const currentPageData = filteredData.slice(startIndex, endIndex);

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

        {currentTab === "users" && (
          <div className="flex space-x-4 mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-4 py-2 border rounded"
            />
            <select
              value={roleFilter}
              onChange={handleRoleFilterChange}
              className="px-4 py-2 border rounded"
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              {/* Add more roles as needed */}
            </select>
            <select
              value={permissionFilter}
              onChange={handlePermissionFilterChange}
              className="px-4 py-2 border rounded"
            >
              <option value="">All Permissions</option>
              <option value="Full Access">Full Access</option>
              <option value="Read">Read</option>
              {/* Add more permissions as needed */}
            </select>
          </div>
        )}

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Username</th>
                <th className="py-2 px-4 border-b text-left">Role</th>
                <th className="py-2 px-4 border-b text-left">Permission</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
                <th className="py-2 px-4 border-b text-left"></th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{data.id}</td>
                  <td className="py-2 px-4 border-b">{data.name}</td>
                  <td className="py-2 px-4 border-b">{data.email}</td>
                  <td className="py-2 px-4 border-b">{data.username}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        data.role === "Admin"
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {data.role}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{data.permission}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      className="p-2 bg-white border border-yellow-500 text-black rounded-full flex items-center shadow-md hover:bg-yellow-500 hover:text-white"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="p-2 bg-white border border-blue-500 text-black rounded-full flex items-center shadow-md hover:bg-blue-500 hover:text-white"
                      title="Show"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="p-2 bg-white border border-red-500 text-black rounded-full flex items-center shadow-md hover:bg-red-500 hover:text-white"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
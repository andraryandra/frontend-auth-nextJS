import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { getUsers } from "@/app/services/user.service";

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  role: string;
  permissions: string[];
}

const Employees: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [permissionFilter, setPermissionFilter] = useState("");
  const [tableData, setTableData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers(currentPage, 10);
        if (response && Array.isArray(response.data)) {
          setTableData(response.data);
        } else {
          console.error("Expected an array but got:", response);
          setTableData([]); // Set to empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const filteredData = tableData.filter((data) => {
    return (
      data.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (roleFilter === "" || data.role === roleFilter) &&
      (permissionFilter === "" || data.permissions.includes(permissionFilter))
    );
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRoleFilter(event.target.value);
  };

  const handlePermissionFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPermissionFilter(event.target.value);
  };

  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex space-x-4 mb-4 items-center">
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
        </select>
        <select
          value={permissionFilter}
          onChange={handlePermissionFilterChange}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Permissions</option>
          <option value="Full Access">Full Access</option>
          <option value="Read">Read</option>
        </select>
        <div className="flex-grow"></div>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded flex items-center shadow-md hover:bg-green-600"
          title="Add"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">No</th>
              <th className="py-2 px-4 border-b text-left">Username</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Role</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((data, index) => (
              <tr key={data.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{startIndex + index + 1}</td>
                <td className="py-2 px-4 border-b">{data.username}</td>
                <td className="py-2 px-4 border-b">{data.email}</td>
                <td className="py-2 px-4 border-b">
                  {data.role ? (
                    <span
                      className={`px-2 py-1 rounded-full ${
                        data.role === "Admin"
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {data.role}
                    </span>
                  ) : (
                    ""
                  )}
                </td>
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
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Employees;
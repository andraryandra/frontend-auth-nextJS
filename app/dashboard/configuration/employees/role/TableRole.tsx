import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { RoleDto } from "@/app/Dto/role/role.dto";
import Pagination from "@/app/components/Pagination";

interface RoleTableProps {
  tableData: RoleDto[];
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
}

const TableRole: React.FC<RoleTableProps> = ({
  tableData,
  handleEdit,
  handleDelete,
  currentPage,
  totalPages,
  totalItems,
  handlePageChange,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const openDeleteModal = (id: string) => {
    setSelectedRoleId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRoleId) {
      handleDelete(selectedRoleId);
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoleId(null);
  };

  return (
    <div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="max-h-[455px] overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="py-2 px-4 border-b text-left">No</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((role, index) => (
                  <tr key={role.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="py-2 px-4 border-b">{role.name}</td>
                    <td className="py-2 px-4 border-b">{role.description}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                          onClick={() => handleEdit(role.id)}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                          onClick={() => openDeleteModal(role.id)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 px-6 border-b text-center text-gray-500"
                  >
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this role?</p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableRole;

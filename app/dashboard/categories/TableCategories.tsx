import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Pagination from "@/app/components/Pagination";
import { CategoriesDto } from "@/app/tools/Dto/categories/categories.dto";

interface CategoriesTableProps {
  tableData: CategoriesDto[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
}

const TableCategories: React.FC<CategoriesTableProps> = ({
  tableData,
  handleEdit,
  handleDelete,
  currentPage,
  totalItems,
  handlePageChange,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const openDeleteModal = (id: number) => {
    setSelectedCategoryId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCategoryId) {
      handleDelete(selectedCategoryId);
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategoryId(null);
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
                <th className="py-2 px-4 border-b text-left">Status</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((categories, index) => (
                  <tr key={categories.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="py-2 px-4 border-b">{categories.name}</td>
                    <td className="py-2 px-4 border-b">
                      {categories.description}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={
                          categories.status
                            ? "bg-green-100 text-green-700 font-bold py-1 px-3 rounded-full"
                            : "bg-red-100 text-red-700 font-bold py-1 px-3 rounded-full"
                        }
                      >
                        {categories.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                          onClick={() => handleEdit(categories.id)}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                          onClick={() => openDeleteModal(categories.id)}
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
                    colSpan={5}
                    className="py-4 px-6 border-b text-center text-gray-500"
                  >
                    No categories found.
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
        totalItems={totalItems}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this category?</p>
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

export default TableCategories;
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  handlePageChange,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [customLimit, setCustomLimit] = useState("");
  const [isCustomLimit, setIsCustomLimit] = useState(false);

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    if (value === "custom") {
      setIsCustomLimit(true); // Enable custom limit input
      setCustomLimit("");
    } else {
      setItemsPerPage(Number(value)); // Ensure it's stored as a number
      setIsCustomLimit(false); // Disable custom limit input
      handlePageChange(1); // Move to the first page when the limit is changed
    }
  };

  const handleCustomLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomLimit(event.target.value);
  };

  const handleCustomLimitSubmit = () => {
    const limit = Number(customLimit);
    if (limit > 0) {
      setItemsPerPage(limit);
      handlePageChange(1);
    }
  };

  const getPaginationRange = () => {
    if (totalItems === 0) {
      return [1]; // Only show page 1 if no items are found
    }

    const maxVisiblePages = 10; // Total number of pagination buttons to show
    const halfVisible = Math.floor((maxVisiblePages - 2) / 2); // Account for the first and last page buttons

    // Always include page 1 and the last page
    const pages = new Set([1, totalPages]);

    let start = currentPage - halfVisible;
    let end = currentPage + halfVisible;

    // Adjust start and end if they exceed the total pages
    if (start < 2) {
      // Ensure at least one page gap before page 1
      end += 2 - start; // Shift end right
      start = 2; // Reset start to 2 (to leave room for page 1)
    }
    if (end > totalPages - 1) {
      // Ensure at least one page gap before the last page
      start -= end - (totalPages - 1); // Shift start left
      end = totalPages - 1; // Reset end to the last page before the total
    }

    // Ensure start is always at least 2
    start = Math.max(start, 2);

    // Create the array of page numbers
    for (let i = start; i <= end; i++) {
      pages.add(i);
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2 w-1/3">
          <label htmlFor="itemsPerPage" className="text-gray-700">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={isCustomLimit ? "custom" : itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-2 py-1 border rounded w-24"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value="custom">Custom</option>
          </select>
          {isCustomLimit && (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={customLimit}
                onChange={handleCustomLimitChange}
                className="px-2 py-1 border rounded w-20"
                placeholder="Limit"
              />
              <button
                onClick={handleCustomLimitSubmit}
                className="px-2 py-1 bg-blue-500 text-white rounded flex items-center shadow-md hover:bg-blue-600"
                title="Set Limit"
              >
                Set
              </button>
            </div>
          )}
        </div>
        <div className="flex space-x-2 justify-center w-1/3">
          {/* Button for previous page */}
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-full disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          {/* Render page numbers */}
          {getPaginationRange().map((page) => (
            <React.Fragment key={page}>
              <button
                className={`px-4 py-2 border rounded-full ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-500"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </React.Fragment>
          ))}
          {/* Button for next page */}
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-full disabled:opacity-50"
            disabled={currentPage === totalPages || totalItems === 0}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="text-right w-1/3">
          Page {currentPage} of {totalItems === 0 ? 1 : totalPages}, Total items: {totalItems}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
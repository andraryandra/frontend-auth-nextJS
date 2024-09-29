import React, { useState, useEffect } from "react";
import {
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FunnelIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  handlePageChange: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  handlePageChange,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [customLimit, setCustomLimit] = useState("");
  const [isCustomLimit, setIsCustomLimit] = useState(false);

  // Recalculate totalPages on every change in totalItems or itemsPerPage
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    // If currentPage exceeds totalPages, set it back to last valid page
    if (currentPage > totalPages) {
      handlePageChange(totalPages);
    }
  }, [totalItems, itemsPerPage, currentPage, totalPages, handlePageChange]);

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
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let start = currentPage - halfVisible;
    let end = currentPage + halfVisible;

    // Adjust start and end if they exceed the total pages
    if (start < 1) {
      end += 1 - start;
      start = 1;
    }
    if (end > totalPages) {
      start -= end - totalPages;
      end = totalPages;
    }

    start = Math.max(start, 1);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
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
                className="px-2 py-1 border rounded w-16"
                placeholder="Limit"
                min="1"
              />
              <button
                onClick={handleCustomLimitSubmit}
                className="px-2 py-1 bg-blue-500 text-white rounded flex items-center shadow-md hover:bg-blue-600"
                title="Set Limit"
              >
                <FunnelIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        <div className="flex space-x-2 justify-center w-1/3">
          {/* Button for first page */}
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-full disabled:opacity-50 z-10"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            <ChevronDoubleLeftIcon className="h-5 w-5 pointer-events-none" />
          </button>
          {/* Button for previous page */}
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-full disabled:opacity-50 z-10"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeftIcon className="h-5 w-5 pointer-events-none" />
          </button>
          {/* Render page numbers */}
          {getPaginationRange().map((page) => (
            <React.Fragment key={page}>
              <button
                className={`px-4 py-2 border rounded-full ${
                  page === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-500"
                } z-10`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </React.Fragment>
          ))}
          {/* Button for next page */}
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-full disabled:opacity-50 z-10"
            disabled={currentPage >= totalPages} // Prevent moving to next if on the last page
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRightIcon className="h-5 w-5 pointer-events-none" />
          </button>
          {/* Button for last page */}
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-full disabled:opacity-50 z-10"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            <ChevronDoubleRightIcon className="h-5 w-5 pointer-events-none" />
          </button>
        </div>
        <div className="text-right w-1/3">
          Page {currentPage} of {totalItems === 0 ? 1 : totalPages}, Total
          items: {totalItems}
        </div>
      </div>
    </div>
  );
};

export default Pagination;

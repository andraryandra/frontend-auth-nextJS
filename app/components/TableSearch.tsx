import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  onReset: () => void;
  searchTerm: string;
}

const TableSearch: React.FC<SearchProps> = ({ onSearch, onReset, searchTerm }) => {
  const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setTempSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(tempSearchTerm);
  };

  const handleResetSearch = () => {
    setTempSearchTerm("");
    onReset();
  };

  return (
    <div className="flex space-x-4 mb-4 items-center">
      <input
        type="text"
        placeholder="Search..."
        value={tempSearchTerm}
        onChange={handleSearchChange}
        className="px-4 py-2 border rounded"
      />
      <button
        onClick={handleSearchSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded flex items-center shadow-md hover:bg-blue-600"
        title="Search"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
      {searchTerm && (
        <button
          onClick={handleResetSearch}
          className="px-4 py-2 bg-gray-500 text-white rounded flex items-center shadow-md hover:bg-gray-600"
          title="Reset"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default TableSearch;
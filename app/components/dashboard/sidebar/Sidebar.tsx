import React, { useState } from "react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } bg-white shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center justify-between h-16 border-b px-4">
        <h2 className="text-xl font-bold text-gray-800">
          {isSidebarOpen && "My Application"}
        </h2>
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      <div className="p-4">
        <button onClick={toggleDropdown} className="flex items-center w-full">
          <UserCircleIcon className="h-6 w-6" />
          {isSidebarOpen && (
            <>
              <span className="ml-2">User Menu</span>
              <ChevronDownIcon className={`h-4 w-4 ml-auto transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>
        {isDropdownOpen && isSidebarOpen && (
          <div className="mt-2">
            <button className="flex items-center w-full p-2 hover:bg-gray-100">
              <Cog6ToothIcon className="h-5 w-5" />
              <span className="ml-2">Settings</span>
            </button>
            <button className="flex items-center w-full p-2 hover:bg-gray-100">
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              <span className="ml-2">Adjustments</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
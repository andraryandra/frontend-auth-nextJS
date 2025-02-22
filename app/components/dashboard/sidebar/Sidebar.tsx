import React, { useState } from "react";
import Link from "next/link";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Bars3Icon,
  FolderIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const isActive = (path: string) => pathname.startsWith(path);
  const isExactActive = (path: string) => pathname === path;

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
        <button onClick={toggleSidebar} className="ml-auto">
          {isSidebarOpen ? (
            <ChevronLeftIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>
      <div className="p-4 space-y-2">
        <Link href="/dashboard" legacyBehavior>
          <a
            className={`flex items-center w-full p-2 hover:bg-gray-100 ${
              isExactActive("/dashboard") ? "active-link" : ""
            }`}
          >
            <HomeIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-2">Dashboard</span>}
          </a>
        </Link>
        <Link href="/dashboard/categories" legacyBehavior>
          <a
            className={`flex items-center w-full p-2 hover:bg-gray-100 ${
              isActive("/dashboard/categories") ? "active-link" : ""
            }`}
          >
            <FolderIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-2">Category</span>}
          </a>
        </Link>

        <button
          onClick={toggleDropdown}
          className="flex items-center w-full p-2 hover:bg-gray-100"
        >
          <UserCircleIcon className="h-6 w-6" />
          {isSidebarOpen && (
            <>
              <span className="ml-2">User Menu</span>
              <ChevronDownIcon
                className={`h-4 w-4 ml-auto transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </>
          )}
        </button>
        {isDropdownOpen && isSidebarOpen && (
          <>
            <Link href="/settings" legacyBehavior>
              <a
                className={`flex items-center w-full p-2 hover:bg-gray-100 ml-4 ${
                  isActive("/settings") ? "active-link" : ""
                }`}
              >
                <Cog6ToothIcon className="h-5 w-5" />
                <span className="ml-2">Settings</span>
              </a>
            </Link>
            <Link href="/adjustments" legacyBehavior>
              <a
                className={`flex items-center w-full p-2 hover:bg-gray-100 ml-4 ${
                  isActive("/adjustments") ? "active-link" : ""
                }`}
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                <span className="ml-2">Adjustments</span>
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
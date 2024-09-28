"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  XMarkIcon,
  BellIcon,
  UserCircleIcon,
  Bars3Icon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { getUserInfo, logoutUser } from "../services/auth.service";
import { UserDto } from "../Dto/authDto/UserDto";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // Profile menu state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Sidebar dropdown state
  const profileMenuRef = useRef<HTMLDivElement | null>(null); // Ref for outside click detection

  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    } 
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-lg transition-all duration-300`}
      >
        <div className="flex items-center justify-between h-16 border-b px-4">
          <h2 className="text-xl font-bold text-gray-800">
            {isSidebarOpen && "My Application"}
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800"
          >
            {isSidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <a
                href="#"
                className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200 transition duration-300"
              >
                <UserCircleIcon className="h-5 w-5 mr-2" />
                <span className={isSidebarOpen ? "" : "hidden"}>Home</span>
              </a>
            </li>

            {/* Dropdown Item */}
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full py-2 px-4 text-gray-600 hover:bg-gray-200 transition duration-300"
              >
                <div className="flex items-center">
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  <span className={isSidebarOpen ? "" : "hidden"}>Profile</span>
                </div>
                {isSidebarOpen && (
                  <ChevronDownIcon
                    className={`h-5 w-5 transition-transform ${
                      isDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                )}
              </button>

              {isDropdownOpen && isSidebarOpen && (
                <ul className="ml-6 mt-2">
                  <li className="pl-2 py-1">
                    <a
                      href="#"
                      className="flex items-center text-gray-600 hover:text-gray-900 transition"
                    >
                      <Cog6ToothIcon className="h-4 w-4 mr-2" />
                      Edit Profile
                    </a>
                  </li>
                  <li className="pl-2 py-1">
                    <a
                      href="#"
                      className="flex items-center text-gray-600 hover:text-gray-900 transition"
                    >
                      <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
                      Account Settings
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a
                href="#"
                className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-200 transition duration-300"
              >
                <Cog6ToothIcon className="h-5 w-5 mr-2" />
                <span className={isSidebarOpen ? "" : "hidden"}>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between h-16 bg-white shadow-md px-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800 md:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="relative flex items-center space-x-4">
            <button className="relative">
              <BellIcon className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 bg-red-500 text-white rounded-full text-xs font-bold">
                3
              </span>
            </button>
            <button onClick={toggleProfileMenu} className="flex items-center space-x-2">
              <Image
                src="/images/tes.png"
                alt="Profile"
                className="h-8 w-8 rounded-full border border-gray-300"
                width={32}
                height={32}
              />
              <span className="text-gray-700">{user?.username}</span> {/* Tampilkan nama pengguna */}
            </button>

            {/* Profile dropdown menu */}
            {isProfileMenuOpen && (
              <div
                ref={profileMenuRef}
                className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
              >
                <ul className="py-2">
                  <li>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <UserCircleIcon className="h-5 w-5 mr-2" />
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Cog6ToothIcon className="h-5 w-5 mr-2" />
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                      Configuration
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        logoutUser();
                        window.location.href = "/login";
                      }}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome to the Dashboard!
          </h2>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-700">Your Stats</h3>
            <p className="text-gray-600">Here you can display some stats...</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

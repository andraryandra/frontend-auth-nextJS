import React, { useRef, useState, useEffect } from "react";
import {
  BellIcon,
  Cog6ToothIcon,
  AdjustmentsHorizontalIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { getUserInfo, logoutUser } from "@/app/services/auth.service";
import { UserDto } from "@/app/Dto/authDto/UserDto";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
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
    <header className="flex items-center justify-between h-16 bg-white shadow-md px-4">
      <h1 className="text-xl font-semibold text-gray-800">
        <Link href="/dashboard/">Dashboard</Link>
      </h1>
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
          <span className="text-gray-700">{user?.username}</span>
        </button>

        {isProfileMenuOpen && (
          <div
            ref={profileMenuRef}
            className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
          >
            <ul className="py-2">
              <li>
                <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <UserCircleIcon className="h-5 w-5 mr-2" />
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <Cog6ToothIcon className="h-5 w-5 mr-2" />
                  Settings
                </a>
              </li>
              <li>
                <Link href="/dashboard/configuration" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                  Configuration
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logoutUser();
                    window.location.replace("/login");
                  }}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

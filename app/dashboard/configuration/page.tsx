"use client";

import Navbar from "@/app/components/dashboard/navbar/Navbar";
import Link from "next/link";
import React from "react";
import {
  UserIcon,
  CogIcon,
  BellIcon,
  MapIcon,
  ChartBarIcon,
  CalendarIcon,
  DocumentIcon,
  HeartIcon,
  QuestionMarkCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

const ConfigurationPage = () => {
  const cardData = [
    { text: "Employees", icon: <UserPlusIcon className="h-6 w-6" />, url: "/dashboard/configuration/employees" },
    { text: "Profile", icon: <UserIcon className="h-6 w-6" />, url: "/profile" },
    { text: "Settings", icon: <CogIcon className="h-6 w-6" />, url: "/settings" },
    { text: "Notifications", icon: <BellIcon className="h-6 w-6" />, url: "/notifications" },
    { text: "Messages", icon: <MapIcon className="h-6 w-6" />, url: "/messages" },
    { text: "Analytics", icon: <ChartBarIcon className="h-6 w-6" />, url: "/analytics" },
    { text: "Calendar", icon: <CalendarIcon className="h-6 w-6" />, url: "/calendar" },
    { text: "Documents", icon: <DocumentIcon className="h-6 w-6" />, url: "/documents" },
    { text: "Comments", icon: <HeartIcon className="h-6 w-6" />, url: "/comments" },
    { text: "Help", icon: <QuestionMarkCircleIcon className="h-6 w-6" />, url: "/help" },
  ];

  const smallCards = cardData.map((card, index) => (
    <Link key={index} href={card.url}>
      <div className="relative z-0 bg-white rounded-lg p-6 border border-gray-300 h-36 cursor-pointer flex items-center shadow-md hover:outline hover:outline-blue-500">
        <div className="mr-4">{card.icon}</div>
        <p className="font-bold m-0">{card.text}</p>
      </div>
    </Link>
  ));

  return (
    <div className="bg-white min-h-screen box-border">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex justify-center items-center h-[calc(100vh-80px)] overflow-hidden">
        <div className="w-11/12 h-5/6 bg-gray-200 rounded-lg p-5 overflow-auto border-2 border-black box-border">
          {/* Large card content */}
          <div className="grid grid-cols-4 gap-5 pb-5">
            {smallCards}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPage;
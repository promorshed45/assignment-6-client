"use client";
import { DollarSign, Menu, TableOfContents, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export const navItems = [
  {
    icon: <User />,
    label: "All User",
    href: "/admin/all-user",
  },
  {
    icon: <TableOfContents />,
    label: "Content Management",
    href: "/admin/content-management",
  },
  {
    icon: <DollarSign />,
    label: "Payment Management",
    href: "/admin/payment-management",
  }
];

const AdminSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Sidebar বন্ধ হবে
  };

  return (
    <div>
      <div className="absolute top-14 left-0">
      <button
        aria-controls="default-sidebar"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
        onClick={toggleSidebar}
      >
        {/* <span className="sr-only">Open sidebar</span> */}
        <Menu/>
      </button>
      </div>

      <div className={`h-screen pr-3 py-4 overflow-y-auto border-r border-gray-800 hidden sm:block`}>
        <ul className="space-y-2 font-medium">
        {navItems.map((item) => (
            <li key={item.href} className="flex items-center text-gray-400 hover:rounded-md p-2 hover:bg-gray-700">
              {item.icon}
              <Link className="ms-3" href={item.href} onClick={handleLinkClick}>
                {item.label}
              </Link>
            </li>
          ))}

        </ul>
      </div>

      
      <div className={`h-screen pr-3 p-6 overflow-y-auto border-r border-gray-800 fixed inset-y-0 left-0 bg-black transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
        <ul className="space-y-3 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.href} className="flex text-gray-400 hover:rounded-md hover:p-2 hover:bg-gray-700 items-center">
              {item.icon}
              <Link className="ms-3" href={item.href} onClick={handleLinkClick}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;

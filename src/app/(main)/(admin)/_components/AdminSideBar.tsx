"use client";
import { DollarSign, TableOfContents, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const AdminSideBar = () => {
  return (
    <div>
      <button
        aria-controls="default-sidebar"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        type="button"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          aria-hidden="true"
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            fillRule="evenodd"
          />
        </svg>
      </button>

      <div className="h-screen pr-3 py-4 overflow-y-auto  border-r border-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              href="/admin/all-user"
            >
              <User />
              <span className="ms-3">All User</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              href="/admin/content-management"
            >
              <TableOfContents />
              <span className="ms-3">Content Management</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              href="/admin/payment-Management"
            >
              <DollarSign />
              <span className="ms-3">Payment Management</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;

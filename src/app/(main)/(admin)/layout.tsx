import React, { ReactNode } from "react";

import AdminSideBar from "./_components/AdminSideBar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <div className="pt-28">
      <AdminSideBar/>
      </div>
      <main className="container mx-auto max-w-7xl py-6 px-6 flex-grow">
        {children}
      </main>
    </div>
  );
};

export default layout;

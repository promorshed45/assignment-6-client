import { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex flex-col light:bg-[#f9f6ef] dark:bg-[#010313]">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
    </div>
  );
};

export default layout;

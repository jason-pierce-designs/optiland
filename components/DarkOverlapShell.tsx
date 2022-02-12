import React, { ReactNode } from "react";

import Navbar from "../components/DarkNavbar";

type Props = {
  children: ReactNode;
  className?: string;
  title?: string;
};

export default function DarkOverlapShell({ children, title }: Props) {
  return (
    <>
      <div className="bg-gray-800 pb-32">
        <Navbar />
        {title && (
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">{title}</h1>
            </div>
          </header>
        )}
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </>
  );
}

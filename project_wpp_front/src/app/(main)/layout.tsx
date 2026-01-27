'use client';

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#f8fafc]">
      <div className="flex h-screen">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden glass"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col relative overflow-auto w-full">
          <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
          <main className="p-4 md:p-8 flex flex-col flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

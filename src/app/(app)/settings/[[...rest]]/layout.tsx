import React from "react";
import TopNav from "@/components/landing/topNav";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    rest?: string[];
  };
}

export default function SettingsLayout({ children, params }: LayoutProps) {
  return (
    <>
      <TopNav />
      <div className="flex justify-center py-10 bg-background min-h-[80vh]">
        {children}
      </div>
    </>
  );
}

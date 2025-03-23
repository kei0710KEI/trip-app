// app/create-trip/layout.tsx
import React from "react";

export default function MyTripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* 背景 */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* ページの内容 */}
      {children}
    </div>
  );
}

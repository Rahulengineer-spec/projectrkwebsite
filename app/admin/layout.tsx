'use client';

import { AdminNav } from "./components/admin-nav";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 overflow-auto">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
    </div>
  );
} 
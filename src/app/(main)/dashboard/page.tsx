import { Suspense } from "react";
import Dashboard from "./Dashboard";

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 h-full gap-6 md:p-4">
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  )
}
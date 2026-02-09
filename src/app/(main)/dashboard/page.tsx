import { Suspense } from "react";
import Dashboard from "./components/Dashboard";
import PageFallback from "@/components/loading/PageFallback";
import { DashboardSkeleton } from "./DashboardSkeleton";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full p-4">
      <Suspense fallback={<PageFallback skeleton={<DashboardSkeleton />}/>}>
        <Dashboard />
      </Suspense>
    </div>
  )
}
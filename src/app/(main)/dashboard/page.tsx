import { Suspense } from "react";
import Dashboard from "./components/Dashboard";
import PageFallback from "@/components/loading/PageFallback";
import { DashboardSkeleton } from "./components/DashboardSkeleton";

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 h-full gap-6 md:p-4">
      <Suspense fallback={<PageFallback skeleton={<DashboardSkeleton />}/>}>
        <Dashboard />
      </Suspense>
    </div>
  )
}
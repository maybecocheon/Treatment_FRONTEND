import { Suspense } from "react";
import History from "./History";
import PageFallback from "@/components/skeletons/PageFallback";
import HistorySkeleton from "./HistorySkeleton";

export default async function HistoryPage() {
  return (
    <Suspense fallback={<PageFallback skeleton={<HistorySkeleton />} />}>
      <History />
    </Suspense>
  );
}

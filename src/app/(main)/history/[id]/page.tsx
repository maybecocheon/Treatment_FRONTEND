import { Suspense } from "react";
import History from "../History";
import PageFallback from "@/components/loading/PageFallback";
import HistorySkeleton from "../HistorySkeleton";

export default async function HistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<PageFallback skeleton={<HistorySkeleton />} />}>
      <History params={{ id }} />
    </Suspense>
  );
}

import { Suspense } from "react";
import History from "../History";

export default async function HistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div>Loading history details...</div>}>
      <History params={{ id }} />
    </Suspense>
  );
}

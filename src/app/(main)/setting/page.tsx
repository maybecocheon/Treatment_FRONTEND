import { Suspense } from "react";
import Setting from "./Setting";
import PageFallback from "@/components/loading/PageFallback";
import SettingSkeleton from "./SettingSkeleton";

export default function ProfilePage() {
  return (
    <div className="flex flex-col flex-1 h-full gap-8 md:p-6">
      <Suspense fallback={<PageFallback skeleton={<SettingSkeleton />} />}>
        <Setting />
      </Suspense>
    </div>
  );
};
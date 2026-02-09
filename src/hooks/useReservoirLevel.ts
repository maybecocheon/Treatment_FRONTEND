import { myFetch } from "@/api/api";
import { ReservoirLevelType } from "@/types/types";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useReservoirLevel() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [reservoirLevels, setReservoirLevels] = useState<ReservoirLevelType[]>([]);

    const loadLevels = useCallback(async () => {
            try {
                const response = await myFetch(`${baseUrl}/reservoir/levels?date=2023-01-06 00:00:01`);
                const data = await response.json();
                if (response.ok) {
                    setReservoirLevels(data);
                } else {
                    toast.error(data.message || "수위 불러오기 실패");
                }
            } catch (error) {
                console.error("수위 불러오기 오류", error);
            }
    }, []);

    return { reservoirLevels, loadLevels };
}

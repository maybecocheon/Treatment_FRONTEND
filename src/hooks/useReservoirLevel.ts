import { useCallback, useState } from "react";

export interface ReservoirLevelType {
    reservoirName: string;
    facilityId: number,
    level: number
}

export function useReservoirLevel() {
    const [reservoirLevels, setReservoirLevels] = useState<ReservoirLevelType[]>([]);

    const loadLevels = useCallback(async () => {
            try {
                const response = await fetch("/api/proxy/reservoir/levels?date=2023-01-06 00:00:01");
                const data = await response.json();
                setReservoirLevels(data);
            } catch (error) {
                console.error("수위 불러오기 실패", error);
            }
    }, []);

    return { reservoirLevels, loadLevels };
}

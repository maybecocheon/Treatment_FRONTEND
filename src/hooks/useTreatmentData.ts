import { useCallback, useState } from "react";

export interface TreatmentType {
    pressOutAvg: number;
    flowOutAmt: number;
    reservoirCnt: number
}

export function useTreatmentData() {
    const [treatment, setTreatment] = useState<TreatmentType | null>(null);

    const loadTreatment = useCallback(async () => {
        try {
            const response = await fetch("/api/proxy/treatment/now?date=2023-01-06 00:00:01");
            const data = await response.json();
            setTreatment(data);
        } catch (error) {
            console.error("정수장 정보 불러오기 실패", error);
        }
    }, []);

    return { treatment, loadTreatment };
}

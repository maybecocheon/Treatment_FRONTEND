import { myFetch } from "@/api/api";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export interface TreatmentType {
    pressOutAvg: number;
    flowOutAmt: number;
    reservoirCnt: number
}

export function useTreatmentData() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [treatment, setTreatment] = useState<TreatmentType | null>(null);

    const loadTreatment = useCallback(async () => {
        try {
            const response = await myFetch(`${baseUrl}/treatment/now?date=2023-01-06 00:00:01`);

            const data = await response.json();
            if (response.ok) {
                setTreatment(data);
            } else {
                toast.error(data.message || "정수장 정보 불러오기 실패");
            }
        } catch (error) {
            console.error("정수장 정보 불러오기 오류", error);
            toast.error("정수장 정보 불러오기 오류");
        }
    }, []);

    return { treatment, loadTreatment };
}

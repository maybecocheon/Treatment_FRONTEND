import dayjs from "dayjs";
import {
    FacilityType,
    TreatmentType,
    ReservoirLevelType,
    PredictionAllType,
    TreatmentHistoryType,
    ReservoirHistoryType,
    TreatmentHistoryChartType,
    ReservoirHistoryChartType,
    SimulationType
} from "@/types/types";

/**
 * Mock API Service
 * Generates dynamic fake data for all current API endpoints.
 */
class MockApiService {
    private facilities: FacilityType[] = [
        { facilityId: 1, name: "중앙 정수장", type: "정수장" },
        { facilityId: 2, name: "AA 가압장", type: "가압장" },
        { facilityId: 3, name: "AB 가압장", type: "가압장" },
        { facilityId: 4, name: "A 배수지", type: "배수지" },
        { facilityId: 5, name: "B 배수지", type: "배수지" },
        { facilityId: 6, name: "C 배수지", type: "배수지" },
        { facilityId: 7, name: "D 배수지", type: "배수지" },
        { facilityId: 8, name: "E 배수지", type: "배수지" },
        { facilityId: 9, name: "F 배수지", type: "배수지" },
        { facilityId: 10, name: "G 배수지", type: "배수지" },
        { facilityId: 11, name: "H 배수지", type: "배수지" },
        { facilityId: 12, name: "I 배수지", type: "배수지" },
        { facilityId: 13, name: "J 배수지", type: "배수지" },
        { facilityId: 14, name: "K 배수지", type: "배수지" },
        { facilityId: 15, name: "L 배수지", type: "배수지" },
    ];

    private getRandomValue(min: number, max: number, seed?: string) {
        if (seed) {
            // Simple seed-based random for consistency
            let hash = 0;
            for (let i = 0; i < seed.length; i++) {
                hash = ((hash << 5) - hash) + seed.charCodeAt(i);
                hash |= 0;
            }
            const x = Math.sin(hash) * 10000;
            return min + (x - Math.floor(x)) * (max - min);
        }
        return Math.random() * (max - min) + min;
    }

    async getFacilities(): Promise<FacilityType[]> {
        return this.facilities;
    }

    async getTreatmentNow(date?: string): Promise<TreatmentType> {
        const seed = date || dayjs().format("YYYY-MM-DD HH:mm");
        return {
            pressOutAvg: this.getRandomValue(3.5, 5.5, seed + "press"),
            flowOutAmt: this.getRandomValue(15000, 25000, seed + "flow"),
            reservoirCnt: 12
        };
    }

    async getReservoirNow(date?: string): Promise<ReservoirLevelType[]> {
        const seed = date || dayjs().format("YYYY-MM-DD HH:mm");
        return this.facilities
            .filter(f => f.type === "배수지")
            .map(f => ({
                reservoirName: f.name,
                facilityId: f.facilityId,
                level: this.getRandomValue(2.0, 5.0, seed + f.facilityId + "level"),
                minLevel: 1.5,
                maxLevel: 6.0,
                flowIn: this.getRandomValue(500, 1500, seed + f.facilityId + "flowIn"),
                area: 1200,
                riskStatus: "normal" as const
            }));
    }

    async getHistoryInfo(facilityId: number, date?: string): Promise<TreatmentHistoryType | ReservoirHistoryType> {
        const facility = this.facilities.find(f => f.facilityId === facilityId);
        const seed = (date || dayjs().format("YYYY-MM-DD")) + facilityId;

        const common = {
            facilityId,
            powerConsumption: Math.floor(this.getRandomValue(1000, 5000, seed + "power")),
            detectionCnt: Math.floor(this.getRandomValue(0, 3, seed + "detect")),
            maxFlowOut: this.getRandomValue(2000, 5000, seed + "maxFlow")
        };

        if (facility?.type === "정수장") {
            return {
                ...common,
                avgPress: this.getRandomValue(4.0, 4.5, seed + "avgPress"),
            } as TreatmentHistoryType;
        } else {
            return {
                ...common,
                avgLevel: this.getRandomValue(3.0, 4.0, seed + "avgLevel"),
            } as ReservoirHistoryType;
        }
    }

    async getHistoryChartMonth(facilityId: number, date?: string): Promise<TreatmentHistoryChartType[] | ReservoirHistoryChartType[]> {
        const facility = this.facilities.find(f => f.facilityId === facilityId);
        const daysInMonth = 30;
        const result: any[] = [];
        const monthPrefix = date ? date.substring(0, 7) : dayjs().format("YYYY-MM");

        for (let i = 1; i <= daysInMonth; i++) {
            const dayStr = i < 10 ? `0${i}` : `${i}`;
            const time = `${monthPrefix}-${dayStr}`;
            const seed = time + facilityId;

            if (facility?.type === "정수장") {
                result.push({
                    time,
                    pressPipe: this.getRandomValue(3.8, 4.8, seed + "press"),
                    flowOut: this.getRandomValue(10000, 30000, seed + "flow")
                });
            } else {
                result.push({
                    time,
                    level: this.getRandomValue(2.5, 4.5, seed + "level"),
                    flowOut: this.getRandomValue(500, 2000, seed + "flow")
                });
            }
        }
        return result;
    }

    async getHistoryChartDay(facilityId: number, date?: string): Promise<TreatmentHistoryChartType[] | ReservoirHistoryChartType[]> {
        const facility = this.facilities.find(f => f.facilityId === facilityId);
        const hoursInDay = 24;
        const result: any[] = [];
        const datePrefix = date ? date.substring(0, 10) : dayjs().format("YYYY-MM-DD");

        for (let i = 0; i < hoursInDay; i++) {
            const hourStr = i < 10 ? `0${i}` : `${i}`;
            const time = `${datePrefix}T${hourStr}:00:00`;
            const seed = time + facilityId;

            if (facility?.type === "정수장") {
                result.push({
                    time,
                    pressPipe: this.getRandomValue(3.8, 4.8, seed + "press"),
                    flowOut: this.getRandomValue(10000, 30000, seed + "flow")
                });
            } else {
                result.push({
                    time,
                    level: this.getRandomValue(2.5, 4.5, seed + "level"),
                    flowOut: this.getRandomValue(500, 2000, seed + "flow")
                });
            }
        }
        return result;
    }

    async getPredictionAll(): Promise<PredictionAllType[]> {
        const seed = dayjs().format("YYYY-MM-DD HH");
        return this.facilities.map(f => ({
            facilityId: f.facilityId,
            flowInAmt: f.type === "정수장" ? 0 : this.getRandomValue(1000, 3000, seed + f.facilityId + "in"),
            flowOutAmt: this.getRandomValue(1000, 4000, seed + f.facilityId + "out")
        }));
    }

    async getSimulationRun(pumpId: number, date?: string): Promise<SimulationType[]> {
        const hours = 24;
        const now = dayjs(date || undefined);

        // Return results for a few affected reservoirs
        return [4, 5, 6].map(facilityId => {
            const facility = this.facilities.find(f => f.facilityId === facilityId);
            const chartData = [];
            for (let i = 0; i < hours; i++) {
                const time = now.add(i, "hour").format("HH:mm");
                const seed = time + facilityId + pumpId + "sim";
                chartData.push({
                    time,
                    flowOut: this.getRandomValue(1000, 3000, seed + "flowOut"),
                    flowIn: this.getRandomValue(1000, 3000, seed + "flowIn"),
                    predictLevel: this.getRandomValue(2.5, 5.0, seed + "level")
                });
            }
            return {
                facilityId,
                facilityName: facility?.name,
                maxLevel: 6.0,
                minLevel: 1.5,
                chartData
            };
        });
    }

    /**
     * Handles myFetch calls in mock mode
     */
    async getTreatmentOptimization(date?: string): Promise<any> {
        const seed = date || dayjs().format("YYYY-MM-DD");
        const chartData = [];
        const reservoirs = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

        for (let i = 0; i < 48; i++) {
            const hour = i / 2;
            const time = dayjs().startOf("day").add(i * 30, "minute").format("YYYY-MM-DDTHH:mm:ss");
            const entry: any = { time, pumpNum: Math.floor(this.getRandomValue(1, 4, seed + i + "pump")) };

            // Simulating daily pattern using sine wave (min at 4am, max at 4pm)
            const sineBase = Math.sin((hour - 10) * Math.PI / 12) * 0.5 + 3.5;

            reservoirs.forEach(r => {
                entry[`level${r}`] = this.getRandomValue(sineBase - 0.2, sineBase + 0.2, seed + i + r);
            });
            chartData.push(entry);
        }
        return {
            chartData,
            simCost: Math.floor(this.getRandomValue(1000000, 1500000, seed + "cost"))
        };
    }

    async getTreatmentCost(date?: string): Promise<number> {
        const seed = date || dayjs().format("YYYY-MM-DD");
        return Math.floor(this.getRandomValue(1200000, 1800000, seed + "costBase"));
    }

    async getReservoirPrediction(selectedId: number, date?: string): Promise<any> {
        const seed = (date || dayjs().format("YYYY-MM-DD HH")) + selectedId;
        const result = [];
        const now = dayjs();
        const startOfToday = now.startOf("day");

        for (let i = 0; i < 1440; i += 10) { // 10 minute intervals
            const hour = i / 60;
            const time = startOfToday.add(i, "minute").format("YYYY-MM-DDTHH:mm:ss");
            const sineBase = Math.sin((hour - 10) * Math.PI / 12) * 1.0 + 3.5;

            result.push({
                time,
                actualValue: i <= now.diff(startOfToday, "minute") ? this.getRandomValue(sineBase - 0.1, sineBase + 0.1, seed + i) : null,
                predictedValue: this.getRandomValue(sineBase - 0.3, sineBase + 0.3, seed + i + "p")
            });
        }
        return {
            chartData: result,
            currentLevel: this.getRandomValue(3.0, 4.0, seed),
            maxLevel: 6.0,
            predictionAccuracy: this.getRandomValue(92, 98, seed)
        };
    }

    async getOnlyPrediction(selectedId: number, date?: string): Promise<any> {
        const seed = (date || dayjs().format("YYYY-MM-DD HH")) + selectedId;
        const predictList = [];
        const startOfToday = dayjs().startOf("day");

        for (let i = 0; i < 144; i++) {
            const hour = (i * 10) / 60;
            const sineBase = Math.sin((hour - 10) * Math.PI / 12) * 50 + 400;
            predictList.push({
                time: startOfToday.add(i * 10, "minute").format("YYYY-MM-DDTHH:mm:ss"),
                predictedValue: this.getRandomValue(sineBase - 50, sineBase + 50, seed + i)
            });
        }
        return { predictList };
    }

    /**
     * Handles myFetch calls in mock mode
     */
    async handleMockRequest(url: string) {
        if (url.includes("/facility/all")) return this.getFacilities();
        if (url.includes("/treatment/now")) {
            const date = new URL(url, "http://localhost").searchParams.get("date");
            return this.getTreatmentNow(date || undefined);
        }
        if (url.includes("/reservoir/levels")) {
            const date = new URL(url, "http://localhost").searchParams.get("date");
            return this.getReservoirNow(date || undefined);
        }
        if (url.includes("/reservoir/predict")) {
            return this.getPredictionAll();
        }
        if (url.includes("/treatment/chart/minute")) {
            const date = new URL(url, "http://localhost").searchParams.get("date");
            return this.getTreatmentOptimization(date || undefined);
        }
        if (url.includes("/treatment/cost")) {
            const date = new URL(url, "http://localhost").searchParams.get("date");
            return this.getTreatmentCost(date || undefined);
        }
        if (url.includes("/reservoir/chart/predict/")) {
            const parts = url.split("/");
            const id = parseInt(parts[parts.length - 1].split("?")[0]) || 4;
            const date = new URL(url, "http://localhost").searchParams.get("date");
            return this.getOnlyPrediction(id, date || undefined);
        }
        if (url.includes("/reservoir/chart/")) {
            const parts = url.split("/");
            const id = parseInt(parts[parts.length - 1].split("?")[0]) || 4;
            const date = new URL(url, "http://localhost").searchParams.get("date");
            return this.getReservoirPrediction(id, date || undefined);
        }
        if (url.includes("/treatment/history/info")) {
            const date = new URL(url, "http://localhost").searchParams.get("date");
            return this.getHistoryInfo(1, date || undefined);
        }
        if (url.includes("/reservoir/history/info")) {
            const parts = url.split("/");
            const facilityId = parseInt(parts[parts.length - 1].split("?")[0]);
            const date = new URL(url, "http://localhost").searchParams.get("date");
            return this.getHistoryInfo(facilityId || 4, date || undefined);
        }
        if (url.includes("/history/chart/month")) {
            const isTreatment = url.includes("/treatment/");
            const date = new URL(url, "http://localhost").searchParams.get("date");
            let facilityId = 1;
            if (!isTreatment) {
                const parts = url.split("/");
                facilityId = parseInt(parts[parts.length - 1].split("?")[0]) || 4;
            }
            return this.getHistoryChartMonth(facilityId, date || undefined);
        }
        if (url.includes("/history/chart/day")) {
            const isTreatment = url.includes("/treatment/");
            const date = new URL(url, "http://localhost").searchParams.get("date");
            let facilityId = 1;
            if (!isTreatment) {
                const parts = url.split("/");
                facilityId = parseInt(parts[parts.length - 1].split("?")[0]) || 4;
            }
            return this.getHistoryChartDay(facilityId, date || undefined);
        }
        if (url.includes("/member/profile") || url.includes("/member/update/")) {
            return { username: "admin", alias: "관리자", department: "운영팀" };
        }
        if (url.includes("/member/delete") || url.includes("/auth/logout") || url.includes("/auth/signup")) {
            return { success: true };
        }
        if (url.includes("/member/check/")) {
            return { success: true };
        }
        if (url.includes("/reservoir/simulator/")) {
            const parts = url.split("/");
            const pumpId = parseInt(parts[parts.length - 1].split("?")[0]) || 1;
            const date = new URL(url, "http://localhost").searchParams.get("date");
            return this.getSimulationRun(pumpId, date || undefined);
        }

        console.warn(`Mock API: No handler for URL ${url}`);
        return {};
    }
}

export const mockApiService = new MockApiService();

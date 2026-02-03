interface FetchPredictionDataParams {
    setReservoir: (data: number[]) => void;
    setRawChartData: (data: { time: string; actualValue: number; predictedValue: number }[]) => void;
    id: string;
}

export const fetchPredictionData = async ({setReservoir, setRawChartData, id}: FetchPredictionDataParams) => {
    const response = await fetch(`/api/proxy/reservoir/chart/minite/${id}?date=2023-01-06 00:00:00`);
    const data = await response.json();
    setReservoir(data);
    setRawChartData(data.chartData.map((item: any, idx: number) => ({
        time: item.time.split("T")[1].substring(0, 5) || "",
        // idx가 cutoffIndex보다 크면 null 처리 (차트 라이브러리에서 보통 공백으로 처리됨)
        actualValue: idx < 1000 ? item.actualValue : null,
        predictedValue: item.predictedValue || 0,
    })));
};
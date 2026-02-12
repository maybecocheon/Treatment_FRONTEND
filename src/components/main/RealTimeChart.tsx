"use client";
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function RealTimeChart() {
  const [data, setData] = useState<any[]>([]);

  // 1. 초기 데이터 로드 (최근 24시간분)
  useEffect(() => {
    const fetchInitialData = async () => {
      // API 호출로 96개의 데이터를 가져온다고 가정
      const res = await fetch('/api/chart-data');
      const initialData = await res.json();
      setData(initialData);
    };
    fetchInitialData();

    // 2. 15분마다 폴링
    const timer = setInterval(() => {
      updateNewData();
    }, 15 * 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const updateNewData = async () => {
    const newDataPoint = await fetch('/api/latest-point').then(r => r.json());
    setData((prev) => {
      const updated = [...prev, newDataPoint];
      // 96개(24시간)를 초과하면 가장 오래된 것 삭제
      return updated.length > 96 ? updated.slice(1) : updated;
    });
  };

  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'time', // 시간축 자동 설정
      boundaryGap: false,
      splitLine: { show: false }
    },
    yAxis: { type: 'value' },
    series: [{
      name: '실시간 데이터',
      type: 'line',
      showSymbol: false,
      data: data.map(item => ({
        name: item.timestamp,
        value: [item.timestamp, item.value] // [X축 시간, Y축 값]
      })),
      areaStyle: {} // 영역 색상 채우기
    }]
  };

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
}
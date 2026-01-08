import type {ChartOptions} from 'chart.js';
import {StatsType} from "./StatsType.ts";

export function createOptions(statisticType?: string): ChartOptions {
    return {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                max: statisticType === StatsType.Births
                    ? 8000
                    : 100,
                ticks: {
                    callback: (value) => statisticType == StatsType.Births ? value : value + '%'
                }
            }
        },
    }
}


export const datasetLabels = new Map([
    [StatsType.Births, 'Liczba porodów'],
    [StatsType.Cesareans, 'Odsetek cięć cesarskich'],
    [StatsType.Episiotomies, 'Odsetek nacięć krocza'],
    [StatsType.Anesthesias, 'Odsetek znieczuleń']
]);

export const datasetColors = new Map([
    [StatsType.Births, '#50ad9f'],
    [StatsType.Cesareans, '#e9c716'],
    [StatsType.Episiotomies, '#bc272d'],
    [StatsType.Anesthesias, '#0000a2']
]);
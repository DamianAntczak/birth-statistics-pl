export interface GraphData {
    [key: string]: {
        years: string[];
        statistics: {
            [statKey: string]: number[];
        };
    };
}

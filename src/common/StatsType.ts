
export const StatsType = {
    Births: 'births',
    Cesareans: 'cesarean',
    Episiotomies: 'episiotomy',
    Anesthesias: 'anesthesia'
} as const;

export type StatsType = typeof StatsType[keyof typeof StatsType];

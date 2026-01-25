
export const StatsType = {
    Births: 'porody',
    Cesareans: 'cesarskie-ciecia',
    Episiotomies: 'naciecia-krocza',
    Anesthesias: 'znieczulenia'
} as const;

export type StatsType = typeof StatsType[keyof typeof StatsType];

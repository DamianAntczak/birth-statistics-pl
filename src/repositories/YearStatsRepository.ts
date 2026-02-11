const modules = import.meta.glob('/src/assets/year-stats-*.json');

const cache = new Map();

export default class YearStatsRepository {
    static async getVoivodeshipData(voivodeshipCode: string) {

        if(cache.has(voivodeshipCode)) {
            return cache.get(voivodeshipCode);
        }

        const fileEntry = Object.entries(modules).find(([path]) => 
            path.includes(`year-stats-${voivodeshipCode}.json`)
        )


        if(!fileEntry) {
            console.error(`No file for voivodeship: ${voivodeshipCode}`);
            return null;
        }

        const [, loader] = fileEntry;
        const module = await loader();
        const data = module.default;


        cache.set(voivodeshipCode, data);
        return data;
    }

    static async getGraphData(voivodeshipCode: string, hospitalId: string) {
        const voivodeshipData = await this.getVoivodeshipData(voivodeshipCode);
        return voivodeshipData?.graphDataMap?.[hospitalId] ?? null;
    }
}
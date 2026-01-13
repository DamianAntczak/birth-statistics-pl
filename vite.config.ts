import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap';
import {StatsType} from './src/common/StatsType.ts'
import hospitals from './src/assets/hospitals.json';

let dynamicRoutes: string[] = [];
hospitals.forEach((hospital) => {
    Object.values(StatsType).forEach(type => {
        dynamicRoutes.push(
            '/birth-statistics-pl/#/hospital/' + hospital.id + '/statsType/' + type);
    })
})

export default defineConfig({
    base: '/birth-statistics-pl',
    plugins: [
        vue(),
        Sitemap({
            hostname: 'https://damianantczak.github.io',
            dynamicRoutes: ['/birth-statistics-pl', ...dynamicRoutes],
            changefreq: 'weekly',
            priority: 0.8
        })
    ]
})

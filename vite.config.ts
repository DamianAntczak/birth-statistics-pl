import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap';
import {StatsType} from './src/common/StatsType.ts'
import hospitals from './src/assets/hospitals.json';

let dynamicRoutes: string[] = [];
hospitals.forEach((hospital) => {
    Object.values(StatsType).forEach(type => {
        dynamicRoutes.push(
            '/hospital/' + hospital.id + '/statsType/' + type);
    })
})

export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        Sitemap({
            hostname: 'https://statystykiporodow.netlify.app/',
            dynamicRoutes: ['/hospital', ...dynamicRoutes],
            changefreq: 'weekly',
            priority: 0.8
        })
    ]
})

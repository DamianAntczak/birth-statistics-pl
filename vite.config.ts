import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap';
import hospitals from './src/assets/hospitals.json';

let dynamicRoutes: string[] = [];
hospitals.forEach((hospital) => {
        dynamicRoutes.push(
            '/hospital/' + hospital.id);
})

export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        Sitemap({
            hostname: 'https://statystykiporodow.pl/',
            dynamicRoutes: ['/hospital', '/mapa', ...dynamicRoutes],
            changefreq: 'weekly',
            priority: 0.8
        })
    ]
})

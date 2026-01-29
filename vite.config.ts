import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap';
import hospitals from './src/assets/hospitals.json';
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';

let dynamicRoutes: string[] = [];
hospitals.forEach((hospital) => {
        dynamicRoutes.push(
            '/szpital/' + hospital.id);
})

export default defineConfig({
    base: '/',
    plugins: [
        vue(),
        Components({
            resolvers: [
                PrimeVueResolver()
            ]
        }),
        Sitemap({
            hostname: 'https://statystykiporodow.pl/',
            dynamicRoutes: ['/szpital', '/mapa', ...dynamicRoutes],
            changefreq: 'weekly',
            priority: 0.8
        })
    ]
})

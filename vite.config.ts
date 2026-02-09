import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap';
import hospitals from './src/assets/hospitals.json';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import { StatsType } from './src/common/StatsType';

let dynamicRoutes: string[] = [];
hospitals.forEach((hospital) => {
    dynamicRoutes.push(
        '/szpitale/' + hospital.id);
})

export default defineConfig({
    base: '/',
    ssgOptions: {
        includedRoutes: () => {
            const statsTypes = Object.values(StatsType);

            const routes = [
                '/',
                '/mapa',
                '/szpitale',
            ]

            hospitals.forEach(h => {
                routes.push(`/szpitale/${h.id}`)

                statsTypes.forEach(type => {
                    routes.push(`/szpitale/${h.id}/${type}`)
                })
            })

            return routes
        },
    },
    plugins: [
        vue(),
        Components({
            resolvers: [
                PrimeVueResolver()
            ]
        }),
        Sitemap({
            hostname: 'https://statystykiporodow.pl/',
            dynamicRoutes: ['/szpitale', '/mapa', ...dynamicRoutes],
            changefreq: 'weekly',
            priority: 0.8
        })
    ]
})

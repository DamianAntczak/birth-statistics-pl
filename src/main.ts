import { ViteSSG } from 'vite-ssg'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import {createHead} from '@unhead/vue/client'
import HospitalStats from "./components/HospitalStats.vue";
import HospitalList from "./components/HospitalList.vue";
import Map from "./components/Map.vue";
import Aura from '@primeuix/themes/aura';


import 'leaflet/dist/leaflet.css'
import 'primeicons/primeicons.css'

import {Menubar, Image} from "primevue";

const routes = [

    {
        path: '/',
        name: 'StatsRoot',
        component: HospitalStats
    },
    {
        path: '/mapa',
        name: 'AllMap',
        component: Map
    },
    {
        path: '/szpitale',
        name: 'HospitalList',
        component: HospitalList
    },
    {
        path: '/szpitale/:hospitalId',
        name: 'StatsHospital',
        component: HospitalStats
    },
    {
        path: '/szpitale/:hospitalId/:statsType',
        name: 'StatsDetail',
        component: HospitalStats
    }
]


export const createApp = ViteSSG(
  App,
  { routes },
  (ctx) => {
    const head = createHead()

    ctx.app.use(head)

    ctx.head = head

    ctx.app.use(PrimeVue, {
      theme: {
        preset: Aura,
      },
    })

    ctx.app.component('Menubar', Menubar)
    ctx.app.component('Image', Image)

  }
)
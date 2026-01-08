import {createApp} from 'vue'
import './style.css'
import naive from "naive-ui";
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: App,
        pathToRegexpOptions: {strict: false}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App);
app.use(naive);
app.use(router);
app.mount('#app');

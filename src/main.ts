import 'reflect-metadata'
import { createApp } from 'vue'
import App from './App.vue';
import Vue from 'vue'
import planner from './components/planner.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


library.add(faClipboard);


const routes = [
    { path: "/:class?/:perks?/:prestige?", component: planner},
    { path: "/", component: planner}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')


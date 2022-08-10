import "reflect-metadata";
import { createApp } from "vue";
import App from "./App.vue";
import planner from "./components/planner.vue";
import { createRouter, createWebHistory } from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faClipboard,
  faPeopleGroup,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faClipboard);
library.add(faXmark);
library.add(faPeopleGroup);

const routes = [
  { path: "/:class?/:perks?/:prestige?", component: planner },
  { path: "/", component: planner },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

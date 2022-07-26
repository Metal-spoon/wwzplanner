import "reflect-metadata";
import { createApp } from "vue";
import App from "./App.vue";
import planner from "./components/planner.vue";
import { createRouter, createWebHistory } from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
  faBolt,
  faClipboard,
  faExplosion,
  faFire,
  faHandFist,
  faPeopleGroup,
  faPersonRifle,
  faShield,
  faSuitcaseMedical,
  faToolbox,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faClipboard);
library.add(faXmark);
library.add(faPeopleGroup);
library.add(faPersonRifle);
library.add(faExplosion);
library.add(faSuitcaseMedical);
library.add(faToolbox);
library.add(faHandFist);
library.add(faFire);
library.add(faBolt);
library.add(faShield);
library.add(faAngleRight);
library.add(faAngleLeft);



const routes = [
  { path: process.env.BASE_URL + ":class?/:perks?/:prestige?", component: planner },
  { path: process.env.BASE_URL, component: planner },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

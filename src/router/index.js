import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import AFQT from "@/views/AFQT.vue";
import Age from "@/views/Age.vue";
import Education from "@/views/Education.vue";
import Experience from "@/views/Experience.vue";
import Occupation from "@/views/Occupation.vue";
import Paygrade from "@/views/Paygrade.vue";
import RaceEthincity from "@/views/RaceEthnicity.vue";
import Sector from "@/views/Sector.vue";
import Sex from "@/views/Sex.vue";
import State from "@/views/State.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/afqt",
    name: "afqt",
    component: AFQT
  },
  {
    path: "/age",
    name: "age",
    component: Age
  },
  {
    path: "/education",
    name: "education",
    component: Education
  },
  {
    path: "/experience",
    name: "experience",
    component: Experience
  },
  {
    path: "/occupation",
    name: "occupation",
    component: Occupation
  },
  {
    path: "/paygrade",
    name: "paygrade",
    component: Paygrade
  },
  {
    path: "/raceethnicity",
    name: "raceethinicity",
    component: RaceEthincity
  },
  {
    path: "/sector",
    name: "sector",
    component: Sector
  },
  {
    path: "/sex",
    name: "sex",
    component: Sex
  },
  {
    path: "/state",
    name: "state",
    component: State
  }

  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  routes: routes
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import AFQT from "@/views/AFQT.vue";
import Age from "@/views/Age.vue";
import Education from "@/views/Education.vue";
import Experience from "@/views/Experience.vue";
import Occupation from "@/views/Occupation.vue";
import Paygrade from "@/views/Paygrade.vue";
import RaceEthnicity from "@/views/RaceEthnicity.vue";
import Sector from "@/views/Sector.vue";
import Sex from "@/views/Sex.vue";
import State from "@/views/State.vue";
import DetailedOccupation from "@/views/DetailedOccupation.vue";
import OccupationByPaygrade from "@/views/OccupationByPaygrade.vue";
import OccupationBySector from "@/views/OccupationBySector.vue";
import OccupationByState from "@/views/OccupationByState.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/afqt",
    name: "AFQT",
    component: AFQT
  },
  {
    path: "/age",
    name: "Age",
    component: Age
  },
  {
    path: "/education",
    name: "Education",
    component: Education
  },
  {
    path: "/experience",
    name: "Experience",
    component: Experience
  },
  {
    path: "/occupation",
    name: "Occcupation",
    component: Occupation
  },
  {
    path: "/detailedoccupation",
    name: "DetailedOccupation",
    component: DetailedOccupation
  },

  {
    path: "/occupationbypaygrade",
    name: "OccupationByPaygrade",
    component: OccupationByPaygrade
  },

  {
    path: "/occupationbysector",
    name: "OccupationBySector",
    component: OccupationBySector
  },

  {
    path: "/occupationbystate",
    name: "OcccupationByState",
    component: OccupationByState
  },

  {
    path: "/paygrade",
    name: "Paygrade",
    component: Paygrade
  },
  {
    path: "/raceethnicity",
    name: "Raceethnicity",
    component: RaceEthnicity
  },
  {
    path: "/sector",
    name: "Sector",
    component: Sector
  },
  {
    path: "/sex",
    name: "Sex",
    component: Sex
  },
  {
    path: "/state",
    name: "State",
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

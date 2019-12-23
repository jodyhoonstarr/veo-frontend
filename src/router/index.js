import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Time from "@/views/Time.vue";
import AFQT from "@/views/time/AFQT.vue";
import Age from "@/views/time/Age.vue";
import Education from "@/views/time/Education.vue";
import Experience from "@/views/time/Experience.vue";
import Paygrade from "@/views/time/Paygrade.vue";
import RaceEthnicity from "@/views/time/RaceEthnicity.vue";
import Sector from "@/views/time/Sector.vue";
import Sex from "@/views/time/Sex.vue";
import State from "@/views/time/State.vue";
import Occupation from "@/views/Occupation.vue";
import OccupationDetail from "@/views/occupation/Detail.vue";
import OccupationByPaygrade from "@/views/occupation/Paygrade.vue";
import OccupationBySector from "@/views/occupation/Sector.vue";
import OccupationByState from "@/views/occupation/State.vue";
import Custom from "@/views/Custom.vue";
import CustomBubble from "@/views/custom/Bubble.vue";
import CustomCurated from "@/views/custom/Curated.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/occupation/",
    name: "Occcupation",
    component: Occupation,
    children: [
      {
        path: "detail",
        name: "OccupationDetail",
        component: OccupationDetail
      },

      {
        path: "paygrade",
        name: "OccupationByPaygrade",
        component: OccupationByPaygrade
      },

      {
        path: "sector",
        name: "OccupationBySector",
        component: OccupationBySector
      },
      {
        path: "state",
        name: "OcccupationByState",
        component: OccupationByState
      }
    ]
  },
  {
    path: "/time/",
    name: "Time",
    component: Time,
    children: [
      {
        path: "afqt",
        name: "AFQT",
        component: AFQT
      },
      {
        path: "age",
        name: "Age",
        component: Age
      },
      {
        path: "education",
        name: "Education",
        component: Education
      },
      {
        path: "experience",
        name: "Experience",
        component: Experience
      },
      {
        path: "paygrade",
        name: "Paygrade",
        component: Paygrade
      },
      {
        path: "raceethnicity",
        name: "Raceethnicity",
        component: RaceEthnicity
      },
      {
        path: "sector",
        name: "Sector",
        component: Sector
      },
      {
        path: "sex",
        name: "Sex",
        component: Sex
      },
      {
        path: "state",
        name: "State",
        component: State
      }
    ]
  },
  {
    path: "/custom/",
    name: "Custom",
    component: Custom,
    children: [
      {
        path: "bubble",
        name: "Bubble",
        component: CustomBubble
      },
      {
        path: "curated",
        name: "Curated",
        component: CustomCurated
      }
    ]
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

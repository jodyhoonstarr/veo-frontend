import Vue from "vue";
import VueRouter from "vue-router";
import { PUBLICPATH } from "@/constants/config";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/occupation/detail/",
  },
  {
    path: "/occupation/",
    name: "Occcupation",
    component: () => import("@/views/Occupation.vue"),
    children: [
      {
        path: "detail",
        name: "OccupationDetail",
        component: () => import("@/views/occupation/Detail.vue"),
      },
      {
        path: "paygrade",
        name: "OccupationByPaygrade",
        component: () => import("@/views/occupation/Paygrade.vue"),
      },
      {
        path: "industry",
        name: "OccupationByIndustry",
        component: () => import("@/views/occupation/Industry.vue"),
      },
      {
        path: "state",
        name: "OccupationByState",
        component: () => import("@/views/occupation/State.vue"),
      },
    ],
  },
  {
    path: "/demographics/",
    name: "Demographics",
    component: () => import("@/views/Demographics.vue"),
    children: [
      {
        path: "age/line",
        name: "AgeLine",
        component: () => import("@/views/line/Age.vue"),
      },
      {
        path: "age/bar",
        name: "AgeBar",
        component: () => import("@/views/bar/Age.vue"),
      },
      {
        path: "education/line",
        name: "EducationLine",
        component: () => import("@/views/line/Education.vue"),
      },
      {
        path: "education/bar",
        name: "EducationBar",
        component: () => import("@/views/bar/Education.vue"),
      },
      {
        path: "raceethnicity/line",
        name: "RaceethnicityLine",
        component: () => import("@/views/line/RaceEthnicity.vue"),
      },
      {
        path: "raceethnicity/bar",
        name: "RaceethnicityBar",
        component: () => import("@/views/bar/RaceEthnicity.vue"),
      },
      {
        path: "sex/line",
        name: "SexLine",
        component: () => import("@/views/line/Sex.vue"),
      },
      {
        path: "sex/bar",
        name: "SexBar",
        component: () => import("@/views/bar/Sex.vue"),
      },
    ],
  },
  {
    path: "/industry/",
    name: "Industry",
    component: () => import("@/views/Industry.vue"),
    children: [
      {
        path: "line",
        name: "IndustryLine",
        component: () => import("@/views/line/Industry.vue"),
      },
      {
        path: "bar",
        name: "IndustryBar",
        component: () => import("@/views/bar/Industry.vue"),
      },
      {
        path: "occupation",
        name: "IndustryByOccupation",
        component: () => import("@/views/occupation/Industry.vue"),
      },
    ],
  },
  {
    path: "/state/",
    name: "State",
    component: () => import("@/views/State.vue"),
    children: [
      {
        path: "line",
        name: "StateLine",
        component: () => import("@/views/line/State.vue"),
      },
      {
        path: "bar",
        name: "StateBar",
        component: () => import("@/views/bar/State.vue"),
      },
      {
        path: "occupation",
        name: "IndustryByState",
        component: () => import("@/views/occupation/State.vue"),
      },
    ],
  },
  {
    path: "/service/",
    name: "Service",
    component: () => import("@/views/Service.vue"),
    children: [
      {
        path: "afqt/line",
        name: "AFQTLine",
        component: () => import("@/views/line/AFQT.vue"),
      },
      {
        path: "afqt/bar",
        name: "AFQTBar",
        component: () => import("@/views/bar/AFQT.vue"),
      },
      {
        path: "yearsofservice/line",
        name: "YearsOfServiceLine",
        component: () => import("@/views/line/YearsOfService.vue"),
      },
      {
        path: "yearsofservice/bar",
        name: "YearsOfServiceBar",
        component: () => import("@/views/bar/YearsOfService.vue"),
      },
      {
        path: "paygrade/line",
        name: "PaygradeLine",
        component: () => import("@/views/line/Paygrade.vue"),
      },
      {
        path: "paygrade/bar",
        name: "PaygradeBar",
        component: () => import("@/views/bar/Paygrade.vue"),
      },
      {
        path: "occupation",
        name: "PaygradebyOccupation",
        component: () => import("@/views/occupation/Paygrade.vue"),
      },
    ],
  },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
  base: PUBLICPATH,
});

export default router;

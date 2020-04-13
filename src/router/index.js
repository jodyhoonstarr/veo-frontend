import Vue from "vue";
import VueRouter from "vue-router";
import { PUBLICPATH } from "@/constants/config";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/occupation/detail/"
  },
  {
    path: "/occupation/",
    name: "Occcupation",
    component: () =>
      import(/* webpackChunkName: "occupation" */ "@/views/Occupation.vue"),
    children: [
      {
        path: "detail",
        name: "OccupationDetail",
        component: () =>
          import(
            /* webpackChunkName: "occupationdetail" */ "@/views/occupation/Detail.vue"
          )
      },
      {
        path: "paygrade",
        name: "OccupationByPaygrade",
        component: () =>
          import(
            /* webpackChunkName: "occupationbypaygrade" */ "@/views/occupation/Paygrade.vue"
          )
      },
      {
        path: "Industry",
        name: "OccupationByIndustry",
        component: () =>
          import(
            /* webpackChunkName: "occupationbyindustry" */ "@/views/occupation/Industry.vue"
          )
      }
    ]
  },
  {
    path: "/demographics/",
    name: "Demographics",
    component: () =>
      import(/* webpackChunkName: "time" */ "@/views/Demographics.vue"),
    children: [
      {
        path: "age",
        name: "Age",
        component: () =>
          import(/* webpackChunkName: "age" */ "@/views/time/Age.vue")
      },
      {
        path: "education",
        name: "Education",
        component: () =>
          import(
            /* webpackChunkName: "education" */ "@/views/time/Education.vue"
          )
      },
      {
        path: "raceethnicity",
        name: "Raceethnicity",
        component: () =>
          import(
            /* webpackChunkName: "raceethnicity" */ "@/views/time/RaceEthnicity.vue"
          )
      },
      {
        path: "sex",
        name: "Sex",
        component: () =>
          import(/* webpackChunkName: "sex" */ "@/views/time/Sex.vue")
      }
    ]
  },
  {
    path: "/industry/",
    name: "Industry",
    component: () =>
      import(/* webpackChunkName: "time" */ "@/views/Industry.vue"),
    children: [
      {
        path: "time",
        name: "IndustryByTime",
        component: () =>
          import(/* webpackChunkName: "industry" */ "@/views/time/Industry.vue")
      },
      {
        path: "occupation",
        name: "IndustryByOccupation",
        component: () =>
          import(
            /* webpackChunkName: "occupationbyindustry" */ "@/views/occupation/Industry.vue"
          )
      }
    ]
  },
  {
    path: "/service/",
    name: "Service",
    component: () =>
      import(/* webpackChunkName: "time" */ "@/views/Service.vue"),
    children: [
      {
        path: "afqt",
        name: "AFQT",
        component: () =>
          import(/* webpackChunkName: "afqt" */ "@/views/time/AFQT.vue")
      },
      {
        path: "yearsofservice",
        name: "YearsOfService",
        component: () =>
          import(
            /* webpackChunkName: "experience" */ "@/views/time/YearsOfService.vue"
          )
      },
      {
        path: "paygrade",
        name: "Paygrade",
        component: () =>
          import(/* webpackChunkName: "paygrade" */ "@/views/time/Paygrade.vue")
      },
      {
        path: "occupation",
        name: "PaygradebyOccupation",
        component: () =>
          import(
            /* webpackChunkName: "occupationbypaygrade" */ "@/views/occupation/Paygrade.vue"
          )
      }
    ]
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
  base: PUBLICPATH
});

export default router;

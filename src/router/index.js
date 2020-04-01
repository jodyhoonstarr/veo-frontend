import Vue from "vue";
import VueRouter from "vue-router";
import { PUBLICPATH } from "@/constants/config";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
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
            /* webpackChunkName: "occupationbysector" */ "@/views/occupation/Industry.vue"
          )
      },
      {
        path: "state",
        name: "OcccupationByState",
        component: () =>
          import(
            /* webpackChunkName: "occupationbystate" */ "@/views/occupation/State.vue"
          )
      }
    ]
  },
  {
    path: "/time/",
    name: "Time",
    component: () => import(/* webpackChunkName: "time" */ "@/views/Time.vue"),
    children: [
      {
        path: "afqt",
        name: "AFQT",
        component: () =>
          import(/* webpackChunkName: "afqt" */ "@/views/time/AFQT.vue")
      },
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
        path: "experience",
        name: "Experience",
        component: () =>
          import(
            /* webpackChunkName: "experience" */ "@/views/time/Experience.vue"
          )
      },
      {
        path: "paygrade",
        name: "Paygrade",
        component: () =>
          import(/* webpackChunkName: "paygrade" */ "@/views/time/Paygrade.vue")
      },
      {
        path: "raceethnicity",
        name: "Raceethnicity",
        component: () =>
          import(
            /* webpackChunkName: "raceethnicity */ "@/views/time/RaceEthnicity.vue"
          )
      },
      {
        path: "industry",
        name: "Industry",
        component: () =>
          import(/* webpackChunkName: "industry" */ "@/views/time/Industry.vue")
      },
      {
        path: "sex",
        name: "Sex",
        component: () =>
          import(/* webpackChunkName: "sex" */ "@/views/time/Sex.vue")
      },
      {
        path: "state",
        name: "State",
        component: () =>
          import(/* webpackChunkName: "state" */ "@/views/time/State.vue")
      }
    ]
  },
  {
    path: "/custom/",
    name: "Custom",
    component: () =>
      import(/* webpackChunkName: "custom" */ "@/views/Custom.vue"),
    children: [
      {
        path: "bubble",
        name: "Bubble",
        component: () =>
          import(/* webpackChunkName: "bubble" */ "@/views/custom/Bubble.vue")
      },
      {
        path: "curated",
        name: "Curated",
        component: () =>
          import(/* webpackChunkName: "curated" */ "@/views/custom/Curated.vue")
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
  routes: routes,
  base: PUBLICPATH
});

export default router;

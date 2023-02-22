import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import DOMPurify from "dompurify";

Vue.directive("sane-html", (el, binding) => {
  el.innerHTML = DOMPurify.sanitize(binding.value);
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");

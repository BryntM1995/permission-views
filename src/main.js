import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "Este campo es requerido",
});

Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

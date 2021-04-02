import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueSession from "vue-session";
import axios from "axios";
import VueAxios from "vue-axios";
import GAuth from "vue-google-oauth2";

const gauthOption = {
  clientId: "267786724892-54th8p722dn7can40ntt7654ol1s4i6h.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
};
Vue.use(GAuth, gauthOption);
Vue.use(Vuetify);
Vue.use(VueSession);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

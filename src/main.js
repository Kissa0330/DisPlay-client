import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import GAuth from "vue3-google-oauth2";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.headers.common["Authorization"] = "Bearer" + Cookies.get("access_token");
const gAuthOptions = {
  clientId:
    "267786724892-54th8p722dn7can40ntt7654ol1s4i6h.apps.googleusercontent.com",
  scope: "profile email",
  prompt: "select_account",
};

createApp(App)
  .use(router)
  .use(GAuth, gAuthOptions)
  .use(VueAxios, axios)
  .mount("#app");

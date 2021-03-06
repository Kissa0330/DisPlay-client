/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import toppage from "../views/Toppage.vue";
import option from "../views/Option.vue";
import login from "../views/Signin.vue";
import setting from "../views/Setting.vue";
import Cookies from "js-cookie";
import { store, actions } from "../store/store";
// import { changeManifest } from "../static/js/changeManifest";

const routes = [
  {
    path: "/",
    name: "Toppage",
    component: toppage,
  },
  {
    path: "/option",
    name: "Option",
    component: option,
  },
  {
    path: "/signin",
    name: "Signin",
    component: login,
  },
  { path: "/setting", name: "Setting", component: setting },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let tokenValue = Cookies.get("access_token");
  let isTokenValue = Boolean(tokenValue);
  // access_tokenがない場合はrefreshする

  let refresh_tokenValue = Cookies.get("refresh_token");
  let isRefresh_tokenValue = Boolean(refresh_tokenValue);

  actions.updateToken();

  if (to.name !== "Signin" && !isTokenValue && isRefresh_tokenValue) {
    actions.refreshAccessToken(refresh_tokenValue);
  }
  if (to.name !== "Signin" && !isRefresh_tokenValue) next({ name: "Signin" });
  else next();
});

export default router;

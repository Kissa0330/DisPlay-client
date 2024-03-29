import { createRouter, createWebHistory } from "vue-router";
import toppage from "../views/Toppage.vue";
import option from "../views/Option.vue";
import signin from "../views/Signin.vue";
import setting from "../views/Setting.vue";
import initial from "../views/initial.vue";
import notfound from "../views/notfound";
import lp from "../views/landingpage";
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
    component: signin,
  },
  { path: "/setting", name: "Setting", component: setting },
  { path: "/initial", name: "Initial", component: initial },
  { path: "/lp", name: "LandingPage", component: lp },
  { path: "/:catchAll(.*)", name: "Notfound", component: notfound },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition)
    return { top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  store.errorFlag = false;
  let tokenValue = Cookies.get("access_token");
  let isTokenValue = Boolean(tokenValue);

  let refresh_tokenValue = Cookies.get("refresh_token");
  let isRefresh_tokenValue = Boolean(refresh_tokenValue);

  if (to.name !== "Signin" && !isTokenValue && isRefresh_tokenValue) {
    actions.refreshAccessToken(refresh_tokenValue);
  }
  if (
    to.name !== "Signin" &&
    !isRefresh_tokenValue &&
    to.name !== "LandingPage"
  )
    next({ name: "Signin" });

  if (isRefresh_tokenValue) {
    actions
      .updateToken()
      .then(() => {
        return actions.getMypage();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  next();
});

export default router;

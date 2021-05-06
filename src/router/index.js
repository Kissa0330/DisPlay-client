import { createRouter, createWebHistory } from "vue-router";
import toppage from "../views/Toppage.vue";
import option from "../views/Option.vue";
import login from "../views/Signin.vue";
import setting from "../views/Setting.vue";
import Cookies from "js-cookie";
import { store, actions } from "../store/store";

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
  let tokenValue;
  tokenValue = Cookies.get("access_token");
  let isTokenValue = Boolean(tokenValue);
  if (isTokenValue) {
    store.token = tokenValue;
    console.log("accesstoken is updated");
  }
  // access_tokenがない場合はrefreshする
  let refresh_tokenValue;
  refresh_tokenValue = Cookies.get("refresh_token");
  let isRefresh_tokenValue = Boolean(refresh_tokenValue);
  if (isRefresh_tokenValue) {
    store.refresh_token = refresh_tokenValue;
    console.log("refreshtoken is updated");
  }
  if (to.name !== "Signin" && !isTokenValue) {
    actions.refreshAccessToken(refresh_tokenValue);
  }
  if (to.name !== "Signin" && !refresh_tokenValue) next({ name: "Signin" });
  else next();
});

export default router;

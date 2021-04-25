import Vue from "vue";
import VueRouter from "vue-router";
import toppage from "../views/Toppage.vue";
import option from "../views/Option.vue";
import login from "../views/Signin.vue";
import setting from "../views/Setting.vue";
import { store } from "../store/store";

Vue.use(VueRouter);

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

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let tokenValue;
  tokenValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token"))
    .split("=")[1];
  store.token =tokenValue;
  // access_tokenがない場合はrefreshする
  let refresh_tokenValue;
  refresh_tokenValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refresh_token"))
    .split("=")[1];
  store.refresh_token = refresh_tokenValue;
  if (to.name !== "Signin" && !refresh_tokenValue) next({ name: "Signin" });
  else next();
});

export default router;

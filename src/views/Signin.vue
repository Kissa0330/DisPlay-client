<template>
  <div>
    <h1 class="DisPlayTitle">DisPlay</h1>
    <div class="signinForm">
      <h1 class="signinTitle">Sign in</h1>
      <button class="LandscapeButton google" @click="handleClickSignIn">
        <img class="googleImg" src="../assets/img/Google.svg" alt="Google">
        Sign in with google
      </button>
    </div>
  </div>
</template>
<style scoped src="../static/css/Signin.css"></style>
<script>
import { actions } from "../store/store";

export default {
  name: "Signin",
  data: function () {
    return {
      Username: "",
      Password: ""
    };
  },
  created() {
    actions.updateToken();
  },
  methods: {
    handleClickSignIn() {
      let _this = this;
      this.$gAuth
        .signIn()
        .then((user) => {
          console.log(user);
          actions.signIn(user, _this);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

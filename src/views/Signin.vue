<template>
  <div>
    <h1 class="DisPlayTitle">DisPlay</h1>
    <div class="signinForm" :class="{ err: err }">
      <h1 class="signinTitle">Sign in</h1>
      <h4 class="errText" v-if="err">
        You may mistake Username or Password.<br />
        <a class="resetLink">Reset Password Link</a>
      </h4>
      <input
        class="usernameInputArea"
        :class="{ err: err }"
        type="text"
        v-model="Username"
        placeholder="Username"
        id="name"
      />
      <label for="name">
        <div class="inputLine" />
      </label>
      <input
        class="passwordInputArea"
        type="password"
        v-model="Password"
        placeholder="Password"
        id="password"
      />
      <label for="password">
        <div class="inputLine" />
      </label>
      <button class="LandscapeButton Login" @click="handleClickSignIn">
        Login
      </button>
      <h4 class="signinCaption">Don't have account? <a>Sign up now</a></h4>
    </div>
  </div>
</template>
<style scoped src="../static/css/Signin.css"></style>
<script>
import { store
// , actions
 } from "../store/store";

export default {
  name: "Signin",
  data: function () {
    return {
      Username: "",
      Password: "",
      err: false,
    };
  },
  computed: {
    token() {
      return store.token;
    },
  },
  created() {
    // actions.updateToken();
    document.cookie = "SameSite=None";
  },
  methods: {
    handleClickSignIn() {
        this.$gAuth
          .signIn()
          .then((user) => {
            console.log(user);
            this.isSignIn = this.$gAuth.isAuthorized;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>

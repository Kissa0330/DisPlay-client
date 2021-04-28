<template>
  <div class="logoutConfirmation">
    <h2 class="confirmationText">本当にログアウト<br />よろしいですか？</h2>
    <div class="verticalLine"></div>
    <div class="choices">
      <div class="hitBox" @click="sendComConViewChange()">
        <h3 class="positiveText">いいえ</h3>
      </div>
      <div class="sideLine"></div>
      <div class="hitBox" @click="deleteToken()">
        <h3 class="negativeText">はい</h3>
      </div>
    </div>
  </div>
</template>
<style src="../static/css/LogoutConfirmation.css" scoped></style>
<script>
import Cookies from "js-cookie";

export default {
  name: "logoutConfirmation",
  methods: {
    sendComConViewChange() {
      this.$emit("childEvent");
    },
    deleteToken() {
      Cookies.remove("access_token");
      location.reload();
    },
  },
};
</script>

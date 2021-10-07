<template>
  <div class="menu">
    <h2 class="errorTitle">Error</h2>
    <h3 class="errorStr">入力内容を確認してください</h3>
    <button @click="pushButton" class="Login LandscapeButton">
      Understood
    </button>
  </div>
</template>
<style src="../static/css/Error.css" scoped></style>
<script>
import { store } from "../store/store";

export default {
  name: "tutorial",
  methods: {
    pushButton() {
      store.errorFlag = false;
    },
  },
};
</script>

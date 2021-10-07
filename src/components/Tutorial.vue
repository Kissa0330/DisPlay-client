<template>
  <div class="menu">
    <h3 class="menuStr">
      習慣を追加・変更したい場合は<br />
      右上の歯車から変更出来ます
    </h3>
    <button @click="pushButton" class="Login LandscapeButton">
      Understood
    </button>
  </div>
</template>
<style src="../static/css/Tutorial.css" scoped></style>
<script>
import { actions } from "../store/store";
export default {
  name: "tutorial",
  methods: {
    pushButton() {
      let data = {
        isFirstVisit: false,
      };
      actions.putMypage(data)
    },
  },
};
</script>

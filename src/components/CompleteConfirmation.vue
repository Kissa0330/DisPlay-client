<template>
  <div class="completeConfirmation">
    <h2 class="confirmationText">
      タスクを完了状態にして<br />よろしいですか？
    </h2>
    <div class="verticalLine"></div>
    <div class="choices">
      <div class="hitBox" @click="sendComConViewChange()">
        <h3 class="positiveText">いいえ</h3>
      </div>
      <div class="sideLine"></div>
      <div class="hitBox" @click="deleteRequest(id)">
        <h3 class="negativeText">はい</h3>
      </div>
    </div>
  </div>
</template>
<style src="../static/css/CompleteConfirmation.css" scoped></style>
<script>
import { actions } from "../store/store";
export default {
  name: "completeConfirmation",
  props: ["id"],
  methods: {
    sendComConViewChange() {
      this.$emit("childEvent");
    },
    deleteRequest(id) {
      actions.deleteTodo(id);
      this.$emit("childEvent");
    },
  },
};
</script>

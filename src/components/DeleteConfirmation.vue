<template>
  <div class="deleteConfirmation">
    <h2 class="confirmationText">本当に削除しても<br />よろしいですか？</h2>
    <div class="verticalLine"></div>
    <div class="choices">
      <div class="hitBox" @click="sendDelConViewChange()">
        <h3 class="positiveText">いいえ</h3>
      </div>
      <div class="sideLine"></div>
      <div class="hitBox" @click="deleteRequest(id)">
        <h3 class="negativeText">削除</h3>
      </div>
    </div>
  </div>
</template>
<style src="../static/css/DeleteConfirmation.css" scoped></style>
<script>
import { actions } from "../store/store";
export default {
  name: "deleteConfirmation",
  props: ["id", "typeCheck"],
  methods: {
    sendDelConViewChange() {
      this.$emit("childEvent");
    },
    deleteRequest(id) {
      if (this.typeCheck === "custom") {
        actions.deleteCustom(id);
        this.$emit("childEvent");
      } else if (this.typeCheck === "todo") {
        actions.deleteTodo(id);
        this.$emit("childEvent");
      }
      else if(this.typeCheck === "account") {
        console.log("account will be deleted!")
        alert("この機能は現在開発中です\nアカウントの削除を今すぐ求める場合displayapp.management@gmail.comまでご連絡ください")
        this.$emit("childEvent");
      }
    },
  },
};
</script>

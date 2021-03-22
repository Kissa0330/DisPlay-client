<template>
  <div class="deleeConfirmation">
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
<style src="../static/css/deleeConfirmation.css" scoped></style>
<script>
import { store, actions } from "../store/store";
export default {
  name: "deleeConfirmation",
  data: function () {
    return {
      token: store.token,
    };
  },
  props: ["id","typeCheck"],
  methods: {
    sendDelConViewChange() {
      this.$emit("childEvent");
    },
    deleteRequest(id) {
      if(this.typeCheck === "custom"){
      actions.deleteCustom(id, this.token);
      this.$emit("childEvent");
      }else if(this.typeCheck === "todo"){
        alert("TODO時の処理を実装, idは" + id + "です")
      }
    },
  },
};
</script>

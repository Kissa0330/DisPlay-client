<template>
  <div class="todoEdit">
    <div class="wrap">
      <div class="detailHeader">
        <div class="headerLeft">
          <h3 class="captionText">Title</h3>
          <img src="../assets/img/stick.svg" class="first stick" alt="stick" />
        </div>
        <div class="link">
          <div class="editText" @click="deleteTodo">Delete</div>
          <img
            src="../assets/img/X.svg"
            alt="X"
            class="X"
            @click="sendTodoAddView"
          />
        </div>
      </div>
      <div class="field">
        <input
          class="titleInputArea"
          type="text"
          v-model="title"
          placeholder="enter title"
          :style="{ width: inputTitleWidth }"
        />
        <img src="../assets/img/Pen.svg" alt="pen" class="Pen" />
      </div>
    </div>
    <div class="wrap">
      <h3 class="captionText">Deadline</h3>
      <img src="../assets/img/stick.svg" class="stick" alt="stick" />
      <div class="field">
        <input
          type="number"
          min="1"
          max="12"
          class="dateInputArea"
          v-model="month"
        />
        <h2 class="dateText">/</h2>
        <input
          type="number"
          min="1"
          max="31"
          class="dateInputArea"
          v-model="day"
        />
        <img src="../assets/img/Pen.svg" alt="pen" class="Pen" />
      </div>
    </div>
    <button class="LandscapeButton Login">Update</button>
  </div>
</template>
<style scoped src="../static/css/TodoEdit.css"></style>
<script>
import { store } from "../store/store";

export default {
  name: "TodoEdit",
  data: function () {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return {
      month: month,
      day: day,
    };
  },
  computed: {
    inputTitleWidth() {
      let width = this.title.length * 10.4;
      if (width <= 88) {
        width = 88;
      }
      let inputTitleWidth = width + "px";
      return inputTitleWidth;
    },
    token() {
      return store.token;
    },
  },
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  methods: {
    sendTodoAddView() {
      this.$emit("childEvent");
    },
    deleteTodo() {
      // 削除確認を出し、deleteリクエストを送る
      alert("未実装です");
      this.$emit("childEvent");
    },
  },
};
</script>

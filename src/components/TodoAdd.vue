<template>
  <div class="todoAdd">
    <div class="wrap">
      <div class="detailHeader">
        <div class="headerLeft">
          <h3 class="captionText">Title</h3>
          <img src="../assets/img/stick.svg" class="first stick" alt="stick" />
        </div>
        <div class="link">
          <div class="editText" @click="postTodo">Add</div>
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
  </div>
</template>
<style scoped src="../static/css/TodoAdd.css"></style>
<script>
import { store,actions } from "../store/store";

export default {
  name: "TodoAdd",
  data: function () {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return {
      title: "",
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
  methods: {
    sendTodoAddView() {
      this.$emit("childEvent");
    },
    postTodo() {
      let data = {
        author: 1,
        title: this.title,
        deadline_time:
          "2020-" + this.month + "-" + this.day + "T11:15:00+09:00",
      };
      actions.postTodo(data,this.token);
      this.$emit("notificationPost");
    },
  },
};
</script>

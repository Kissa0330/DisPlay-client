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
        <div class="datepickerWrap">
          <Datepicker v-model="date" inputFormat="M/d" />
        </div>
        <img src="../assets/img/Pen.svg" alt="pen" class="Pen" />
      </div>
    </div>
  </div>
</template>
<style scoped src="../static/css/TodoAdd.css"></style>
<script>
import { actions } from "../store/store";
import Datepicker from "vue3-datepicker";

export default {
  name: "TodoAdd",
  components: {
    Datepicker,
  },
  data: function () {
    let date = new Date();
    return {
      date: date,
      title: "",
      inputClass: "datepicker",
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
  },
  methods: {
    sendTodoAddView() {
      this.$emit("childEvent");
    },
    postTodo() {
      let month = this.date.getMonth() + 1;
      let day = this.date.getDate();
      console.log(month + "" + day);
      let data = {
        author: 1,
        title: this.title,
        deadline_time: "2020-" + month + "-" + day + "T11:15:00+09:00",
      };
      actions.postTodo(data, this.token);
      this.$emit("childEvent");
    },
  },
};
</script>

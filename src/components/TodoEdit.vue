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
          v-model="newTitle"
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
    <button class="LandscapeButton Login" @click="updateTodo">Update</button>
    <transition name="deleteConfirmation">
      <DeleteConfirmation
        v-if="delConView"
        @childEvent="delConView = false"
        :id="id"
        :typeCheck="type"
      />
    </transition>
  </div>
</template>
<style scoped src="../static/css/TodoEdit.css"></style>
<script>
import { store, actions } from "../store/store";
import DeleteConfirmation from "./DeleteConfirmation";

export default {
  name: "TodoEdit",
  components: {
    DeleteConfirmation,
  },
  data: function () {
    let date = this.date.split("-");
    let month = Number(date[1]);
    let day = Number(date[2]);
    return {
      newTitle: this.title,
      month: month,
      day: day,
      delConView: false,
      type: "todo",
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
    deadline_time() {
      let date = this.date.split("-");
      return date[0] + "-" + this.month + "-" + this.day + "T" + this.time + "+09:00";
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
      this.delConView = true;
    },
    updateTodo() {
      actions.putTodo(
        false,
        this.id,
        this.newTitle,
        this.deadline_time,
        null,
        null,
        this.token
      );
      this.$emit("childEvent");
    },
  },
};
</script>

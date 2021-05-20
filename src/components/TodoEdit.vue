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
        <div class="datepickerWrap">
          <Datepicker v-model="newDate" inputFormat="M/d" />
        </div>
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
import { actions } from "../store/store";
import DeleteConfirmation from "./DeleteConfirmation";
import Datepicker from "vue3-datepicker";

export default {
  name: "TodoEdit",
  components: {
    DeleteConfirmation,
    Datepicker,
  },
  data: function () {
    let date = this.date.split("-");
    let newDate = new Date(date[0], date[1]-1, date[2]);

    return {
      newTitle: this.title,
      delConView: false,
      type: "todo",
      newDate: newDate,
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
    deadline_time() {
      let year = this.newDate.getFullYear();
      let month = this.newDate.getMonth() + 1;
      let day = this.newDate.getDate();
      return year + "-" + month + "-" + day + "T" + this.time + "+09:00";
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
        null
      );
      this.$emit("childEvent");
    },
  },
};
</script>

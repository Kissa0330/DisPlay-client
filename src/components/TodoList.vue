<template>
  <div>
    <transition>
      <TodoAdd v-if="todoAddView" @childEvent="todoAddView = false" />
    </transition>
    <transition>
      <TodoPut
        :id="id"
        :title="title"
        :date="d_date"
        :time="d_time"
        v-if="todoPutView"
        @childEvent="todoPutView = false"
      />
    </transition>
    <transition>
      <TodoEdit
        :id="id"
        :title="title"
        :date="d_date"
        :time="d_time"
        v-if="todoEditView"
        @childEvent="todoEditView = false"
      />
    </transition>
    <transition name="completeConfirmation">
      <CompleteConfirmation
        @childEvent="comConView = false"
        v-if="comConView"
        :id="id"
      />
    </transition>
    <div class="TodoMenu">
      <div class="MenuRight">
        <h3>Todolist</h3>
      </div>
      <div class="MenuLeft">
        <button class="LandscapeButton" @click="todoAddView = true">Add</button>
      </div>
    </div>
    <div class="TaskList">
      <div class="Task" v-for="todo in todos" :key="todo.id">
        <div class="TaskWrapper">
          <h4
            class="TaskTitle"
            @click="
              (todoEditView = true),
                (id = todo.id),
                (d_date = todo.d_date),
                (d_time = todo.d_time),
                (title = todo.title)
            "
          >
            {{ todo.title }}
          </h4>
          <button
            class="CircleButton Play"
            @click="
              (todoPutView = true),
                (id = todo.id),
                (d_date = todo.d_date),
                (d_time = todo.d_time),
                (title = todo.title)
            "
          >
            <img
              class="PlayImg"
              src="../assets/img/Play.svg"
              alt="Play"
            /></button
          ><button
            class="CircleButton Check"
            @click="(comConView = true), (id = todo.id)"
          >
            <img src="../assets/img/Check.svg" alt="check" />
          </button>
          <p class="TaskDeadline">Deadline {{ todo.displayDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="../static/css/TodoList.css"></style>

<script>
/* eslint-disable */
import TodoAdd from "./TodoAdd";
import TodoPut from "./TodoPut";
import TodoEdit from "./TodoEdit";
import CompleteConfirmation from "./CompleteConfirmation";
import { store, actions } from "../store/store";

export default {
  name: "TodoList",
  components: { TodoAdd, TodoPut, TodoEdit, CompleteConfirmation },
  data: function () {
    return {
      todoAddView: false,
      todoPutView: false,
      todoEditView: false,
      comConView: false,
      id: Number,
      d_date: "",
      d_time: "",
      title: "",
    };
  },
  computed: {
    todos() {
      return store.todos;
    },
  },
  mounted() {
    actions.getTodo();
  },
};
</script>

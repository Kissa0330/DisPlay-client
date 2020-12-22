<template>
  <div>
    <transition>
      <TodoPut v-if="todoPutView" @childEvent="todoPutView = false" />
    </transition>
    <transition>
      <TodoAdd
        v-if="todoAddView"
        @childEvent="todoAddView = false"
        @notificationPost="reGetTodo"
      />
    </transition>
    <div class="TodoMenu">
      <div class="MenuRight">
        <h3>Todolist</h3>
      </div>
      <div class="MenuLeft">
        <button class="LandscapeButton" @click="todoAddView = true">
          <div class="buttonText">Add</div></button
        ><img
          class="Trashcan"
          src="../assets/img/Trashcan.svg"
          alt="trashcan"
        />
      </div>
    </div>
    <div class="TaskList">
      <div class="Task" v-for="todo in todos" :key="todo.id">
        <h4 class="TaskTitle">{{ todo.title }}</h4>
        <button class="CircleButton Play" @click="todoPutView = true">
          <img
            class="PlayImg"
            src="../assets/img/Play.svg"
            alt="Play"
          /></button
        ><button class="CircleButton Check" @click="deleteTodo(todo.id)">
          <img src="../assets/img/Check.svg" alt="check" />
        </button>
        <p class="TaskDeadline">Deadline {{ todo.displayDate }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped src="../static/css/TodoList.css"></style>

<script>
/* eslint-disable */
import axios from "axios";
import TodoAdd from "./TodoAdd";
import TodoPut from "./TodoPut";
import { store, actions } from "../store/store";

export default {
  name: "TodoList",
  components: { TodoAdd, TodoPut },
  data: function () {
    return {
      todoAddView: false,
      todoPutView: false,
    };
  },
  computed: {
    todos() {
      return store.todos;
    },
    token(){
      return store.token
  },
  },
  //TODO 401errorが出るたびにtokenを取得し直す機能を追加
  mounted() {
    actions.getTodo(this.token);
  },
  methods: {
    reGetTodo() {
      actions.getTodo(this.token);
      this.todoAddView = false;
    },
    deleteTodo(id) {
      actions.deleteTodo(id,this.token);
      actions.getTodo(this.token);
    },
  },
};
</script>

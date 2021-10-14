<template>
  <div>
    <div class="componentswrapper" v-if="wrapperview" />
    <transition appear name="tutorial">
      <Tutorial v-if="tutorialView" />
    </transition>
    <transition name="error">
      <Error v-if="errorView" />
    </transition>
    <Header />
    <Chart />
    <TodoList />
  </div>
</template>
<style>
.componentswrapper {
  background: linear-gradient(
    30deg,
    rgb(225, 232, 240, 0.7),
    rgb(244, 246, 252, 0.7)
  );
  top: 0px;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 2;
}
</style>
<script>
import Header from "../components/Header";
import Chart from "../components/Chart";
import TodoList from "../components/TodoList";
import Tutorial from "../components/Tutorial";
import Error from "../components/Error";
import { store } from "../store/store";

export default {
  name: "Toppage",
  components: {
    Header,
    Chart,
    TodoList,
    Tutorial,
    Error,
  },
  mounted() {
    console.log(store.isFirstVisit);
  },
  computed: {
    tutorialView() {
      // return false;
      return store.isFirstVisit;
    },
    errorView() {
      return store.errorFlag;
    },
    wrapperview() {
      // return false;
      return store.isFirstVisit;
    },
  },
};
</script>

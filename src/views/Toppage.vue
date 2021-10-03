<template>
  <div>
    <div class="componentswrapper" v-if="wrapperview">
      <Tutorial v-if="tutorialView" />
    </div>
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
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
}
</style>
<script>
import Header from "../components/Header";
import Chart from "../components/Chart";
import TodoList from "../components/TodoList";
import Tutorial from "../components/Tutorial";
import { store } from "../store/store";

export default {
  name: "Toppage",
  components: {
    Header,
    Chart,
    TodoList,
    Tutorial,
  },
  data: function () {
    return {
      tutorialView: store.isFirstVisit,
      wrapperview: store.isFirstVisit,
    };
  }
};
</script>

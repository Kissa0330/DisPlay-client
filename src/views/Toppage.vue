<template>
  <div>
    <transition appear name="tutorial">
      <div class="componentswrapper" v-if="wrapperview" />
    </transition>
    <transition appear name="tutorial">
      <Tutorial v-if="tutorialView" />
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
  top:0px;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 2;
}
.bg-enter-from {
  opacity: 0;
}

.bg-enter-to {
  opacity: 1;
}
.bg-enter-active {
  transition: all 400ms;
}

.bg-leave-from {
  opacity: 1;
}

.bg-leave-to {
  opacity: 0;
}

.tutorial-leave-active {
  transition: all 400ms;
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
  mounted() {
    console.log(store.isFirstVisit);
  },
  computed: {
    tutorialView() {
      return store.isFirstVisit;
    },
    wrapperview() {
      return store.isFirstVisit;
    },
  },
};
</script>

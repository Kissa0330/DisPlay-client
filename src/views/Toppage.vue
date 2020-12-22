<template>
  <div>
    <Header />
    <Chart />
    <TodoList />
  </div>
</template>
<script>
import Header from '../components/Header';
import Chart from '../components/Chart';
import TodoList from '../components/TodoList';

export default {
  name: 'Toppage',
  components: {
    Header,
    Chart,
    TodoList,
  },
};
</script>

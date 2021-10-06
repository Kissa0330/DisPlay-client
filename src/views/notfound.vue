<template>
  <div class="Header">
    <h1 class="Headertitle">DisPlay</h1>
    <img
      class="notfoundpng"
      src="../assets/img/notfound.svg"
      alt="notfound 404"
    />
    <h1 class="notfoundTitle">404 Not Found</h1>
    <h3 class="notfoundStr">お探しのページは存在していません。</h3>
    <router-link to="/">
      <h3 class="notfoundLink">Topページに戻る</h3>
    </router-link>
  </div>
</template>
<style scoped src="../static/css/notfound.css"></style>
<script>
export default {
  name: "notfound",
};
</script>

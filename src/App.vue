<template>
    <transition name="page_animation" mode="out-in">
      <router-view></router-view>
    </transition>
</template>

<script>
export default {
  name: "App",
};
</script>
<style src="./static/css/style.css"></style>

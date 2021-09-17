<template>
    <transition name="page_animation" mode="out-in">
      <router-view></router-view>
    </transition>
</template>

<script>
// import { changeManifest } from "./static/js/changeManifest";
export default {
  name: "App",
  created(){
    // changeManifest();
  }
};
</script>
<style src="./static/css/style.css"></style>


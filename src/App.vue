<template>
  <Navbar />
  <div><router-view /></div>
</template>

<script>
import { db } from "./firebase/config";
import Navbar from "./components/Navbar.vue";

export default {
  components: { Navbar },
  setup() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html,body{
  margin: 0;
  height: 100%;
}
</style>

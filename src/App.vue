<template>
  <Navbar />
  <div><router-view /></div>
  <Footer></Footer>
</template>

<script>
import { db } from "./firebase/config";
import Navbar from "./components/Navbar.vue";
import { onMounted } from "vue";
import Footer from "./components/Footer.vue";

export default {
  components: { Navbar, Footer },
  setup() {
    onMounted(() => {});
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html,
body {
  margin: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  overflow-x: hidden;
}
</style>

<template>
  <Navbar />
  <div><router-view /></div>
</template>

<script>
import { db } from "./firebase/config";
import Navbar from "./components/Navbar.vue";
import { onMounted } from "vue";

export default {
  components: { Navbar },
  setup() {
    onMounted(() => {
      const googleApiScript = document.createElement("script");
      googleApiScript.setAttribute(
        "src",
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBv3FNyj-xBgcRGLDvyo_3u31XFROw13lY&libraries=places"
      );
      document.head.appendChild(googleApiScript);
    });
  },
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

html,
body {
  margin: 0;
  height: 100%;
}
</style>

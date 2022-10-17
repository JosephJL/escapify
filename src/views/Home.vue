<template>
  <div>
    <Navbar />
    <div id="scene-container">
      <canvas></canvas>
    </div>
    <div>
      <CountryList @scroll="handleScroll" :list="countryKeys" />
    </div>
  </div>
</template>

<style scoped>
#scene-container {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: skyblue;
}
</style>

<script>
import { watch, ref, onMounted } from "vue";
import {
  Camera,
  Group,
  BoxBufferGeometry,
  SphereBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLight,
  Quaternion,
  Vector3,
  Euler,
  TextureLoader,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import SignUpForm from "../components/auth/SignUpForm.vue";
// import LoginForm from "../components/auth/LoginForm.vue";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";
import countries from "countries-list";
import CountryList from "../components/CountryList.vue";
import { createLights } from "../composables/threeTools";

export default {
  components: { Navbar, CountryList },
  created() {
    window.addEventListener("wheel", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("wheel", this.handleScroll);
  },
  methods: {
    init() {
      //threeJS Code
      const container = document.querySelector("#scene-container");

      //create a Scene
      this.scene = new Scene();

      //set the background color
      this.scene.background = new Color("skyblue");

      //create a camera
      const fov = 35;
      const aspect = container.clientWidth / container.clientHeight;
      const near = 0.1;
      const far = 100;

      this.camera = new PerspectiveCamera(fov, aspect, near, far);

      //every object is created at (0,0,0) so we need to move the camera back to view the scene
      this.camera.position.set(0, 0, 30);

      //create geometry
      this.geometry = new SphereBufferGeometry(10, 64, 64);

      //create texture
      this.texture = new TextureLoader().load(
        require("../assets/img/globe.jpeg")
      );

      //create material
      this.material = new MeshBasicMaterial({
        map: this.texture,
        transparent: false,
      });

      //create a mesh containing geometry and material
      this.cube = new Mesh(this.geometry, this.material);
      // this.cube.rotation.set(-0.5, -0.1, 0.8);
      this.cube.position.set(-2, 0, 0);

      const quaternion = new Quaternion().setFromAxisAngle(
        new Vector3(0, 1, 0),
        0.005
      );
      // this.cube.rotation.set(new Euler().setFromQuaternion(quaternion));
      //add mesh to the scene
      this.scene.add(this.cube);

      this.light = createLights();

      //move the light right up and towards us
      this.light.position.set(10, 10, 10);

      this.scene.add(this.cube, this.light);

      //create the renderer
      this.renderer = new WebGLRenderer();
      this.renderer.physicallyCorrectLights = true;

      //set renderer to same size as our container element
      this.renderer.setSize(container.clientWidth, container.clientHeight);

      //finally, set the pixel ratio so that our scene will look good on HiDPI displays
      this.renderer.setPixelRatio(window.devicePixelRatio);

      //add the canvas element to the page
      container.append(this.renderer.domElement);

      //start the loop
      this.renderer.setAnimationLoop(() => {
        this.renderer.render(this.scene, this.camera);
      });
    },
    handleScroll(event) {
      console.log(event.wheelDelta);
      this.cube.rotateOnAxis(new Vector3(0, 1, 0), 0.005);
      // this.camera.rotation.z =
      //   this.camera.rotation.z + event.wheelDelta / 500.0;
    },
  },

  mounted() {
    this.init();
  },

  setup() {
    //Vue3 Code
    const router = useRouter();

    const countryKeys = Object.values(countries.countries);
    // const enterMain = () => {
    //   router.push({ path: "/mainPage" });
    // };
    console.log(countries.countries[Object.keys(countries.countries)[0]]);
    console.log(Object.keys(countries.countries).length);

    return { countryKeys };
  },
};
</script>

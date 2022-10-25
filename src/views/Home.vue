<template>
  <div>
    <div class="container-fluid px-0">
      <div id="scene-container"></div>
      <div class="header" style="">
        <h1>Find your next Destination</h1>
      </div>
      <div>
        <nav aria-label="Page navigation example">
          <ul class="justify-content-center pagination">
            <li class="page-item">
              <a class="page-link" @click="getCountries" href="#"> All </a>
            </li>
            <template v-for="continent in continents" :key="continent">
              <li class="page-item">
                <a
                  class="page-link"
                  @click="selectContinent(continent)"
                  href="#"
                  >{{ continent }}</a
                >
              </li>
            </template>
          </ul>
        </nav>
        <nav v-if="totalPages" aria-label="Page navigation example">
          <ul class="justify-content-center pagination">
            <li class="page-item">
              <a class="page-link" @click="pageNumber = pageNumber + 1" href="#"
                >Previous</a
              >
            </li>
            <template v-for="index in totalPages" :key="index">
              <li class="page-item">
                <a class="page-link" @click="changePage(index)" href="#">{{
                  index
                }}</a>
              </li>
            </template>
            <li class="page-item">
              <a class="page-link" @click="pageNumber = pageNumber + 1" href="#"
                >Next</a
              >
            </li>
          </ul>
        </nav>
        <CountryList :list="documents" :page="pageNumber" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#scene-container {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  z-index: -100;
  background-color: rgb(1, 96, 200);
}
.header {
  height: 500px;
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
  ShaderMaterial,
  AdditiveBlending,
  BackSide,
} from "three";

// ThreeJS stuff
import { createLights } from "../composables/threeTools";
import atmosphereVertexShader from "../assets/shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../assets/shaders/atmosphereFragment.glsl";
import fragmentShader from "../assets/shaders/fragmentShader.glsl";
import vertexShader from "../assets/shaders/vertexShader.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Authentication
import SignUpForm from "../components/auth/SignUpForm.vue";
import LoginForm from "../components/auth/LoginForm.vue";
import getUser from "../composables/getUser";
import Modal from "../components/auth/Modal.vue";

// Routing
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";

// Country Stuff
import countries from "countries-list";
import CountryList from "../components/CountryList.vue";

// Firebase
import getCollection from "../composables/getCollection";

// Requests
import axios from "axios";

export default {
  components: { Navbar, CountryList, LoginForm, SignUpForm, Modal },
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
      this.scene.background = new Color("rgb(1, 96, 200)");
      //create a camera
      const fov = 35;
      var aspect = container.clientWidth / container.clientHeight;
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
      this.material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: { globeTexture: { value: this.texture } },
      });
      //create a mesh containing geometry and material
      this.sphere = new Mesh(this.geometry, this.material);
      // this.cube.rotation.set(-0.5, -0.1, 0.8);
      this.sphere.position.set(-2, 0, -30);
      console.log(atmosphereFragmentShader);
      this.atmosMaterial = new ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: AdditiveBlending,
        side: BackSide,
      });
      this.atmosphere = new Mesh(
        new SphereBufferGeometry(10, 64, 64),
        this.atmosMaterial
      );
      this.atmosphere.scale.set(1.1, 1.1, 1.1);
      this.atmosphere.position.set(-2, 0, -30);
      this.scene.add(this.atmosphere);
      this.light = createLights();
      //move the light right up and towards us
      this.light.position.set(10, 10, 10);
      this.scene.add(this.sphere, this.light);
      //create the renderer
      this.renderer = new WebGLRenderer();
      this.renderer.physicallyCorrectLights = true;

      //set renderer to same size as our container element
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      window.addEventListener("resize", () => {
        // Set the size again if a resize occurs.
        aspect = container.clientWidth / container.clientHeight;
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
      });

      //finally, set the pixel ratio so that our scene will look good on HiDPI displays
      this.renderer.setPixelRatio(window.devicePixelRatio);

      //add the canvas element to the page
      container.append(this.renderer.domElement);

      //start the loop
      this.renderer.setAnimationLoop(() => {
        this.renderer.render(this.scene, this.camera);
        this.sphere.rotation.y += 0.001;
      });
    },

    // handleScroll(event) {
    //   console.log(event.wheelDelta);
    //   this.sphere.rotateOnAxis(new Vector3(0, 1, 0), event.wheelDelta * 0.005);
    //   // this.camera.rotation.z =
    //   //   this.camera.rotation.z + event.wheelDelta / 500.0;
    // },
  },

  mounted() {
    this.init();
  },

  setup() {
    //Vue3 Code
    const router = useRouter();

    //User Auth
    const { user } = getUser();
    console.log("user is ", user);

    // testing countrykey
    // const countryKeys = Object.values(countries.countries);
    // console.log(countries.countries[Object.keys(countries.countries)[0]]);
    // console.log(Object.keys(countries.countries).length);

    // testing firebase code
    // const { error, documents } = getCollection("countries");
    // console.log(documents);

    const documents = ref([]);
    const chunkSize = 12;
    const totalPages = ref(0);
    const pageNumber = ref(1);

    const changePage = (index) => {
      pageNumber.value = index;
      console.log("page changed to", pageNumber.value);
    };

    const continents = ref([
      "Africa",
      "Asia",
      "Europe",
      "North America",
      "Oceania",
      "South America",
    ]);

    const getCountries = async () => {
      documents.value = [];
      await axios
        .get("https://restcountries.com/v2/all")
        .then((response) => {
          // console.log(response.data);
          for (let i = 0; i < response.data.length; i += chunkSize) {
            const chunk = response.data.slice(i, i + chunkSize);
            documents.value.push(chunk);
          }
          totalPages.value = documents.value.length - 1;
          console.log("total pages is", totalPages.value);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getCountries();

    const selectContinent = async (continent) => {
      documents.value = [];
      console.log("continent is,", continent);
      await axios
        .get("https://restcountries.com/v3.1/region/" + continent)
        .then((response) => {
          console.log(response.data);
          for (let i = 0; i < response.data.length; i += chunkSize) {
            const chunk = response.data.slice(i, i + chunkSize);
            documents.value.push(chunk);
          }
          totalPages.value = documents.value.length - 1;
          console.log("total pages is", totalPages.value);
        });
    };

    console.log("document list is", documents.value);

    return {
      user,
      documents,
      totalPages,
      pageNumber,
      changePage,
      continents,
      selectContinent,
      getCountries,
    };
  },
};
</script>

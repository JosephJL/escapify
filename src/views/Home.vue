<template>
  <div>
    <div class="home container-fluid px-0">
      <div id="scene-container"></div>
      <div class="header d-flex" style="">
        <h1 class="text-white fs-1 fw-semibold mx-auto align-self-center">
          Travel the Globe
        </h1>
      </div>
      <div style="background-color: rgb(141, 183, 209)">
        <!-- Search bar -->
        <nav aria-label="Page navigation">
          <div
            class="container-fluid col-xxl-3 col-lg-4 col-md-5 col-sm-6 col-10 mb-1"
          >
            <form class="d-flex" role="search">
              <input
                class="form-control me-2 rounded-4"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model="filterText"
              />
              <button
                class="btn btn-outline-primary rounded-4"
                @click.prevent="searchCountries"
              >
                Search
              </button>
            </form>
          </div>
        </nav>

        <!-- Select for different continents -->
        <nav aria-label="Page navigation">
          <ul class="justify-content-center pagination">
            <li class="page-item">
              <a
                class="page-link rounded-4 me-1"
                @click.prevent="getCountries"
                href="#"
              >
                All
              </a>
            </li>
            <template v-for="continent in continents" :key="continent">
              <li class="page-item">
                <a
                  class="page-link rounded-4 me-1"
                  @click.prevent="selectContinent(continent)"
                  href="#"
                  >{{ continent }}</a
                >
              </li>
            </template>
          </ul>
        </nav>

        <CountryList :list="documents" :page="pageNumber" />

        <!-- Pagination for different countries -->
        <nav aria-label="Page navigation example">
          <ul class="justify-content-center pagination">
            <li class="page-item">
              <a
                class="page-link"
                @click.prevent="pageNumber = pageNumber + 1"
                href="#"
                >Previous</a
              >
            </li>
            <template v-for="index in totalPages" :key="index">
              <li class="page-item">
                <a
                  class="page-link"
                  @click.prevent="changePage(index)"
                  href="#"
                  >{{ index }}</a
                >
              </li>
            </template>
            <li class="page-item">
              <a
                class="page-link"
                @click.prevent="pageNumber = pageNumber + 1"
                href="#"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  position: relative;
  width: 100%;
}

#scene-container {
  position: absolute;
  width: 100%;
  height: 600px;
  z-index: -100;
}

.header {
  height: 600px;
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
import getCollection from "../composables/collection/getCollection";

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
      this.scene.background = new Color("rgb(141, 183, 209)");
      //create a camera
      const fov = 35;
      var aspect = container.clientWidth / container.clientHeight;
      const near = 0.1;
      const far = 100;
      this.camera = new PerspectiveCamera(fov, aspect, near, far);
      //every object is created at (0,0,0) so we need to move the camera back to view the scene
      this.camera.position.set(0, 0, 10);
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
      this.sphere.position.set(0, 0, -30);
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
      this.atmosphere.position.set(0, 0, -30);
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
        // const width = window.innerWidth;
        // const height = window.innerHeight;
        // this.camera.aspect = width / height;
        // this.camera.updateProjectionMatrix();
        // renderer.setSize(width, height);
        // const ratio = window.devicePixelRatio;
        // this.renderer.domElement = width * ratio;
        // this.renderer.domElement.width = height * ratio;
        // this.renderer.domElement.style.width = `${width}px`;
        // this.renderer.domElement.style.height = `${height}px`;

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

    // Filter stuff
    const filterText = ref("");

    // Pagination stuff
    const documents = ref([]);
    const chunkSize = 12;
    const totalPages = ref(0);
    const pageNumber = ref(0);

    const changePage = (index) => {
      pageNumber.value = index;
      console.log("page changed to", pageNumber.value);
    };

    const continents = ref(["Africa", "Americas", "Asia", "Europe", "Oceania"]);

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

    const searchCountries = async () => {
      documents.value = [];
      await axios
        .get(`https://restcountries.com/v2/name/${filterText.value}`)
        .then((response) => {
          console.log(response.data);
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
      filterText,
      searchCountries,
    };
  },
};
</script>

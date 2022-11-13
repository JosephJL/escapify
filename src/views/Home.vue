<template>
  <!-- <div v-if="loading">
    <img
      src="https://cdn.dribbble.com/users/722246/screenshots/4400319/media/370a520076a3d90eff6800ce9703b453.gif"
      alt=""
    />
  </div> -->
  <div class="home">
    <div class="container-fluid px-0">
      <div id="scene-container"></div>
      <div class="header d-flex" style="">
        <h1 class="text-white fs-1 fw-semibold mx-auto align-self-center">
          Travel The World
        </h1>
      </div>
      <div style="background-image: linear-gradient(#094067, darkturquoise)">
        <div
          class="container-fluid rounded-3 bg-dark pt-4 pb-4 mb-4"
          style="--bs-bg-opacity: 0.6"
        >
          <h3
            class="text-white fs-3 fw-semibold mx-auto align-self-center mt-4"
          >
            How to Escapify
          </h3>
          <div class="row p-8">
            <div class="col-md-4 col-12 px-4 mt-4 mb-2">
              <div class="card pt-4 pb-4" style="width: 100%">
                <div class="card-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                    style="color: #094067"
                  >
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                    />
                  </svg>
                  <h5 class="card-title mt-4" style="color: #094067">
                    Discover
                  </h5>
                  <p class="card-text" style="color: #094067">
                    Find places on every continent, across the globe. Our
                    suggestions will delight you.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-12 px-4 mt-4 mb-2">
              <div class="card pt-4 pb-4" style="width: 100%">
                <div class="card-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    class="bi bi-calendar-check"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                    />
                    <path
                      d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
                    />
                  </svg>
                  <h5 class="card-title mt-4" style="color: #094067">Plan</h5>
                  <p class="card-text" style="color: #094067">
                    Create your trip and add your destinations with nearby
                    accomodations to your trips
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4 col-12 px-4 mt-4 mb-2">
              <div class="card pt-4 pb-4" style="width: 100%">
                <div class="card-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="currentColor"
                    class="bi bi-people-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                    />
                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                  </svg>
                  <h5 class="card-title mt-4" style="color: #094067">
                    Community
                  </h5>
                  <p class="card-text" style="color: #094067">
                    Share your travel plans and view other travellers'
                    experiences. Get inspired!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row p-8 mt-3 mb-3">
          <div class="card-body text-white" v-if="user">
            <h5 class="card-title float-start mx-5 mt-3 mb-3">
              Your Recent Searches
            </h5>
          </div>
          <RecentList :list="finalClicks" />
        </div>
        <!-- Search bar -->
        <nav aria-label="Page navigation" class="mb-4">
          <div
            class="container-fluid col-xxl-3 col-lg-4 col-md-5 col-sm-6 col-10 mb-1"
          >
            <form class="d-flex" role="search">
              <input
                class="form-control me-2 rounded-4"
                type="search"
                placeholder="Find your country"
                aria-label="Search"
                v-model="filterText"
              />
              <button
                class="btn btn-light rounded-4"
                @click.prevent="searchCountries"
              >
                Search
              </button>
            </form>
          </div>
        </nav>

        <!-- Select for different continents -->
        <div class="container-fluid justify-content-center margin-auto d-flex">
          <ul class="pagination flex-wrap justify-content-center">
            <li class="page-item">
              <a
                class="page-link rounded-4 me-1 text-black mb-1"
                @click.prevent="getCountries"
                href="#"
                style="width: 6rem"
              >
                All
              </a>
            </li>
            <template v-for="continent in continents" :key="continent">
              <li class="page-item">
                <a
                  class="page-link rounded-4 me-1 text-black mb-1"
                  style="width: 6rem"
                  @click.prevent="selectContinent(continent)"
                  href="#"
                  >{{ continent }}</a
                >
              </li>
            </template>
          </ul>
        </div>

        <CountryList :list="documents" :page="pageNumber" />

        <!-- Pagination for different countries -->
        <div class="container-fluid justify-content-center d-flex">
          <ul class="justify-content-center pagination flex-wrap">
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
        </div>
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
  outline: none;
  margin: 0;
  padding: 0;
}

.header {
  height: 600px;
}

.card {
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
}
.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}
</style>

<script>
import { watch, ref, onMounted, computed } from "vue";
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
import RecentList from "../components/recent/RecentList.vue";
import RecentCard from "../components/recent/RecentCard.vue";

// Firebase
import getCollection from "../composables/collection/getCollection";
import queryCollection from "../composables/collection/queryCollection";

// Requests
import axios from "axios";

export default {
  components: { Navbar, CountryList, LoginForm, SignUpForm, Modal, RecentList },
  created() {
    window.addEventListener("wheel", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("wheel", this.handleScroll);
  },
  methods: {
    init() {
      //threeJS Code
      this.container = document.querySelector("#scene-container");
      //create a Scene
      this.scene = new Scene();
      //set the background color
      this.scene.background = new Color("#094067");
      //create a camera
      const fov = 35;
      var aspect = this.container.clientWidth / this.container.clientHeight;
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
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
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

        aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.aspect =
          this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(
          this.container.clientWidth,
          this.container.clientHeight
        );
        this.renderer.setPixelRatio(window.devicePixelRatio);
      });

      //finally, set the pixel ratio so that our scene will look good on HiDPI displays
      this.renderer.setPixelRatio(window.devicePixelRatio);

      //add the canvas element to the page
      this.container.append(this.renderer.domElement);

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

  // beforeUnmount() {
  //   console.log("DESTROYING");
  //   this.container.remove(this.renderer);
  // },

  mounted() {
    this.init();
  },

  setup() {
    onMounted(() => {
      console.log("MOUNTED, SCROLLING NOW", window.scrollTo(0, 0));
      document.body.scrollTop = 0;
    });
    //Vue3 Code
    const router = useRouter();

    //User Auth
    const { user } = getUser();
    console.log("user is ", user);

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

    const { clicks, loadClicksCollection } = queryCollection();

    if (user.value) {
      loadClicksCollection();
    }

    const finalClicks = computed(() => {
      console.log("finalComments here");
      if (clicks.value && user.value) {
        return clicks.value
          .reverse()
          .filter((doc) => doc[1].userId == user.value.uid);
      }
    });

    console.log("document list is", documents.value);

    const loading = ref(true);

    return {
      finalClicks,
      loading,
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

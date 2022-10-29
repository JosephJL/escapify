<template>
  <div class="countryList">
    <div class="container-fluid d-flex text-center">
      <!-- class horizontalScroll for horizontal -->
      <div v-if="!placeholderData" class="row">
        <template v-for="index in 12" :key="index">
          <div class="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
            <div class="card bg-transparent border-0">
              <div class="d-flex" style="height: 18rem; width: 400px">
                <div
                  class="spinner-border mx-auto align-self-center"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <!-- <ContentLoader height="100%" width="100%">
                  <rect x="1" y="234" rx="4" ry="4" width="60%" height="9" />
                  <rect x="2" y="253" rx="3" ry="3" width="40%" height="6" />
                  <rect
                    x="0"
                    y="17"
                    rx="10"
                    ry="10"
                    width="100%"
                    height="207"
                  />
                </ContentLoader> -->
              </div>
              <div class="card-body text-white">
                <h5 class="card-title">Country :</h5>
                <p class="card-text">Region :</p>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="row" v-else>
        <template v-for="country in list[page]" :key="country">
          <div class="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
            <CountryCard :details="country" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countryList {
  height: 100%;
}

.horizontalScroll {
  display: flex;
  overflow-x: auto;
}
</style>

<script>
import axios from "axios";
import { onBeforeMount, ref, onMounted, getCurrentScope, watch } from "vue";
import CountryCard from "../components/CountryCard.vue";
import { ContentLoader } from "vue-content-loader";

export default {
  components: { CountryCard, ContentLoader },
  props: {
    list: Object,
    page: Number,
  },
  setup(props) {
    console.log("props list is", props.list);
    console.log("current page in country list is", props.page);

    const placeholderData = ref(null);

    onMounted(() => {
      console.log("mounted!!!!!!!!!!!");
      setTimeout(() => {
        placeholderData.value = "Example Data";
      }, 1500);
    });

    const placeholderAssemble = () => {
      placeholderData.value = null;
      setTimeout(() => {
        placeholderData.value = "Example Data";
      }, 1500);
    };

    watch(
      () => props.list,
      () => {
        console.log("LIST IS CHANGINGGGG");
        placeholderAssemble();
      }
    );

    // var photoRef = ref("");
    // var image = ref("");

    // const getPlacePhoto = async (countryName) => {
    //   const proxyUrl = "http://blooming-reaches-84388.herokuapp.com/";
    //   const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${countryName}&key=AIzaSyBv3FNyj-xBgcRGLDvyo_3u31XFROw13lY&inputtype=textquery&fields=name,photos`;
    //   await axios.get(proxyUrl + url).then((response) => {
    //     console.log(response.data);
    //     const candidates = response.data.candidates;
    //     const candidate = candidates[0];
    //     photoRef.value = candidate.photos[0].photo_reference;
    //   });
    //   const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef.value}&key=AIzaSyBv3FNyj-xBgcRGLDvyo_3u31XFROw13lY&maxwidth=400&maxheight=400`;
    //   const imageURLQuery = await fetch(proxyUrl + photoUrl).then((response) =>
    //     response.blob()
    //   );
    //   image.value = URL.createObjectURL(imageURLQuery);
    //   console.log(image);
    // };

    // onBeforeMount(() => {
    //   console.log("mounted!");
    // });
    // getPlacePhoto(props.list[0].name);

    return { placeholderData };
  },
};
</script>

<template>
  <div>
    <div class="container-fluid d-flex text-center bg-dark">
      <!-- class horizontalScroll for horizontal -->
      <div class="row">
        <template v-for="country in list[page]" :key="country">
          <CountryCard
            class="col-xxl-2 col-xl-3 col-lg-4 col-md-6"
            :details="country"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.horizontalScroll {
  display: flex;
  overflow-x: auto;
}
</style>

<script>
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import CountryCard from "../components/CountryCard.vue";

export default {
  components: { CountryCard },
  props: {
    list: Object,
    page: Number,
  },
  setup(props) {
    console.log("props list is", props.list);
    console.log("current page in country list is", props.page);

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

    return {};
  },
};
</script>

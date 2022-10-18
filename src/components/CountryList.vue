<template>
  <div>
    <div>
      <p>Image here</p>
      <img :src="image.value" />
    </div>

    <div class="container-fluid d-flex text-center">
      <div class="horizontalScroll">
        <div
          class="card col-2 bg-transparent border-success"
          v-for="country in list"
          :key="country"
        >
          <img :src="image.value" class="card-img-top" alt="" />
          <div class="card-body text-white">
            <h5 class="card-title">{{ country.name }}</h5>
            <p class="card-text">
              {{ country.continent }}
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
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

export default {
  props: {
    list: Object,
  },
  setup(props) {
    console.log(props.list[0]);
    var photoRef = ref("");
    var image = ref("");

    const getPlacePhoto = async (countryName) => {
      // const proxyUrl = "http://blooming-reaches-84388.herokuapp.com/";
      // const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${countryName}&key=AIzaSyBv3FNyj-xBgcRGLDvyo_3u31XFROw13lY&inputtype=textquery&fields=name,photos`;
      // await axios.get(proxyUrl + url).then((response) => {
      //   console.log(response.data);
      //   const candidates = response.data.candidates;
      //   const candidate = candidates[0];
      //   photoRef.value = candidate.photos[0].photo_reference;
      // });
      // const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef.value}&key=AIzaSyBv3FNyj-xBgcRGLDvyo_3u31XFROw13lY&maxwidth=400&maxheight=400`;
      // const imageURLQuery = await fetch(proxyUrl + photoUrl).then((response) =>
      //   response.blob()
      // );
      // image.value = URL.createObjectURL(imageURLQuery);
      // console.log(image);
    };

    onBeforeMount(() => {
      console.log("mounted!");

      getPlacePhoto(props.list[3].name);
    });
    getPlacePhoto(props.list[3].name);

    return { getPlacePhoto, image };
  },
};
</script>

<template>
  <div v-if="details" class="card bg-transparent border-0">
    <img
      v-if="imageLoading"
      :src="image"
      class="card-img-top rounded"
      alt="image here"
    />
    <div v-else class="d-flex" style="height: 18rem">
      <div class="spinner-border mx-auto align-self-center" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="card-body text-white">
      <h5 class="card-title">{{ details.name }}</h5>
      <p class="card-text">
        {{ details.region }}
      </p>
    </div>
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
  height: 18rem;
}
</style>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  props: { details: Object },
  setup(props) {
    let imageLoading = ref(false);
    let image = ref(null);
    let photoRef = ref("");
    let countryDetails = JSON.parse(JSON.stringify(props.details));
    // console.log("details are ,", JSON.stringify(props.details));

    const getPlacePhoto = async (countryName) => {
      const proxyUrl = "http://blooming-reaches-84388.herokuapp.com/";
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${countryName}&key=AIzaSyBv3FNyj-xBgcRGLDvyo_3u31XFROw13lY&inputtype=textquery&fields=name,photos`;
      await axios.get(proxyUrl + url).then((response) => {
        console.log(response.data);
        const candidates = response.data.candidates;
        const candidate = candidates[0];
        photoRef.value = candidate.photos[0].photo_reference;
      });
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef.value}&key=AIzaSyBv3FNyj-xBgcRGLDvyo_3u31XFROw13lY&maxwidth=400&maxheight=400`;
      const imageURLQuery = await fetch(proxyUrl + photoUrl).then((response) =>
        response.blob()
      );
      image.value = URL.createObjectURL(imageURLQuery);
      // console.log(image);
      imageLoading.value = true;
    };

    const isJsonObject = (data) => {
      console.log("type of data is", typeof data);
      try {
        JSON.parse(data);
      } catch (e) {
        return false;
      }
      return true;
    };

    if (typeof countryDetails.name == "object") {
      console.log("this is a JSON", countryDetails);
      image.value = getPlacePhoto(countryDetails.name.official);
    } else {
      image.value = getPlacePhoto(countryDetails.name);
    }
    // console.log("country details is", countryDetails["name"]);

    return { image, imageLoading, countryDetails };
  },
};
</script>

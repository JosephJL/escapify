<template>
  <div
    @click="getCountry()"
    v-if="details"
    class="card bg-transparent border-0"
    style="cursor: pointer"
  >
    <img
      v-if="imageLoading"
      :src="returnURl"
      class="card-img-top rounded"
      alt="image here"
    />
    <div v-else class="d-flex" style="height: 18rem; width: 100%">
      <div
        class="spinner-grow text-light mx-auto align-self-center"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="card-body text-white">
      <h5 class="card-title">Country : {{ countryName }}</h5>
      <p class="card-text">Region : {{ details.region }}</p>
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
import { useRouter } from "vue-router";
import getPlacePhoto from "../composables/image/getPhotos.js";

export default {
  props: { details: Object },
  setup(props) {
    let image = ref(null);
    let countryDetails = JSON.parse(JSON.stringify(props.details));

    const countryName = ref(null);

    const { imageLoading, returnURl, load } = getPlacePhoto();

    console.log(returnURl);

    if (typeof countryDetails.name == "object") {
      console.log("this is a JSON", countryDetails);
      countryDetails.name.official;
      countryName.value = countryDetails.name.official;
      load(countryDetails.name.official);
    } else {
      countryName.value = countryDetails.name;
      load(countryDetails.name);
      console.log("image is now", returnURl);
    }

    console.log("country details is", JSON.stringify(props.details));

    const router = useRouter();

    const getCountry = () => {
      router.push({
        name: "Country",
        params: {
          name: countryDetails["name"],
        },
        query: {
          details: JSON.stringify(props.details),
        },
      });
    };

    return { returnURl, imageLoading, getCountry, countryName };
  },
};
</script>

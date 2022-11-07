<template>
  <div class="card bg-transparent border-0 container-fluid">
    <div class="card-body align-items-start row">
      <div class="col">
        <img
          v-if="imageLoading"
          :src="returnURl"
          class="card-img-top rounded"
          alt="image here"
          style="height: 10rem; object-fit: cover"
        />
        <div v-else class="d-flex" style="height: 18rem">
          <div class="spinner-border mx-auto align-self-center" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div class="col">
        <h5 class="card-title">{{ hotelName }}</h5>
        <p class="card-text">
          Address: {{ hotelAddress }} <br />
          Rating: {{ hotelStars }}
        </p>
      </div>
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
// import { ref } from "vue";
import axios from "axios";
import router from "../../router/index";
import getPlacePhoto from "../../composables/image/getPhotos.js";

export default {
  props: { details: Object },
  setup(props) {
    // console.log(hotel)
    // console.log(props)
    // let image = ref(null);
    // console.log(props.details[0])
    let hotelName = JSON.parse(JSON.stringify(props.details[0]));
    let hotelAddress = JSON.parse(JSON.stringify(props.details[1]));
    let hotelStars = JSON.parse(JSON.stringify(props.details[2]));
    const { imageLoading, returnURl, load } = getPlacePhoto();

    load(hotelName);
    load(hotelAddress);
    // console.log("hotel name is", hotelName);
    // console.log("hotel address is ", hotelAddress)

    return { returnURl, imageLoading, hotelName, hotelAddress, hotelStars };
  },
};
</script>

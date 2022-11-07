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
        <button
          v-if="user"
          data-bs-toggle="modal"
          data-bs-target="#TripModal"
          type="button"
          class="btn btn-success"
          @click.prevent="toggleModal"
        >
          Add to Trip
        </button>
      </div>
    </div>
  </div>
  <hr style="border-bottom: 0px">
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
import router from "../../router/index";
import getPlacePhoto from "../../composables/image/getPhotos.js";
import TripModal from "../../components/profile/trip/TripModal.vue";
import getUser from "../../composables/getUser";

export default {
  components: { TripModal },
  props: { details: Object, countryPacket: Object },
  emits: ["modalInfo"],
  setup(props, context) {
    // get user
    const { user } = getUser();

    // console.log(hotel)
    // console.log(props)
    // let image = ref(null);
    // console.log(props.details[0])
    let hotelName = props.details[0];
    let hotelAddress = props.details[1];
    let hotelStars = props.details[2];
    const { imageLoading, returnURl, load } = getPlacePhoto();

    load(hotelName);
    load(hotelAddress);
    // console.log("hotel name is", hotelName);
    // console.log("hotel address is ", hotelAddress)

    const typeLocation = ref("hotels");

    const toggleModal = () => {
      console.log("toggled!!");
      context.emit("modalInfo", {
        name: props.details[0],
        address: props.details[1],
        rating: props.details[2],
      });
    };

    return {
      toggleModal,
      typeLocation,
      returnURl,
      imageLoading,
      hotelName,
      hotelAddress,
      hotelStars,
      user,
    };
  },
};
</script>

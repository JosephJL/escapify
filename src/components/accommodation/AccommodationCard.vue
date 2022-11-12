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
        <div v-else class="d-flex" style="height: 10rem; width: 100%">
          <div
            class="spinner-grow text-light mx-auto align-self-center"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
          <!-- <img
          src="https://img.icons8.com/ios/50/null/beach.png"
          class="card-img-top rounded"
          alt="image here"
        /> -->
        </div>
      </div>
      <div class="col">
        <h5 class="card-title">{{ hotelName }}</h5>
        <p class="card-text">
          Address: {{ hotelAddress }} <br />
          Rating: {{ hotelStars }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-star"
            viewBox="0 0 16 16"
            style="margin-bottom: 2px"
          >
            <path
              d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
            />
          </svg>
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
  <hr style="border-bottom: 0px" />
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

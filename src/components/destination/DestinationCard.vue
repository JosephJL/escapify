<template>
  <div id="destinationCard" class="card border-0" style="height: 100%">
    <!-- :style="isClicked ? { 'background-color': '#e6e6e6' } : null" -->

    <div class="card-body" style="white-space: initial">
      <img
        v-if="imageLoading"
        :src="returnURl"
        id="destinationImage"
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
      </div>
      <h5 class="card-title">Name:{{ details.properties.name }}</h5>
      <p id="infoSection" v-if="info">{{ info }}</p>
      <!-- {{ details }} -->
      <template v-for="kind of details.properties.kinds.split(',')" :key="kind">
        <span class="bg-warning rounded-5 m-2">
          {{ kind }}
        </span>
      </template>
      <div class="">
        <button
          type="button"
          class="btn btn-outline-primary mx-2"
          @click="selectDestination"
        >
          Info
        </button>
        <button
          v-if="user"
          data-bs-toggle="modal"
          data-bs-target="#TripModal"
          type="button"
          class="btn btn-outline-success"
        >
          Add to Trip
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 767px) {
  #destinationCard {
    width: 100%;
  }
}
@media (max-width: 767px) {
  #infoSection {
    display: none;
  }
  #destinationCard {
    width: 20rem;
  }
}
</style>

<script>
import { ref } from "vue";
import getDestinationInfo from "../../composables/destination/getDestinationInfo";
import getPlacePhoto from "../../composables/image/getPhotos";
import getUser from "../../composables/getUser";

export default {
  props: { details: Object },
  emits: ["selected"],
  setup(props, context) {
    const { user } = getUser();
    console.log("destination user is", user);

    const { loadText, error, info } = getDestinationInfo();
    loadText(props.details.properties.xid);

    const isClicked = ref(false);

    const selectDestination = () => {
      isClicked.value = true;
      context.emit("selected", {
        name: props.details.properties.name,
        // text: info.value,
        lon: props.details.geometry.coordinates[0],
        lat: props.details.geometry.coordinates[1],
      });
    };

    const { imageLoading, returnURl, load } = getPlacePhoto();
    load(props.details.properties.name);

    return {
      selectDestination,
      info,
      isClicked,
      imageLoading,
      returnURl,
      user,
    };
  },
};
</script>

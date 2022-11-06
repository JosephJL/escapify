<template>
  <div
    @click="selectDestination"
    class="card"
    style="height: 100%; width: 100%"
    :style="isClicked ? { 'background-color': '#e6e6e6' } : null"
  >
    <div class="float-end">
      <button
        v-if="user"
        data-bs-toggle="modal"
        data-bs-target="#TripModal"
        type="button"
        class="btn btn-info float-end"
      >
        Add to Trip
      </button>
    </div>
    <img
      v-if="imageLoading"
      :src="returnURl"
      class="card-img-top rounded"
      alt="image here"
      style="height: 100%; object-fit: cover"
    />
    <div v-else class="d-flex" style="height: 100%; width: 100%">
      <div
        class="spinner-grow text-light mx-auto align-self-center"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="card-body">
      <!-- textExists is {{ textExists }} -->
      <!-- {{ details }} -->
      <h5 class="card-title">Name:{{ details.properties.name }}</h5>
      <p v-if="info">{{ info }}</p>
      <template v-for="kind of details.properties.kinds.split(',')" :key="kind">
        <span class="bg-warning rounded-5 m-2">
          {{ kind }}
        </span>
      </template>
      <!-- <p class="card-text">Details is {{ info }}</p> -->
      <!-- <button @click="selectDestination" class="btn btn-info">
        Go to Destination
      </button> -->
    </div>
  </div>
</template>

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

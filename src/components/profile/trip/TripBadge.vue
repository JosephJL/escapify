<template>
  <div class="card bg-transparent border-0 badgecard" style="width: 10rem">
    <div class="d-flex" v-if="imageLoading">
      <img
        src="../../../assets/img/locations.png"
        draggable="false"
        class="card-img-top rounded-circle img-fluid mx-auto"
        alt="image here"
        style="
          object-fit: scale-down;
          width: 30%;
          height: 8rem;
          cursor: pointer;
        "
        @click="displayTrip"
      />
    </div>
    <div v-else class="d-flex" style="height: 8rem; width: 100%">
      <div
        class="spinner-grow text-light mx-auto align-self-center"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="card-body text-light" style="white-space: initial">
      {{ details[1].tripName }}
    </div>
  </div>
</template>

<style>
.badgecard {
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
}
.badgecard:hover {
  transform: scale(1.1);
}
</style>

<script>
import getPlacePhoto from "../../../composables/image/getPhotos";

export default {
  props: { details: Object },
  emits: ["selectedTrip"],
  setup(props, context) {
    console.log("props is ", props.details);
    const { imageLoading, returnURl, load } = getPlacePhoto();
    load(props.details["1"].name);

    const displayTrip = () => {
      context.emit("selectedTrip", props.details);
    };

    return { imageLoading, returnURl, displayTrip };
  },
};
</script>

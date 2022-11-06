<template>
  <div
    v-if="info"
    @click="selectDestination"
    class="card"
    style="height: 100%"
    :style="isClicked ? { 'background-color': '#e6e6e6' } : null"
  >
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
      {{ details.properties }}
      <!-- <p class="card-text">Details is {{ info }}</p> -->
      <button @click="selectDestination" class="btn btn-info">
        Go to Destination
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import getDestinationInfo from "../../composables/destination/getDestinationInfo";
import getPlacePhoto from "../../composables/image/getPhotos";

export default {
  props: { details: Object },
  emits: ["selected"],
  setup(props, context) {
    // const { loadText, error, info } = getDestinationInfo();
    const info = ref("hello this is some text");
    // loadText(props.details.properties.xid);

    const isClicked = ref(false);

    const selectDestination = () => {
      isClicked.value = true;
      context.emit("selected", {
        name: props.details.properties.name,
        text: info.value,
      });
    };

    // const { imageLoading, returnURl, load } = getPlacePhoto();
    // load(props.details.properties.name);
    const imageLoading = ref(false);

    return { selectDestination, info, isClicked, imageLoading };
  },
};
</script>

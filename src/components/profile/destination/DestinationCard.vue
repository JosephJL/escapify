<template>
  <div class="card mb-2 container">
    <div class="row align-items-start">
      <div class="col">
        <img
          v-if="imageLoading"
          :src="returnURl"
          class="card-img-top rounded img-fluid"
          alt="image here"
          style="object-fit: cover; width: 10rem; height: 10rem"
        />
        <div v-else class="d-flex" style="height: 10rem; width: 100%">
          <div
            class="spinner-grow text-light mx-auto align-self-center"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div class="col text-black">
        <p class="card-title">{{ details[1].name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import queryHotels from "../../../composables/collection/queryHotels";
import getUser from "../../../composables/getUser";
import getPlacePhoto from "../../../composables/image/getPhotos";

export default {
  props: {
    details: Object,
    id: String,
  },
  setup(props) {
    const { user } = getUser();

    console.log("id is", props.id);

    const { imageLoading, returnURl, load } = getPlacePhoto();
    load(props.details[1].name);

    return { imageLoading, returnURl };
  },
};
</script>

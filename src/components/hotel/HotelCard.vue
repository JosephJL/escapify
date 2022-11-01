<template>
  <div class="card mb-2 container">
    <div class="row align-items-start">
      <div class="col">
        <img
          v-if="imageLoading"
          :src="returnURl"
          class="rounded img-fluid"
          alt="image here"
          style="object-fit: cover; width: 10rem; height: 10rem"
        />
        <div v-else class="d-flex" style="height: 18rem; width: 100%">
          <div
            class="spinner-grow text-light mx-auto align-self-center"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>

      <div class="text-black col">
        <p class="card-title">{{ details[1].name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import getPlacePhoto from "../../composables/image/getPhotos";

export default {
  props: {
    details: Object,
    id: String,
  },
  setup(props) {
    const { imageLoading, returnURl, load } = getPlacePhoto();
    load(props.details[1].name);

    return { imageLoading, returnURl, load };
  },
};
</script>

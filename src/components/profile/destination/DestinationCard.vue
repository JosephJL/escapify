<template>
  <div
    id="destinationCard"
    class="card card-body mx-2 bg-white border-0 container"
    draggable="true"
  >
    <div class="row" style="width: 100%">
      <div class="col-6 p-0">
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
      <div
        class="col-6 text-black text-center align-self-center"
        style="white-space: initial;"
      >
        <p class="card-title">{{ details[1].name }}</p>
        <button
          class="btn btn-outline-danger align-self-end"
          @click.prevent="removeItem"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#destinationCard {
  width: 20rem;
}
</style>

<script>
import getUser from "../../../composables/getUser";
import getPlacePhoto from "../../../composables/image/getPhotos";
import useNestedCollection from "../../../composables/collection/useNestedCollection";

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

    const { addHotel, addDestination, error, delDestination } =
      useNestedCollection();

    const removeItem = () => {
      // console.log("remove remove!");
      delDestination(props.id, props.details[0]);
      if (error) {
        // alert(error);
      } else {
        // alert("deleted!");
      }
    };

    return { imageLoading, returnURl, removeItem };
  },
};
</script>

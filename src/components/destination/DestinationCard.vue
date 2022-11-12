<template>
  <div
    id="destinationCard"
    class="card border-0 text-white"
    style="height: 100%; background-color: darkslategrey;"
  >
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
        <!-- <img
          src="https://img.icons8.com/ios/50/null/beach.png"
          class="card-img-top rounded"
          alt="image here"
        /> -->
      </div>
      <h5 class="card-title">
        <strong>Name: </strong>{{ details.properties.name }}
      </h5>
      <div class="collapse" :id="'collapse-' + details.id">
        <p>{{ info }}</p>
      </div>

      <!-- {{ details }} -->
      <div>
        <strong>Tags:</strong>
        <template
          v-for="kind of details.properties.kinds.split(',')"
          :key="kind"
        >
          <span
            class="badge badge-pill badge-warning m-1"
            style="background-color: #fa5246"
          >
            {{ kind }}
          </span>
        </template>
      </div>

      <div class="">
        <button
          id="infoSection"
          v-if="info"
          class="btn btn-info me-2"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse-' + details.id"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <span>More Info</span>
        </button>

        <button
          type="button"
          class="btn btn-primary me-2"
          @click.prevent="selectDestination"
        >
          Nearby Hotels
        </button>
        <button
          v-if="user"
          data-bs-toggle="modal"
          data-bs-target="#TripModal"
          type="button"
          class="btn btn-success"
          style="color: white"
          @click.prevent="toggleModal"
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
    margin-right: 1rem;
  }
}
</style>

<script>
import { ref } from "vue";
import getDestinationInfo from "../../composables/destination/getDestinationInfo";
import getPlacePhoto from "../../composables/image/getPhotos";
import getUser from "../../composables/getUser";
import TripModal from "../../components/profile/trip/TripModal.vue";

export default {
  components: { TripModal },
  props: { details: Object, countryPacket: Object },
  emits: ["selected", "modalInfo"],
  setup(props, context) {
    const { user } = getUser();
    // console.log("destination user is", user);

    const { loadText, error, info } = getDestinationInfo();
    loadText(props.details.properties.xid);

    const isClicked = ref(false);

    const selectDestination = () => {
      isClicked.value = true;
      context.emit("selected", {
        name: props.details.properties.name,
        // text: info.value,
        lon: props.details.geometry.coordinates["0"],
        lat: props.details.geometry.coordinates["1"],
      });
    };

    const { imageLoading, returnURl, load } = getPlacePhoto();
    load(props.details.properties.name);

    const typeLocation = ref("destinations");

    const toggleModal = () => {
      // console.log("toggled!!");
      context.emit("modalInfo", {
        name: props.details.properties.name,
        lon: props.details.geometry.coordinates["0"],
        lat: props.details.geometry.coordinates["1"],
        xid: props.details.properties.xid,
        kinds: props.details.properties.kinds,
      });
    };

    return {
      toggleModal,
      typeLocation,
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

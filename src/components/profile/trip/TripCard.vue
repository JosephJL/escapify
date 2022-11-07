<template>
  <div class="card border-0 container-fluid">
    <div class="card-body bg-light align-items-start">
      <!-- Trip Name -->
      <div class="align-self-center">
        <div class="card bg-transparent border-0">
          <img
            v-if="imageLoading"
            :src="returnURl"
            class="card-img-top rounded img-fluid mx-auto"
            alt="image here"
            style="object-fit: cover; width: 20rem; height: 18rem"
          />
          <div v-else class="d-flex" style="height: 18rem; width: 100%">
            <div
              class="spinner-grow text-light mx-auto align-self-center"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="card-body text-black">
            <p class="card-title">{{ details[1].tripName }}</p>
            <p class="card-title">{{ details[1].name }}</p>
          </div>
        </div>
      </div>

      <!-- Destination/Hotels Section -->
      <div class="row">
        <div class="">
          <p>Destinations Planned</p>
          <DestinationList :list="documents" :id="tripId" />
        </div>
      </div>

      <div class="row">
        <div class="">
          <p>Hotels Planned</p>
          <HotelList :list="hotels" :id="tripId" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
  height: 18rem;
}

#listScroll {
  display: flex;
  overflow-y: auto;
  white-space: nowrap;
  cursor: grab;
}
</style>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import getUser from "../../../composables/getUser";
import queryNestedCollection from "../../../composables/collection/queryNestedCollection";
import queryHotels from "../../../composables/collection/queryHotels";
import DestinationCard from "../destination/DestinationCard.vue";
import DestinationList from "../destination/DestinationList.vue";
import HotelList from "../hotel/HotelList.vue";
import getPlacePhotos from "../../../composables/image/getPhotos";

export default {
  components: { DestinationList, HotelList },
  props: { details: Object },
  setup(props) {
    const tripId = ref(props.details[0]);
    console.log("tripId is,", tripId);

    const { user } = getUser();
    const { documents, error, loadNestedCollection } = queryNestedCollection();

    const userId = JSON.parse(JSON.stringify(user.value)).uid;
    loadNestedCollection("trips", "destinations", tripId.value, userId);

    const { hotels, hotelError, loadHotelsCollection } = queryHotels();

    loadHotelsCollection(tripId.value, userId);

    const getCountry = (countryName) => {
      router.push({ name: "Country", params: { name: countryName } });
    };

    const { imageLoading, returnURl, load } = getPlacePhotos();
    load(props.details[1].name);

    return { imageLoading, returnURl, documents, hotels, tripId };
  },
};
</script>

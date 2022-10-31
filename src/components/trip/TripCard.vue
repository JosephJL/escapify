<template>
  <div class="card border-0 container">
    <div class="card-body bg-light row align-items-start">
      <div class="col align-self-center">
        <div class="card bg-transparent border-0">
          <img
            v-if="imageLoading"
            :src="returnURl"
            class="card-img-top rounded img-fluid"
            alt="image here"
            style="object-fit: cover"
          />
          <div v-else class="d-flex" style="height: 18rem; width: 100%">
            <div class="spinner-border mx-auto align-self-center" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="card-body text-black">
            <p class="card-title">{{ details[1].name }}</p>
          </div>
        </div>
      </div>
      <div class="col">
        <p>Destinations Planned</p>

        <DestinationList :list="documents" :id="tripId" />
      </div>
      <div class="col">
        <p>Hotels Planned</p>

        <HotelList :list="hotels" :id="tripId" />
      </div>
    </div>
  </div>
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
import { useRouter } from "vue-router";
import getUser from "../../composables/getUser";
import queryNestedCollection from "../../composables/collection/queryNestedCollection";
import queryHotels from "../../composables/collection/queryHotels";
import DestinationCard from "../destination/DestinationCard.vue";
import DestinationList from "../destination/DestinationList.vue";
import HotelList from "../hotel/HotelList.vue";
import getPlacePhotos from "../../composables/image/getPhotos";

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

<template>
  <div v-if="destroy" class="card border-0 container-fluid">
    <div class="card-body rounded-3" style="background-color: #ffa8ba">
      <!-- Trip Name -->
      <div class="">
        <div class="card bg-transparent border-0">
          <button
            class="btn btn-outline-danger align-self-end"
            @click.prevent="removeItem"
          >
            Remove Trip
          </button>

          <div class="row">
            <div class="col-md-6 mt-2">
              <img
                v-if="imageLoading"
                :src="returnURl"
                class="card-img-top rounded img-fluid"
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
            </div>
            <div class="col">
              <div class="card-body text-black">
                <span><strong class="fs-3">Trip Name: </strong></span>
                <p class="card-title fs-4">{{ details[1].tripName }}</p>
                <span><strong class="fs-5">Location: </strong></span>
                <p class="card-title">{{ details[1].name }}</p>
              </div>
            </div>
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
import useCollection from "../../../composables/collection/useCollection";

export default {
  components: { DestinationList, HotelList },
  props: { details: Object },
  setup(props) {
    const tripId = ref(props.details[0]);
    console.log("tripId is,", tripId);

    const { user } = getUser();
    const { documents, error, loadNestedCollection } = queryNestedCollection();

    const userId = user.value.uid;
    loadNestedCollection("trips", "destinations", tripId.value, userId);

    const { hotels, hotelError, loadHotelsCollection } = queryHotels();

    loadHotelsCollection(tripId.value, userId);

    // const getCountry = (countryName) => {
    //   router.push({ name: "Country", params: { name: countryName } });
    // };

    const { imageLoading, returnURl, load } = getPlacePhotos();
    load(props.details[1].name);

    const { addDocument, collectionError, delDocument } = useCollection();

    const destroy = ref(true);

    const removeItem = () => {
      console.log("remove remove!");
      delDocument(tripId.value);
      if (collectionError) {
        alert(collectionError);
      } else {
        alert("deleted!");
        destroy.value = false;
      }
    };

    return {
      imageLoading,
      returnURl,
      documents,
      hotels,
      tripId,
      removeItem,
      destroy,
    };
  },
};
</script>

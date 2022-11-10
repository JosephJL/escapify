<template>
  <div v-if="destroy" class="card border-0 container-fluid">
    <div
      class="card-body rounded-3"
      :style="{ backgroundImage: `url(${returnURl})` }"
      style="
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      "
    >
      <!-- Trip Name -->
      <div class="">
        <div class="card bg-transparent border-0">
          <div class="">
            <button
              class="btn btn-danger float-end"
              @click.prevent="removeItem"
            >
              Remove Trip
            </button>
            <button
              v-if="!details[1].shareStatus"
              class="btn btn-success float-end me-2"
              @click.prevent="shareItem"
            >
              Share Trip
            </button>
            <button
              v-else
              class="btn btn-success float-end me-2"
              @click.prevent="shareItem"
            >
              unshare
            </button>
          </div>

          <div class="row justify-content-center mb-3">
            <!-- <div class="col-md-6 mt-2">
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
            </div> -->
            <div class="col-3">
              <div
                class="card-body text-light rounded-3 bg-dark"
                style="--bs-bg-opacity: 0.6;"
              >
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
        <div class="text-light bg-dark mb-2" style="--bs-bg-opacity: 0.5">
          <p><strong class="fs-2"> Destinations Planned: </strong></p>
          <DestinationList
            style="opacity: 0.9"
            :list="documents"
            :id="tripId"
          />
        </div>
      </div>

      <div class="row mb-2">
        <div class="text-light bg-dark" style="--bs-bg-opacity: 0.5">
          <p>
            <strong class="fs-2">Hotels Planned: </strong>
          </p>
          <HotelList style="opacity: 0.9" :list="hotels" :id="tripId" />
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

    const { addDocument, collectionError, delDocument, updateDocument } =
      useCollection();

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

    const shareItem = () => {
      let value = !props.details[1].shareStatus;
      console.log("update to", value);
      updateDocument(tripId.value, value);
      if (collectionError) {
        console.log(collectionError);
      }
    };

    return {
      shareItem,
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

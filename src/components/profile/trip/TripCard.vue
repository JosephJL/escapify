<template>
  <div v-if="destroy" class="card border-0 container-fluid p-0">
    <div
      class="card-body rounded-2"
      :style="{ backgroundImage: `url(${returnURl})` }"
      style="
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-color: black;
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
              Remove Trip
            </button>
            <div class="dropdown float-end me-2" v-if="!localStatus">
              <button
                class="btn btn-info dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-share"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                  />
                </svg>
                Share
              </button>
              <ul class="dropdown-menu p-3" style="width: 16rem; height: 16rem">
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    v-model="postText"
                    style="height: 11rem"
                  ></textarea>
                  <label for="floatingTextarea"
                    >Share more about your trip</label
                  >
                </div>
                <button class="btn btn-info mt-3" @click.prevent="shareItem">
                  Post
                </button>
              </ul>
            </div>
            <button
              v-else
              class="btn btn-info float-end me-2"
              @click.prevent="shareItem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-share"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
                />
              </svg>
              Unshare
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
            <div class="col-lg-3 col-md-6">
              <div
                class="card-body text-light rounded-3 bg-dark"
                style="--bs-bg-opacity: 0.6"
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
        <div
          class="text-light bg-dark mb-2"
          style="--bs-bg-opacity: 0.5"
          v-if="documents.length"
        >
          <p><strong class="fs-2"> Destinations Planned: </strong></p>
          <DestinationList
            style="opacity: 0.9"
            :list="documents"
            :id="tripId"
          />
        </div>
      </div>

      <div class="row mb-2" v-if="hotels.length">
        <div class="text-light bg-dark" style="--bs-bg-opacity: 0.5">
          <p>
            <strong class="fs-2">Hotels Planned: </strong>
          </p>
          <HotelList style="opacity: 0.9" :list="hotels" :id="tripId" />
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="itinerary" style="height: 600px">Planner is here</div> -->
  <TripPlanner :destinations="documents" :hotels="hotels" />
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
import TripPlanner from "../../itinerary/TripPlanner.vue";

export default {
  components: { DestinationList, HotelList, TripPlanner },
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
        // alert("deleted!");
        destroy.value = false;
      }
    };

    const localStatus = ref(props.details[1].shareStatus);
    const postText = ref("");

    const shareItem = () => {
      console.log("current value is", localStatus.value);
      let value = !localStatus.value;

      console.log("update to", value);
      updateDocument(tripId.value, value, postText.value);
      localStatus.value = !localStatus.value;
      if (collectionError) {
        console.log(collectionError);
      }
    };

    return {
      postText,
      localStatus,
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

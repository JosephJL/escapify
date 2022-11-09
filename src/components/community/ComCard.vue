<template>
  <div v-if="destroy" class="border-0 container-fluid">
    <div class="row">
      <div class="col-3 d-none d-md-block"></div>

      <div class="card-body rounded-3 mb-3 col-6">
        <!-- Trip Name -->
        <div class="bg-light">
          <div class="card bg-transparent border-0">
            <div class="align-middle ps-2 pe-2 pt-1">
              <!-- <button
                class="btn btn-danger float-end"
                @click.prevent="removeItem"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-three-dots"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                  />
                </svg>
                Remove Trip
              </button> -->
              <div class="d-flex flex-column float-start">
                <span class="">
                  <strong class="fs-5 float-start"
                    >{{ details[1].userName }}
                  </strong>
                </span>
                <span class="float-start align-middle"
                  >Fellow Traveller heading to {{ details[1].name }}</span
                >
              </div>
            </div>
            <div class="d-flex ps-2 pe-2 pt-4">
              <span class="text-start">{{ details[1].postInfo }}</span>
            </div>
            <div class="row">
              <div class="col-12 mt-2">
                <img
                  v-if="imageLoading"
                  :src="returnURl"
                  class="card-img-top img-fluid"
                  alt="image here"
                  style="object-fit: cover; width: 100%; height: 35rem"
                />
                <div v-else class="d-flex" style="width: 100%; height: 35rem">
                  <div
                    class="spinner-grow text-light mx-auto align-self-center"
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Destination/Hotels Section -->
            <div class="d-flex flex-column ps-2 pe-2 pt-1">
              <span>
                <strong class="fs-5 float-start">Destinations: </strong>
              </span>
              <!-- <DestinationList :list="documents" :id="tripId" /> -->
              <div>
                <template v-for="(document, index) of documents" :key="index">
                  <span
                    class="badge badge-pill badge-warning m-1 fs-6 float-start"
                    style="background-color: #fa5246"
                  >
                    {{ document[1].name }}
                  </span>
                </template>
              </div>
              <p class="ps-2 pe-2 pt-1">
                <button
                  class="btn btn-primary float-start"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="'#collapse-' + details[0]"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-chat"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                    />
                  </svg>
                </button>
              </p>
              <div class="collapse" :id="'collapse-' + details[0]">
                <div class="d-flex">
                  <span class="fs-5 mt-1">{{ details[1].userName }}</span>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="tripName"
                      placeholder="Write a comment..."
                      aria-describedby="button-addon2"
                    />
                    <button
                      @click="addComment"
                      data-bs-dismiss="modal"
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                    >
                      Comment
                    </button>
                  </div>
                </div>
                <div v-for="range of 10" :key="range">
                  <div class="d-flex mt-2">
                    <span class="fs-5">{{ details[1].userName }}</span>
                    <div class="card card-body">
                      Some placeholder content for the collapse component. This
                      panel is hidden by default but revealed when the user
                      activates the relevant trigger.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-3 d-none d-md-block"></div>
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
import getUser from "../../composables/getUser";
import queryNestedCollection from "../../composables/collection/queryNestedCollection";
import queryHotels from "../../composables/collection/queryHotels";
import DestinationList from "../destination/DestinationList.vue";
import HotelList from "../profile/hotel/HotelList.vue";
import getPlacePhotos from "../../composables/image/getPhotos";
import useCollection from "../../composables/collection/useCollection";

export default {
  components: { DestinationList, HotelList },
  props: { details: Object },
  setup(props) {
    const tripId = ref(props.details[0]);
    console.log("tripId is,", tripId);

    const { user } = getUser();
    const { documents, error, loadNestedCollection, loadNestedDestination } =
      queryNestedCollection();

    loadNestedDestination("trips", "destinations", tripId.value);

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
      tripId,
      removeItem,
      destroy,
    };
  },
};
</script>

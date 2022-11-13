<template>
  <div class="border-0 container-fluid">
    <div class="row">
      <div class="col-3 d-none d-md-block"></div>

      <div class="card-body mb-3 col-6">
        <!-- Trip Name -->
        <div class="bg-light rounded-3" style="--bs-bg-opacity: 0.9">
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
                <span
                  id="emailHelp"
                  class="form-text"
                  style="font-size: 12px"
                  >{{ details[1].createdAt.toDate() }}</span
                >
                <span>
                  <strong class="fs-5 float-start"
                    >{{ details[1].userName }}
                  </strong>
                </span>
                <span>
                  <strong class="float-start">Fellow Traveller</strong>
                </span>
                <span>
                  <strong class="float-start">Country:</strong>
                  <span class="float-start">{{ details[1].name }}</span>
                </span>
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
                <div v-for="(document, index) of documents" :key="index">
                  <span
                    class="badge badge-pill badge-warning m-1 fs-6 float-start"
                    style="background-color: #fa5246; white-space: initial"
                  >
                    {{ document[1].name }}
                  </span>
                </div>
              </div>
              <p class="pt-1">
                <button
                  class="float-start me-1"
                  :class="[
                    like ? 'btn btn-danger text-white' : '',
                    'btn btn-outline-danger',
                  ]"
                  type="button"
                  @click="toggleLike"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-heart"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                    />
                  </svg>
                  <span class="ms-2">{{ formattedLikes.length }}</span>
                </button>
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
                    style="vertical-align: middle"
                  >
                    <path
                      d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                    />
                  </svg>
                  <span class="ms-2">{{ finalComments.length }}</span>
                </button>
              </p>
              <div class="collapse" :id="'collapse-' + details[0]">
                <div class="d-flex">
                  <div class="input-group mx-2">
                    <input
                      type="text"
                      class="form-control"
                      v-model="currComment"
                      placeholder="Write a comment..."
                      aria-describedby="button-addon2"
                    />
                    <button
                      @click="toggleComment"
                      class="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                    >
                      Comment
                    </button>
                  </div>
                </div>
                <!-- final comments are here{{ finalComments }} -->
                <div v-for="(comment, index) of finalComments" :key="index">
                  <div class="d-flex mt-2">
                    <span class="fs-5">{{ comment[1].commentorName }}</span>
                    <div
                      class="border border-secondary px-2 mx-2 rounded-3 d-flex flex-column text-start"
                      style="width: 100%"
                    >
                      <span class="float-start">{{ comment[1].comment }}</span>
                      <!-- {{ formattedComments }} -->
                      <span
                        id="emailHelp"
                        class="form-text text-end"
                        style="font-size: 8px"
                        >{{ comment[1].createdAt.toDate() }} ago</span
                      >
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
.badge {
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
}
.badge:hover {
  transform: scale(1.05);
}
</style>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import getUser from "../../composables/getUser";
import queryNestedCollection from "../../composables/collection/queryNestedCollection";
import queryCollection from "../../composables/collection/queryCollection";
import DestinationList from "../destination/DestinationList.vue";
import HotelList from "../profile/hotel/HotelList.vue";
import getPlacePhotos from "../../composables/image/getPhotos";
import useCollection from "../../composables/collection/useCollection";
import { Timestamp } from "@firebase/firestore";
import { formatDistanceToNow } from "date-fns";

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

    const { addDocument, collectionError, delDocument, addComment, setLike } =
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

    const {
      likes,
      comments,
      commentError,
      loadCollection,
      loadTripsCollection,
      loadCommentsCollection,
      loadLikesCollection,
    } = queryCollection();

    loadCommentsCollection(props.details[0]);
    loadLikesCollection(tripId.value);

    // const formattedLikes = computed(() => {
    //   if (likes) {
    //     return comments.value.map((doc) => {
    //       console.log("BEFORE ERROR", doc);
    //       let time = formatDistanceToNow(doc[1].createdAt.toDate());
    //       return { ...doc, createdAt: time };
    //     });
    //   }
    // });

    const formattedLikes = computed(() => {
      if (likes) {
        return likes.value.filter((doc) => doc.likeValue == true);
      }
    });

    const finalComments = computed(() => {
      console.log("finalComments here");
      if (comments) {
        return comments.value
          .reverse()
          .filter((doc) => doc[1].tripId == props.details[0]);
      }
    });

    const currComment = ref("");

    const toggleComment = () => {
      if (user.value) {
        console.log("TIMESTAMP IS", Timestamp.now().toDate());
        let commentInfo = {
          comment: currComment.value,
          commentorId: user.value.uid,
          commentorName: user.value.displayName,
          tripId: props.details[0],
          createdAt: Timestamp.now(),
        };
        addComment(commentInfo);
        currComment.value = "";
      } else {
        alert("Log in first to be part of the community");
      }
    };

    const like = ref(false);
    // const toggleLike = () => {
    //   like.value = !like.value;
    // };

    const toggleLike = () => {
      if (user.value) {
        like.value = !like.value;
        let likeInfo = {
          likerId: user.value.uid,
          likerName: user.value.displayName,
          tripId: props.details[0],
          likeValue: like.value,
        };
        setLike(likeInfo, tripId.value, user.value.uid);
      } else {
        alert("Log in first to be part of the community");
      }
    };

    return {
      finalComments,
      toggleLike,
      like,
      formattedLikes,
      currComment,
      toggleComment,
      comments,
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

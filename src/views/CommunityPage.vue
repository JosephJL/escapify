<template>
  <div class="container-fluid">
    <!-- <div class="p-3">
        <p class="float-end bg-light">Welcome back {{ user.displayName }}</p>
      </div> -->
    <div class="mt-4 p-5 rounded">
      <h1 style="color: #00473e">Where people are travelling</h1>
      <p style="color: #00473e">Stay Connected</p>
    </div>
    <div>
      <TripList :trips="documents" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import getCollectionById from "../composables/collection/queryCollection";
import getUser from "../composables/getUser";
import getPlacePhoto from "../composables/image/getPhotos";
import TripList from "../components/profile/trip/TripList.vue";
import TripCard from "../components/profile/trip/TripCard.vue";

export default {
  components: { TripList, TripCard, getPlacePhoto },
  setup(props) {
    const { user } = getUser();
    console.log("user is ,", user.value.uid);
    const userId = user.value.uid;
    const { documents, error, loadCollection, loadTripsCollection } =
      getCollectionById();
    loadTripsCollection();

    return { user, documents };
  },
};
</script>

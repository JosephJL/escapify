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
      <ComList :trips="documents" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import getCollectionById from "../composables/collection/queryCollection";
import getUser from "../composables/getUser";
import getPlacePhoto from "../composables/image/getPhotos";
import ComList from "../components/community/ComList.vue";

export default {
  components: { ComList, getPlacePhoto },
  setup(props) {
    const { user } = getUser();
    console.log("user is ,", user);
    const { documents, error, loadCollection, loadTripsCollection } =
      getCollectionById();
    loadTripsCollection();

    return { user, documents };
  },
};
</script>

<template>
  <div class="container-fluid" style="background-color: #094067; background-image: linear-gradient(#094067, darkturquoise)">
    <!-- <div class="p-3">
        <p class="float-end bg-light">Welcome back {{ user.displayName }}</p>
      </div> -->
    <div class="pt-5 pb-3 rounded">
      <h1 style="color:whitesmoke;">Where People are Travelling</h1> <br>
      <p style="color:whitesmoke;">Stay Connected</p>
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

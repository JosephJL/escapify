<template>
  <div class="container-fluid">
    <!-- <div class="p-3">
        <p class="float-end bg-light">Welcome back {{ user.displayName }}</p>
      </div> -->
    <div class="pt-5 pb-3 rounded">
      <h1 style="color: whitesmoke">Where People are Travelling</h1>
      <br />
      <p style="color: whitesmoke">Stay Connected</p>
    </div>
    <div v-if="loading">
      <ComList :trips="finalTrips" />
    </div>
    <div v-else>
      <div v-for="item in 5" :key="item">
        <div class="container-fluid">
          <div class="row">
            <div class="col-3 d-none d-md-block"></div>
            <div class="card-body col-6">
              <div class="mb-1" style="height: 35rem">
                <ContentLoader height="100%" width="100%">
                  <rect x="0" y="" rx="10" ry="10" width="100%" height="100%" />
                </ContentLoader>
              </div>
              <div>
                <ContentLoader height="100%" width="100%">
                  <rect x="0" y="" rx="10" ry="10" width="100%" height="10%" />
                </ContentLoader>
              </div>
            </div>
            <div class="col-3 d-none d-md-block"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import queryCollectionById from "../composables/collection/queryCollection";
import getUser from "../composables/getUser";
import getPlacePhoto from "../composables/image/getPhotos";
import ComList from "../components/community/ComList.vue";
import { ContentLoader } from "vue-content-loader";

export default {
  components: { ComList, getPlacePhoto, ContentLoader },
  setup(props) {
    const { user } = getUser();
    console.log("user is ,", user);
    const { documents, error, loadCollection, loadTripsCollection, loading } =
      queryCollectionById();
    loadTripsCollection();

    const finalTrips = computed(() => {
      console.log("finalComments here");
      if (documents) {
        return documents.value
          .reverse()
          .filter((doc) => doc[1].shareStatus == true);
      }
    });

    return { user, documents, finalTrips, loading };
  },
};
</script>

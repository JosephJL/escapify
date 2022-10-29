<template>
  <div class="container fluid">
    <Section> Here are your trips </Section>
    Documents are here
    <div>
      <TripList :trips="documents" />
    </div>
  </div>
</template>

<script>
import getCollectionById from "../composables/collection/queryCollection";
import getUser from "../composables/getUser";
import getPlacePhoto from "../composables/image/getPhotos";
import TripList from "../components/trip/TripList.vue";

export default {
  components: { TripList },
  setup() {
    const { user } = getUser();
    console.log("user is ,", JSON.parse(JSON.stringify(user.value)).uid);
    const userId = JSON.parse(JSON.stringify(user.value)).uid;
    const { documents, error, loadCollection } = getCollectionById();
    const { imageLoading, returnURl, loadPhoto } = getPlacePhoto();
    loadCollection("trips", userId);

    console.log("documents is", documents);

    return { documents };
  },
};
</script>

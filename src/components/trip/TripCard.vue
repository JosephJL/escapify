<template>
  <div class="card bg-transparent border-0">
    <div class="card-body">
      {{ details[1].name }}
      <div>
        <p>Destinations Planned</p>
        <template v-for="document in documents" :key="document">
          <DestinationCard :details="document" :id="tripId" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  object-fit: cover;
  height: 18rem;
}
</style>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import getUser from "../../composables/getUser";
import queryNestedCollection from "../../composables/collection/queryNestedCollection";
import DestinationCard from "../destination/DestinationCard.vue";

export default {
  components: { DestinationCard },
  props: { details: Object },
  setup(props) {
    const tripId = ref(props.details[0]);
    console.log("tripId is,", tripId);

    const { user } = getUser();
    const { documents, error, loadNestedCollection } = queryNestedCollection();

    const userId = JSON.parse(JSON.stringify(user.value)).uid;
    loadNestedCollection("trips", "destinations", tripId.value, userId);

    const getCountry = (countryName) => {
      router.push({ name: "Country", params: { name: countryName } });
    };

    return { documents, tripId };
  },
};
</script>

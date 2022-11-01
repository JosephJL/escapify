<template>
  <TripModal :currUser="user" />
</template>

<script>
// Trips Management
import TripModal from "../components/trip/TripModal.vue";
import getUser from "../composables/getUser";

export default {
  components: { TripModal },
  setup() {
    const { user } = getUser();
  },
};
</script>

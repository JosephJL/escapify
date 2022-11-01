<template>
  <div>
    {{ name }}
    <button
      v-if="user"
      data-bs-toggle="modal"
      data-bs-target="#TripModal"
      class="btn btn-info float-end"
    >
      Add to Trip
    </button>
  </div>

  <TripModal :currUser="user" />
</template>

<script>
// Trips Management
import TripModal from "../components/profile/trip/TripModal.vue";
import getUser from "../composables/getUser";

export default {
  components: { TripModal },
  props: {
    name: String,
  },
  setup(props) {
    const { user } = getUser();
    console.log("props name is ,", props.name);

    return { user };
  },
};
</script>

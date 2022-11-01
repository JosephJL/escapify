<template>
  <div
    id="TripModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <h2>Your current trips</h2>

        <template v-for="(document, index) in documents" :key="index">
          <p>{{ documents }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import queryCollectionById from "../../composables/collection/queryCollection";

export default {
  props: { currUser: Object },
  setup(props) {
    const { documents, error, loadCollection } = queryCollectionById();
    loadCollection("trips", props.currUser.uid);

    return { documents, error };
  },
};
</script>

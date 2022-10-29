<template>
  <div>
    {{ details }}
    {{ documents }}
  </div>
</template>

<script>
import queryHotels from "../../composables/collection/queryHotels";
import getUser from "../../composables/getUser";

export default {
  props: {
    details: Object,
    id: String,
  },
  setup(props) {
    const { documents, error, loadHotelsCollection } = queryHotels();
    const { user } = getUser();

    console.log("id is", props.id);

    const userId = JSON.parse(JSON.stringify(user.value)).uid;
    loadHotelsCollection(props.id, props.details[0], userId);

    return { documents };
  },
};
</script>

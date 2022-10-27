<template>
  <div class="container fluid">
    <Section> Here are your trips </Section>
    Documents are here
    {{ documents }}
  </div>
</template>

<script>
import getCollectionById from "../composables/collection/queryCollection";
import getUser from "../composables/getUser";

export default {
  setup() {
    const { user } = getUser();
    console.log("user is ,", JSON.parse(JSON.stringify(user.value)).uid);
    const userId = JSON.parse(JSON.stringify(user.value)).uid;
    const { documents, error, load } = getCollectionById();

    load("trips", userId);
    console.log(documents);

    return { documents };
  },
};
</script>

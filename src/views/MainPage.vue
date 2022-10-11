<template>
  <div class="container">
    <div>Main Page here</div>
  </div>
</template>

<script>
import getUser from "../composables/getUser";
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  components: {},

  setup() {
    const { user } = getUser();
    const router = useRouter();

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Home" });
      }
    });

    return {};
  },
};
</script>

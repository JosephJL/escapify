<template>
  <div class="countryList">
    <div class="container-fluid text-center">
      <div v-if="!placeholderData" class="row">
        <!-- <template v-for="index in 12" :key="index">
          <div
            class="col-xxl-1 col-xl-2 col-lg-3 col-md-4 col-6"
            style="height: 22rem"
          >
            <ContentLoader height="100%" width="100%">
              <rect x="20%" y="82%" rx="4" ry="4" width="60%" height="10" />
              <rect x="30%" y="87%" rx="3" ry="3" width="40%" height="10" />
              <rect x="0" y="" rx="10" ry="10" width="100%" height="80%" />
            </ContentLoader>
          </div>
        </template> -->
      </div>
      <div class="row" v-else>
        <template v-for="country in list" :key="country">
          <div class="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-6">
            <RecentCard :details="country[1]" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countryList {
  height: 100%;
}

.horizontalScroll {
  display: flex;
  overflow-x: auto;
}
</style>

<script>
import axios from "axios";
import { onBeforeMount, ref, onMounted, getCurrentScope, watch } from "vue";
import RecentCard from "../../components/recent/RecentCard.vue";
import { ContentLoader } from "vue-content-loader";

export default {
  components: { ContentLoader, RecentCard },
  props: {
    list: Object,
  },
  setup(props) {
    console.log("props list is", props.list);

    const placeholderData = ref(null);

    onMounted(() => {
      console.log("mounted!!!!!!!!!!!");
      setTimeout(() => {
        placeholderData.value = "Example Data";
      }, 1500);
    });

    const placeholderAssemble = () => {
      placeholderData.value = null;
      setTimeout(() => {
        placeholderData.value = "Example Data";
      }, 1500);
    };

    watch(
      () => props.list,
      () => {
        console.log("LIST IS CHANGINGGGG");
        placeholderAssemble();
      }
    );
    return { placeholderData };
  },
};
</script>

<template>
  <div class="container-fluid">
    <section>
      <h1>Country Name here {{ name }}</h1>
      <span>Information of prop is {{ props }}</span>
    </section>
    <section>
      Country Information
      <template v-for="feature in features">{{ feature }}</template>
    </section>
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import axios from "axios";

export default {
  components: {},
  props: {
    name: String,
  },
  setup(props) {
    console.log(props.name);
    const { name } = toRefs(props);

    const features = ref([]);

    const getCountryInfo = async () => {
      const url = "https://api.geoapify.com/v2/place-details?";
      // lat=1.2963194?lon=103.8476806&apiKey=f1ab693a1cf14c38beffbf9adfac9810

      const params = {
        lat: 1.2963194,
        lon: 103.8476806,
        apiKey: "f1ab693a1cf14c38beffbf9adfac9810",
        features: ["radius_500.tourism"],
      };
      await axios.get(url, { params }).then((response) => {
        features.value = response.data;
        console.log("in then");
        console.log(features.value);
      });
    };
    //hehehehe

    getCountryInfo();

    return { name, features };
  },
};
</script>

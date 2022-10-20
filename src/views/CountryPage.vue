<template>
  <div class="container-fluid">
    <section>
      <h1>Country Name here {{ name }}</h1>
      <!-- <span>Information of prop is {{ props }}</span> -->
    </section>
    <section>
      Country Information <br>
      <!-- <template v-for="feature in features">{{ feature }}</template> -->
      <h1>Top Rated Hotels Nearby</h1>
      <ul>
        <li v-for="hotel in hotels">{{ hotel }}</li>
      </ul>
      <!-- <template v-for="hotel in hotels">Hotel name: {{ hotel }} <br></template> -->
    </section>
    <AccomodationList :hotelList="hotels.value" />
  </div>
</template>

<script>
import { ref, toRefs } from "vue";
import axios from "axios";
import AccomodationList from "../components/accomodation/AccomodationList.vue"

export default {
  components:{AccomodationList},
  props: {
    name: String,
  },
  setup(props) {
    console.log(props.name);
    const { name } = toRefs(props);

    const features = ref([]);
    const hotels = ref([])

    // const getCountryInfo = async () => {
    //   const url = "https://api.geoapify.com/v2/place-details?";
    //   // lat=1.2963194?lon=103.8476806&apiKey=f1ab693a1cf14c38beffbf9adfac9810
    //   const params = {
    //     lat: 1.2963194,
    //     lon: 103.8476806,
    //     apiKey: "f1ab693a1cf14c38beffbf9adfac9810",
    //     features: ["radius_500.tourism"],
    //   };
    //   await axios.get(url, { params }).then((response) => {
    //     features.value = response.data;
    //     console.log("in then");
    //     console.log(features.value);
    //   });
    // };
    //hehehehe

    // getCountryInfo();

    const getHotelInfo = async () => {
      // const url = "https://api.geoapify.com/v2/place-details?";
      // // lat=1.2963194?lon=103.8476806&apiKey=f1ab693a1cf14c38beffbf9adfac9810
      // const params = {
      //   lat: 1.2963194,
      //   lon: 103.8476806,
      //   apiKey: "f1ab693a1cf14c38beffbf9adfac9810",
      //   features: ["radius_500.tourism"],
      // };
      // axios.get(url, { params }).then((response) => {
      //   features.value = response.data;
      //   console.log("in then");
      //   console.log(features.value);
      // });

      const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/search',
        params: {query: 'bangkok', locale: 'en_US'},
        headers: {
          'X-RapidAPI-Key': '638ac48a76mshf275207fe9adab2p158478jsn11957d7c5c7f',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
        let hotelsData = response.data.suggestions[1].entities
        for (let hotelObj of hotelsData) {
          let hotel = hotelObj.name
          console.log(hotel)
          hotels.value.push(hotel)
        }
        
      }).catch(function (error) {
        console.error(error);
      });
    };
    

    getHotelInfo();

    return { name, features, hotels };
  },
};
</script>

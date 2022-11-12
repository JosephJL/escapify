import { ref } from "vue";
import axios from "axios";

const chunkSize = 10;

const getDestination = () => {
  const countryDestinations = ref([]);
  const countryError = ref(null);
  const totalPages = ref(null);
  const firstDestination = ref(null);

  const loadCountryDestination = async (lat, long, area) => {
    if (area < 1600) {
      area = 4000;
    }
    // console.log("radius is", area);
    const options = {
      method: "GET",
      url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
      params: {
        radius: area,
        lon: long,
        lat: lat,
        limit: 500,
        rate: "3",
      },
      headers: {
        "X-RapidAPI-Key": process.env.VUE_APP_DESTINATION_KEY,
        "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        const tempArray = [];
        for (let i = 0; i < response.data.features.length; i++) {
          let index = response.data.features[String(i)];
          // console.log("index is", response.data.features[String(i)])
          if (index.properties.name != "") {
            tempArray.push(index);
          }
        }
        console.log("chunksize is ", chunkSize);
        for (let j = 0; j < tempArray.length; j += chunkSize) {
          const chunk = tempArray.slice(j, j + chunkSize);
          countryDestinations.value.push(chunk);
        }
        totalPages.value = countryDestinations.value.length - 1;
        console.log("total pages is", totalPages.value);
        console.log("countryDestinationData", countryDestinations.value);
        console.log("zerodude is ", countryDestinations.value[0]);
        firstDestination.value = {
          name: countryDestinations.value[0][0].properties.name,
          lat: countryDestinations.value[0][0].geometry.coordinates["1"],
          lon: countryDestinations.value[0][0].geometry.coordinates["0"],
        };
      })
      .catch((error) => {
        console.log(error.message);
      });
  

  axios
    .request(options)
    .then((response) => {
      const tempArray = [];
      for (let i = 0; i < response.data.features.length; i++) {
        let index = response.data.features[String(i)];
        // console.log("index is", response.data.features[String(i)])
        if (index.properties.name != "") {
          tempArray.push(index);
        }
      }
      console.log("chunksize is ", chunkSize);
      for (let j = 0; j < tempArray.length; j += chunkSize) {
        const chunk = tempArray.slice(j, j + chunkSize);
        countryDestinations.value.push(chunk);
      }
      totalPages.value = countryDestinations.value.length - 1;
      console.log("total pages is", totalPages.value);
      console.log("countryDestinationData", countryDestinations.value);
      console.log("zerodude is ", countryDestinations.value[0]);
      firstDestination.value = {
        name: countryDestinations.value[0][0].properties.name,
        lat: countryDestinations.value[0][0].geometry.coordinates["1"],
        lon: countryDestinations.value[0][0].geometry.coordinates["0"],
      };
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  return {
    loadCountryDestination,
    countryError,
    countryDestinations,
    firstDestination,
  };
};

export default getDestination;

<template>
    <div>
        <!-- <h1>This is accomodation list</h1> -->
        <h1 class="mt-3 mb-2">Top Rated Hotels in Bangkok</h1>

      <!-- Table for hotels -->
      <table class="table table-striped table-secondary table-bordered">
        <thead>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Hotel Name</th>
            <th scope="col">Picture</th>
            <th scope="col">Hotel Address</th>
            <!-- <th scope="col">Hotel Location</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(hotel,idx) in hotels" v-bind:key="idx">
            <td>{{idx + 1}}</td>
            <td>{{hotel[1]}}</td>
            <td><img src="https://assets3.thrillist.com/v1/image/3100821/600x600/scale;webp=auto;jpeg_quality=60.jpg" style="width:200px;"></td>
            <td>{{hotel[2]}}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="imageHotel">l{{imageHotel}}</div>
    </div>
</template>


<script>

import {ref} from "vue"
import axios from "axios"

export default{
    props:{
        hotelList: Object,
    },
    setup(props){
        console.log(props.hotelList)
        const features = ref([]);
        const hotels = ref([])
        // let hotelPics = ref([])

    const getHotelInfo = async () => {
      const options = {
        method: 'GET',
        url: 'https://hotels4.p.rapidapi.com/locations/v3/search',
        params: {q: 'bangkok', locale: 'en_US'},
        headers: {
          'X-RapidAPI-Key': '638ac48a76mshf275207fe9adab2p158478jsn11957d7c5c7f',
          'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
        }
      };
      axios.request(options).then(function (response) {
        console.log(response.data);
        let apiData = response.data.sr;
        for (let idx in apiData) {
          // console.log(apiData[idx])
          let result = apiData[idx]
          if (result.type == "HOTEL") {
            let hotelId = result.hotelId
            let hotelName = result.regionNames.primaryDisplayName
            let hotelAddress = result.hotelAddress.street
            hotels.value.push([hotelId, hotelName, hotelAddress])
          } 
        }
        // console.log(type)
        // let hotelsData = response.data.suggestions[1].entities
        // for (let hotelObj of hotelsData) {
        //   let hotel = hotelObj.name
        //   let hotelCaption = hotelObj.caption

        //   // console.log(hotel)
        //   // console.log(hotelCaption)
        //   hotels.value.push([hotel, hotelCaption])
          
        // }
        
      }).catch(function (error) {
        console.error(error);
      });
    };
    

    getHotelInfo();
    // for (hotel in hotels) {

    // }
    // getHotelPics();
    

    return { name, features, hotels};
    }
}

</script>
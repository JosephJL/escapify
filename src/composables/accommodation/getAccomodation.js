import {ref} from "vue"
import axios from "axios"

const getAccomodation = () => {
    const hotels = ref([]);
   

    // console.log(lat)
    // console.log(lon)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + '-' + dd;
    // console.log(today)

    const getHotelInfo = async (name,lat,lon) => {
      const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v1/hotels/nearby',
        params: {
          latitude: lat,
          currency: 'USD',
          longitude: lon,
          checkout_date: '2022-12-27',
          sort_order: 'STAR_RATING_HIGHEST_FIRST',
          checkin_date: '2022-12-26',
          adults_number: '1',
          locale: 'en_US'
        },
        headers: {
          'X-RapidAPI-Key': process.env.VUE_APP_HOTEL_KEY,
          'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
      };
      await axios
        .request(options)
        .then(function (response) {
          // console.log(response.data);
          // console.log(name);
          let hotelsReturned = response.data.searchResults.results
          for (let hotel of hotelsReturned) {
            let hotelName = hotel.name
            let hotelAddress = hotel.address.streetAddress
            let hotelStars = 0
            if(typeof(hotel.guestReviews) != "undefined"){
              hotelStars = hotel.guestReviews.rating
            }
            let thumbnail = hotel.optimizedThumbUrls.srpDesktop
            // console.log(hotelStars)
            // console.log(thumbnail)
            hotels.value.push([hotelName, hotelAddress, hotelStars, thumbnail])
          }
          // let apiData = response.data.sr;
          // for (let idx in apiData) {
            // console.log(apiData[idx])
            // let result = apiData[idx];
            // if (result.type == "HOTEL") {
              // let hotelName = result.regionNames.primaryDisplayName;
              // let hotelAddress = result.hotelAddress.street;
              // hotels.value.push([hotelName, hotelAddress]);
            // }
          // }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    return {getHotelInfo , hotels}
}

export default getAccomodation
import {ref} from 'vue'
import axios from 'axios'

const getDestinationInfo = () => {
    const info = ref("")
    const error = ref(null)

    const loadText = async (placeId) => {
        const options2 = {
          method: "GET",
          url: `https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${placeId}`,
          headers: {
            "X-RapidAPI-Key":
            "828469e3eamsh38f4c6e374a8e38p1e9b0ejsn5fec85fd05a9",
            "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
          },
        };
    
        await axios
          .request(options2)
          .then(function (response) {
            // console.log(response.data.image);
            // var image = response.data.image;
            console.log(
              "Check if wikipedia exists",
              typeof(response.data.wikipedia_extracts) != 'undefined'
            );
            if (typeof(response.data.wikipedia_extracts) != 'undefined') {
            //   info.value = [response.data.wikipedia_extracts.text,""];
            info.value = response.data.wikipedia_extracts.text
            }else{
                // info.value = ["There's currently no available description for this destination. If you've been here before feel free to share your description on","https://www.wikidata.org/wiki/Q1775746"]
                info.value = false
            }
          })
          .catch(function (error) {
            console.error(error);
            error.value = false;
          });
      };

      return {loadText , error, info}
}

export default getDestinationInfo

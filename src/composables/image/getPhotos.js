import axios from "axios";
import { ref } from "vue";

const images = ["https://firebasestorage.googleapis.com/v0/b/foodapp-2ef25.appspot.com/o/placeholder1.jpg?alt=media&token=015e9f13-1c32-41d8-8f7c-507e2fce563d","https://firebasestorage.googleapis.com/v0/b/foodapp-2ef25.appspot.com/o/placeholder2.jpg?alt=media&token=87d6fb5c-d4bf-4d2f-91a9-654450a080a1",
"https://firebasestorage.googleapis.com/v0/b/foodapp-2ef25.appspot.com/o/placeholder3.jpg?alt=media&token=0f649ae0-e618-44a1-985e-f7e901f3e779","https://firebasestorage.googleapis.com/v0/b/foodapp-2ef25.appspot.com/o/placeholder4.jpg?alt=media&token=41eece76-c482-43ce-9e0a-c882f8fd5219"
]
 
const getPlacePhoto = () => {
  const photoRef = ref(null);
  const returnURl = ref(null);
  const imageLoading = ref(false);

  const load = async (placeName) => {
    // console.log("inside getPlacePhoto composable with placename", placeName);
    const proxyUrl = "https://blooming-reaches-84388.herokuapp.com/";
    let config = {
      method: "get",
      url:
        proxyUrl +
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&key=${process.env.VUE_APP_GOOGLE_KEY}&inputtype=textquery&fields=name,photos,place_id`,
      headers: {},
    };
    await axios(config).then((response) => {
      // console.log("response is",response.data);
      const candidates = response.data.candidates;
      // console.log("candidates are",candidates.length)
      // console.log("results are ",response.data.candidates,"for placename ",placeName)
      // console.log("candidate photos are,", candidate.photos,"for placename ",placeName);
      if (candidates.length != 0){
        const candidate = candidates[0];
        // console.log("candidate is",candidate)
        if ("photos" in candidate){
          photoRef.value = candidate.photos[0].photo_reference;
        }else{
          let random = Math.floor(Math.random() * 4);
          returnURl.value = images[random];
        }
      }else{
         //random digit for placeholder
        let random = Math.floor(Math.random() * 4);
        returnURl.value = images[random];
        // console.log("THERES NO PIC SO HERES SUM PLACEHOLDAR",returnURl.value,"random value was",random)
      }
    });

    const photoUrl =
      proxyUrl +
      `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef.value}&key=${process.env.VUE_APP_GOOGLE_KEY}&maxwidth=1000&maxheight=1000`;

    if (photoRef.value != null){
      const imageURLQuery = await axios
      .get(photoUrl, { responseType: "blob" })
      .then((response) => response.data);
    // console.log("queried image is ", imageURLQuery);
    returnURl.value = URL.createObjectURL(imageURLQuery);
    imageLoading.value = true;
    }else{
      setTimeout(()=>{
        imageLoading.value = true;
      },1500)
    }
  };

  return { imageLoading, returnURl, load };
};

export default getPlacePhoto;
